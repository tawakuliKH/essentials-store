
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

          <span>
            YOUR LOCAL EVERYDAY STORE
          </span>
        </div>

        <div>
          <p className="eyebrow">
            HELLO, NEIGHBOUR
          </p>

          <h2 id="about-title">
            The Essentials Store
            <br />
            — your everyday shop in Leeds
          </h2>

          <p>
            The Essentials Store is operated by Zwan Trading Ltd
            at 221 Harehills Lane, Leeds. We bring together
            kitchenware, DIY tools, stationery, toys and
            household essentials in one convenient local shop.
          </p>

          <p>
            From pots, cutlery and pressure cookers to
            screwdrivers, screws and creative supplies,
            explore useful items for your home and everyday
            life. Visit us in Harehills, open seven days a week.
          </p>

          <p>
            <strong>
              Big Value. Everyday Prices.
            </strong>
          </p>

          <a
            className="text-link"
            href="#visit"
          >
            Come and Have a Look

            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M4 12h15m-6-6 6 6-6 6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
