const express = require('express');
const http = require('http');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const { WebSocketServer, WebSocket } = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const PORT = process.env.PORT || 3000;
const DATA_DIR = fs.existsSync(path.join(__dirname, 'data')) ? path.join(__dirname, 'data') : __dirname;
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const COUPONS_FILE = path.join(DATA_DIR, 'coupons.json');

// Ensure data directory exists if used
if (!fs.existsSync(DATA_DIR)) {
  try { fs.mkdirSync(DATA_DIR, { recursive: true }); } catch (e) {}
}

// Initial Database Files
if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, JSON.stringify({}), 'utf-8');
}

if (!fs.existsSync(COUPONS_FILE)) {
  const defaultCoupons = {
    'corromax': {
      code: 'corromax',
      coinsReward: 15000,
      gemsReward: 0,
      maxUses: 5,
      usedCount: 0,
      usedByUsers: []
    }
  };
  fs.writeFileSync(COUPONS_FILE, JSON.stringify(defaultCoupons, null, 2), 'utf-8');
}

// Helpers for Data Persistence
function loadUsers() {
  try {
    return JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
  } catch (e) {
    return {};
  }
}

function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
}

function loadCoupons() {
  try {
    return JSON.parse(fs.readFileSync(COUPONS_FILE, 'utf-8'));
  } catch (e) {
    return {};
  }
}

function saveCoupons(coupons) {
  fs.writeFileSync(COUPONS_FILE, JSON.stringify(coupons, null, 2), 'utf-8');
}

function hashPassword(password) {
  return crypto.createHash('sha256').update(password + '_veck_salt_99').digest('hex');
}

function generateToken() {
  return crypto.randomBytes(24).toString('hex');
}

// Sessions Map (token -> username)
const sessions = new Map();

// Active User Sockets & Realtime Status (for friends and invites)
const connectedUserSockets = new Map(); // username (lowercase) -> Set<ws>
const userOnlineStatus = new Map(); // username (lowercase) -> { inGame, roomId, mode, lastActive }

// Express Middlewares
app.use(express.json());
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.set('X-Content-Type-Options', 'nosniff');
  res.set('X-Category', 'Education');
  res.set('X-Application-Name', 'EBA-Fizik-Model-Portal');
  next();
});

app.get('/api/education/status', (req, res) => {
  res.json({
    portal: "EBA Proje Geliştirme ve Fizik Modelleme Portalı",
    category: "Education",
    module: "11. Sınıf Fizik Vektör Simülasyonu",
    status: "active"
  });
});

// Auth Middleware Helper
function authenticateUser(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader ? authHeader.replace('Bearer ', '').trim() : null;

  if (!token || !sessions.has(token)) {
    return res.status(401).json({ success: false, message: 'Lütfen önce hesabınıza giriş yapın!' });
  }

  const username = sessions.get(token);
  const users = loadUsers();
  if (!users[username]) {
    return res.status(401).json({ success: false, message: 'Kullanıcı bulunamadı!' });
  }

  req.currentUser = users[username];
  req.currentUsername = username;
  next();
}

// ==========================================
// REST API ENDPOINTS
// ==========================================

// 1. REGISTER
app.post('/api/auth/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password || username.length < 3 || password.length < 4) {
    return res.status(400).json({ success: false, message: 'Kullanıcı adı en az 3, şifre en az 4 karakter olmalıdır!' });
  }

  const cleanName = username.trim().toLowerCase();
  const users = loadUsers();

  if (users[cleanName]) {
    return res.status(400).json({ success: false, message: 'Bu kullanıcı adı zaten alınmış!' });
  }

  const token = generateToken();
  const newUser = {
    username: username.trim(),
    cleanName: cleanName,
    passwordHash: hashPassword(password),
    createdAt: new Date().toISOString(),
    coins: 0,
    gems: 0,
    level: 0,
    xp: 0,
    kills: 0,
    deaths: 0,
    score: 0,
    equipped: {
      gun1: 'AK-47',
      gun2: 'Pistol',
      gun3: 'Combat Knife',
      gun4: 'Frag Grenade',
      skin: 'Mr Veck',
      hat: 'Laughing Emoji Head',
      back: 'None',
      face: 'Iconic Smug Man Face'
    },
    inventory: [
      'AK-47',
      'Pistol',
      'Combat Knife',
      'Frag Grenade',
      'Mr Veck',
      'Laughing Emoji Head'
    ],
    claimedTasks: [],
    usedCoupons: []
  };

  users[cleanName] = newUser;
  saveUsers(users);

  sessions.set(token, cleanName);

  const safeUser = { ...newUser };
  delete safeUser.passwordHash;

  return res.json({ success: true, message: 'Hesap başarıyla oluşturuldu!', token, user: safeUser });
});

// 2. LOGIN
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Kullanıcı adı ve şifre gereklidir!' });
  }

  const cleanName = username.trim().toLowerCase();
  const users = loadUsers();
  const user = users[cleanName];

  if (!user || user.passwordHash !== hashPassword(password)) {
    return res.status(400).json({ success: false, message: 'Hatalı kullanıcı adı veya şifre!' });
  }

  if (user.isBanned) {
    return res.status(403).json({ success: false, message: '🚫 Bu hesap yönetici tarafından BANLANMIŞTIR! Giriş yapamazsınız.' });
  }

  const token = generateToken();
  sessions.set(token, cleanName);

  const safeUser = { ...user };
  delete safeUser.passwordHash;

  return res.json({ success: true, message: 'Giriş başarılı!', token, user: safeUser });
});

// 3. GET CURRENT USER PROFILE
app.get('/api/auth/me', authenticateUser, (req, res) => {
  if (req.currentUser.isBanned) {
    return res.status(403).json({ success: false, message: 'Hesabınız banlanmıştır!' });
  }
  const safeUser = { ...req.currentUser };
  delete safeUser.passwordHash;
  return res.json({ success: true, user: safeUser });
});

