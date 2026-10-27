export default function Footer() {
  return (
    <>
      <div className="closing-strip">
        <div className="container">
          <span>
            Big Value. <strong>Everyday Prices.</strong>
          </span>

          <span aria-hidden="true">✳</span>
        </div>
      </div>

      <footer>
        <div className="container footer-top">
          <div>
            <a className="footer-brand" href="#">
              The Essentials Store
            </a>

            <p>Useful finds for everyday life.</p>
          </div>

          <nav aria-label="Footer navigation">
            <a href="#range">Our range</a>
            <a href="#about">Our story</a>
            <a href="#visit">Visit us</a>
          </nav>

          <a href="tel:+441133183217">
            0113 318 3217 <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="container footer-bottom">
          <span>
            © {new Date().getFullYear()} Zwan Trading Ltd.
            {" "}The Essentials Store.
          </span>

          <span>
            Product imagery is illustrative. Please check availability
            in store.
          </span>

          <a href="#">Back to top ↑</a>
        </div>
      </footer>
    </>
  );
}