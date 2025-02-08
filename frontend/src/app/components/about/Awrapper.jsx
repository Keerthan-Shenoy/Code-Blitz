'use client';

import React from 'react';
import { awrapper } from '../../dummydata';
import styles from './about.module.css'; // Use CSS Modules for styling

const Awrapper = () => {
  return (
    <section className={styles.awrapper}>
      <div className="container grid">
        {awwrapper.map((val, index) => (
          <div key={index} className="box flex">
            <div className="img">
              <img src={val.cover} alt={val.title} />
            </div>
            <div className="text">
              <h1>{val.data}</h1>
              <h3>{val.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Awrapper;