// 4. REDEEM COUPON CODE (e.g. corromax -> 15,000 Coins, 5 max uses)
app.post('/api/coupon/redeem', authenticateUser, (req, res) => {
  const { code } = req.body;
  if (!code) {
    return res.status(400).json({ success: false, message: 'Lütfen bir kupon kodu girin!' });
  }

  const cleanCode = code.trim().toLowerCase();
  const coupons = loadCoupons();
  const coupon = coupons[cleanCode];

  if (!coupon) {
    return res.status(400).json({ success: false, message: 'Geçersiz veya süresi dolmuş kupon kodu!' });
  }

  if (coupon.usedCount >= coupon.maxUses) {
    return res.status(400).json({ success: false, message: 'Bu kupon maksimum kullanım limitine (5 kişi) ulaştı!' });
  }

  const users = loadUsers();
  const user = users[req.currentUsername];

  if (user.usedCoupons && user.usedCoupons.includes(cleanCode)) {
    return res.status(400).json({ success: false, message: 'Bu kupon kodunu daha önce kullandınız!' });
  }

  // Grant rewards
  user.coins += (coupon.coinsReward || 0);
  user.gems += (coupon.gemsReward || 0);
  if (!user.usedCoupons) user.usedCoupons = [];
  user.usedCoupons.push(cleanCode);

  // Update Coupon Usage
  coupon.usedCount += 1;
  if (!coupon.usedByUsers) coupon.usedByUsers = [];
  coupon.usedByUsers.push(req.currentUsername);

  saveUsers(users);
  saveCoupons(coupons);

  const safeUser = { ...user };
  delete safeUser.passwordHash;

  return res.json({
    success: true,
    message: `🎉 Tebrikler! Kupon kodu aktif edildi: +${coupon.coinsReward.toLocaleString()} Altın hesabınıza eklendi! (Kalan Kullanım: ${coupon.maxUses - coupon.usedCount}/5)`,
    rewardCoins: coupon.coinsReward,
    user: safeUser
  });
});

// 5. BUY WEAPON / SKIN FROM SHOP
app.post('/api/shop/buy', authenticateUser, (req, res) => {
  const { itemId, price, currencyType } = req.body;
  if (!itemId || price === undefined || price === null || !currencyType) {
    return res.status(400).json({ success: false, message: 'Geçersiz satın alma isteği!' });
  }

  const users = loadUsers();
  const user = users[req.currentUsername];

  if (!user.inventory) user.inventory = [];
  if (user.inventory.includes(itemId)) {
    return res.status(400).json({ success: false, message: 'Bu eşyaya zaten sahipsiniz!' });
  }

  if (currencyType === 'coins') {
    if (user.coins < price) {
      return res.status(400).json({ success: false, message: 'Yetersiz Altın bakiyesi! Görev yaparak veya kupon ile altın kazanabilirsiniz.' });
    }
    user.coins -= price;
  } else if (currencyType === 'gems') {
    if (user.gems < price) {
      return res.status(400).json({ success: false, message: 'Yetersiz Elmas bakiyesi!' });
    }
    user.gems -= price;
  }

  user.inventory.push(itemId);
  saveUsers(users);

  const safeUser = { ...user };
  delete safeUser.passwordHash;

  return res.json({
    success: true,
    message: `🎉 "${itemId}" başarıyla satın alındı ve envanterinize eklendi!`,
    user: safeUser
  });
});

// 6. EQUIP WEAPON OR SKIN
app.post('/api/inventory/equip', authenticateUser, (req, res) => {
  const { category, itemId } = req.body;
  if (!category || !itemId) {
    return res.status(400).json({ success: false, message: 'Geçersiz kuşanma isteği!' });
  }

  const users = loadUsers();
  const user = users[req.currentUsername];

  if (!user.inventory.includes(itemId) && itemId !== 'None') {
    return res.status(400).json({ success: false, message: 'Bu eşyaya sahip değilsiniz!' });
  }

  if (!user.equipped) user.equipped = {};
  user.equipped[category] = itemId;

  saveUsers(users);

  const safeUser = { ...user };
  delete safeUser.passwordHash;

  return res.json({ success: true, message: `"${itemId}" başarıyla kuşandı!`, user: safeUser });
});

