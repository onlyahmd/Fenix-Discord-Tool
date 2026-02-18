const fs = require("fs");
const crypto = require("crypto");

const filePath = "background.js"; // غيّر لملفك
const fileBuffer = fs.readFileSync(filePath);
const hashSum = crypto.createHash("sha256");
hashSum.update(fileBuffer);

const hex = hashSum.digest("hex");
console.log("SHA256 Hash:", hex);