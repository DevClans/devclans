import { ContactDetailsProps, UserProps } from "./mongo/user.types";
import { BooleanStateProps } from "./state.types";

export type ModalConnectProps = Partial<BooleanStateProps> & {
  team: ContactDetailsProps[];
};
