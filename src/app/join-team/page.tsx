// pages/join-team.tsx
"use client";
import { ButtonBlue } from '@/components';
import { useState } from 'react';

const JoinTeamPage = () => {
  const [teamCode, setTeamCode] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/join-team', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ teamCode }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      console.error('Error joining team:', error);
      setMessage('An error occurred while joining the team');
    }
  };

  return (
    <div>
      <h1 className='mt-20'>Join A Team</h1>
      <form onSubmit={handleSubmit}>
        <label className='text-lg flex flex-col my-8 gap-2'>
          Team Code:
          <input
            type="text"
            value={teamCode}
            onChange={(e) => setTeamCode(e.target.value)}
          />
        </label>
        <ButtonBlue className="mt-6" type="submit" label="Join Team" />
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default JoinTeamPage;