export const commonUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export const urlApi = commonUrl + "/api";
export const urlDb =
  process.env.MONGO_URL || "mongodb://localhost:27017/devclans";
