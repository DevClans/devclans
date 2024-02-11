import { debounce } from "@/lib/debounce";

const SearchBox = ({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
}) => {
  return (
    <>
      <input
        placeholder={placeholder || "Search"}
        className="h-[40px] w100 m-0 sticky top-0 backdrop-blur-[27px] z-20"
        defaultValue={value}
        onChange={debounce(onChange, 300)}
      />
    </>
  );
};

export default SearchBox;
