'use client';

import React from 'react';
import Back from '../common/back/Back';
import TeamCard from './TeamCard';
import Awrapper from '../about/Awrapper';
import styles from './team.module.css'; // Use CSS Modules for styling
import aboutStyles from '../about/about.module.css'; // Import about styles if needed

const Team = () => {
  return (
    <>
      <Back title='Team' />
      <section className={`${styles.team} padding`}>
        <div className='container grid'>
          <TeamCard />
        </div>
      </section>
      <Awrapper />
    </>
  );
};

export default Team;