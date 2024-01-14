"use client"

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

// Function to generate a random hex color
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const ProjectDetails = ({ projectId }:any) => {
  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/project/${projectId}`);
        const data = await response.json();
        setProjectData(data);
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    };

    fetchData();
  }, [projectId]);

  const renderLanguages = () => {
    if (!projectData || !(projectData as { languages: any }).languages) {
      return null;
    }

    const languagesObject = (projectData as { languages: any }).languages;
    const totalBytes:any = Object.values(languagesObject).reduce((acc: any, percentage: any) => acc + percentage, 0);

    const languages = Object.entries(languagesObject).map(([language, percentage]: any) => ({
      name: language,
      percentage: (percentage / totalBytes) * 100,
      color: getRandomColor(), // Assuming you have a function to generate random colors
    }));

    return (
      <div>
        <h2 className="text-lg font-semibold mb-2">Languages Used</h2>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            {languages.map(({ name, percentage, color }) => (
              <div
                key={name}
                className="flex-grow bg-green-400 h-6 rounded-md"
                style={{ width: `${percentage}%`, backgroundColor: color }}
              ></div>
            ))}
          </div>
          <div className="flex space-x-2">
            {languages.map(({ name, percentage }) => (
              <div key={name} className="text-sm font-medium">
                {name} ({Number(percentage).toFixed(2)}%)
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div>
      <h1 className='my-10'>Project Details</h1>
      {projectData ? (
        <div>
            <div className='grid grid-cols-2 gap-10'>
                <div className='border-2 border-white rounded-lg'>
                    <h2>README.md</h2>
                    <ReactMarkdown>{(projectData as { readme: string }).readme}</ReactMarkdown>
                </div>     
                <div className='border-2 border-white rounded-lg'>
                    <h2>CONTRIBUTING.md</h2>
                    <ReactMarkdown>{(projectData as { contributing: string }).contributing}</ReactMarkdown>
                </div>
            {renderLanguages()}

            </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProjectDetails;