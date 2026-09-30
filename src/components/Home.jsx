import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import img1 from "../assets/images/img1.png";
import img2 from "../assets/images/img2.png";
import img3 from "../assets/images/img3.png";
import img4 from "../assets/images/img4.png";
import img5 from "../assets/images/img5.png";

/* =================================
   SLIDE DATA
================================= */

const slides = [
  {
    image: img1,
    label: "01 • LITTLE ADVENTURE",
    title: "Masha",
    description:
      "A cheerful little girl full of curiosity, fun and playful adventures.",
    tab: "Masha",
  },

  {
    image: img2,
    label: "02 • UNDER THE SEA",
    title: "Ariel",
    description:
      "A beautiful underwater dream filled with ocean magic, friendship and wonder.",
    tab: "Ariel",
  },

  {
    image: img3,
    label: "03 • ROYAL DREAMS",
    title: "Sofia",
    description:
      "A sweet princess discovering kindness, courage and the magic of being royal.",
    tab: "Sofia",
  },

  {
    image: img4,
    label: "04 • FUN & FRIENDSHIP",
    title: "Mickey",
    description:
      "A timeless character bringing cheerful moments, laughter and endless fun.",
    tab: "Mickey",
  },

  {
    image: img5,
    label: "05 • ENCHANTED BEAUTY",
    title: "Belle",
    description:
      "A graceful princess surrounded by beauty, imagination and an enchanting story.",
    tab: "Belle",
  },
];

/* =================================
   HOME COMPONENT
================================= */

function Home() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  /* =================================
     CHANGE SLIDE
  ================================= */

  const changeSlide = (newIndex, dir) => {
    if (isAnimating || newIndex === active) return;

    setDirection(dir);
    setIsAnimating(true);

    setTimeout(() => {
      setActive(newIndex);
    }, 120);

    setTimeout(() => {
      setIsAnimating(false);
    }, 950);
  };

  /* =================================
     NEXT
  ================================= */

  const nextSlide = () => {
    const nextIndex = (active + 1) % slides.length;

    changeSlide(nextIndex, 1);
  };

  /* =================================
     PREVIOUS
  ================================= */

  const prevSlide = () => {
    const prevIndex =
      (active - 1 + slides.length) % slides.length;

    changeSlide(prevIndex, -1);
  };

  return (
    <main className="home">

      {/* =================================
          BACKGROUND GLOW
      ================================= */}

      <div className="background-glow glow-one"></div>
      <div className="background-glow glow-two"></div>


      {/* =================================
          TOP BAR
      ================================= */}

      <header className="top-bar">

        <div className="logo">
          M A S H A
        </div>

        <div className="collection">
          &amp; BEAR
        </div>

      </header>


      {/* =================================
          HERO
      ================================= */}

      <section className="hero">


        {/* =================================
            CONTENT CARD
        ================================= */}

        <AnimatePresence
          mode="wait"
          initial={false}
        >

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

            {/* CARD LABEL */}

            <div className="content-label">
              {slides[active].label}
            </div>


            {/* CARD TITLE */}

            <h1>
              {slides[active].title}
            </h1>


            {/* CARD DESCRIPTION */}

            <p>
              {slides[active].description}
            </p>

          </motion.div>

        </AnimatePresence>


        {/* =================================
            IMAGE CAROUSEL
        ================================= */}

        <div className="carousel-container">

          <div className="carousel-stage">

            {slides.map((slide, index) => {

              let position = index - active;


              /* ============================
                 CIRCULAR POSITION
              ============================ */

              if (position > 2) {
                position -= slides.length;
              }

              if (position < -2) {
                position += slides.length;
              }


              /* ============================
                 POSITION CHECK
              ============================ */

              const isCenter = position === 0;

              const isLeft = position === -1;

              const isRight = position === 1;


              /* ============================
                 ONLY SHOW 3 IMAGES
              ============================ */

              if (
                position < -1 ||
                position > 1
              ) {
                return null;
              }


              /* ============================
                 IMAGE ITEM
              ============================ */

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


                  /* ==========================
                     POSITION ANIMATION
                  ========================== */

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


                  /* ==========================
                     IMAGE TRANSITION
                  ========================== */

                  transition={{
                    duration: 0.85,
                    ease: [0.22, 1, 0.36, 1],
                  }}


                  /* ==========================
                     Z INDEX
                  ========================== */

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


      {/* =================================
          BOTTOM CATEGORY TABS
      ================================= */}

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


      {/* =================================
          NAVIGATION
      ================================= */}

      <div className="carousel-navigation">


        {/* PREVIOUS BUTTON */}

        <button
          className="nav-button"

          onClick={prevSlide}

          disabled={isAnimating}

          aria-label="Previous slide"
        >
          ←
        </button>


        {/* SLIDE NUMBER */}

        <div className="slide-number">

          <span>
            {String(active + 1).padStart(2, "0")}
          </span>

          <div className="number-line"></div>

          <span>
            {String(slides.length).padStart(2, "0")}
          </span>

        </div>


        {/* NEXT BUTTON */}

        <button
          className="nav-button"

          onClick={nextSlide}

          disabled={isAnimating}

          aria-label="Next slide"
        >
          →
        </button>

      </div>


      {/* =================================
          FLOATING DECORATIVE DOTS
      ================================= */}

      <div className="floating-dot dot-one"></div>

      <div className="floating-dot dot-two"></div>

      <div className="floating-dot dot-three"></div>

      <div className="floating-dot dot-four"></div>

    </main>
  );
}


/* =================================
   EXPORT
================================= */

export default Home;