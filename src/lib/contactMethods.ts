export const contactMethods = [
  "discord",
  "email",
  "whatsapp",
  "telegram",
  "twitter",
];

export const contactMethodsMap = {
  discord: (username: string) => `https://discord.com/users/${username}`,
  email: "Email", // using api
  whatsapp: (username: string, text: string) =>
    `https://wa.me/${username}?text=${text}`,
  telegram: (username: string, text: string) =>
    `https://t.me/${username}?text=${text}`,
  twitter: (username: string, text: string) =>
    `https://twitter.com/messages/compose?recipient_id=${username}&text=${text}`,
};
