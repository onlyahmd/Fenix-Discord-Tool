//══════[ Integrity Check ]══════
/*
هذا الجزء يتحقق إذا الكود الأصلي تم تعديله أو التلاعب به بعد نشره.
يأخذ كل النص الموجود في السكربت.
يحسب SHA-256 hash للكود.
يقارن الهَاش مع الهَاش الأصلي اللي انت تحدده.
لو مختلف → يعني حد عبث بالكود، فيظهر تنبيه والكود يتوقف.
*/
const ORIGINAL_HASH = "ضع هنا SHA256 النهائي بعد Obfuscation";
(async function verifyIntegrity() {
    const scriptText = document.currentScript.textContent;
    const encoder = new TextEncoder();
    const data = encoder.encode(scriptText);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashHex = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2,'0')).join('');
    if(hashHex !== ORIGINAL_HASH) {
        alert("تم التلاعب بالكود!");
        throw new Error("Code modified");
    }
})();

//══════[ Anti-Debug / Self-Defending ]══════

// هذا الجزء يراقب إذا حد فتح DevTool أو حاول يوقف الكود بال debugger

(function antiDebug() {
    const threshold = 160;
    function detectDevTools() {
        if(window.outerWidth - window.innerWidth > threshold || window.outerHeight - window.innerHeight > threshold){
            alert("Debugging detected!");
            throw new Error("Debugging detected");
        }
    }
    setInterval(detectDevTools, 1000);
})();


//══════[ Anti-Tamper Variables & Functions ]══════
/*يحمي المتغيرات والدوال المهمة من التغيير.
مثال: storedTokens أو showToast.
لو أحد حاول تعديلهم → غير ممكن بسبب writable:false و configurable:false.
*/
Object.defineProperty(window, "storedTokens", {configurable:false, writable:false});
const protectedFunctions = ["createButton", "showToast", "requestAccessKey"];
protectedFunctions.forEach(fnName => {
    const fn = window[fnName];
    if(fn) Object.defineProperty(window, fnName, {configurable:false, writable:false});
});


//══════[ Anti-Tamper Runtime ]══════
/*
يراقب أي محاولة لتغيير البيانات الأساسية أثناء تشغيل الكود، مثل localStorage.
لو حد حذف أو غيّر البيانات → يظهر تحذير والكود يتوقف.
*/
setInterval(() => {
    if(window.localStorage.getItem("discordToolTokens") === null){
        alert("Tampering detected with tokens!");
        throw new Error("Tampering detected");
    }
}, 1000);
