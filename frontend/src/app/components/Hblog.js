'use client';

import Heading from "../common/heading/Heading";
import Image from "next/image";
import "../blog/blog.css";
import { blog } from "../../dummydata";

const Hblog = () => {
  return (
    <section className='blog'>
      <div className='container'>
        <Heading subtitle='OUR BLOG' title='Recent From Blog' />
        <div className='grid2'>
          {blog.slice(0, 3).map((val, index) => (
            <div className='items shadow' key={index}>
              <div className='img'>
                <Image src={val.cover} alt='' width={300} height={200} />
              </div>
              <div className='text'>
                <div className='admin flexSB'>
                  <span>
                    <i className='fa fa-user'></i>
                    <label>{val.type}</label>
                  </span>
                  <span>
                    <i className='fa fa-calendar-alt'></i>
                    <label>{val.date}</label>
                  </span>
                  <span>
                    <i className='fa fa-comments'></i>
                    <label>{val.com}</label>
                  </span>
                </div>
                <h1>{val.title}</h1>
                <p>{val.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hblog;