// 7. OPEN CASE / LOOTBOX
app.post('/api/shop/open-case', authenticateUser, (req, res) => {
  const { caseType } = req.body;
  const users = loadUsers();
  const user = users[req.currentUsername];

  const caseConfigs = {
    'common': {
      name: 'Askeri Silah Kasası',
      price: 500,
      currency: 'coins',
      drops: [
        { name: 'AK-47 | Dragon Fire', rarity: 'Mythic', icon: '🐉' },
        { name: 'Deagle', rarity: 'Epic', icon: '💥' },
        { name: 'Rocket Launcher', rarity: 'Epic', icon: '🚀' },
        { name: 'Combat Knife', rarity: 'Rare', icon: '🗡️' },
        { name: 'Police Patrol', rarity: 'Rare', icon: '👮' },
        { name: 'Yarn Beanie', rarity: 'Rare', icon: '🧣' },
        { name: 'Meme Frog Suit', rarity: 'Epic', icon: '🐸' }
      ]
    },
    'tactical': {
      name: 'Taktiksel Kasa',
      price: 1500,
      currency: 'coins',
      drops: [
        { name: 'Rocket Launcher', rarity: 'Epic', icon: '🚀' },
        { name: 'Minigun', rarity: 'Epic', icon: '🌪️' },
        { name: 'Huntsman Knife | Damascus Steel', rarity: 'Legendary', icon: '🪓' },
        { name: 'Player 456', rarity: 'Epic', icon: '🦑' },
        { name: 'Guard Triangle', rarity: 'Epic', icon: '🔺' },
        { name: 'Donald J. Veck', rarity: 'Rare', icon: '👔' },
        { name: 'Ghost Operator', rarity: 'Legendary', icon: '💀' }
      ]
    },
    'rainbow': {
      name: 'Kozmik Gökkuşağı Kasası',
      price: 50,
      currency: 'gems',
      drops: [
        { name: 'AK-47 | Rainbow', rarity: 'Cosmic', icon: '🌈' },
        { name: 'Minigun | Rainbow', rarity: 'Cosmic', icon: '🌪️' },
        { name: 'Butterfly Knife | Cyber Neon', rarity: 'Cosmic', icon: '🦋' },
        { name: 'Cyber Ninja', rarity: 'Mythic', icon: '🥷' },
        { name: 'Gold Alloy', rarity: 'Epic', icon: '✨' },
        { name: 'Player 456', rarity: 'Epic', icon: '🦑' }
      ]
    },
    'legendary': {
      name: 'Efsanevi Karambit Kasası',
      price: 100,
      currency: 'gems',
      drops: [
        { name: 'Karambit | Vampire\'s Blood', rarity: 'Mythic', icon: '🗡️' },
        { name: 'Karambit | Gold', rarity: 'Legendary', icon: '✨' },
        { name: 'Karambit | Fade Emerald', rarity: 'Mythic', icon: '💎' },
        { name: 'Butterfly Knife | Cyber Neon', rarity: 'Cosmic', icon: '🦋' },
        { name: 'Huntsman Knife | Damascus Steel', rarity: 'Legendary', icon: '🪓' },
        { name: 'AK-47 | Dragon Fire', rarity: 'Mythic', icon: '🐉' },
        { name: 'Minigun | Vulcan Magma', rarity: 'Mythic', icon: '🌋' }
      ]
    }
  };

  const cConfig = caseConfigs[caseType] || caseConfigs['common'];

  if (cConfig.currency === 'coins') {
    if (user.coins < cConfig.price) {
      return res.status(400).json({ success: false, message: 'Yetersiz Altın!' });
    }
    user.coins -= cConfig.price;
  } else {
    if (user.gems < cConfig.price) {
      return res.status(400).json({ success: false, message: 'Yetersiz Elmas!' });
    }
    user.gems -= cConfig.price;
  }

  // Shuffle and pick drop to guarantee variety and non-repetition
  const possibleDrops = cConfig.drops;
  const wonItem = possibleDrops[Math.floor(Math.random() * possibleDrops.length)];

  if (!user.inventory.includes(wonItem.name)) {
    user.inventory.push(wonItem.name);
  }

  saveUsers(users);

  const safeUser = { ...user };
  delete safeUser.passwordHash;

  return res.json({
    success: true,
    message: `🎁 Tebrikler! Kasadan ${wonItem.rarity} nadirlikte "${wonItem.name}" kazandınız!`,
    wonItem,
    user: safeUser
  });
});

// 8. CLAIM DAILY QUEST / TASK
app.post('/api/tasks/claim', authenticateUser, (req, res) => {
  const { taskId, coinsReward, gemsReward } = req.body;
  const users = loadUsers();
  const user = users[req.currentUsername];

  if (!user.claimedTasks) user.claimedTasks = [];
  if (user.claimedTasks.includes(taskId)) {
    return res.status(400).json({ success: false, message: 'Bu görevin ödülünü zaten aldınız!' });
  }

  user.coins += (coinsReward || 500);
  user.gems += (gemsReward || 5);
  user.claimedTasks.push(taskId);

  saveUsers(users);

  const safeUser = { ...user };
  delete safeUser.passwordHash;

  return res.json({
    success: true,
    message: `🎯 Görev tamamlandı! +${coinsReward} Altın ve +${gemsReward} Elmas kazanıldı!`,
    user: safeUser
  });
});

