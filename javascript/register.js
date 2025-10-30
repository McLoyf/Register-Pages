import fs from "fs";
import bcrypt from "bcrypt";
import crypto from "crypto";

// AES-256 Encryption for PII

function encryptData(data) {
  const algorithm = 'aes-256-cbc';

  const key = crypto.randomBytes(32);
  const iv = crypto.randomBytes(16);

  const hexKey = key.toString('hex');
  const hexIv = iv.toString('hex');

  // Encrypt PII
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return {
    encrypted,
    key: key.toString('hex'),
    iv: iv.toString('hex'),
  }
}

// Decrypt PII
const decipher = crypto.createDecipheriv(algorithm, key, iv);
let decrypted = decipher.update(encrypted, 'hex', 'utf8');
decrypted += decipher.final('utf8');


// Function to save user
export function registerUser(userData) {
  const encryptedData = encryptPassword(userData.password);

  const newUser = {
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    username: userData.username,
    password: encryptedData.encrypted,
    key: encryptedData.key,
    iv: encryptedData.iv,
  };

  const filePath = "./users.json";

  // Read existing data if it exists
  let users = [];
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, "utf8");
    if (data.trim()) users = JSON.parse(data);
  }

  users.push(newUser);
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
  console.log("User registered:", newUser.username);
}