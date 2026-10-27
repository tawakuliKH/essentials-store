import ProductRange from "./components/ProductRange";
import About from "./components/About";
import VisitUs from "./components/VisitUs";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";

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
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>

      <div className="announcement">
        <div className="container">
          <span>Big Value. Everyday Prices.</span>
          <a href="#visit">
            Your everyday store in Leeds <span aria-hidden="true">↗</span>
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
            <a href="#range">Our range</a>
            <a href="#about">Our story</a>
            <a href="#questions">Good to know</a>
          </nav>

          <a className="button small header-visit" href="#visit">
            Visit the store
            <ArrowIcon />
          </a>

          <details className="mobile-menu">
            <summary aria-label="Toggle navigation">
              <span />
              <span />
              <span />
            </summary>

            <nav aria-label="Mobile navigation">
              <a href="#range">Our range</a>
              <a href="#about">Our story</a>
              <a href="#questions">Good to know</a>
              <a href="#visit">Visit the store</a>
            </nav>
          </details>
        </div>
      </header>

      <main id="main">
        <section className="hero container" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">
              <span />
              LITTLE THINGS. EVERYDAY LIVING.
            </p>

            <h1 id="hero-title">
              For your home.
              <br />
              For your day.
              <br />
              <span>For less fuss.</span>
            </h1>

            <p className="hero-description">
              From the kitchen drawer to your next DIY project. Find the useful
              things you need, all in one friendly local store.
            </p>

            <div className="actions">
              <a className="button" href="#range">
                Explore our range
                <ArrowIcon />
              </a>

              <a className="text-link" href="#visit">
                Find us in Leeds
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

          <div className="hero-visual">
            <img
              src="/assets/everyday-essentials-1000.webp"
              srcSet="
                /assets/everyday-essentials-640.webp 640w,
                /assets/everyday-essentials-1000.webp 1000w,
                /assets/everyday-essentials-1536.webp 1536w
              "
              sizes="(max-width: 760px) 100vw, 55vw"
              width="1536"
              height="1024"
              alt="Illustrative arrangement of cookware, bowls, utensils and everyday household items"
              fetchPriority="high"
            />

            <div className="hero-sticker">
              <span>
                Everyday
                <br />
                essentials.
              </span>
              <strong>Extra useful.</strong>
              <ArrowIcon />
            </div>

            <div className="photo-caption">
              A little inspiration for everyday life.
            </div>
          </div>
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
