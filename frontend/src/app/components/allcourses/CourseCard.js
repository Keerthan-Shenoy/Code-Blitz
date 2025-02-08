'use client';

import React from 'react';
import styles from './courses.module.css'; // Use CSS Modules for styling
import { coursesCard } from '../../dummydata';

const CoursesCard = () => {
  return (
    <>
      <section className={styles.coursesCard}>
        <div className="container grid2">
          {coursesCard.map((val, index) => (
            <div key={index} className={styles.items}>
              <div className={`${styles.content} flex`}>
                <div className={styles.left}>
                  <div className={styles.img}>
                    <img src={val.cover} alt={val.coursesName} />
                  </div>
                </div>
                <div className={styles.text}>
                  <h1>{val.coursesName}</h1>
                  <div className={styles.rate}>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <label htmlFor="">(5.0)</label>
                  </div>
                  <div className={styles.details}>
                    {val.courTeacher.map((details, index) => (
                      <div key={index} className={styles.box}>
                        <div className={styles.dimg}>
                          <img src={details.dcover} alt={details.name} />
                        </div>
                        <div className={styles.para}>
                          <h4>{details.name}</h4>
                        </div>
                        <span>{details.totalTime}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className={styles.price}>
                <h3>
                  {val.priceAll} / {val.pricePer}
                </h3>
              </div>
              <button className="outline-btn">ENROLL NOW !</button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default CoursesCard;