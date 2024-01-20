import { Chip } from "..";

const ChipGroup = ({ arr }: { arr: string[] }) => {
  return (
    <>
      <div className="frc gap-2 flex-wrap">
        {arr?.map((tech, i) => (
          <Chip key={i} label={tech} />
        ))}
      </div>
    </>
  );
};

export default ChipGroup;
