'use client';

import React from 'react';
import styles from './courses.module.css'; // Use CSS Modules for styling
import { online } from '../../dummydata';
import Heading from '../common/heading/Heading';

const OnlineCourses = () => {
  return (
    <>
      <section className={styles.online}>
        <div className="container">
          <Heading subtitle="COURSES" title="Browse Our Online Courses" />
          <div className="content grid3">
            {online.map((val, index) => (
              <div key={index} className="box">
                <div className="img">
                  <img src={val.cover} alt={val.courseName} />
                  <img src={val.hoverCover} alt={val.courseName} className="show" />
                </div>
                <h1>{val.courseName}</h1>
                <span>{val.course}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default OnlineCourses;