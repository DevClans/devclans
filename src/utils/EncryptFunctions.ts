import * as crypto from "crypto";

// to generate key openssl rand -hex 32

export const encrypt = (text: string): string => {
  try {
    if (!text) {
      return text;
    }

    // Generate a random IV
    const iv = crypto.randomBytes(16);

    // Create cipher with the generated IV
    const cipher = crypto.createCipheriv(
      "aes-256-cbc",
      Buffer.from(process.env.ENCRYPT_KEY as string, "hex"),
      iv
    );

    // Encrypt the text
    let encrypted = cipher.update(text, "utf8", "base64");
    encrypted += cipher.final("base64");

    // Combine IV and encrypted data
    const combinedData = iv.toString("base64") + ":" + encrypted;

    return combinedData;
  } catch (error) {
    console.log(error, " error in encrypt");
    return text;
  }
};

export const decrypt = (text: string): string => {
  try {
    if (!text) {
      return text;
    }

    // Split the combined data into IV and encrypted data
    const [encodedIV, encryptedData] = text.split(":");

    // Decode the IV from base64
    const iv = Buffer.from(encodedIV, "base64");

    // Create decipher with the extracted IV
    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      Buffer.from(process.env.ENCRYPT_KEY as string, "hex"),
      iv
    );

    // Decrypt the data
    let decrypted = decipher.update(encryptedData, "base64", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
  } catch (error) {
    console.log(error, " error in decrypt");
    return "";
  }
};
