import { UserFormProps } from "@/types/mongo/user.types";

const selectUserContactId = (data: UserFormProps) => {
  // set contact id
  let contactId = "";
  if (data.contactMethod === "email") {
    contactId = data.email as string;
  }
  if (data.contactMethod === "whatsapp") {
    contactId = data.phone as string;
  }
  if (data.contactMethod === "telegram") {
    contactId = data.socials.telegram as string;
  }
  if (data.contactMethod === "twitter") {
    contactId = data.socials.twitter as string;
  }
  if (contactId) {
    return contactId;
  }
  // this will result in default i.e, discord
  return "";
};

export default selectUserContactId;
