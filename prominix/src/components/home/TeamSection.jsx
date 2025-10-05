import React from 'react';
// Import your team member images
import ceoImg from '../../assets/img/shivani.jpg';
import cfoImg from '../../assets/img/cfo.jpg';
import cooImg from '../../assets/img/coo.jpg';

function TeamSection() {
  return (
    <section id="testimonials" className="testimonials section-bg">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>Our Team</h2>
          <p>What they're saying about us</p>
        </div>
        <div className="testimonials-slider swiper" data-aos="fade-up" data-aos-delay="100">
          <div className="swiper-wrapper">
            {/* */}
            <div className="swiper-slide">
              <div className="testimonial-item">
                <p><i className="bx bxs-quote-alt-left quote-icon-left"></i> At Prominix Limited, we’re driven by innovation and excellence. <i className="bx bxs-quote-alt-right quote-icon-right"></i></p>
                <img src={ceoImg} className="testimonial-img" alt="CEO" />
                <h3>Shivani</h3>
                <h4>Chief Executive Officer (CEO)</h4>
              </div>
            </div>
            {/* */}
            <div className="swiper-slide">
              <div className="testimonial-item">
                <p><i className="bx bxs-quote-alt-left quote-icon-left"></i> Financial integrity and sustainable growth are core to our success... <i className="bx bxs-quote-alt-right quote-icon-right"></i></p>
                <img src={cfoImg} className="testimonial-img" alt="CFO" />
                <h3>Ms. Jaya Mishra</h3>
                <h4>Chief Financial Officer (CFO)</h4>
              </div>
            </div>
             {/* */}
            <div className="swiper-slide">
              <div className="testimonial-item">
                <p><i className="bx bxs-quote-alt-left quote-icon-left"></i> Our focus on operational excellence allows us to deliver consistently... <i className="bx bxs-quote-alt-right quote-icon-right"></i></p>
                <img src={cooImg} className="testimonial-img" alt="COO" />
                <h3>Mr. Vinod Mishra</h3>
                <h4>Chief Operations Officer (COO)</h4>
              </div>
            </div>
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </div>
    </section>
  );
}

export default TeamSection;