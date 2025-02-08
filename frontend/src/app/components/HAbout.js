'use client';

import OnlineCourses from "../allcourses/OnlineCourses";
import Heading from "../common/heading/Heading";
import Image from "next/image";
import "../allcourses/courses.css";
import { coursesCard } from "../../dummydata";

const HAbout = () => {
  return (
    <section className='homeAbout'>
      <div className='container'>
        <Heading subtitle='our courses' title='explore our popular online courses' />

        <div className='coursesCard'>
          <div className='grid2'>
            {coursesCard.slice(0, 3).map((val, index) => (
              <div className='items' key={index}>
                <div className='content flex'>
                  <div className='left'>
                    <div className='img'>
                      <Image src={val.cover} alt='' width={200} height={200} />
                    </div>
                  </div>
                  <div className='text'>
                    <h1>{val.coursesName}</h1>
                    <div className='rate'>
                      <i className='fa fa-star'></i>
                      <i className='fa fa-star'></i>
                      <i className='fa fa-star'></i>
                      <i className='fa fa-star'></i>
                      <i className='fa fa-star'></i>
                      <label>(5.0)</label>
                    </div>
                    <div className='details'>
                      {val.courTeacher.map((details, idx) => (
                        <div className='box' key={idx}>
                          <div className='dimg'>
                            <Image src={details.dcover} alt='' width={50} height={50} />
                          </div>
                          <div className='para'>
                            <h4>{details.name}</h4>
                          </div>
                          <span>{details.totalTime}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className='price'>
                  <h3>
                    {val.priceAll} / {val.pricePer}
                  </h3>
                </div>
                <button className='outline-btn'>ENROLL NOW !</button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <OnlineCourses />
    </section>
  );
};

export default HAbout;
