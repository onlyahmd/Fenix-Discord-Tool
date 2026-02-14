const express = require("express");
const fs = require("fs");
const crypto = require("crypto");
const app = express();
app.use(express.json());

// مسار ملف كلمات المرور
const PASSWORD_FILE = "./src/password.json";

// قراءة الملف
function loadPasswords() {
    try {
        return JSON.parse(fs.readFileSync(PASSWORD_FILE, "utf8")).passwords || [];
    } catch {
        return [];
    }
}

// حفظ الملف
function savePasswords(passwords) {
    fs.writeFileSync(PASSWORD_FILE, JSON.stringify({ passwords }, null, 2));
}

// 🔥 1) توليد كلمة مرور استخدام واحد
app.get("/generate", (req, res) => {
    const passwords = loadPasswords();

    const token = crypto.randomBytes(4).toString("hex"); // مثل: a1b9f0d2
    passwords.push(token);

    savePasswords(passwords);

    res.json({
        success: true,
        token
    });
});

// 🔥 2) التحقق من كلمة السر واستهلاكها
app.post("/use", (req, res) => {
    const { token } = req.body;

    if (!token)
        return res.json({ success: false, error: "Missing token" });

    const passwords = loadPasswords();
    const index = passwords.indexOf(token);

    if (index === -1)
        return res.json({ success: false, error: "Invalid or already used token" });

    // حذف كلمة المرور من القائمة
    passwords.splice(index, 1);
    savePasswords(passwords);

    res.json({ success: true, message: "Token is valid and now consumed" });
});

// 🔧 تشغيل السيرفر
const PORT = 3000;
app.listen(PORT, () => console.log("One-time password server running on port " + PORT));