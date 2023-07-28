import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import './Carousel.css';

export default function Carousel({
  numSlides = 3,
  transitionTime = 1500,
  slideTime = 5000,
}) {
  const [carouselWidth, setCarouselWidth] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const [isAuto, setIsAuto] = useState(true);

  const slidesRef = useRef([]);
  const carouselRef = useRef(0);
  const trackRef = useRef(null);
  const btnLeftRef = useRef(null);
  const btnRightRef = useRef(null);
  const btnFocusRef = useRef(null);

  // const timerRef = useRef(null);

  const totalSlides = numSlides + 2;

  const pushRef = (slide) => {
    if (slide && slidesRef.current.length < totalSlides) {
      slidesRef.current.push(slide);
    }
  };

  const transition = useCallback(() => {
    trackRef.current.style.transition = `transform ${
      transitionTime / 1000
    }s ease-in-out`;
  }, [transitionTime]);

  const changeSlideRight = useCallback(
    (e) => {
      if (e) {
        setIsBtnDisabled(true);
      }

      if (e && isAuto) {
        setIsAuto(false);
      }

      if (currentSlide < totalSlides - 1) {
        transition();
        setCurrentSlide((prevSlide) => prevSlide + 1);
      }
    },

    [currentSlide, totalSlides, transition, isAuto]
  );

  const changeSlideLeft = (e) => {
    if (e) {
      setIsBtnDisabled(true);
    }

    if (e && isAuto) {
      setIsAuto(false);
    }

    if (currentSlide > 0) {
      transition();
      setCurrentSlide((prevSlide) => prevSlide - 1);
    }
  };

  const handleCloneSlides = () => {
    transition();
    // clearTimeout(timerRef.current);
    if (currentSlide === 0) {
      trackRef.current.style.transition = 'none';
      setCurrentSlide(totalSlides - 2);
    }

    if (currentSlide === totalSlides - 1) {
      trackRef.current.style.transition = 'none';
      setCurrentSlide(1);
    }

    setIsBtnDisabled(false);
  };

  const focusBtn = (e) => {
    if (e.keyCode === 13) {
      btnFocusRef.current = e.target;
    } else {
      btnFocusRef.current = null;
    }
  };

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

  useEffect(() => {
    setCarouselWidth(carouselRef.current.offsetWidth);
  }, [carouselWidth, carouselRef]);

  useEffect(() => {
    let id;
    if (isAuto) {
      id = setTimeout(
        () => {
          // timerRef.current = id;
          changeSlideRight();
        },
        currentSlide === 1 ? slideTime - transitionTime : slideTime
      );
    } else {
      clearTimeout(id);
    }

    return () => {
      clearTimeout(id);
    };
  }, [
    changeSlideRight,
    currentSlide,
    totalSlides,
    transitionTime,
    slideTime,
    isAuto,
  ]);

  useEffect(() => {
    if (isBtnDisabled || !btnFocusRef.current) return;
    btnFocusRef.current.focus();
    btnFocusRef.current = null;
  }, [isBtnDisabled]);

  return (
    <section ref={carouselRef} className='carousel'>
      <ul ref={trackRef} className='track' onTransitionEnd={handleCloneSlides}>
        <li
          ref={pushRef}
          className='slide slide-0 clone-of-last-slide'
          style={{ backgroundColor: 'purple' }}
        >
          2
        </li>
        <li
          ref={pushRef}
          className='slide slide-1'
          style={{ backgroundColor: 'lightblue' }}
        >
          0
        </li>
        <li
          ref={pushRef}
          className='slide slide-2'
          style={{ backgroundColor: 'lightgreen' }}
        >
          1
        </li>
        <li
          ref={pushRef}
          className='slide slide-3'
          style={{ backgroundColor: 'purple' }}
        >
          2
        </li>
        <li
          ref={pushRef}
          className='slide slide-4 clone-of-first-slide'
          style={{ backgroundColor: 'lightblue' }}
        >
          0
        </li>
      </ul>
      <button
        className='change-slide-btn change-slide-btn-left'
        onClick={changeSlideLeft}
        disabled={isBtnDisabled}
        ref={btnLeftRef}
        onKeyDown={focusBtn}
      >
        &lt;
      </button>
      <button
        className='change-slide-btn change-slide-btn-right'
        onClick={changeSlideRight}
        disabled={isBtnDisabled}
        ref={btnRightRef}
        onKeyDown={focusBtn}
      >
        &gt;
      </button>
    </section>
  );
}
