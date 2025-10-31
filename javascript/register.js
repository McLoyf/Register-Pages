import fs from "fs";
import bcrypt from "bcrypt";
import crypto from "crypto";

// AES-256 Encryption for PII 
function encryptPII(text) {
  const algorithm = "aes-256-cbc";
  const key = crypto.randomBytes(32);
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  return {
    encrypted,
    key: key.toString("hex"),
    iv: iv.toString("hex"),
  };
}

// Main function to register a user
export async function registerUser(userData) {
  // Encrypt personally identifiable information (PII)
  const encryptedFirstName = encryptPII(userData.firstName);
  const encryptedLastName = encryptPII(userData.lastName);
  const encryptedEmail = encryptPII(userData.email);

  // Hash password (one-way, irreversible)
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

  // Build user object
  const newUser = {
    username: userData.username,
    password: hashedPassword,
    pii: {
      firstName: encryptedFirstName.encrypted,
      lastName: encryptedLastName.encrypted,
      email: encryptedEmail.encrypted,
    },
    piiKeys: {
      firstName: encryptedFirstName.key,
      lastName: encryptedLastName.key,
      email: encryptedEmail.key,
    },
    piiIVs: {
      firstName: encryptedFirstName.iv,
      lastName: encryptedLastName.iv,
      email: encryptedEmail.iv,
    },
  };

  const filePath = "./users.json";

  // Read existing users
  let users = [];
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, "utf8");
    if (data.trim()) users = JSON.parse(data);
  }

  // prevent duplicate usernames
  if (users.some((u) => u.username === newUser.username)) {
    console.log(`Username "${newUser.username}" already exists.`);
    return;
  }

  // Save to file
  users.push(newUser);
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
  console.log(`User "${newUser.username}" registered successfully.`);
}

// Run a quick test when executed directly
if (process.argv[1].includes("register.js")) {
  const testUser = {
    firstName: "Alex",
    lastName: "Ortiz",
    email: "alex@example.com",
    username: "alex",
    password: "test123",
  };

  registerUser(testUser);
}

