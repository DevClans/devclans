"use client"

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

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

  return (
    <div>
      <h1 className='my-10'>Project Details</h1>
      {projectData ? (
        <div className='grid grid-cols-2 gap-10'>
            <div className='border-2 border-white rounded-lg'>
                <h2>README.md</h2>
                <ReactMarkdown>{(projectData as { readme: string }).readme}</ReactMarkdown>
            </div>     
            <div className='border-2 border-white rounded-lg'>
                <h2>CONTRIBUTING.md</h2>
                <ReactMarkdown>{(projectData as { contributing: string }).contributing}</ReactMarkdown>
            </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProjectDetails;