import { FormServerProps } from "@/types/form.types";
import MultipleSelectChip from "./MultiSelect";
import { ErrorMessage } from "@hookform/error-message";
import { ButtonSecondary } from ".";
import CommonHero from "./CommonHero";
import EditableLIst from "./EditableLIst";

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
  isEdit = false,
  defaultValues,
  setValue,
  buttonMessage,
}: FormServerProps & { isEdit?: boolean; defaultValues?: any }) => {
  // console.log("errors", errors);
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
                condition,
                multi = false,
                editableList,
                desc,
                limit,
                required,
                min,
              },
              i
            ) => {
              // const conditions:any = {}
              // if (typeof condition == "boolean" && condition) {
              //   conditions.required = true
              // }
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
                  {options?.map((option: string, i: number) => (
                    <option
                      key={i}
                      value={option}
                      className={` ${commonClass}`}
                    >
                      {option}
                    </option>
                  ))}
                </select>
              );
              const multiSelectEle = (
                <MultipleSelectChip
                  limit={limit}
                  register={register}
                  name={name as any}
                  defaultValue={defaultValues?.[name]}
                  options={options as string[]}
                />
              );
              const inputEle = (
                <input
                  {...register(name as any)}
                  type={type || "text"}
                  className={`${type == "checkbox" && "!w-fit"} ${commonClass}`}
                />
              );
              // console.log("condition", condition, name);
              if (typeof condition == "boolean" && condition == false) {
                return null;
              }
              const isRequired =
                required ||
                (min && min > 0) ||
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
                  {Boolean(editableList)
                    ? editableListEle
                    : Boolean(options)
                    ? multi
                      ? multiSelectEle
                      : selectEle
                    : type == "textarea"
                    ? textareaEle
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
          {buttons}
          <ErrorMessage
            errors={errors}
            name="root"
            render={({ message }) => <p className="error">{message}</p>}
          />
          <ButtonSecondary
            label={buttonMessage || "Update"}
            loading={isSubmitting}
            type="submit"
            form={formId}
          />
        </form>
      </div>
    </>
  );
};

export default FormServer;
