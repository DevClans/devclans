import Logo from "./Logo";
import Navigation from "./Navigation";
import ButtonLogin from "./buttons/ButtonLogin";

const Header = () => {
  return (
    <div className="frcsb container w-full py-4">
      <Logo />
      <Navigation />
      <ButtonLogin />
    </div>
  );
};

export default Header;
