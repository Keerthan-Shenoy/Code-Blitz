'use client';

import Heading from "../common/heading/Heading";
import AutoType from "./AutoType";
import "./Hero.css";

const Hero = () => {
  return (
    <section className='hero'>
      <div className='container'>
        <div className='row'>
          <h1>
            <Heading 
              subtitle={
                <AutoType 
                  texts={[
                    "Welcome To EDUCARE",
                    "Join the Community, Unlock Your Potential.",
                    "Learn, Share, Grow: Together We Achieve More",
                    "Building a Brighter Future Through Community"
                  ]}
                />
              }
              title="Best Online Education Expertise"
            />
          </h1>
          <p>
            EDUCARE is a community-driven skill-sharing platform where learners, experts, and enthusiasts come together to explore new skills, connect with like-minded individuals, and grow collectively.
          </p>
          <div className='button'>
            <button className='primary-btn'>
              GET STARTED NOW <i className='fa fa-long-arrow-alt-right'></i>
            </button>
            <button>
              VIEW COURSES <i className='fa fa-long-arrow-alt-right'></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
