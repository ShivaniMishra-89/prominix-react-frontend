import React from 'react';
import aboutImg from '../../assets/img/Media.jpg'; // Adjust path if needed

function AboutSection() {
  return (
    <section id="about" className="about">
      <div className="container" data-aos="fade-up">
        <div className="row">
          <div className="col-lg-6 order-1 order-lg-2" data-aos="zoom-in" data-aos-delay="100">
            <div className="about-img">
              <img src={aboutImg} alt="" />
            </div>
          </div>
          <div className="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content">
            <div className="section-title">
              <h2>About Us</h2>
              <p>About Us</p>
            </div>
            <p>
              Prominix Limited is a dynamic startup IT company, specializing in offering freelance technology solutions...
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;