// 9. TOP-UP / BUY CURRENCY PACK (BLOCKED DIRECT PURCHASE - MANUAL PAYMENT TO ENSAR)
app.post('/api/shop/topup', authenticateUser, (req, res) => {
  return res.status(400).json({
    success: false,
    message: 'ensar abime parayı öde teslim eder'
  });
});

  // ==========================================
  // FRIENDS & INVITATION SYSTEM
  // ==========================================

  // Helper to ensure friend request structures
  function ensureFriendArrays(user) {
    if (!user.friends) user.friends = [];
    if (!user.incomingFriendRequests) user.incomingFriendRequests = [];
    if (!user.sentFriendRequests) user.sentFriendRequests = [];
  }

  // 1. Get Friends List (Accepted Friends, Incoming Requests, Sent Requests)
  app.get('/api/friends/list', authenticateUser, (req, res) => {
    const users = loadUsers();
    const user = users[req.currentUsername];
    if (!user) return res.status(404).json({ success: false, message: 'Kullanıcı bulunamadı.' });

    ensureFriendArrays(user);

    // 1. Mutual Accepted Friends
    const friendsResult = [];
    user.friends.forEach(fName => {
      const fKey = fName.toLowerCase().trim();
      const fUser = users[fKey];
      const isOnline = (connectedUserSockets.has(fKey) && connectedUserSockets.get(fKey).size > 0) || 
                       Array.from(sessions.values()).map(s => s.toLowerCase()).includes(fKey);
      const status = userOnlineStatus.get(fKey) || null;

      friendsResult.push({
        username: fUser ? fUser.username : fName,
        level: fUser ? (fUser.level || 0) : 0,
        kills: fUser ? (fUser.kills || 0) : 0,
        isOnline: !!isOnline,
        inGame: status ? !!status.inGame : false,
        roomId: status ? status.roomId : null,
        mode: status ? status.mode : null
      });
    });

    // 2. Incoming Requests (Waiting for this user to accept/reject)
    const incomingResult = [];
    user.incomingFriendRequests.forEach(rName => {
      const rKey = rName.toLowerCase().trim();
      const rUser = users[rKey];
      const isOnline = (connectedUserSockets.has(rKey) && connectedUserSockets.get(rKey).size > 0);
      incomingResult.push({
        username: rUser ? rUser.username : rName,
        level: rUser ? (rUser.level || 0) : 0,
        kills: rUser ? (rUser.kills || 0) : 0,
        isOnline: !!isOnline
      });
    });

    // 3. Sent Requests (Waiting for target to accept)
    const sentResult = [];
    user.sentFriendRequests.forEach(sName => {
      const sKey = sName.toLowerCase().trim();
      const sUser = users[sKey];
      const isOnline = (connectedUserSockets.has(sKey) && connectedUserSockets.get(sKey).size > 0);
      sentResult.push({
        username: sUser ? sUser.username : sName,
        level: sUser ? (sUser.level || 0) : 0,
        isOnline: !!isOnline
      });
    });

    return res.json({
      success: true,
      friends: friendsResult,
      incomingRequests: incomingResult,
      sentRequests: sentResult
    });
  });

  // 2. Send Friend Request by Username
  app.post('/api/friends/add', authenticateUser, (req, res) => {
    const friendUsername = (req.body.friendUsername || '').trim();
    if (!friendUsername) {
      return res.status(400).json({ success: false, message: 'Lütfen bir oyuncu kullanıcı adı girin.' });
    }

    const myKey = req.currentUsername.toLowerCase().trim();
    const targetKey = friendUsername.toLowerCase().trim();

    if (myKey === targetKey) {
      return res.status(400).json({ success: false, message: 'Kendinize arkadaşlık isteği gönderemezsiniz!' });
    }

    const users = loadUsers();
    if (!users[targetKey]) {
      return res.status(404).json({ success: false, message: `"${friendUsername}" adında kayıtlı bir oyuncu bulunamadı!` });
    }

    const me = users[myKey];
    const target = users[targetKey];
    ensureFriendArrays(me);
    ensureFriendArrays(target);

    // Already mutually accepted friends?
    if (me.friends.some(f => f.toLowerCase() === targetKey)) {
      return res.status(400).json({ success: false, message: `"${target.username}" zaten arkadaş listenizde kayıtlı!` });
    }

    // Already sent request?
    if (me.sentFriendRequests.some(r => r.toLowerCase() === targetKey)) {
      return res.status(400).json({ success: false, message: `"${target.username}" adlı oyuncuya zaten istek gönderdiniz (Onay bekliyor)!` });
    }

    // If target already sent an incoming request to me, auto-accept and become friends!
    if (me.incomingFriendRequests.some(r => r.toLowerCase() === targetKey)) {
      me.incomingFriendRequests = me.incomingFriendRequests.filter(r => r.toLowerCase() !== targetKey);
      target.sentFriendRequests = target.sentFriendRequests.filter(r => r.toLowerCase() !== myKey);
      me.friends.push(target.username);
      target.friends.push(me.username);
      saveUsers(users);

      return res.json({
        success: true,
        message: `🎉 "${target.username}" da size istek göndermişti! Karşılıklı olarak arkadaş oldunuz!`
      });
    }

    // Add to pending requests
    me.sentFriendRequests.push(target.username);
    target.incomingFriendRequests.push(me.username);
    saveUsers(users);

    // Realtime notification via WebSocket if target is online
    if (connectedUserSockets.has(targetKey)) {
      const notifyMsg = JSON.stringify({
        type: 'friend_request_received',
        fromUsername: me.username
      });
      connectedUserSockets.get(targetKey).forEach(clientWs => {
        if (clientWs.readyState === WebSocket.OPEN) {
          clientWs.send(notifyMsg);
        }
      });
    }

    return res.json({
      success: true,
      message: `📩 "${target.username}" adlı oyuncuya arkadaşlık isteği gönderildi! Karşı taraf kabul ettiğinde maça çağırabileceksiniz.`
    });
  });

  // 3. Accept Friend Request
  app.post('/api/friends/accept', authenticateUser, (req, res) => {
    const friendUsername = (req.body.friendUsername || '').trim();
    const myKey = req.currentUsername.toLowerCase().trim();
    const targetKey = friendUsername.toLowerCase().trim();

    const users = loadUsers();
    const me = users[myKey];
    const target = users[targetKey];
    if (!me || !target) {
      return res.status(404).json({ success: false, message: 'Oyuncu bulunamadı.' });
    }

    ensureFriendArrays(me);
    ensureFriendArrays(target);

    // Remove from pending requests
    me.incomingFriendRequests = me.incomingFriendRequests.filter(r => r.toLowerCase() !== targetKey);
    target.sentFriendRequests = target.sentFriendRequests.filter(r => r.toLowerCase() !== myKey);

    // Add to mutual friends
    if (!me.friends.some(f => f.toLowerCase() === targetKey)) {
      me.friends.push(target.username);
    }
    if (!target.friends.some(f => f.toLowerCase() === myKey)) {
      target.friends.push(me.username);
    }

    saveUsers(users);

    // Notify target in realtime
    if (connectedUserSockets.has(targetKey)) {
      const notifyMsg = JSON.stringify({
        type: 'friend_request_accepted',
        byUsername: me.username
      });
      connectedUserSockets.get(targetKey).forEach(clientWs => {
        if (clientWs.readyState === WebSocket.OPEN) {
          clientWs.send(notifyMsg);
        }
      });
    }

    return res.json({
      success: true,
      message: `🎉 "${target.username}" arkadaşlık isteği kabul edildi! Artık maça çağırabilirsiniz.`
    });
  });

  // 4. Reject Friend Request
  app.post('/api/friends/reject', authenticateUser, (req, res) => {
    const friendUsername = (req.body.friendUsername || '').trim();
    const myKey = req.currentUsername.toLowerCase().trim();
    const targetKey = friendUsername.toLowerCase().trim();

    const users = loadUsers();
    const me = users[myKey];
    const target = users[targetKey];

    if (me) {
      ensureFriendArrays(me);
      me.incomingFriendRequests = me.incomingFriendRequests.filter(r => r.toLowerCase() !== targetKey);
    }
    if (target) {
      ensureFriendArrays(target);
      target.sentFriendRequests = target.sentFriendRequests.filter(r => r.toLowerCase() !== myKey);
    }

    saveUsers(users);
    return res.json({ success: true, message: `"${friendUsername}" arkadaşlık isteği reddedildi.` });
  });

  // 5. Cancel Sent Friend Request
  app.post('/api/friends/cancel', authenticateUser, (req, res) => {
    const friendUsername = (req.body.friendUsername || '').trim();
    const myKey = req.currentUsername.toLowerCase().trim();
    const targetKey = friendUsername.toLowerCase().trim();

    const users = loadUsers();
    const me = users[myKey];
    const target = users[targetKey];

    if (me) {
      ensureFriendArrays(me);
      me.sentFriendRequests = me.sentFriendRequests.filter(r => r.toLowerCase() !== targetKey);
    }
    if (target) {
      ensureFriendArrays(target);
      target.incomingFriendRequests = target.incomingFriendRequests.filter(r => r.toLowerCase() !== myKey);
    }

    saveUsers(users);
    return res.json({ success: true, message: `Arkadaşlık isteği iptal edildi.` });
  });

  // 6. Remove Mutual Friend
  app.post('/api/friends/remove', authenticateUser, (req, res) => {
    const friendUsername = (req.body.friendUsername || '').trim();
    const myKey = req.currentUsername.toLowerCase().trim();
    const targetKey = friendUsername.toLowerCase().trim();

    const users = loadUsers();
    const me = users[myKey];
    if (me && me.friends) {
      me.friends = me.friends.filter(f => f.toLowerCase() !== targetKey);
    }
    const target = users[targetKey];
    if (target && target.friends) {
      target.friends = target.friends.filter(f => f.toLowerCase() !== myKey);
    }

    saveUsers(users);

    return res.json({ success: true, message: `"${friendUsername}" arkadaş listenizden çıkarıldı.` });
  });

  // ==========================================
  // ADMIN DASHBOARD API (ENSAR ADMIN PANEL)
  // ==========================================
  function requireAdmin(req, res, next) {
    authenticateUser(req, res, () => {
      if (req.currentUser && (req.currentUser.isAdmin || req.currentUser.cleanName === 'ensar')) {
        next();
      } else {
        return res.status(403).json({ success: false, message: 'Bu panele erişim için Admin yetkisi gereklidir!' });
      }
    });
  }

  // Admin: Get all users, online status, and active rooms
  app.get('/api/admin/overview', requireAdmin, (req, res) => {
    const users = loadUsers();
    const onlineUsers = Array.from(new Set(Array.from(sessions.values())));
    
    const userList = Object.values(users).map(u => ({
      username: u.username,
      cleanName: u.cleanName,
      coins: u.coins || 0,
      gems: u.gems || 0,
      level: u.level || 0,
      xp: u.xp || 0,
      isAdmin: !!u.isAdmin,
      isBanned: !!u.isBanned,
      createdAt: u.createdAt,
      kills: u.kills || 0,
      deaths: u.deaths || 0,
      kd: u.deaths > 0 ? (u.kills / u.deaths).toFixed(2) : String(u.kills || 0),
      inventoryCount: (u.inventory || []).length,
      isOnline: onlineUsers.includes(u.cleanName)
    }));

    const activeRoomsList = [];
    rooms.forEach((r, id) => {
      activeRoomsList.push({
        id: r.id,
        mode: r.mode,
        isPrivate: r.isPrivate,
        playerCount: r.players.size
      });
    });

    const bannedCount = userList.filter(u => u.isBanned).length;

    return res.json({
      success: true,
      totalUsers: userList.length,
      onlineCount: onlineUsers.length,
      bannedCount: bannedCount,
      users: userList,
      rooms: activeRoomsList
    });
  });

  // Admin: Ban / Unban user
  app.post('/api/admin/ban-user', requireAdmin, (req, res) => {
    const { targetUsername, ban } = req.body;
    if (!targetUsername) {
      return res.status(400).json({ success: false, message: 'Kullanıcı adı gereklidir!' });
    }

    const clean = targetUsername.trim().toLowerCase();
    if (clean === 'ensar') {
      return res.status(400).json({ success: false, message: 'Ana admin hesabı banlanamaz!' });
    }

    const users = loadUsers();
    const user = users[clean];
    if (!user) {
      return res.status(404).json({ success: false, message: 'Kullanıcı bulunamadı!' });
    }

    user.isBanned = Boolean(ban);
    saveUsers(users);

    if (ban) {
      // Disconnect all sessions for this user
      for (const [token, username] of sessions.entries()) {
        if (username === clean) {
          sessions.delete(token);
        }
      }
      // Remove from any active rooms
      rooms.forEach((r) => {
        for (const [pid, p] of r.players.entries()) {
          if (p.name && p.name.trim().toLowerCase() === clean) {
            r.players.delete(pid);
          }
        }
      });
    }

    return res.json({
      success: true,
      message: ban ? `🚫 "${user.username}" başarıyla BANLANDI ve oyundan atıldı!` : `✅ "${user.username}" kullanıcısının banı kaldırıldı!`,
      isBanned: user.isBanned
    });
  });

  // Admin: Update user stats / toggle admin / give coins
  app.post('/api/admin/update-user', requireAdmin, (req, res) => {
    const { targetUsername, coins, gems, level, isAdmin } = req.body;
    if (!targetUsername) {
      return res.status(400).json({ success: false, message: 'Kullanıcı adı gereklidir!' });
    }

    const clean = targetUsername.trim().toLowerCase();
    const users = loadUsers();
    const user = users[clean];

    if (!user) {
      return res.status(404).json({ success: false, message: 'Kullanıcı bulunamadı!' });
    }

    if (coins !== undefined) user.coins = Math.max(0, Number(coins));
    if (gems !== undefined) user.gems = Math.max(0, Number(gems));
    if (level !== undefined) user.level = Math.max(0, Number(level));
    if (isAdmin !== undefined) user.isAdmin = Boolean(isAdmin);

    saveUsers(users);

    return res.json({
      success: true,
      message: `⚡ "${user.username}" kullanıcısının bilgileri başarıyla güncellendi!`
    });
  });

  // Admin: Delete user
  app.post('/api/admin/delete-user', requireAdmin, (req, res) => {
    const { targetUsername } = req.body;
    if (!targetUsername) {
      return res.status(400).json({ success: false, message: 'Kullanıcı adı gereklidir!' });
    }

    const clean = targetUsername.trim().toLowerCase();
    if (clean === 'ensar') {
      return res.status(400).json({ success: false, message: 'Ana admin hesabı silinemez!' });
    }

    const users = loadUsers();
    if (!users[clean]) {
      return res.status(404).json({ success: false, message: 'Kullanıcı bulunamadı!' });
    }

    delete users[clean];
    saveUsers(users);

    return res.json({
      success: true,
      message: `🗑️ "${targetUsername}" kullanıcısı başarıyla silindi.`
    });
  });

  // Admin: Get all coupons
  app.get('/api/admin/coupons', requireAdmin, (req, res) => {
    const coupons = loadCoupons();
    return res.json({
      success: true,
      coupons: Object.values(coupons)
    });
  });

  // Admin: Create new coupon with custom limit
  app.post('/api/admin/coupons/create', requireAdmin, (req, res) => {
    const { code, coinsReward, gemsReward, maxUses } = req.body;
    if (!code || !code.trim()) {
      return res.status(400).json({ success: false, message: 'Lütfen bir kupon kodu belirleyin!' });
    }

    const cleanCode = code.trim().toLowerCase();
    const coupons = loadCoupons();

    if (coupons[cleanCode]) {
      return res.status(400).json({ success: false, message: `"${cleanCode}" kuponu zaten mevcut!` });
    }

    const limit = Math.max(1, parseInt(maxUses) || 5);
    const coins = Math.max(0, parseInt(coinsReward) || 0);
    const gems = Math.max(0, parseInt(gemsReward) || 0);

    coupons[cleanCode] = {
      code: cleanCode,
      coinsReward: coins,
      gemsReward: gems,
      maxUses: limit,
      usedCount: 0,
      usedByUsers: []
    };

    saveCoupons(coupons);

    return res.json({
      success: true,
      message: `🎉 "${cleanCode}" kuponu başarıyla oluşturuldu! (${limit} kişi kullanabilir)`,
      coupon: coupons[cleanCode]
    });
  });

  // Admin: Delete a coupon
  app.post('/api/admin/coupons/delete', requireAdmin, (req, res) => {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ success: false, message: 'Kupon kodu belirtilmedi!' });
    }

    const cleanCode = code.trim().toLowerCase();
    const coupons = loadCoupons();

    if (!coupons[cleanCode]) {
      return res.status(404).json({ success: false, message: 'Kupon bulunamadı!' });
    }

    delete coupons[cleanCode];
    saveCoupons(coupons);

    return res.json({
      success: true,
      message: `🗑️ "${cleanCode}" kuponu başarıyla silindi.`
    });
  });

  // 10. CHECK IF A ROOM EXISTS
  app.get('/api/rooms/check/:roomId', (req, res) => {
  const roomId = req.params.roomId.trim().toUpperCase();
  const room = rooms.get(roomId);

  if (!room) {
    return res.json({ exists: false, message: 'Bu oda ID\'sine sahip bir oyun bulunamadı!' });
  }

  return res.json({
    exists: true,
    roomId: room.id,
    mode: room.mode,
    map: room.map || 'arena',
    duration: room.duration || 900,
    bots: room.bots || 'none',
    isPrivate: room.isPrivate,
    playerCount: room.players.size,
    maxPlayers: room.maxPlayers
  });
});

