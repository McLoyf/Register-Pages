import fs from "fs";
import bcrypt from "bcrypt";
import crypto from "crypto";

const username = "alex";
const password = "password123";

// AES-256 Encryption for PII
const algorithm = 'aes-256-cbc';
const inputText = 'Hello World';

const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

const hexKey = key.toString('hex');
const hexIv = iv.toString('hex');

// Encrypt PII
const cipher = crypto.createCipheriv(algorithm, key, iv);
let encrypted = cipher.update(username, 'utf8', 'hex');
encrypted += cipher.final('hex');

// Decrypt PII
const decipher = crypto.createDecipheriv(algorithm, key, iv);
let decrypted = decipher.update(encrypted, 'hex', 'utf8');
decrypted += decipher.final('utf8');


const registerUser = async (username, password) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    let users = [];
    if (fs.existsSync("users.json")) {
    try {
      const data = fs.readFileSync("users.json", "utf-8");
      users = JSON.parse(data);
    } catch (err) {
      console.error("Invalid or corrupted JSON file. Resetting...");
      users = [];
    }
  }

    users.push({ encrypted, hashedPassword, hexKey, hexIv });

    fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
    console.log(`User ${username} registered successfully.`);
};

registerUser(username, "test123");