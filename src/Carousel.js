import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './Carousel.css';

export default function Carousel({ numSlides = 3 }) {
  const [carouselWidth, setCarouselWidth] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesRef = useRef([]);
  const carouselRef = useRef(0);
  const trackRef = useRef(null);

  const pushRef = (slide) => {
    if (slide && slidesRef.current.length < numSlides) {
      slidesRef.current.push(slide);
    }
  };

  const changeSlideLeft = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prevSlide) => prevSlide - 1);
    }
  };

  const changeSlideRight = () => {
    if (currentSlide < numSlides - 1) {
      setCurrentSlide((prevSlide) => prevSlide + 1);
    }
  };

  useEffect(() => {
    setCarouselWidth(carouselRef.current.offsetWidth);
  }, [carouselWidth, carouselRef]);

  useLayoutEffect(() => {
    if (slidesRef.current.length > 0) {
      slidesRef.current.forEach((slide) => {
        const slideNum = Number(slide.classList[1].split('-')[1]);
        const distance = carouselWidth * slideNum;
        slide.style.left = distance.toString() + 'px';
      });
    }
  }, [slidesRef, carouselWidth]);

  useLayoutEffect(() => {
    const distance = (carouselWidth * currentSlide).toString() + 'px';
    trackRef.current.style.transform = `translateX(-${distance})`;
  }, [currentSlide, carouselWidth]);

  return (
    <section ref={carouselRef} className='carousel'>
      <ul ref={trackRef} className='track'>
        <li
          ref={pushRef}
          className='slide slide-0'
          style={{ backgroundColor: 'lightblue' }}
        >
          0
        </li>
        <li
          ref={pushRef}
          className='slide slide-1'
          style={{ backgroundColor: 'lightgreen' }}
        >
          1
        </li>
        <li
          ref={pushRef}
          className='slide slide-2'
          style={{ backgroundColor: 'lightblue' }}
        >
          2
        </li>
      </ul>
      <button
        className='change-slide-btn change-slide-btn-left'
        onClick={changeSlideLeft}
      >
        &lt;
      </button>
      <button
        className='change-slide-btn change-slide-btn-right'
        onClick={changeSlideRight}
      >
        &gt;
      </button>
    </section>
  );
}
