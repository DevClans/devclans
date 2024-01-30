export type InputFieldProps = {
  name: string;
  label: string;
  type?: string;
  options?: string[];
  condition?: boolean;
  multi?: boolean;
};
export type FormClientProps = {
  zodSchema: any;
  type: "user" | "project";
};
export type FormServerProps = {
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
};
