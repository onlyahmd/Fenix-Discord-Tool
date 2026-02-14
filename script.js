(function() {

"use strict"

//══════[ Font Setup ]══════

const styleLink = document.createElement('link')
styleLink.href = "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@500&display=swap"
styleLink.rel = "stylesheet"
document.head.appendChild(styleLink)

const globalStyle = document.createElement('style')
globalStyle.textContent = `*{margin:0;padding:0;font-family:"IBM Plex Sans",sans-serif;box-sizing:border-box;text-decoration:none;font-weight:bold;}`
document.head.appendChild(globalStyle)

//══════[ Toast Container ]══════

const toastContainer = document.createElement("div")
toastContainer.style = "position:fixed;top:80px;left:50%;transform:translateX(-50%);z-index:999999;display:flex;flex-direction:column;align-items:center;pointer-events:none;"
document.body.appendChild(toastContainer)

const toastIcons = {
success:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00FF00" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
error:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF0000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`
}

function showToast(msg, success = true) {
const t = document.createElement("div")
t.innerHTML = `<span style="display:flex;align-items:center;gap:6px;">${success?toastIcons.success:toastIcons.error}<span>${msg}</span></span>`
t.style = "background:#2F3136;color:#FFF;padding:6px 12px;margin:4px 0;border-radius:6px;font-size:13px;font-weight:bold;display:flex;align-items:center;opacity:0;transform:translateY(-6px);transition:all 0.2s ease;"
toastContainer.appendChild(t)
requestAnimationFrame(() => {
t.style.opacity = "1";
t.style.transform = "translateY(0)"; })
setTimeout(() => {
t.style.opacity="0";
t.style.transform="translateY(-8px)";
setTimeout(()=> t.remove(), 2000 )}, 2000 )}

//══════[ Toggle Button (external) ]══════

const toggleBtn = document.createElement("button")
toggleBtn.textContent = "Fenix Discord Tool"
toggleBtn.style = `
position:fixed;
top:15px;
left:50%;
transform:translateX(-50%);
z-index:999999;
padding:8px 16px;
background:#2F3136;
color:#FFF;
font-weight:bold;
border:1px solid #FFF;
border-radius:6px;
cursor:pointer;
user-select:none;
transition: all 0.2s ease;
`;
toggleBtn.onmouseenter = () => toggleBtn.style.filter = "brightness(1.1)";
toggleBtn.onmouseleave = () => toggleBtn.style.filter = "brightness(1)";
document.body.appendChild(toggleBtn)

//══════[ Overlay Panel ]══════

const panel = document.createElement("div")
panel.style = `
position:fixed;
top:50px;
left:50%;
transform:translateX(-50%);
z-index:99999;
display:flex;
flex-direction:column;
align-items:center;
padding:14px 18px;
border-radius:12px;
background:#2F3136;
color:#FFF;
text-align:center;
gap:8px;
min-width:320px;
font-weight:bold;
`;
panel.style.display = "none"; 
document.body.appendChild(panel)

//===== Internal Header inside panel =====

const header = document.createElement("div")
header.textContent = "Fenix Discord Tool"
header.style = `
font-size:15px;
font-weight:bold;
color:#FFF;
margin-bottom:6px;
cursor:pointer;
`;
panel.appendChild(header)

//===== Button container & Wrapper & Footer =====

const btnContainer = document.createElement("div")
btnContainer.style = "display:flex;flex-direction:row;gap:8px;justify-content:center;flex-wrap:nowrap;overflow-x:auto;"
panel.appendChild(btnContainer)

const bottomBtnWrapper = document.createElement("div")
bottomBtnWrapper.style = `
display:flex;
justify-content:center;
width:100%;
margin-top:8px;
gap:6px;
`;
panel.appendChild(bottomBtnWrapper)

const footer = document.createElement("div")
footer.style = "font-size:10px;color:#b9bbbe;margin-top:6px;font-weight:bold;text-align:center;"
footer.innerHTML = `
Developed By <a href="https://onlyahmd.github.io/io" target="_blank" style="color:#FFF;text-decoration:none;font-weight:bold;">@onlyahmd</a> — All rights reserved 2019 ©
`;
panel.appendChild(footer)

//===== SVG Icons =====

const icons = {
tokens:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M6 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>`,
tokenSet:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1v22M1 12h22"/></svg>`,
tokenCopy:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9"/></svg>`,
questRun: `<img src="https://cdn.discordapp.com/emojis/1463601255552385173.png" width="18" height="18" style="object-fit:contain;">`,
login:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00FF00" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/></svg>`,
delete:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF0000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`
}

//===== Buttons Helper =====

function createButton(text, color, iconSVG, onClick) {
const btn = document.createElement("button")
btn.innerHTML = `<span style="display:flex;align-items:center;gap:6px;white-space:nowrap;text-align:center;">${iconSVG}<span>${text}</span></span>`
btn.style = `border:1px solid #FFF;outline:none;cursor:pointer;color:#FFF;background:#2F3136;padding:7px 14px;border-radius:6px;font-size:13px;font-weight:bold;display:flex;align-items:center;justify-content:center;transition:all 0.2s ease;white-space:nowrap;`
btn.onmouseenter = () => {
if (!btn.disabled) btn.style.filter = "brightness(1.1)" }
btn.onmouseleave = () => {
if (!btn.disabled) btn.style.filter = "brightness(1)" }
btn.onmousedown = () => {
if (!btn.disabled) btn.style.transform = "scale(0.97)" }
btn.onmouseup = () => {
if (!btn.disabled) btn.style.transform = "scale(1)" }
if (onClick) btn.onclick = onClick
return btn }





function runner() {
(function() {
'use strict';

// ========================================
// ⚙️ SETTINGS PANEL
// ========================================
/*
هذه الإعدادات تتحكم في سلوك السكريبت:
- VIDEO_INTERVAL_MS: الفترة الزمنية بين تحديث كل مهمة فيديو (ميلي ثانية)
- HEARTBEAT_INTERVAL_MS: الفترة الزمنية بين heartbeat (ميلي ثانية)
- VIDEO_SPEED: مقدار التقدم الثابت لكل خطوة في مهام الفيديو
*/
const SETTINGS = {
VIDEO_INTERVAL_MS: 1000,
HEARTBEAT_INTERVAL_MS: 1000,
VIDEO_SPEED: 10
};

// ========================================
// 1️⃣ UTILITY: Wait for Webpack
// ========================================
function waitForWebpack(callback) {
const checkInterval = 100;
const maxAttempts = 100;
let attempts = 0;

const check = () => {
if (attempts >= maxAttempts) {
console.error('%c[ Discord Extension ] Failed to load webpack after multiple attempts.', 'color:red;font-weight:bold;');
return;
}
if (typeof window.webpackChunkdiscord_app === 'undefined') {
attempts++;
setTimeout(check, checkInterval);
return;
}

try {
const originalJQuery = window.$;
delete window.$;

const webpackRequire = window.webpackChunkdiscord_app.push([[Symbol()], {}, r => r]);
window.webpackChunkdiscord_app.pop();

if (originalJQuery) window.$ = originalJQuery;
if (!webpackRequire || !webpackRequire.c || Object.keys(webpackRequire.c).length < 10) {
attempts++;
setTimeout(check, checkInterval);
return;
}

console.info(`%c[ Discord Extension ] Webpack loaded with ${Object.keys(webpackRequire.c).length} modules.`, 'color:green;font-weight:bold;');
callback(webpackRequire);
} catch (error) {
console.error('%c[ Discord Extension ] Error accessing webpack:', 'color:red;font-weight:bold;', error);
attempts++;
setTimeout(check, checkInterval);
}
};

check();
}

// ========================================
// 2️⃣ UTILITY: Find Module
// ========================================
function findModule(webpackRequire, filter) {
const modules = Object.values(webpackRequire.c);
for (const module of modules) {
if (!module || !module.exports) continue;
if (module.exports.A && filter(module.exports.A)) return module.exports.A;
if (module.exports.Ay && filter(module.exports.Ay)) return module.exports.Ay;
if (filter(module.exports)) return module.exports;
}
return null;
}

// ========================================
// 3️⃣ Send Update to UI
// ========================================
function sendUpdate(type, data) {
window.postMessage({ prefix:'DISCORD_QUEST_COMPLETER', type, data }, '*');
}

// ========================================
// 4️⃣ Load Discord Stores
// ========================================
function loadStores(webpackRequire) {
try {
const ApplicationStreamingStore = findModule(webpackRequire, m => m.__proto__?.getStreamerActiveStreamMetadata);
const RunningGameStore = findModule(webpackRequire, m => m.getRunningGames);
const QuestsStore = findModule(webpackRequire, m => m.__proto__?.getQuest);
const ChannelStore = findModule(webpackRequire, m => m.__proto__?.getAllThreadsForParent);
const GuildChannelStore = findModule(webpackRequire, m => m.getSFWDefaultChannel);
const FluxDispatcher = findModule(webpackRequire, m => m.h?.__proto__?.flushWaitQueue)?.h;
const api = findModule(webpackRequire, m => m.Bo?.get)?.Bo;

if (!ApplicationStreamingStore || !RunningGameStore || !QuestsStore || !ChannelStore || !GuildChannelStore || !FluxDispatcher || !api) {
const missing = [];
if (!ApplicationStreamingStore) missing.push('ApplicationStreamingStore');
if (!RunningGameStore) missing.push('RunningGameStore');
if (!QuestsStore) missing.push('QuestsStore');
if (!ChannelStore) missing.push('ChannelStore');
if (!GuildChannelStore) missing.push('GuildChannelStore');
if (!FluxDispatcher) missing.push('FluxDispatcher');
if (!api) missing.push('api');
throw new Error(`Could not find stores: ${missing.join(',')}`);
}

return { ApplicationStreamingStore, RunningGameStore, QuestsStore, ChannelStore, GuildChannelStore, FluxDispatcher, api };
} catch (error) {
console.error('%c[ Discord Extension ] Error loading stores:', 'color:red;font-weight:bold;', error);
return null;
}
}

// ========================================
// 5️⃣ Get Active Quests
// ========================================
function getActiveQuests(QuestsStore) {
const supportedTasks = ["WATCH_VIDEO","PLAY_ON_DESKTOP","STREAM_ON_DESKTOP","PLAY_ACTIVITY","WATCH_VIDEO_ON_MOBILE"];
return [...QuestsStore.quests.values()].filter(q => {
const isExpired = new Date(q.config.expiresAt).getTime() <= Date.now();
const isCompleted = !!q.userStatus?.completedAt;
const isEnrolled = !!q.userStatus?.enrolledAt;
const taskConfig = q.config.taskConfig ?? q.config.taskConfigV2;
const hasSupportedTask = supportedTasks.some(t => taskConfig.tasks[t] !== null);
return isEnrolled && !isCompleted && !isExpired && hasSupportedTask;
});
}

// ========================================
// 6️⃣ Initialize Quest State
// ========================================
function initializeQuestState(quest) {
const taskConfig = quest.config.taskConfig ?? quest.config.taskConfigV2;
const supportedTasks = ["WATCH_VIDEO","PLAY_ON_DESKTOP","STREAM_ON_DESKTOP","PLAY_ACTIVITY","WATCH_VIDEO_ON_MOBILE"];
const taskType = supportedTasks.find(t => taskConfig.tasks[t] !== undefined && taskConfig.tasks[t] !== null);
const secondsNeeded = taskConfig.tasks[taskType]?.target ?? 0;
const currentProgress = quest.userStatus?.progress?.[taskType]?.value ?? quest.userStatus?.streamProgressSeconds ?? 0;

return {
quest,
taskType,
secondsNeeded,
currentProgress,
completed: currentProgress >= secondsNeeded,
lastUpdate: 0,
enrolledAt: new Date(quest.userStatus.enrolledAt).getTime(),
questName: quest.config.messages.questName
};
}

// ========================================
// 7️⃣ Video Quest Step (تصحيح التقدم الحقيقي)
// ========================================
async function processVideoStep(state, api) {
try {
// إرسال التقدم للسيرفر والحصول على الرد الحقيقي
const res = await api.post({ url:`/quests/${state.quest.id}/video-progress`, body:{ timestamp: Math.min(state.secondsNeeded,state.currentProgress+SETTINGS.VIDEO_SPEED) }});

// تحديث التقدم حسب الرد من السيرفر
state.currentProgress = res.body?.progress?.WATCH_VIDEO?.value ?? state.currentProgress + SETTINGS.VIDEO_SPEED;
if (state.currentProgress >= state.secondsNeeded) state.completed = true;

console.log(`%c[Video Quest] "${state.questName}" Progress: ${Math.floor(state.currentProgress)}/${state.secondsNeeded}s`,"color:green;font-weight:bold;");

// تحديث واجهة المستخدم
sendUpdate('QUEST_UPDATE',{
id: state.quest.id,
name: state.questName,
progress: Math.floor(state.currentProgress),
target: state.secondsNeeded,
completed: state.completed
});

if (state.completed) {
console.log(`%c[Video Quest Completed] "${state.questName}" ✅`,"color:yellow;font-weight:bold;");
}

} catch(error) {
console.error(`%c[Video Quest Error] "${state.questName}"`,"color:red;font-weight:bold;",error);
}
}

// ========================================
// 8️⃣ Heartbeat Quest Step
// ========================================
async function processHeartbeatStep(state, stores) {
const { api, ChannelStore, GuildChannelStore } = stores;
const { quest, taskType, secondsNeeded, questName } = state;

let streamKey = `call:${quest.id}:1`;
if (taskType==="PLAY_ACTIVITY") {
const channelId = getVoiceChannelId(ChannelStore,GuildChannelStore);
if (channelId) streamKey=`call:${channelId}:1`;
else { console.warn(`%c[Heartbeat] No voice channel for "${questName}"`,'color:orange;font-weight:bold;'); return; }
}

try {
// إرسال heartbeat للسيرفر والحصول على التقدم الفعلي
const res = await api.post({url:`/quests/${quest.id}/heartbeat`,body:{stream_key:streamKey,terminal:state.completed}});
const serverProgress = res.body?.progress?.[taskType]?.value ?? state.currentProgress;
state.currentProgress = serverProgress;
if (state.currentProgress>=secondsNeeded) state.completed = true;

console.log(`%c[Heartbeat Quest] "${questName}" Progress: ${Math.floor(state.currentProgress)}/${secondsNeeded}s`,'color:blue;font-weight:bold;');

// تحديث واجهة المستخدم
sendUpdate('QUEST_UPDATE',{
id: state.quest.id,
name: state.questName,
progress: Math.floor(state.currentProgress),
target: secondsNeeded,
completed: state.completed
});

if (state.completed) {
await api.post({url:`/quests/${quest.id}/heartbeat`,body:{stream_key:streamKey,terminal:true}});
console.log(`%c[Heartbeat Quest Completed] "${questName}" ✅`,'color:yellow;font-weight:bold;');

sendUpdate('QUEST_UPDATE',{
id: state.quest.id,
name: state.questName,
progress: secondsNeeded,
target: secondsNeeded,
completed: true
});
}

} catch(error) {
console.error(`%c[Heartbeat Quest Error] "${questName}"`,'color:red;font-weight:bold;',error);
}
}

// ========================================
// 9️⃣ Helper: Get Voice Channel ID
// ========================================
function getVoiceChannelId(ChannelStore,GuildChannelStore) {
const privateChannels = ChannelStore.getSortedPrivateChannels();
if (privateChannels[0]?.id) return privateChannels[0].id;

const guilds = Object.values(GuildChannelStore.getAllGuilds());
const guildWithVoice = guilds.find(g=>g?.VOCAL?.length>0);
if (guildWithVoice) return guildWithVoice.VOCAL[0].channel.id;

return null;
}

// ========================================
// 🔟 Main Quest Runner
// ========================================
async function runQuestCode(webpackRequire) {
const stores = loadStores(webpackRequire);
if (!stores) return;

const activeQuests = getActiveQuests(stores.QuestsStore);
if (!activeQuests.length) return;

const questStates = activeQuests.map(initializeQuestState);

sendUpdate('QUEST_LIST',questStates.map(s=>({
id: s.quest.id,
name: s.questName,
progress: Math.floor(s.currentProgress),
target: s.secondsNeeded,
completed: s.completed
})));

const videoStates = questStates.filter(s=>s.taskType.startsWith("WATCH_VIDEO"));
const heartbeatStates = questStates.filter(s=>!s.taskType.startsWith("WATCH_VIDEO"));

// ===== Video Quests Loop =====
const videoPromise = (async() => {
let running = true;
while(running && videoStates.length>0) {
for(const state of videoStates) if (!state.completed) await processVideoStep(state,stores.api);
if (videoStates.every(s=>s.completed)) running=false;
await new Promise(r=>setTimeout(r,SETTINGS.VIDEO_INTERVAL_MS));
}
})();

// ===== Heartbeat Quests Loop =====
const heartbeatPromise = (async() => {
let running = true;
while(running && heartbeatStates.length>0) {
for(const state of heartbeatStates) if (!state.completed) await processHeartbeatStep(state,stores);
if (heartbeatStates.every(s=>s.completed)) running=false;
await new Promise(r=>setTimeout(r,SETTINGS.HEARTBEAT_INTERVAL_MS));
}
})();

await Promise.all([videoPromise,heartbeatPromise]);
}

// ========================================
// 🚀 START SCRIPT
// ========================================
waitForWebpack(runQuestCode);

})();
}







//===== Tokens Storage =====

const storedTokens = JSON.parse(localStorage.getItem("discordToolTokens") || "[]")
function saveTokens() { localStorage.setItem("discordToolTokens",JSON.stringify(storedTokens))}

//===== Token List =====

let tokenListContainer = null
function createTokenList() {
if (storedTokens.length === 0 ) {
showToast("No tokens available!",false)
return }
if (tokenListContainer) {
tokenListContainer.remove()
tokenListContainer = null;
return }
tokenListContainer = document.createElement("div")
tokenListContainer.style = "display:flex;flex-direction:column;gap:4px;max-height:150px;overflow-y:auto;width:100%;background:#2F3136;padding:4px 6px;border-radius:6px;border:1px solid #FFF;"

storedTokens.forEach((tokenObj, idx) => {
let item = document.createElement("div")
item.style = "display:flex;align-items:center;justify-content:space-between;padding:4px 6px;background:#202225;border-radius:6px;gap:16px;"

let avatar = document.createElement("img")
avatar.src = tokenObj.avatar || "https://cdn.discordapp.com/embed/avatars/0.png"
avatar.style = "width:28px;height:28px;border-radius:50%;flex-shrink:0;"

let username = document.createElement("span")
username.textContent = (tokenObj.username || "Unknown").split("#")[0]
username.style = "flex:1;font-size:13px;color:#FFF;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-left:6px;font-weight:bold;display:block;"

let btnLogin = document.createElement("button")
btnLogin.innerHTML = icons.login
btnLogin.style = "border:none;background:none;cursor:pointer;"
btnLogin.title = "Login"
btnLogin.onclick = () => {
try {
const iframe = document.createElement("iframe")
document.body.appendChild(iframe)
iframe.contentWindow.localStorage.token = `"${tokenObj.token}"`
showToast(`Logged in as ${tokenObj.username}`, true)
setTimeout(() => location.reload(), 1000)
} catch {
showToast("Failed to login", false)}}

let btnCopy = document.createElement("button")
btnCopy.innerHTML = icons.tokenCopy
btnCopy.style = "border:none;background:none;cursor:pointer;"
btnCopy.title = "Copy Token"
btnCopy.onclick = () => {
navigator.clipboard.writeText(tokenObj.token)
.then(() => showToast(`Copied ${tokenObj.username}'s token`, true))
.catch(() => showToast("Failed to copy token", false))}

let btnDelete = document.createElement("button")
btnDelete.innerHTML = icons.delete
btnDelete.style = "border:none;background:none;cursor:pointer;"
btnDelete.title = "Delete"
btnDelete.onclick =() => {
storedTokens.splice(idx, 1)
saveTokens()
tokenListContainer.remove()
tokenListContainer = null
createTokenList()
showToast(`Deleted ${tokenObj.username}`, true)}

item.appendChild(avatar)
item.appendChild(username)
item.appendChild(btnLogin)
item.appendChild(btnCopy)
item.appendChild(btnDelete)
tokenListContainer.appendChild(item)})
panel.appendChild(tokenListContainer)}

//===== Buttons inside panel =====

btnContainer.appendChild(createButton("Tokens", "#2F3136", icons.tokens, () => { createTokenList()}))
btnContainer.appendChild(createButton("Add Token", "#2F3136", icons.tokenSet, () => {
const token = prompt("Enter Your Discord Token :")
if (token) {
try {
const iframe = document.createElement("iframe")
document.body.appendChild(iframe)
iframe.contentWindow.localStorage.token = `"${token}"`
fetch("https://discord.com/api/v9/users/@me",{ headers: { Authorization: token }})
.then(res => res.json())
.then(data => {
storedTokens.push({
token: token,
username: `${data.username}#${data.discriminator}`,
avatar: data.avatar?`https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png` : null })
saveTokens()
showToast("Token added successfully", true)})
.catch(() => showToast("Failed to fetch user info", false))
} catch {
showToast("Failed to add token", false)}
} else showToast("No token entered", false)}))

btnContainer.appendChild(createButton("Copy Token", "#2F3136", icons.tokenCopy, () => {
try {
const iframe = document.createElement('iframe')
document.body.appendChild(iframe)
let token = iframe.contentWindow.localStorage.token || ''
token = token.replace(/^"|"$/g,'')
if (!token) {
showToast("No token to copy", false)
return }
navigator.clipboard.writeText(token)
.then(() => showToast("Token copied", true))
.catch(() => showToast("Failed to copy token", false))
} catch {
showToast("Failed to copy token", false)}}))

//===== Run Quest Button =====
/*
const runQuestBtn = createButton("Run Quest", "#2F3136", icons.questRun, () => {
chrome.runtime.sendMessage({ action:'executeQuestCode' }, (response) => {
if (chrome.runtime.lastError) {
console.error('Error :', chrome.runtime.lastError)
showToast("Failed to run quest", false)}
else if (response&&response.success) {
showToast("Quest executed", true)}
else showToast("Failed to run quest", false)})})

btnContainer.appendChild(runQuestBtn)
*/
async function validatePassword(token) {
    try {
        const response = await fetch("https://curly-space-journey-pj6r6qpjgvqrc6g5p-3000.app.github.dev/use", { // غير الرابط لو السيرفر بعيد
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token })
        });
        const data = await response.json();
        return data.success; // true إذا كلمة المرور صالحة وتم استهلاكها
    } catch (err) {
        console.error("Error validating token:", err);
        return false;
    }
}

