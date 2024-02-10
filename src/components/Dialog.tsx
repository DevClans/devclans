const Dialog = ({
  children,
  setShow,
}: React.PropsWithChildren & { setShow: any }) => {
  return (
    <div
      // onBlur={() => {
      //   setShow(false);
      // }}
      className="card3 absolute w100 !p-1 scrollbar-x max-h-[200px] z-10"
    >
      {children}
    </div>
  );
};

export default Dialog;
