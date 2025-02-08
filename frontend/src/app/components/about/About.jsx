
'use client';

import React from 'react';
import Back from '../common/back/Back';
import AboutCard from './AboutCard';
import styles from './about.module.css';

const About = () => {
  return (
    <>
      <Back title='About Us' />
      <div className={styles.aboutHome}>
        <AboutCard />
      </div>
    </>
  );
};

export default About;