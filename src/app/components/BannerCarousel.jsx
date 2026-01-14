'use client';
import { useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function BannerCarousel({ images = [] }) {
  if (!images.length) return null;

  const slides = [...images, images[0]]; // clone first
  const [current, setCurrent] = useState(0);
  const [transition, setTransition] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [current]);

  const nextSlide = () => {
    setTransition(true);
    setCurrent((prev) => prev + 1);
  };

  const prevSlide = () => {
    setTransition(true);
    setCurrent((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  // seamless reset to first slide
  useEffect(() => {
    if (current === images.length) {
      setTimeout(() => {
        setTransition(false);
        setCurrent(0);
      }, 600);
    }
  }, [current, images.length]);

  return (
    <>
      <div className="banner-carousel">
        <div
          className="slider"
          style={{
            transform: `translateX(-${current * 100}%)`,
            transition: transition ? 'transform 0.6s ease-in-out' : 'none',
          }}
        >
          {slides.map((img, i) => (
            <img key={i} src={img} alt={`Banner ${i + 1}`} />
          ))}
        </div>

        {/* React Icon Arrows */}
        <button className="arrow left" onClick={prevSlide}>
          <FiChevronLeft />
        </button>
        <button className="arrow right" onClick={nextSlide}>
          <FiChevronRight />
        </button>
      </div>

      <style jsx>{`
        .banner-carousel {
          position: relative;
          width: 100%;
          height: 610px;
          overflow: hidden;
        }

        .slider {
          display: flex;
          height: 100%;
        }

        .slider img {
          width: 100%;
          height: 100%;
          object-fit: container;
          flex-shrink: 0;
        }

        .arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.55);
          color: #fff;
          border: none;
          cursor: pointer;
          z-index: 5;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 18px rgba(0, 0, 0, 0.35);
          transition: all 0.3s ease;
        }

        .arrow svg {
          font-size: 28px;
        }

        .arrow:hover {
          background: rgba(0, 0, 0, 0.75);
          transform: translateY(-50%) scale(1.08);
        }

        .arrow.left {
          left: 18px;
        }

        .arrow.right {
          right: 18px;
        }

        @media (max-width: 768px) {
          .banner-carousel {
            height: 165px;
          }

          .arrow {
            width: 44px;
            height: 44px;
          }

          .arrow svg {
            font-size: 22px;
          }
        }
      `}</style>
    </>
  );
}
