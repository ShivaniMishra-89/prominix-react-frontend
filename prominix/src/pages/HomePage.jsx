import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination'; // Import swiper pagination styles

// Import all section components
import HeroSection from '../components/home/HeroSection';
import AboutSection from '../components/home/AboutSection';
import WhyUsSection from '../components/home/WhyUsSection';
import TeamSection from '../components/home/TeamSection';

function HomePage() {
  useEffect(() => {
    // Initialize AOS
    AOS.init({ duration: 1000, once: true });

    // Initialize Swiper
    new Swiper('.testimonials-slider', {
      speed: 600,
      loop: true,
      autoplay: { delay: 5000 },
      slidesPerView: 'auto',
      pagination: { el: '.swiper-pagination', type: 'bullets', clickable: true },
      breakpoints: {
        320: { slidesPerView: 1, spaceBetween: 20 },
        1200: { slidesPerView: 3, spaceBetween: 20 },
      },
    });
  }, []);

  return (
    <>
      <HeroSection />
      <main id="main">
        <AboutSection />
        <WhyUsSection />
        <TeamSection />
      </main>
    </>
  );
}

export default HomePage;