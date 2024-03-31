import { Fetch } from "@/utils/fetchApi";
import React from "react";
import { findLeague } from "@/lib/findLeague";
function FractionCircle({ fraction, children }:{fraction:number,children:React.ReactNode}) {
  // Calculate clip-path values based on fraction
  const clipPathBlue = `polygon(0 0, 100% 0, 100% ${fraction * 100}%, 0% ${fraction * 100}%)`;
  const clipPathRed = `polygon(0 ${fraction * 100}%, 100% ${fraction * 100}%, 100% 100%, 0% 100%)`;

  return (
    <div className="relative w-24 h-24 rounded-full overflow-hidden">
      <div className="absolute w-full h-full bg-gradient-to-r from-blue-500 to-blue-500" style={{ clipPath: clipPathBlue }}></div>
      <div className="absolute w-full h-full bg-blueRing" style={{ clipPath: clipPathRed }}></div>
      <div className="w-20 h-20 bg-card rounded-full flex items-center justify-center absolute top-2/4 left-2/4 transform -translate-x-1/2 -translate-y-1/2">
        <div>
          {children}
        </div>
      </div>
    </div>
  );
}

const LeetCodeStats = async ({username}:{username:string})=>{
    const data = await Fetch({endpoint:`/leetcode/getUserProfile/${username}`});
    console.log(data)
    const league = findLeague({ranking:data.data.ranking});
    console.log(league);

    
    return (

      <div className=" bg-card border-blue-600 w-[70%] rounded-lg border-2 ">
      <h2 className="text-blue-600 mx-2 mt-2 text-lg font-mono">{username} LeetCode  Stats</h2> 
      <div  className="flex flex-row px-2 ">
      <div className="flex flex-col w-[65%]">
      <div  className="flex flex-row mt-4 justify-between">
        <h3>Total Problems Solved:</h3>
        <p>{data.data.totalSolved}</p>
        </div>
      <div  className="flex flex-row mt-2 justify-between">
        <h3>Easy Problems Solved:</h3>
        <p>{data.data.easySolved}</p>
        </div>
      <div  className="flex flex-row mt-2 justify-between">
        <h3>Medium Problems Solved:</h3>
        <p>{data.data.mediumSolved}</p>
        </div>
      <div  className="flex flex-row mt-2 justify-between">
        <h3>Hard Problems Solved:</h3>
        <p>{data.data.hardSolved}</p>
        </div>
         <div  className="flex flex-row mt-2 justify-between mb-2">
        <h3>Current Ranking:</h3>
        <p>{data.data.ranking}</p>
        </div>
      </div>
      <div className="mx-7 flex my-7">
<FractionCircle fraction={league?.fraction || 0}>
      <h2>{league?.grade}</h2>
    </FractionCircle>

        </div>


      </div>
      </div>

    )
}

export default LeetCodeStats; 