
export default function Footer() {
  return (
    <>
      <div className="closing-strip">
        <div className="container">
          <span>
            Big Value.{" "}
            <strong>Everyday Prices.</strong>
          </span>

          <span aria-hidden="true">✳</span>
        </div>
      </div>

      <footer>
        <div className="container footer-top">
          <div>
            <a
              className="footer-brand"
              href="#"
            >
              The Essentials Store
            </a>

            <p>
              Useful finds for everyday life.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <a href="#range">Our Range</a>
            <a href="#about">Our Story</a>
            <a href="#visit">Visit Us</a>
          </nav>

          <a href="tel:+441133183271">
            0113 318 3271{" "}
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="container footer-bottom">
          <span>
            © {new Date().getFullYear()} Zwan Trading Ltd.
            {" "}The Essentials Store.
          </span>

          <span>
            Product imagery is illustrative.
            Please check availability in store.
          </span>

          <a href="#">
            Back to Top ↑
          </a>
        </div>

        <div className="container developer-credit">
          <span>
            Designed &amp; Developed by{" "}
            <a
              href="https://resume-tawakuli.onrender.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Morteza Tawakuli's portfolio"
            >
              Morteza Tawakuli ↗
            </a>
          </span>
        </div>
      </footer>
    </>
  );
}
