
import { useEffect, useRef } from "react";

import ProductRange from "./components/ProductRange";
import About from "./components/About";
import VisitUs from "./components/VisitUs";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import ProductShowcase from "./components/ProductShowcase";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 12h15m-6-6 6 6-6 6" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function App() {
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    function handleOutsideClick(event) {
      const menu = mobileMenuRef.current;
      if (menu?.open && !menu.contains(event.target)) {
        menu.open = false;
      }
    }

    function handleEscape(event) {
      const menu = mobileMenuRef.current;
      if (event.key === "Escape" && menu?.open) {
        menu.open = false;
        menu.querySelector("summary")?.focus();
      }
    }

    document.addEventListener("click", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function closeMobileMenu(event) {
    if (event.target.closest("a") && mobileMenuRef.current) {
      mobileMenuRef.current.open = false;
    }
  }

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>

      <div className="announcement">
        <div className="container">
          <span>Big Value. Everyday Prices.</span>
          <a href="#visit">
            Your Everyday Store in Leeds{" "}
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      <header className="header">
        <div className="container header-inner">
          <a
            className="navbar-brand"
            href="#"
            aria-label="The Essentials Store home"
          >
            <img
              src="/assets/logo.webp"
              width="1774"
              height="887"
              alt="The Essentials Store — Big Value. Everyday Prices."
            />
          </a>

          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="#range">Our Range</a>
            <a href="#about">Our Story</a>
            <a href="#questions">Good to Know</a>
          </nav>

          <a className="button small header-visit" href="#visit">
            VISIT THE STORE
            <ArrowIcon />
          </a>

          <details className="mobile-menu" ref={mobileMenuRef}>
            <summary aria-label="Toggle navigation">
              <span />
              <span />
              <span />
            </summary>

            <nav
              aria-label="Mobile navigation"
              onClick={closeMobileMenu}
            >
              <a href="#range">Our Range</a>
              <a href="#about">Our Story</a>
              <a href="#questions">Good to Know</a>
              <a href="#visit">VISIT THE STORE</a>
            </nav>
          </details>
        </div>
      </header>

      <main id="main">
        <section
          className="hero container"
          aria-labelledby="hero-title"
        >
          <div className="hero-copy">
            <p className="eyebrow">
              <span />
              LITTLE THINGS. EVERYDAY LIVING.
            </p>

            <h1 id="hero-title">
              For Your Home.
              <br />
              For Your Day.
              <br />
              <span>For Less Fuss.</span>
            </h1>

            <p className="hero-description">
              From the kitchen drawer to your next DIY project.
              Find the useful things you need, all in one
              friendly local store.
            </p>

            <div className="actions">
              <a className="button" href="#range">
                Explore Our Range
                <ArrowIcon />
              </a>

              <a className="text-link" href="#visit">
                Find Us in Leeds
                <PinIcon />
              </a>
            </div>

            <div className="hero-note">
              <span className="little-spark" aria-hidden="true">
                ✳
              </span>
              <span>
                Big Value. Everyday Prices.
                <br />
                <small>That’s the essentials way.</small>
              </span>
            </div>
          </div>

          <ProductShowcase />
        </section>

        <ProductRange />
        <About />
        <VisitUs />
        <FAQ />
      </main>

      <Footer />
      <Chatbot />
    </>
  );
}

export default App;
