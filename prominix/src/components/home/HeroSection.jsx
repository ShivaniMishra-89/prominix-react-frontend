import React from 'react';

function HeroSection() {
  // Make sure the background image path in your main.css for #hero is correct
  // e.g., url(/assets/img/home/media2.png) if you place it in public/assets/img/
  return (
    <section id="hero" className="d-flex align-items-center">
      <div className="container position-relative text-center text-lg-start" data-aos="zoom-in" data-aos-delay="100">
        <div className="row">
          <div className="col-lg-8">
            <h1>
              Prominix Limited <br />
              <span>Grow with us Innvation Minds, Inspired Solution!</span>
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;