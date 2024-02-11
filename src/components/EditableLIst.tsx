"use client";
import { useEffect, useMemo, useState } from "react";
import { ButtonSecondary, ToggleListItem } from ".";
import ButtonClose from "./buttons/ButtonClose";
import { ButtonProps } from "@/types";

type listProps = {
  title: string;
  desc: string;
  solution?: string;
  needHelp?: boolean;
};
// preview only available for toogle list
const EditableLIst = ({
  setValue,
  editableList,
  name,
  defaultValues,
  limit,
}: {
  setValue: any;
  isEdit?: boolean;
  name: string;
  defaultValues?: any;
  editableList: any;
  limit?: number;
}) => {
  const thirdLabel = () => {
    if (editableList.solution) {
      return "Solution";
    }
    if (editableList.needHelp) {
      return "Need Help: You Want External Contributors?";
    }
    return "";
  };
  const thirdLabelVal = thirdLabel();
  const type: "challenges" | "futureGoals" =
    (name.split(".")[1] as any) || "challenges";
  const defaultData = defaultValues?.[name?.split(".")?.[0] || ""]?.[type];
  const getDefaultList = () => {
    if (!defaultData || !Array.isArray(defaultData)) return {};
    const defaultList: Record<string, listProps> = {};
    for (const item of defaultData) {
      defaultList[item.title] = item;
    }
    return defaultList;
  };
  const defaultList = useMemo(getDefaultList, [defaultData]);
  const [list, setList] = useState<Record<string, listProps>>(
    defaultList || {}
  );
  const [input, setInput] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [solution, setSolution] = useState<string | boolean>("");

  const handleAdd = () => {
    if (input.length > 0 && limit ? Object.keys(list).length < limit : true) {
      const data: listProps = {
        title: input,
        desc: desc,
      };
      if (type == "challenges") {
        data.solution = solution as string;
      }
      if (type == "futureGoals") {
        data.needHelp = Boolean(solution);
      }
      setList((prev) => ({
        ...prev,
        [input]: data,
      }));
      setSolution("");
      setInput("");
      setDesc("");
    }
  };
  const handleRemove = (item: string) => {
    setList((prev) => {
      const newList = { ...prev };
      delete newList[item];
      return newList;
    });
  };
  useEffect(() => {
    if (name && list && setValue) {
      setValue(name, Object.values(list));
    }
  }, [list, name, setValue]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  const handleDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDesc(e.target.value);
  };
  const handleSolutionChange = (e: any) => {
    setSolution(e.target.value);
  };

  return (
    <div className="w100 fcfs">
      <div className="flex lg:flex-row flex-col lg:justify-between lg:items-start flex-wrap md:flex-nowrap gap-4 w100">
        <div className="fcfs gap-2 w100">
          <label>Title</label>
          <input
            type="text"
            className="w100"
            value={input}
            onChange={handleInputChange}
          />
          <label>Description</label>
          <textarea className="w100" value={desc} onChange={handleDescChange} />
          {thirdLabelVal && (
            <>
              <label>{thirdLabelVal}</label>
              {thirdLabelVal == "Solution" ? (
                <textarea
                  className="w100 scrollbar-x"
                  value={solution as string}
                  onChange={handleSolutionChange}
                />
              ) : type == "futureGoals" ? (
                <input
                  type="checkbox"
                  checked={Boolean(solution)}
                  onChange={handleSolutionChange}
                />
              ) : null}
            </>
          )}
          <ButtonSecondary
            className="!w-fit px-2 mb-2"
            label="Add"
            type="button"
            onClick={handleAdd}
          />
        </div>
        <div className="fcfs gap-2 w100">
          <p>Preview: This is how the details will look to viewers</p>
          <ToggleListItem
            open={true}
            className=" lg:max-w-[50vw]"
            heading={input}
            data={[
              {
                title: "Description",
                desc: desc,
              },
              {
                title: thirdLabelVal?.split(":")[0] || "",
                desc: solution as string,
              },
            ]}
          />
        </div>
      </div>
      <div className="w100 cardCommon p-5 mt-2">
        <h4 className="text-subH">Items added to {type}</h4>
        <ol className="w100" type="1">
          {typeof list == "object" &&
            Object.keys(list).map((item, i) => (
              <ListItem
                item={list[item].title as string}
                desc={list[item].desc as string}
                solution={
                  list[item].solution || String(list[item].needHelp) || ""
                }
                i={i}
                key={i}
                onClick={() => handleRemove(item)}
                className="relative"
              />
            ))}
        </ol>
      </div>
    </div>
  );
};

export default EditableLIst;
const ListItem = ({
  item,
  i,
  desc,
  solution,
  ...buttonProps
}: {
  item: string;
  i: number;
  desc: string;
  solution: string;
} & Partial<ButtonProps>) => {
  return (
    <li className="frcsb p-[2px]">
      <div className="frc w100">
        <p className="mr-1">{i + 1}. </p>
        <p>
          {item}
          {`, `}
        </p>
        {desc && (
          <p>
            {desc} {`, `}
          </p>
        )}
        {solution && <p>{solution}</p>}
      </div>
      <ButtonClose {...buttonProps} />
    </li>
  );
};
