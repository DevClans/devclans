const BottomBar = ({ text }: { text: React.ReactNode }) => {
  return (
    <div
      className="card rounded-b-[10px] w100 text-xs font-normal"
      style={{
        borderTop: "none",
        lineHeight: "1.5",
        padding: "10px 20px",
      }}
    >
      {text || "share with your friends"}
    </div>
  );
};

export default BottomBar;
