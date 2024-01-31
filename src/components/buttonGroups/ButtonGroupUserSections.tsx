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
          "frc gap-2 btnRow w-100 !justify-normal " + containerClassName
        }
        style={containerStyle}
      >
        {data.map((item, i) => (
          <ButtonUserSection
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
