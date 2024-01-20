'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

const Profile = () => {
  const { data: session } = useSession();
  const [githubUsername, setGithubUsername] = useState('');
  const [formData, setFormData] = useState({
    githubId: '',
    bio: '',
    contactMethod: 'discord',
    skills: [],
    currentCompany: '',
    careerGoal: 'remote',
    proudAchievement: '',
    recentWork: '',
  });

  useEffect(() => {
    // Set GitHub username when session is available
    //@ts-ignore
    const githubProvider = session?.provider;

    if (githubProvider === 'github' && session?.user?.name) {
      setGithubUsername(session.user.name);
    }
  }, [session]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'skills' ? value.split(',').map((skill) => skill.trim()) : value,
    }));
  };

  const handleConnectGitHub = () => {
    // Get the current page URL
    const currentUrl = window.location.href;
  
    // Redirect to GitHub OAuth page with the current URL as a callback
    window.location.href = `/api/auth/signin/github?callbackUrl=${encodeURIComponent(currentUrl)}`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/user/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Profile updated successfully');
      } else {
        console.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div>
      <h1>Your Profile</h1>
      {githubUsername && <p>Connected with GitHub as: {githubUsername}</p>}
      {session ? (
        <form onSubmit={handleSubmit}>
          {/* ... (existing fields) */}

          {/* New fields */}
          <label>
            GitHub ID:
            <input type="text" name="githubId" value={formData.githubId} onChange={handleChange} className='text-black'/>
          </label>
          <br />
          <label>
            Bio:
            <input name="bio" value={formData.bio} onChange={handleChange} className='text-black' />
          </label>
          <br />
          <label>
            Contact Method:
            <select name="contactMethod" value={formData.contactMethod} onChange={handleChange}>
              <option value="discord" className='text-black'>Discord</option>
              <option value="mail" className='text-black'>Mail</option>
              <option value="twitter" className='text-black'>Twitter</option>
            </select>
          </label>
          <br />
          <label>
            Skills (comma-separated):
            <input type="text" name="skills" value={formData.skills.join(', ')} onChange={handleChange} className='text-black'/>
          </label>
          <br />
          <label>
            Current Company:
            <input type="text" name="currentCompany" value={formData.currentCompany} onChange={handleChange} className='text-black'/>
          </label>
          <br />
          <label>
            Career Goal:
            <select name="careerGoal" value={formData.careerGoal} onChange={handleChange}>
              <option value="remote" className='text-black'>Remote</option>
              <option value="faang" className='text-black'>FAANG</option>
              <option value="startup" className='text-black'>Startup</option>
            </select>
          </label>
          <br />
          <label>
            Proud Achievement:
            <input name="proudAchievement" value={formData.proudAchievement} onChange={handleChange} className='text-black'/>
          </label>
          <br />
          <label>
            Recent Work:
            <input name="recentWork" value={formData.recentWork} onChange={handleChange} className='text-black'/>
          </label>
          <br />
          <button type="submit">Update Profile</button>
          <button type="button" onClick={handleConnectGitHub}>
            Connect Your GitHub
          </button>
        </form>
      ) : (
        <p>You need to be logged in to view your profile.</p>
      )}
    </div>
  );
};

export default Profile;
