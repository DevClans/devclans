'use client';

import { useEffect, useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation'

const Profile = () => {
  const { data: session }:any = useSession();
  // const [githubUsername, setGithubUsername] = useState('');
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

  const searchParams = useSearchParams()
  const githubUsername = searchParams.get('githubUsername')

  useEffect(() => {
    console.log("Route Parameter: ", githubUsername);
    const username = Array.isArray(githubUsername) ? githubUsername[0] : githubUsername;
  
    if (username) {
      setFormData(prevData => ({
        ...prevData,
        githubId: username
      }));
    }
  }, [githubUsername]);
  

  console.log('githubUsername', githubUsername);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'skills' ? value.split(',').map((skill) => skill.trim()) : value,
    }));
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

  const handleConnectGitHub = () => {
    const GITHUB_AUTH_URL = "https://github.com/login/oauth/authorize";
    const CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
    const CALLBACK_URL = process.env.NEXT_PUBLIC_GITHUB_CALLBACK_URL;
    const SCOPES = "read:user,user:email";
  
    window.location.href = `${GITHUB_AUTH_URL}?client_id=${CLIENT_ID}&redirect_uri=${CALLBACK_URL}&scope=${SCOPES}`;
  };

  return (
    <div>
      <h1>Your Profile</h1>
      <h2>{githubUsername}</h2>
      {session ? (
        <form onSubmit={handleSubmit}>

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
          {/* GitHub Connection Button */}
          <button type="button" onClick={handleConnectGitHub}>Connect Your GitHub</button>
        </form>
      ) : (
        <p>You need to be logged in to view your profile.</p>
      )}
    </div>
  );
};

export default Profile;
