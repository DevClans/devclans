"use client";
import colors from "@/lib/colors";
import { useState } from "react";
import GitHubCalendar from "react-github-calendar";

const GitHubGraph = ({ username }: { username: string }) => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const removeHashTag = (str: string) => str?.replace("#", "") || "E2E8FF8C";
  const handleChange = (e: any) => {
    setYear(e.target.valueAsNumber);
  };
  if (!username) {
    return null;
  }
  return (
    <div className="flex flex-col gap-2 max-w-[683px]">
      <div className="frc gap-2 w100">
        <h4>Github Calender </h4>
        <input
          type="number"
          value={year}
          onChange={handleChange}
          max={currentYear}
          min={2009}
          className="text-xs text-priDark font-medium"
          style={{
            maxWidth: "100px",
            height: "24px",
            borderRadius: "5px",
            border: "1px solid var(--border)",
            padding: "0 5px",
          }}
        />
      </div>
      <GitHubCalendar username={"auspy" || username} year={year} />
      <img
        className="mt-2"
        src={`https://github-readme-activity-graph-ashen.vercel.app/graph?username=${username}&theme=github-compact&bg_color=081121&title_color=${removeHashTag(
          colors.priDark
        )}&color=${removeHashTag(
          colors.text
        )}&custom_title=30 Days Contribution Graph&line=${removeHashTag(
          colors.priDark
        )}&point=${removeHashTag(colors.text)}&hide_border=true`}
        alt={`${username}'s github activity graph`}
      />
    </div>
  );
};

export default GitHubGraph;