const runQuestBtn = createButton("Run Quest", "#2F3136", icons.questRun, () => {
    const passBox = document.createElement("div");
    passBox.style = `
        background:#202225;
        border:1px solid #FFF;
        padding:12px;
        border-radius:8px;
        display:flex;
        flex-direction:column;
        gap:8px;
        width:100%;
    `;
    passBox.innerHTML = `
        <div style="font-size:13px;color:#FFF;">Enter Access Key</div>
        <input type="password" id="quest-pass-input" style="
            width:100%;padding:6px;border-radius:6px;border:1px solid #444;
            background:#111;color:#FFF;outline:none;font-size:13px;
        ">
        <button id="quest-pass-btn" style="
            padding:6px;border-radius:6px;border:1px solid #FFF;
            background:#2F3136;color:#FFF;cursor:pointer;font-size:13px;
        ">Unlock</button>
    `;
    panel.appendChild(passBox);

    document.getElementById("quest-pass-btn").onclick = async () => {
        const input = document.getElementById("quest-pass-input").value.trim();
        if (!input) return showToast("Please enter a password", false);

        const valid = await validatePassword(input);
        if (valid) {
            showToast("Access Granted", true);
            passBox.remove();
            runner(); // ← يشغّل سكريبتك الحقيقي
        } else {
            showToast("Invalid or already used password", false);
        }
    };
});
btnContainer.appendChild(runQuestBtn);
//===== New Quest List Expand Button (زر السهم الجديد) =====

