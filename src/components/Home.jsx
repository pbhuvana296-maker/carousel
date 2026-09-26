import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import img1 from "../assets/images/img1.png";
import img2 from "../assets/images/img2.png";
import img3 from "../assets/images/img3.png";
import img4 from "../assets/images/img4.png";
import img5 from "../assets/images/img5.png";

const slides = [
  {
    image: img1,
    label: "01 • LITTLE ADVENTURE",
    title: "Masha & Bear",
    description:
      "A playful little adventure filled with fun, friendship and unexpected moments.",
    tab: "Masha Adventure",
  },
  {
    image: img2,
    label: "02 • FOREST FRIENDS",
    title: "Masha's World",
    description:
      "Explore a magical forest where every day brings a new story to discover.",
    tab: "Forest Friends",
  },
  {
    image: img3,
    label: "03 • HAPPY MOMENTS",
    title: "Masha & Friends",
    description:
      "Cute moments, playful adventures and unforgettable memories together.",
    tab: "Happy Moments",
  },
  {
    image: img4,
    label: "04 • BIG ADVENTURE",
    title: "Masha's Journey",
    description:
      "Every journey becomes a beautiful adventure when friends are together.",
    tab: "Big Adventure",
  },
  {
    image: img5,
    label: "05 • FOREST DAYS",
    title: "Bear's Home",
    description:
      "A peaceful little world filled with friendship, fun and lovely surprises.",
    tab: "Bear's Home",
  },
];

function Home() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  const changeSlide = (newIndex, dir) => {
    if (isAnimating || newIndex === active) return;

    setIsAnimating(true);
    setDirection(dir);

    setTimeout(() => {
      setActive(newIndex);
    }, 120);

    setTimeout(() => {
      setIsAnimating(false);
    }, 950);
  };

  const nextSlide = () => {
    const nextIndex = (active + 1) % slides.length;
    changeSlide(nextIndex, 1);
  };

  const prevSlide = () => {
    const prevIndex =
      (active - 1 + slides.length) % slides.length;

    changeSlide(prevIndex, -1);
  };

  return (
    <main className="home">

      {/* BACKGROUND */}
      <div className="background-glow glow-one"></div>
      <div className="background-glow glow-two"></div>

      {/* TOP LOGO */}
      <header className="top-bar">
        <div className="logo">
          M A S H A
        </div>

        <div className="collection">
          &amp; BEAR
        </div>
      </header>

      {/* MAIN AREA */}
      <section className="hero">

        {/* =========================
            CONTENT CARD
        ========================== */}

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            className={`content-card ${
              active % 2 === 0
                ? "content-right"
                : "content-left"
            }`}
            initial={{
              x: direction > 0 ? -180 : 180,
              opacity: 0,
              scale: 0.92,
            }}
            animate={{
              x: 0,
              opacity: 1,
              scale: 1,
            }}
            exit={{
              x: direction > 0 ? 180 : -180,
              opacity: 0,
              scale: 0.92,
            }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="content-label">
              {slides[active].label}
            </div>

            <h1>{slides[active].title}</h1>

            <p>{slides[active].description}</p>
          </motion.div>
        </AnimatePresence>


        {/* =========================
            IMAGE CAROUSEL
        ========================== */}

        <div className="carousel-container">

          <div className="carousel-stage">

            {slides.map((slide, index) => {

              let position = index - active;

              /*
                Circular positioning
              */

              if (position > 2) {
                position -= slides.length;
              }

              if (position < -2) {
                position += slides.length;
              }

              const isCenter = position === 0;
              const isLeft = position === -1;
              const isRight = position === 1;

              if (
                position < -1 ||
                position > 1
              ) {
                return null;
              }

              return (
                <motion.div
                  key={index}
                  className={`carousel-item ${
                    isCenter
                      ? "center-item"
                      : isLeft
                      ? "left-item"
                      : "right-item"
                  }`}
                  animate={{
                    x: isCenter
                      ? 0
                      : isLeft
                      ? -285
                      : 285,

                    scale: isCenter
                      ? 1
                      : 0.55,

                    opacity: isCenter
                      ? 1
                      : 0.42,

                    rotateY: isCenter
                      ? 0
                      : isLeft
                      ? 28
                      : -28,

                    rotateZ: isCenter
                      ? 0
                      : isLeft
                      ? -2
                      : 2,

                    z: isCenter
                      ? 100
                      : -80,
                  }}
                  transition={{
                    duration: 0.85,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    zIndex: isCenter ? 10 : 5,
                  }}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    draggable="false"
                  />
                </motion.div>
              );
            })}

          </div>

        </div>

      </section>


      {/* =========================
          BOTTOM CATEGORY BAR
      ========================== */}

      <div className="bottom-tabs">

        {slides.map((slide, index) => (

          <button
            key={index}
            className={
              index === active
                ? "tab active-tab"
                : "tab"
            }
            onClick={() => {

              if (index === active) return;

              const dir =
                index > active ? 1 : -1;

              changeSlide(index, dir);
            }}
            disabled={isAnimating}
          >
            {slide.tab}
          </button>

        ))}

      </div>


      {/* =========================
          ARROW NAVIGATION
      ========================== */}

      <div className="carousel-navigation">

        <button
          className="nav-button"
          onClick={prevSlide}
          disabled={isAnimating}
        >
          ←
        </button>

        <div className="slide-number">
          <span>
            {String(active + 1).padStart(2, "0")}
          </span>

          <div className="number-line"></div>

          <span>
            {String(slides.length).padStart(2, "0")}
          </span>
        </div>

        <button
          className="nav-button"
          onClick={nextSlide}
          disabled={isAnimating}
        >
          →
        </button>

      </div>


      {/* DECORATIVE DOTS */}

      <div className="floating-dot dot-one"></div>
      <div className="floating-dot dot-two"></div>
      <div className="floating-dot dot-three"></div>
      <div className="floating-dot dot-four"></div>

    </main>
  );
}

export default Home;