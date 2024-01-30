import GitHubCalendar from 'react-github-calendar';
const GitHubGraph = () => {
    const username = "Satvik1769";
    const year = 2023
    return (
      <div className="flex flex-col" style={{ rowGap: 30 }}>
        <GitHubCalendar username={username} year = {year} />
      </div>
    );
  };
  
  export default GitHubGraph;
  