let questListExpanded = false;
let questListPanel = null;

const expandQuestBtn = createButton(
"",
"#2F3136",
'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>',
() => {
if (!questListPanel) {
questListPanel = document.createElement("div")
questListPanel.style = `
display:flex;
flex-direction:column;
gap:4px;
max-height:150px;
overflow-y:auto;
width:100%;
background:#2F3136;
padding:4px 6px;
border-radius:6px;
border:1px solid #FFF;
`;
panel.appendChild(questListPanel)}

questListExpanded = !questListExpanded;
questListPanel.style.display = questListExpanded ? "flex" : "none";

const svg = expandQuestBtn.querySelector("svg")
if (svg) svg.style.transform = questListExpanded ? "rotate(180deg)" : "rotate(0deg)";
if (svg) svg.style.transition = "transform 0.2s ease";
})

// --- أهم تعديل: إزالة gap للنص ---

expandQuestBtn.innerHTML = expandQuestBtn.innerHTML.replace(/<span>\s*<\/span>/, '')
expandQuestBtn.style.justifyContent = "center"; // يجعل الأيقونة في منتصف الزر تمامًا

btnContainer.appendChild(expandQuestBtn)


//===== HypeSquad Button داخل الـ wrapper =====

const hypeSquadBtn1 = createButton(
"",
"#2F3136",
'<img src="https://cdn.discordapp.com/emojis/1332346706431316039.png" width="18" height="18" style="object-fit:contain;">',
() => {
try {
fetch("https://discord.com/api/v9/hypesquad/online", {
method: "POST",
headers: {
"Authorization": document.body.appendChild(document.createElement('iframe')).contentWindow.localStorage.token.replace(/^"|"$/g,''),
"Content-Type": "application/json"
},
body: JSON.stringify({ house_id: 1 })
})
.then(res => res.json())
.then(() => showToast("HypeSquad Bravery Activated", true))
.catch(() => showToast("Failed to activate HypeSquad", false))
} catch {
showToast("Error occurred", false)}})
hypeSquadBtn1.innerHTML = hypeSquadBtn1.innerHTML.replace(/<span>\s*<\/span>/, '')
hypeSquadBtn1.style.justifyContent = "center";
bottomBtnWrapper.appendChild(hypeSquadBtn1)

