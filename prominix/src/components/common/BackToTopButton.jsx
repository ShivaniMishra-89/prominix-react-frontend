import React from 'react';
import { useScrollPosition } from '../../hooks/useScrollPosition';

function BackToTopButton() {
  const scrollPosition = useScrollPosition();

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <a
      href="#"
      onClick={scrollToTop}
      className={`back-to-top d-flex align-items-center justify-content-center ${scrollPosition > 100 ? 'active' : ''}`}
    >
      <i className="bi bi-arrow-up-short"></i>
    </a>
  );
}


export default BackToTopButton;