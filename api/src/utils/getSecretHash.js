import crypto from "crypto"
require('dotenv').config()

export async function getSecretHash(username) {
  return crypto
    .createHmac("SHA256", process.env.AWS_COGNITO_KEY_SECRET_CLIENT)
    .update(username + process.env.AWS_COGNITO_CLIENT_ID)
    .digest("base64");
}