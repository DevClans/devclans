import { FormServerProps } from "@/types/form.types";
import { ErrorMessage } from "@hookform/error-message";
import { ButtonSecondary } from ".";
import CommonHero from "./CommonHero";
import EditableLIst from "./EditableLIst";
import Autocomplete from "./Autocomplete";

const FormServer = ({
  zodFormShape,
  heading,
  buttons,
  fieldsArray,
  onSubmit,
  commonClass,
  register,
  formId = "userForm",
  formState: { isSubmitting, errors },
  isNew = false,
  defaultValues,
  setValue,
  buttonMessage,
}: FormServerProps & { isNew?: boolean; defaultValues?: any }) => {
  // console.log("errors", errors);
  const isUser = formId == "userForm";
  return (
    <>
      <CommonHero heading={heading} />
      <div className="w100 container p-6 pt-15">
        <form
          id={formId}
          className={`fcfs ${buttons ? "gap-6" : "gap-[50px]"}  w100`}
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
            (
              {
                label,
                name,
                options,
                type,
                multi = false,
                editableList,
                desc,
                limit,
                required,
                min,
                preText,
              },
              i
            ) => {
              const splitName = name.split(".");
              const defaultValue =
                splitName.length == 2
                  ? defaultValues[splitName[0]]?.[splitName[1]]
                  : defaultValues[name];
              // console.log("defaultValue", defaultValue);
              const editableListEle = (
                <EditableLIst
                  limit={limit}
                  setValue={setValue}
                  defaultValues={defaultValues}
                  name={name}
                  editableList={editableList || []}
                />
              );
              const textareaEle = (
                <textarea
                  className={` ${commonClass}`}
                  {...register(name as any)}
                ></textarea>
              );
              const selectEle = (
                <select
                  className={` ${commonClass}`}
                  {...register(name as any)}
                  defaultValue={""}
                >
                  {Array.isArray(options) && options.length > 0 ? (
                    options.map((option: string, i: number) => (
                      <option
                        key={i}
                        value={option}
                        className={` ${commonClass}`}
                      >
                        {option || "Select"}
                      </option>
                    ))
                  ) : (
                    <option value="" className={` ${commonClass}`}>
                      No Values Found
                    </option>
                  )}
                </select>
              );
              const multiSelectEle = (
                <Autocomplete
                  className=" !p-3"
                  limit={limit}
                  options={options as string[]}
                  label={label}
                  name={name}
                  setValue={setValue}
                  defaultValue={defaultValue}
                />
                // <MultipleSelectChip
                //   limit={limit}
                //   register={register}
                //   name={name as any}
                //   defaultValue={defaultValue}
                //   options={options as string[]}
                // />
              );
              const inputEle = (
                <input
                  {...register(name as any)}
                  type={type || "text"}
                  className={`${type == "checkbox" && "!w-fit"} ${commonClass}`}
                />
              );
              if (typeof required == "boolean" && required == false) {
                return null;
              }
              const isRequired =
                required ||
                (min && min > 0) ||
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
                <div key={i + "parent"} className={`fcfs gap-2 w100`}>
                  {/* <div className=""> */}
                  <div className="fcfs gap-1">
                    <h3 className="w100 text-xl  text-highlight ">
                      {isRequired && "*"} {label}
                    </h3>
                    {desc && (
                      <p>
                        {desc} {min ? "(min " + min + ")" : ""}{" "}
                        {limit ? "(max " + limit + ")" : ""}
                      </p>
                    )}
                  </div>
                  <div className="w100 frc gap-2">
                    <p className="text-subH ">{preText}</p>
                    {Boolean(editableList)
                      ? editableListEle
                      : Boolean(options)
                      ? multi
                        ? multiSelectEle
                        : selectEle
                      : type == "textarea"
                      ? textareaEle
                      : inputEle}
                  </div>
                  {/* </div> */}
                  <ErrorMessage
                    errors={errors}
                    name={name}
                    render={(val) => {
                      // console.log("val", val);
                      return (
                        <p className="error">
                          {val.message ||
                            val.messages?.toString() ||
                            errors[name]?.[0]?.message ||
                            "Error in this field"}
                        </p>
                      );
                    }}
                  />
                </div>
              );
            }
          )}
          {buttons}
          <ErrorMessage
            errors={errors}
            name="root"
            render={({ message }) => <p className="error">{message}</p>}
          />
          <div className="w100 fcfs gap-1">
            {isNew && (
              <p className="w100 text-xs">
                **Note: New {isUser ? "user" : "project"} can take upto{" "}
                <b>3hrs</b> to be available on{" "}
                <b>{isUser ? "Find Friends" : "Find Projects"} </b>page.
              </p>
            )}
            <ButtonSecondary
              label={buttonMessage || "Update"}
              loading={isSubmitting}
              type="submit"
              form={formId}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default FormServer;
