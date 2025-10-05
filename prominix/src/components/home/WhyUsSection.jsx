import React from 'react';

function WhyUsSection() {
  return (
    <section id="why-us" className="why-us">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>Why Us</h2>
          <p>Discover the Benefits</p>
        </div>
        <div className="row">
          <div className="col-lg-4">
            <div className="box" data-aos="zoom-in" data-aos-delay="100">
              <h4>Innovating Through Freelance Technology Solutions</h4>
              <p>Prominix Limited is a forward-thinking startup...</p>
            </div>
          </div>
          <div className="col-lg-4 mt-4 mt-lg-0">
            <div className="box" data-aos="zoom-in" data-aos-delay="200">
              <h4>A Trusted Partner for Digital Transformation</h4>
              <p>At Prominix Limited, the focus extends beyond just building solutions...</p>
            </div>
          </div>
          <div className="col-lg-4 mt-4 mt-lg-0">
            <div className="box" data-aos="zoom-in" data-aos-delay="300">
              <h4>Commitment to Quality and Flexibility</h4>
              <p>Prominix Limited has positioned itself as a reliable partner...</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyUsSection;