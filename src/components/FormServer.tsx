import { FormServerProps } from "@/types/form.types";
import MultipleSelectChip from "./MultiSelect";
import { ErrorMessage } from "@hookform/error-message";
import { ButtonSecondary } from ".";

const FormServer = ({
  zodFormShape,
  heading,
  buttons,
  fieldsArray,
  onSubmit,
  commonClass,
  register,
  formId,
  formState: { isSubmitting, errors },
}: FormServerProps) => {
  return (
    <>
      <div className="w100 container p-6">
        <h1 className="text-[36px]">{heading}</h1>
        <form
          id={formId || "userForm"}
          className="fcfs gap-4 w100"
          // action={`${urlApi}/user/profile`}
          // onSuccess={() => {
          //   alert("onSuccess");
          // }}
          // onError={() => {
          //   alert("onError");
          // }}
          onSubmit={onSubmit}
          // control={control}
        >
          {/* New fields */}
          {fieldsArray.map(
            ({ label, name, options, type, condition, multi = false }, i) => {
              // const conditions:any = {}
              // if (typeof condition == "boolean" && condition) {
              //   conditions.required = true
              // }
              const selectEle = (
                <select
                  className={` ${commonClass}`}
                  {...register(name as any)}
                >
                  {options?.map((option: string, i: number) => (
                    <option
                      key={i}
                      value={option}
                      className={` ${commonClass}`}
                    >
                      {option}
                    </option>
                  ))}
                  )
                </select>
              );
              const multiSelectEle = (
                <MultipleSelectChip
                  register={register}
                  name={name as any}
                  options={options as string[]}
                />
              );
              const inputEle = (
                <input
                  {...register(name as any)}
                  type={type || "text"}
                  className={` ${commonClass}`}
                />
              );
              // console.log("condition", condition, name);
              if (typeof condition == "boolean" && condition == false) {
                return null;
              }
              const isRequired =
                condition ||
                (name.includes(".")
                  ? false
                  : zodFormShape[name as keyof typeof zodFormShape]
                  ? !zodFormShape[
                      name as keyof typeof zodFormShape
                    ].isOptional()
                  : false);
              // console.log(
              //   "isRequired",
              //   isRequired,
              //   name,
              //   zodFormShape[name as keyof typeof zodFormShape]?.isOptional()
              // );

              return (
                <div key={i + "parent"} className={`fcc gap-2 w100`}>
                  {/* <div className=""> */}
                  <label className="w100 text-xs">
                    {isRequired && "*"} {label}
                  </label>
                  {Boolean(options)
                    ? multi
                      ? multiSelectEle
                      : selectEle
                    : inputEle}
                  {/* </div> */}
                  <ErrorMessage
                    errors={errors}
                    name={name}
                    render={({ message }) => <p className="error">{message}</p>}
                  />
                </div>
              );
            }
          )}
          <ErrorMessage
            errors={errors}
            name="root"
            render={({ message }) => <p className="error">{message}</p>}
          />
          <ButtonSecondary
            label={isSubmitting ? "Loading..." : "Update Profile"}
            disabled={isSubmitting}
            type="submit"
            form={formId || "userForm"}
          />
        </form>
        {buttons}
      </div>
    </>
  );
};

export default FormServer;
