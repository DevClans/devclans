import { InfoWithIconProps } from "@/types/list.types";
import { UserQuestionsProps } from "@/types/mongo/user.types";
import { Briefcase, Goal, Trophy } from "lucide-react";
import camelToNormalCase from "./camelToNormalCase";

const userQuestions = ({ questions }: { questions: UserQuestionsProps }) => {
  const sampleQuestions = {
    currentCompany: "What is your current company?",
    careerGoal: "What is your career goal?",
    proudAchievement: "What is your proud achievement?",
    recentWork: "What is your recent work?",
  };
  const questionIcons = {
    currentCompany: <Briefcase size={20} />,
    careerGoal: <Goal size={20} />,
    proudAchievement: <Trophy size={20} />,
    recentWork: <Briefcase size={20} />,
  };
  const ans = {
    currentCompany: (company: any) => `I currently work at ${company}`,
    careerGoal: (word: any) =>
      `My career goal is to become a ${word?.toString().replace(/ /g, " ")}`,
    proudAchievement: (achievement: any) =>
      `One of my proudest achievements is ${achievement
        ?.toString()
        .replace(/ /g, " ")}`,
    recentWork: (project: any) =>
      `I'm currently working on a project related to ${project
        ?.toString()
        .replace(/ /g, " ")}`,
  };
  const ques: InfoWithIconProps[] = Object.keys(questions || {})
    .map((key) => {
      if (!questions[key as keyof UserQuestionsProps]) {
        return;
      }
      return {
        question: sampleQuestions[key as keyof typeof sampleQuestions],
        title: camelToNormalCase(key as keyof UserQuestionsProps),
        desc: questions[key as keyof UserQuestionsProps],
        ans: ans[key as keyof UserQuestionsProps](
          questions[key as keyof UserQuestionsProps]
        ),
        icon: questionIcons[key as keyof typeof questionIcons],
      };
    })
    .filter(Boolean) as InfoWithIconProps[];
  const questionsObj = Object.fromEntries(
    Object.keys(questions || {}).map((key) => {
      return [
        sampleQuestions[key as keyof typeof sampleQuestions],
        questions[key as keyof UserQuestionsProps],
      ];
    })
  );
  const top2 = ques.slice(0, 2);
  // return { arr: ques, obj: questionsObj, top2 };
  return ques;
};

export default userQuestions;
