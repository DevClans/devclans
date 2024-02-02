

const Monthly = async() => {
   const userId="Satvik1769";
   let i=0;
   const theme = ["dracula","tokyo-night","high-contrast","vue","merko","rogue","xcode","github-compact","github","react","react-dark","cotton candy"]

  return (
    <div className="w100 heroCard fcc">
      <div className="borderLine" />
      <div className="container flex justify-center items-center flex-col lg:flex-row gap-x-15 gap-y-5 py-[30px]">
       <img src={`https://github-readme-activity-graph-ashen.vercel.app/graph?username=${userId}&theme=${theme[0]}`}/>
      </div>
    </div>
  );
};

export default Monthly;
