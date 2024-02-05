import { ButtonProps } from "@/types";
import ButtonUserSection from "../buttons/ButtonUserSection";

const ButtonGroupUserSections = ({
  data,
  containerClassName,
  containerStyle,
  active,
  ...rest
}: {
  data: ButtonProps[];
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
} & Partial<ButtonProps>) => {
  // const [isActive, setActive] = useState(active);
  // console.log(isActive, "isActive");
  return (
    <>
      <div
        className={
          "frc gap-2 btnRow w-100 z-50 !justify-normal sticky top-0  py-2 backdrop-blur-[12px] scrollbar-hide " +
          containerClassName
        }
        style={containerStyle}
      >
        {data.map((item, i) => (
          <ButtonUserSection
            // className="backdrop-blur-[15px]"
            {...rest}
            active={active === item.label?.toString().toLowerCase()}
            key={i}
            {...item}
            // onClick={() => {
            //   setActive(item.label?.toString().toLowerCase());
            // }}
          />
        ))}
      </div>
    </>
  );
};

export default ButtonGroupUserSections;
