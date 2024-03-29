import { NextRequest, NextResponse } from "next/server";

async function handler(req:NextRequest, { params }: { params: { username: string } }){
    try{
        const username = params.username;
        const query = `
        query getUserProfile($username: String!) {
          allQuestionsCount {
            difficulty
            count
          }
          matchedUser(username: $username) {
            contributions {
              points
            }
            profile {
              reputation
              ranking
            }
            submissionCalendar
            submitStats {
              acSubmissionNum {
                difficulty
                count
                submissions
              }
              totalSubmissionNum {
                difficulty
                count
                submissions
              }
            }
          }
          recentSubmissionList(username: $username) {
            title
            titleSlug
            timestamp
            statusDisplay
            lang
            __typename
          }
          matchedUserStats: matchedUser(username: $username) {
            submitStats: submitStatsGlobal {
              acSubmissionNum {
                difficulty
                count
                submissions
                __typename
              }
              totalSubmissionNum {
                difficulty
                count
                submissions
                __typename
              }
              __typename
            }
          }
        }
      `;
      
    const formatData = (data:any) => {
        let sendData =  {
            totalSolved: data.data.matchedUser.submitStats.acSubmissionNum[0].count,
            totalSubmissions:  data.data.matchedUser.submitStats.totalSubmissionNum,
            totalQuestions: data.data.allQuestionsCount[0].count,
            easySolved: data.data.matchedUser.submitStats.acSubmissionNum[1].count,
            totalEasy: data.data.allQuestionsCount[1].count,
            mediumSolved: data.data.matchedUser.submitStats.acSubmissionNum[2].count,
            totalMedium: data.data.allQuestionsCount[2].count,
            hardSolved: data.data.matchedUser.submitStats.acSubmissionNum[3].count,
            totalHard: data.data.allQuestionsCount[3].count,
            ranking: data.data.matchedUser.profile.ranking,
            contributionPoint: data.data.matchedUser.contributions.points,
            reputation: data.data.matchedUser.profile.reputation,
            submissionCalendar: JSON.parse(data.data.matchedUser.submissionCalendar),
            recentSubmissions: data.data.recentSubmissionList,
            matchedUserStats: data.data.matchedUser.submitStats
        }
        return sendData;
    }
    const response = await fetch('https://leetcode.com/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Referer': 'https://leetcode.com',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers':'Content-Type, application/json'
        }, 
        body: JSON.stringify({query: query, variables: {username: username}}),
    });
    const data = await response.json();
    
    return NextResponse.json({ data: formatData(data)}, {status: 200});
    
  
}
catch(error){
    console.error('Error getting user profile:', error);
    return NextResponse.json({ error: 'Error getting user profile' }, { status: 500 });
}
}

export { handler as GET };