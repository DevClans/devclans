'use client'
import { useState } from 'react';
// import { useRouter } from 'next/router';

const CreateProject = () => {
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    topics: '',
    githubLink: '',
    skills: '',
    projectLinks: '',
    projectDetails: {
      problem: '',
      challenges: [{ title: '', desc: '', solution: '' }],
      futureGoals: [{ title: '', desc: '', needHelp: false }],
      memberReq: [{ title: '', desc: '' }],
    } as any,
    team: '',
    needMembers: 'professional',
    imgs: '',
    video: '',
    devStage: 'idea',
    published: false,
  });

//   const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value.split(',') }));
  };

  const handleProjectDetailsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLInputElement>,
    index: number,
    key: string
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const newProjectDetails = [...prevData.projectDetails[key]];
      newProjectDetails[index] = { ...newProjectDetails[index], [name]: value };
      return { ...prevData, projectDetails: { ...prevData.projectDetails, [key]: newProjectDetails } };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add logic to send data to the backend
    const response = await fetch('/api/projects/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
  };

  return (
    <div>
      <h1>Create a Project</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={formData.title} onChange={handleChange} />
        </label>
        <br />
        <label>
          Description:
          <input name="desc" value={formData.desc} onChange={handleChange}></input>
        </label>
        <br />
        <label>
          Topics (comma-separated):
          <input type="text" name="topics" value={formData.topics} onChange={handleArrayChange} />
        </label>
        <br />
        <label>
          GitHub Link:
          <input type="text" name="githubLink" value={formData.githubLink} onChange={handleChange} />
        </label>
        <br />
        <label>
          Skills (comma-separated, optional):
          <input type="text" name="skills" value={formData.skills} onChange={handleArrayChange} />
        </label>
        <br />
        <label>
          Project Links (comma-separated, optional):
          <input type="text" name="projectLinks" value={formData.projectLinks} onChange={handleArrayChange} />
        </label>
        <br />
        <label>
          Project Details - Problem:
          <input
            name="problem"
            value={formData.projectDetails.problem}
            onChange={(e) => handleProjectDetailsChange(e, 0, 'problem')}
          ></input>
        </label>
        {/* Add more Project Details fields here */}
        <br />
        <label>
          Team (comma-separated, optional):
          <input type="text" name="team" value={formData.team} onChange={handleArrayChange} />
        </label>
        <br />
        <label>
          Need Members (professional, student, beginner, optional):
          <select name="needMembers" value={formData.needMembers} onChange={handleChange}>
            <option value="professional">Professional</option>
            <option value="student">Student</option>
            <option value="beginner">Beginner</option>
          </select>
        </label>
        <br />
        <label>
          Images (comma-separated URLs, optional):
          <input type="text" name="imgs" value={formData.imgs} onChange={handleArrayChange} />
        </label>
        <br />
        <label>
          Video Link (optional):
          <input type="text" name="video" value={formData.video} onChange={handleChange} />
        </label>
        <br />
        <label>
          Development Stage (idea, development, alpha, beta, production, optional):
          <select name="devStage" value={formData.devStage} onChange={handleChange}>
            <option value="idea">Idea</option>
            <option value="development">Development</option>
            <option value="alpha">Alpha</option>
            <option value="beta">Beta</option>
            <option value="production">Production</option>
          </select>
        </label>
        <br />
        <label>
          Published:
          <input type="checkbox" name="published" checked={formData.published} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
};

export default CreateProject;