const hypeSquadBtn2 = createButton(
"",
"#2F3136",
'<img src="https://cdn.discordapp.com/emojis/1332346710067904593.png" width="18" height="18" style="object-fit:contain;">',
() => {
try {
fetch("https://discord.com/api/v9/hypesquad/online", {
method: "POST",
headers: {
"Authorization": document.body.appendChild(document.createElement('iframe')).contentWindow.localStorage.token.replace(/^"|"$/g,''),
"Content-Type": "application/json"
},
body: JSON.stringify({ house_id: 2 })
})
.then(() => showToast("HypeSquad Brilliance Activated", true))
.catch(() => showToast("Failed to activate HypeSquad", false))
} catch {
showToast("Error occurred", false)}})
hypeSquadBtn2.innerHTML = hypeSquadBtn2.innerHTML.replace(/<span>\s*<\/span>/, '')
hypeSquadBtn2.style.justifyContent = "center";
bottomBtnWrapper.appendChild(hypeSquadBtn2)

const hypeSquadBtn3 = createButton(
"",
"#2F3136",
'<img src="https://cdn.discordapp.com/emojis/1332346724450304021.png" width="18" height="18" style="object-fit:contain;">',
() => {
try {
fetch("https://discord.com/api/v9/hypesquad/online", {
method: "POST",
headers: {
"Authorization": document.body.appendChild(document.createElement('iframe')).contentWindow.localStorage.token.replace(/^"|"$/g,''),
"Content-Type": "application/json"
},
body: JSON.stringify({ house_id: 3 })
})
.then(() => showToast("HypeSquad Balance Activated", true))
.catch(() => showToast("Failed to activate HypeSquad", false))
} catch {
showToast("Error occurred", false)}})
hypeSquadBtn3.innerHTML = hypeSquadBtn3.innerHTML.replace(/<span>\s*<\/span>/, '')
hypeSquadBtn3.style.justifyContent = "center";
bottomBtnWrapper.appendChild(hypeSquadBtn3)

