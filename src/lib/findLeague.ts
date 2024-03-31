export const findLeague = ({ranking}: {ranking: number}) => {
    if (ranking >= 2500000) {
      return {
        grade: "C",
        fraction: 1 / 7
      }
    }
    else if(ranking<2500000 && ranking>=1000000){
      return {
        grade: "B",
        fraction: 2 / 7
      }

    }
    else if(ranking<1000000 && ranking>=500000){
      return {
        grade: "B+",
        fraction: 3 / 7
      }

    }
    else if(ranking<500000 && ranking>=100000){
      return {
        grade: "A",
        fraction: 4 / 7
      }

    }
    else if(ranking<100000 && ranking>=10000){
      return {
        grade: "A+",
        fraction: 5 / 7
      }

    }
    else if(ranking<10000 && ranking>=1000){
      return {
        grade: "S",
        fraction: 6 / 7
      }

    }
    else if(ranking<1000){
      return {
        grade: "S+",
        fraction: 7 / 7
      }

    }
  }

  
  