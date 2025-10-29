import fs from "fs";
import bcrypt from "bcrypt";

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
