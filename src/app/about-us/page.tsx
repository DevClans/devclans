import React from 'react';
import Head from 'next/head';

const AboutUsPage: React.FC = () => {
  return (
<div>
      <Head>
        <title>About Us | DevConnect</title>
      </Head>
      <section>
        <h1>Vision</h1>
        <p>Connecting developers globally to foster collaboration and innovation.</p>
      </section>
      <section>
        <h1>Goal</h1>
        <p>Empowering developers to find teams, collaborate, and participate in hackathons effortlessly.</p>
      </section>
      <section>
        <h1>Journey</h1>
        <p>Our journey began with a passion for bringing developers together. We've overcome challenges and grown with the support of our amazing community.</p>
      </section>
      <section>
        <h1>Our Team</h1>
        <p>We are a dedicated team of developers, designers, and enthusiasts who believe in the power of collaboration. Meet the minds behind DevConnect:</p>
        <ul>
          <li>S</li>
          <li>A</li>
          <li>S</li>
          <li>k</li>
        </ul>
      </section>
    </div>
  );
};

export default AboutUsPage;
