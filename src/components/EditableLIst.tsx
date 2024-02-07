"use client";
import { useEffect, useState } from "react";
import { ButtonSecondary, ToggleListItem } from ".";
import ButtonClose from "./buttons/ButtonClose";
import { ButtonProps } from "@/types";
import { ToogleListItemProps } from "@/types/toggleList.types";
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
}: {
  setValue: any;
  isEdit?: boolean;
  name: string;
  defaultValues?: any;
  editableList: any;
}) => {
  const thirdLabel = () => {
    if (editableList.solution) {
      return "Solution";
    }
    if (editableList.needHelp) {
      return "Need Help";
    }
    return "";
  };

  const thirdLabelVal = thirdLabel();
  const type = name.split(".")[1] || "challenges";
  const [list, setList] = useState<Record<string, listProps>>(
    defaultValues[name] || {}
  );
  const [input, setInput] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [solution, setSolution] = useState<string | boolean>("");

  const handleAdd = () => {
    if (input.length > 0) {
      const data: listProps = {
        title: input,
        desc: desc,
      };
      if (thirdLabelVal == "Solution") {
        data.solution = solution as string;
      }
      if (thirdLabelVal == "Need Help") {
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
      <div className="frfssb flex-wrap md:flex-nowrap gap-4 w100">
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
                  className="w100"
                  value={solution as string}
                  onChange={handleSolutionChange}
                />
              ) : thirdLabelVal == "Need Help" ? (
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
          <p>Preview</p>
          <ToggleListItem
            open={true}
            className="hidden lg:flex"
            heading={input}
            data={[
              {
                title: "Description",
                desc: desc,
              },
              {
                title: thirdLabelVal,
                desc: solution as string,
              },
            ]}
          />
        </div>
      </div>
      <div className="w100 card2 p-5">
        <p>Challenges Added</p>
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
    <>
      <div className="frcsb p-5">
        <div className="frc w100">
          <p>{item}</p>
          {`, `}
          <p>{desc}</p>
          {`, `}
          <p>{solution}</p>
        </div>
        <ButtonClose {...buttonProps} />
      </div>
    </>
  );
};
