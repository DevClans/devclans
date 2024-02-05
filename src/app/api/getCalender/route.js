import { NextResponse } from 'next/server';
const CalendarGraph = require("github-calendar-graph")

async function handler(req) {
let code;

  try {
    

// get contribution graph
CalendarGraph.fetch("Satvik1769",true).then((data) => {
  console.log("This is data: " + data); // => string of HTML DOM

  
});
   
return NextResponse.json({message:"done"});
   
  }

  

 
  catch (error) {
    return NextResponse.json(error);
  }

}

export { handler as GET };
