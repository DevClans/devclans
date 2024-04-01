export type InputFieldProps = {
  name: string;
  label: string | React.ReactNode;
  type?: string;
  desc?: string;
  options?: string[];
  condition?: boolean;
  multi?: boolean;
  editableList?: any; // preview only available for toogle list
  limit?: number;
  required?: boolean;
  min?: number;
  preText?: string;
  readOnly?: boolean;
  accept?: string;
};
export type FormClientProps = {
  zodSchema: any;
  type: "user" | "project";
};
export type FormServerProps = {
  buttonMessage?: string;
  formId?: string;
  zodFormShape: any;
  commonClass?: string;
  register: any;
  buttons?: React.ReactNode;
  fieldsArray: InputFieldProps[];
  onSubmit: any;
  formState: {
    isSubmitted: boolean;
    errors: any;
    isSubmitting: boolean;
  };
  heading: string;
  setValue: any;
};
