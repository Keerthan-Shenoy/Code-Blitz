'use client';

import React from 'react';
import Heading from '../common/heading/Heading';
import styles from './about.module.css'; // Use CSS Modules for styling
import { homeAbout } from '../../dummydata';
import Awrapper from './Awrapper';

const AboutCard = () => {
  return (
    <>
      <section className={styles.aboutHome}>
        <div className="container flexSB">
          <div className="left row">
            <img src="/images/about.jpeg" alt="About" />
          </div>
          <div className="right row">
            <Heading subtitle="LEARN ANYTHING" title="Benefits About Online Learning Expertise" />
            <div className={styles.items}>
              {homeAbout.map((val, index) => (
                <div key={index} className={`${styles.item} flexSB`}>
                  <div className={styles.img}>
                    <img src={val.cover} alt={val.title} />
                  </div>
                  <div className={styles.text}>
                    <h2>{val.title}</h2>
                    <p>{val.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Awrapper />
    </>
  );
};

export default AboutCard;