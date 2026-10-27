export default function About() {
  return (
    <section
      className="about"
      id="about"
      aria-labelledby="about-title"
      style={{ marginTop: "64px" }}
    >
      <div className="container about-grid">
        <div className="brand-panel">
          <img
            src="/assets/logo.webp"
            width="1774"
            height="887"
            loading="lazy"
            alt="The Essentials Store — Big Value. Everyday Prices."
          />

          <span>YOUR LOCAL EVERYDAY STORE</span>
        </div>

        <div>
          <p className="eyebrow">HELLO, NEIGHBOUR</p>

          <h2 id="about-title">
            Everyday life.
            <br />
            All the essentials.
          </h2>

          <p>
            We believe the things you use every day should be easy to find.
            That’s the idea behind The Essentials Store: useful choice,
            everyday value and a welcoming place to shop.
          </p>

          <p>
            From kitchenware and household items to tools, stationery and
            toys, we’re here for the practical little things that make a home.
          </p>

          <a className="text-link" href="#visit">
            Come and have a look
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 12h15m-6-6 6 6-6 6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}