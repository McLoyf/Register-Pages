import fs from "fs";
import bcrypt from "bcrypt";
import crypto from "crypto";

const registerUser = async (username, password) => {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);

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

    users.push({ username, password, hash });

    fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
    console.log(`User ${username} registered successfully.`);
};

registerUser("alex", "test123");

const algorithm = 'aes-256-cbc';
const text = 'Hello World';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

const cipher = crypto.createCipheriv(algorithm, key, iv);
let encrypted = cipher.update(text, 'utf8', 'hex');
encrypted += cipher.final('hex');

const decipher = crypto.createDecipheriv(algorithm, key, iv);
let decrypted = decipher.update(encrypted, 'hex', 'utf8');
decrypted += decipher.final('utf8');


console.log('Decrypted text:', decrypted);
console.log('Original Text: ', text);
console.log('Encrypted Text: ', encrypted);
console.log('Key (hex): ', key.toString('hex'));
console.log('IV (hex): ', iv.toString('hex'));