const hypeSquadBtn0 = createButton(
"",
"#2F3136",
`<svg width="18" height="18" viewBox="0 0 24 24" fill="none"stroke="#FFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>`,
() => {
try {
fetch("https://discord.com/api/v9/hypesquad/online", {
method: "DELETE",
headers: {
"Authorization": document.body.appendChild(document.createElement('iframe')).contentWindow.localStorage.token.replace(/^"|"$/g,''),
"Content-Type": "application/json"
}
})
.then(() => showToast("HypeSquad Removed", true))
.catch(() => showToast("Failed to remove HypeSquad", false))
} catch {
showToast("Error occurred", false)}})
hypeSquadBtn0.innerHTML = hypeSquadBtn0.innerHTML.replace(/<span>\s*<\/span>/, '')
hypeSquadBtn0.style.justifyContent = "center";
bottomBtnWrapper.appendChild(hypeSquadBtn0)

//===== Quest Cache & UI =====

const questStateCache = new Map()

function updateQuestItemUI(container, quest) {

if (!container) return;

let item = document.getElementById(`quest-item-${quest.id}`)

if (!item) {

item = document.createElement("div")
item.id = `quest-item-${quest.id}`;
item.style = `
display:flex;
align-items:center;
justify-content:space-between;
padding:4px 6px;
background:#202225;
border-radius:6px;
gap:8px;
font-size:13px;
`;
item.innerHTML = `
<span style="flex:1;font-size:13px;color:#FFF;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${quest.name}">${quest.name}</span>
<span id="quest-progress-${quest.id}" style="font-family:monospace;color:#aaa;font-size:12px;"></span>
`;
container.appendChild(item)
}
const progressSpan = item.querySelector(`#quest-progress-${quest.id}`)
if (progressSpan) {
progressSpan.textContent = quest.completed ? 'DONE' : `${quest.progress}/${quest.target}`;
progressSpan.style.color = quest.completed ? '#00FF00' : '#FFF';
item.style.opacity = quest.completed ? '0.5' : '1';
}
}

//===== Listen for Quest Messages =====

window.addEventListener("message", ({source,data}) => {
if (source !== window || !data || data.prefix !== 'DISCORD_QUEST_COMPLETER') return;
if (data.type === 'QUEST_LIST') {
questStateCache.clear()
data.data.forEach(q => questStateCache.set(q.id,q))
if (questListPanel) {
questListPanel.innerHTML = '';
data.data.forEach(q => updateQuestItemUI(questListPanel, q))}
} else if (data.type === 'QUEST_UPDATE') {
questStateCache.set(data.data.id,data.data)
if (questListPanel) updateQuestItemUI(questListPanel, data.data)}})

//===== Show panel when toggleBtn is clicked =====

toggleBtn.onclick = () => {
toggleBtn.style.display = "none"; 
panel.style.display = "flex"; 
}

//===== Close panel when clicking internal header =====

header.onclick = () => {
panel.style.display = "none";
toggleBtn.style.display = "block"; 
}

})();