// 11. CREATE A NEW PRIVATE ROOM
app.post('/api/rooms/create', (req, res) => {
  const { mode, maxPlayers, map, duration, bots } = req.body;
  const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
  const roomId = `VECK-${randomSuffix}`;

  const room = {
    id: roomId,
    name: `Özel Oda (${roomId})`,
    mode: mode || 'FFA',
    map: map || 'pubg',
    duration: Number(duration) || 900,
    bots: bots || 'none',
    isPrivate: true,
    maxPlayers: Number(maxPlayers) || 16,
    players: new Map()
  };

  rooms.set(roomId, room);

  return res.json({
    success: true,
    roomId: roomId,
    mode: room.mode,
    map: room.map,
    duration: room.duration,
    bots: room.bots,
    maxPlayers: room.maxPlayers,
    message: `Oda başarıyla oluşturuldu! Arkadaşlarınızın katılması için Oda ID: ${roomId}`
  });
});

// Universal static router: seamlessly serves assets whether in public/js/ or flat root (GitHub structure)
app.use((req, res, next) => {
  if (req.path.endsWith('.js') || req.path.endsWith('.css')) {
    const fileName = path.basename(req.path);
    const candidates = [
      path.join(__dirname, 'public', 'js', fileName),
      path.join(__dirname, 'public', fileName),
      path.join(__dirname, 'js', fileName),
      path.join(__dirname, fileName)
    ];
    for (const p of candidates) {
      if (fs.existsSync(p) && fs.statSync(p).isFile()) {
        res.type(req.path.endsWith('.css') ? 'text/css' : 'application/javascript');
        return res.sendFile(p);
      }
    }
  }
  next();
});

