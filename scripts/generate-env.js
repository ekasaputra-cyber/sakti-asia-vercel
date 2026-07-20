const fs = require("fs");
const path = require("path");

const jsonPath = process.argv[2];

if (!jsonPath) {
    console.error("Kasih path ke file JSON service account.");
    console.error('Contoh: node scripts/generate-env.js "C:\\Users\\kamu\\Downloads\\sakti-website-xxxx.json"');
    process.exit(1);
}

if (!fs.existsSync(jsonPath)) {
    console.error("File tidak ditemukan: " + jsonPath);
    process.exit(1);
}

let credentials;
try {
    const raw = fs.readFileSync(jsonPath, "utf8");
    credentials = JSON.parse(raw);
} catch (err) {
    console.error("Gagal baca/parse file JSON:", err.message);
    process.exit(1);
}

const client_email = credentials.client_email;
const private_key = credentials.private_key;

if (!client_email || !private_key) {
    console.error("File JSON tidak punya field client_email atau private_key.");
    process.exit(1);
}

const escapedKey = private_key.replace(/\n/g, "\\n");

const envPath = path.join(process.cwd(), ".env.local");

let existingContent = "";
if (fs.existsSync(envPath)) {
    existingContent = fs.readFileSync(envPath, "utf8");
}

function upsertEnvVar(content, key, value) {
    const line = key + '="' + value + '"';
    const regex = new RegExp("^" + key + "=.*$", "m");
    if (regex.test(content)) {
        return content.replace(regex, line);
    }
    return content.trim().length > 0 ? content.trim() + "\n" + line + "\n" : line + "\n";
}

let newContent = existingContent;
newContent = upsertEnvVar(newContent, "GOOGLE_SERVICE_ACCOUNT_EMAIL", client_email);
newContent = upsertEnvVar(newContent, "GOOGLE_PRIVATE_KEY", escapedKey);

fs.writeFileSync(envPath, newContent, "utf8");

console.log("BERHASIL: .env.local sudah diupdate");
console.log("Email: " + client_email);
console.log("Restart npm run dev supaya perubahan ke-load.");