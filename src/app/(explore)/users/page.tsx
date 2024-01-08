"use client"
import { useSession } from 'next-auth/react';

const page = () => {
  const { data: session } = useSession();

  // Check if the user is authenticated
  if (session) {
    // Access user data from the session object
    const { user } = session;

    // Now you can use the user object to display user information
    return (
      <div className='border-2 border-red-300 mx-auto text-center'>
        <h1 className='my-10'>Welcome, {user?.name}!</h1>
        <h2 >Email: {user?.email}</h2>
        <h2 >Email: {user?.image}</h2>
        {/* Add more user data as needed */}
      </div>
    );
  }

  // If the user is not authenticated, you can display a login link or other content
  return (
    <div>
      <p>Please sign in to view your profile.</p>
      {/* You can add a login button or link here */}
    </div>
  );
};

export default page;