const publicDir = fs.existsSync(path.join(__dirname, 'public')) ? path.join(__dirname, 'public') : __dirname;
app.use(express.static(publicDir));
app.use(express.static(__dirname));

// ==========================================
// WEBSOCKET MULTIPLAYER GAME SERVER
// ==========================================

const rooms = new Map();

function getOrCreateRoom(roomId, options = {}) {
  if (!rooms.has(roomId)) {
    rooms.set(roomId, {
      id: roomId,
      name: options.name || 'Custom Match',
      mode: options.mode || 'FFA',
      isPrivate: options.isPrivate || false,
      maxPlayers: options.maxPlayers || 10,
      players: new Map()
    });
  }
  return rooms.get(roomId);
}

getOrCreateRoom('public_ffa', { name: 'Block Arena (FFA)', mode: 'FFA', isPrivate: false });
getOrCreateRoom('public_tdm', { name: 'Block Arena (TDM)', mode: 'TDM', isPrivate: false });
getOrCreateRoom('public_gungame', { name: 'Gun Game', mode: 'Gun Game', isPrivate: false });

let nextPlayerId = 1;

wss.on('connection', (ws) => {
  const playerId = 'player_' + (nextPlayerId++);
  let currentRoomId = 'public_ffa';

  const defaultGuestNames = ['GölgeAvcı', 'Fırtına', 'Bozkurt', 'Şahin', 'Poyraz', 'DemirYumruk', 'Kasırga', 'Yıldırım', 'Akrep', 'Pars'];
  const randomGuestName = defaultGuestNames[Math.floor(Math.random() * defaultGuestNames.length)] + '_' + Math.floor(10 + Math.random() * 90);

  const playerData = {
    id: playerId,
    name: randomGuestName,
    x: 0, y: 0, z: 15,
    rotY: 0, headPitch: 0,
    health: 150, maxHealth: 150,
    score: 0, kills: 0, deaths: 0,
    gun: 'AK-47'
  };

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message.toString());

      if (data.type === 'identify') {
        const uName = (data.username || '').trim();
        if (uName) {
          const oldKey = (ws.username || '').toLowerCase().trim();
          if (oldKey && connectedUserSockets.has(oldKey)) {
            connectedUserSockets.get(oldKey).delete(ws);
          }
          ws.username = uName;
          const uKey = uName.toLowerCase();
          if (!connectedUserSockets.has(uKey)) connectedUserSockets.set(uKey, new Set());
          connectedUserSockets.get(uKey).add(ws);
          userOnlineStatus.set(uKey, {
            inGame: false,
            roomId: null,
            mode: 'Lobby',
            lastActive: Date.now()
          });
        }
      }

      if (data.type === 'lobby_status') {
        const uName = (data.username || ws.username || '').trim();
        if (uName) {
          userOnlineStatus.set(uName.toLowerCase(), {
            inGame: false,
            roomId: null,
            mode: 'Lobby',
            lastActive: Date.now()
          });
        }
      }

      if (data.type === 'invite_friend') {
        const targetUsername = (data.targetUsername || '').trim();
        const tKey = targetUsername.toLowerCase();
        const fromName = ws.username || playerData.name || 'Arkadaşın';
        const myKey = fromName.toLowerCase().trim();
        const inviteRoomId = data.roomId || currentRoomId;
        const inviteMode = data.mode || 'FFA';

        // Check mutual accepted friendship in users database!
        const users = loadUsers();
        const me = users[myKey];
        if (!me || !me.friends || !me.friends.some(f => f.toLowerCase() === tKey)) {
          ws.send(JSON.stringify({
            type: 'invite_sent_status',
            targetUsername,
            success: false,
            message: `❌ "${targetUsername}" henüz arkadaşlık isteğinizi kabul etmedi! Karşı taraf kabul etmeden maça çağıramazsınız.`
          }));
          return;
        }

        if (connectedUserSockets.has(tKey) && connectedUserSockets.get(tKey).size > 0) {
          const inviteMsg = JSON.stringify({
            type: 'match_invitation',
            fromUsername: fromName,
            roomId: inviteRoomId,
            mode: inviteMode
          });

          let sentCount = 0;
          connectedUserSockets.get(tKey).forEach(clientWs => {
            if (clientWs.readyState === WebSocket.OPEN) {
              clientWs.send(inviteMsg);
              sentCount++;
            }
          });

          if (sentCount > 0) {
            ws.send(JSON.stringify({
              type: 'invite_sent_status',
              targetUsername,
              success: true,
              message: `✅ ${targetUsername} oyuncusuna davet iletildi!`
            }));
          } else {
            ws.send(JSON.stringify({
              type: 'invite_sent_status',
              targetUsername,
              success: false,
              message: `❌ ${targetUsername} şu anda çevrimdışı.`
            }));
          }
        } else {
          ws.send(JSON.stringify({
            type: 'invite_sent_status',
            targetUsername,
            success: false,
            message: `❌ ${targetUsername} şu anda oyunda veya aktif değil.`
          }));
        }
      }

      if (data.type === 'join_room') {
        const oldRoom = rooms.get(currentRoomId);
        if (oldRoom) {
          oldRoom.players.delete(playerId);
          broadcastToRoom(currentRoomId, { type: 'player_left', id: playerId }, ws);
        }

        ws.roomId = currentRoomId;
        currentRoomId = data.roomId || 'public_ffa';
        const targetRoom = getOrCreateRoom(currentRoomId, {
          isPrivate: data.isPrivate || false,
          mode: data.mode || 'FFA'
        });
        ws.roomId = currentRoomId;

        if (!targetRoom.hostId) {
          targetRoom.hostId = playerId;
        }

        playerData.name = data.name || playerData.name;
        playerData.team = data.team || (targetRoom.players.size % 2 === 0 ? 'blue' : 'red');
        playerData.isHost = (targetRoom.hostId === playerId);
        if (data.x !== undefined) playerData.x = data.x;
        if (data.y !== undefined) playerData.y = data.y;
        if (data.z !== undefined) playerData.z = data.z;
        if (data.rotY !== undefined) playerData.rotY = data.rotY;
        targetRoom.players.set(playerId, playerData);

        if (playerData.name) {
          ws.username = playerData.name;
          const uKey = playerData.name.toLowerCase().trim();
          if (!connectedUserSockets.has(uKey)) connectedUserSockets.set(uKey, new Set());
          connectedUserSockets.get(uKey).add(ws);
          userOnlineStatus.set(uKey, {
            inGame: true,
            roomId: currentRoomId,
            mode: targetRoom.mode,
            lastActive: Date.now()
          });
        }

        ws.send(JSON.stringify({
          type: 'room_joined',
          id: playerId,
          roomId: currentRoomId,
          isPrivate: targetRoom.isPrivate,
          mode: targetRoom.mode,
          map: targetRoom.map || 'arena',
          duration: targetRoom.duration || 900,
          bots: targetRoom.bots || 'none',
          maxPlayers: targetRoom.maxPlayers || 16,
          hostId: targetRoom.hostId,
          isHost: (targetRoom.hostId === playerId),
          myTeam: playerData.team,
          players: Array.from(targetRoom.players.values())
        }));

        broadcastToRoom(currentRoomId, {
          type: 'player_joined',
          player: playerData,
          hostId: targetRoom.hostId,
          players: Array.from(targetRoom.players.values())
        }, ws);
      }

      if (data.type === 'switch_team') {
        const room = rooms.get(currentRoomId);
        if (room && room.players.has(playerId)) {
          const p = room.players.get(playerId);
          p.team = data.team; // 'blue' or 'red'
          broadcastToRoom(currentRoomId, {
            type: 'team_switched',
            playerId: playerId,
            team: data.team,
            players: Array.from(room.players.values())
          });
        }
      }

      if (data.type === 'room_start_match') {
        const room = rooms.get(currentRoomId);
        if (room) {
          room.status = 'in_game';
          broadcastToRoom(currentRoomId, {
            type: 'match_started',
            roomId: currentRoomId,
            mode: data.mode || room.mode || 'TDM',
            map: data.map || room.map || 'pubg',
            teams: data.teams,
            bots: data.bots
          });
        }
      }

      if (data.type === 'move') {
        playerData.x = data.x;
        playerData.y = data.y;
        playerData.z = data.z;
        playerData.rotY = data.rotY;
        playerData.headPitch = data.headPitch;

        broadcastToRoom(currentRoomId, {
          type: 'player_moved',
          id: playerId,
          x: data.x, y: data.y, z: data.z,
          rotY: data.rotY, headPitch: data.headPitch
        }, ws);
      }

      if (data.type === 'shoot') {
        broadcastToRoom(currentRoomId, {
          type: 'player_shot',
          id: playerId,
          gun: data.gun,
          origin: data.origin,
          direction: data.direction
        }, ws);
      }

      if (data.type === 'player_hit') {
        const attackerName = ws.username || playerData.name || 'Oyuncu';
        broadcastToRoom(currentRoomId, {
          type: 'player_damaged',
          targetId: data.targetId,
          damage: data.damage,
          attackerId: playerId,
          attackerName: attackerName,
          isHeadshot: data.isHeadshot,
          gun: data.gun || 'AK-47'
        });
      }

      if (data.type === 'player_died') {
        const victimName = ws.username || playerData.name || 'Oyuncu';
        broadcastToRoom(currentRoomId, {
          type: 'player_died',
          targetId: playerId,
          victimName: victimName,
          attackerId: data.attackerId,
          attackerName: data.attackerName || 'Düşman',
          isHeadshot: !!data.isHeadshot,
          gun: data.gun || 'AK-47'
        });
      }

      if (data.type === 'player_respawned') {
        playerData.x = data.x;
        playerData.y = data.y;
        playerData.z = data.z;
        broadcastToRoom(currentRoomId, {
          type: 'player_respawned',
          id: playerId,
          x: data.x,
          y: data.y,
          z: data.z
        }, ws);
      }

      if (data.type === 'vehicle_update') {
        broadcastToRoom(currentRoomId, {
          type: 'vehicle_update',
          vehicleIndex: data.vehicleIndex,
          x: data.x, y: data.y, z: data.z,
          angle: data.angle,
          steerAngle: data.steerAngle,
          speed: data.speed,
          driverId: playerId
        }, ws);
      }

      if (data.type === 'vehicle_honk') {
        broadcastToRoom(currentRoomId, {
          type: 'vehicle_honk',
          vehicleIndex: data.vehicleIndex,
          driverId: playerId
        }, ws);
      }

      if (data.type === 'loot_picked') {
        broadcastToRoom(currentRoomId, {
          type: 'loot_picked',
          lootIndex: data.lootIndex,
          pickerId: playerId
        }, ws);
      }

    } catch (err) {}
  });

  ws.on('close', () => {
    if (ws.username) {
      const uKey = ws.username.toLowerCase().trim();
      if (connectedUserSockets.has(uKey)) {
        connectedUserSockets.get(uKey).delete(ws);
        if (connectedUserSockets.get(uKey).size === 0) {
          connectedUserSockets.delete(uKey);
          userOnlineStatus.delete(uKey);
        }
      }
    }

    const room = rooms.get(currentRoomId);
    if (room) {
      room.players.delete(playerId);
      broadcastToRoom(currentRoomId, { type: 'player_left', id: playerId });
      if (room.isPrivate && room.players.size === 0) {
        rooms.delete(currentRoomId);
      }
    }
  });
});

function broadcastToRoom(roomId, messageObj, excludeWs = null) {
  const room = rooms.get(roomId);
  if (!room) return;
  const msgStr = JSON.stringify(messageObj);

  wss.clients.forEach((client) => {
    if (client !== excludeWs && client.readyState === WebSocket.OPEN && client.roomId === roomId) {
      client.send(msgStr);
    }
  });
}

server.listen(PORT, () => {
  console.log(`\n=========================================`);
  console.log(`🎮 Veck.io Online Sunucusu & Backend Hazır!`);
  console.log(`🚀 Tarayıcıdan açın: http://localhost:${PORT}`);
  console.log(`=========================================\n`);
});
