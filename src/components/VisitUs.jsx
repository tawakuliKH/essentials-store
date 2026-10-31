
const address = "221 Harehills Lane, Leeds, LS8 3QH";

const directionsUrl =
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

const mapUrl =
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

export default function VisitUs() {
  return (
    <section
      className="section container visit"
      id="visit"
      aria-labelledby="visit-title"
    >
      <div className="visit-copy">
        <p className="eyebrow">
          POP IN. PICK UP. GET ON WITH YOUR DAY.
        </p>

        <h2 id="visit-title">
          Find your essentials
          <br />
          on Harehills Lane.
        </h2>

        <p>
          Come in for the things you need.
          <br />
          Stay for the useful things you hadn’t thought of.
        </p>

        <address>
          <strong>The Essentials Store</strong>
          <br />
          221 Harehills Lane
          <br />
          Leeds, LS8 3QH
        </address>

        <div className="contact-extras">
          <a href="mailto:support@zwantradingltd.co.uk">
            support@zwantradingltd.co.uk
          </a>

          <a
            href="https://wa.me/447466353588"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp: 07466 353588 ↗
          </a>

          <a href="tel:+447466353588">
            Mobile: 07466 353588
          </a>

          <a href="tel:+441133183271">
            Alternative telephone: 0113 318 3271
          </a>

          <p>
            In-store shopping available. Delivery may be
            arranged for selected items, depending on your
            address and order amount. Contact us to enquire.
          </p>
        </div>

        <div className="actions">
          <a
            className="button"
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Directions

            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M4 12h15m-6-6 6 6-6 6" />
            </svg>
          </a>

          <a
            className="text-link"
            href="tel:+441133183271"
          >
            Call 0113 318 3271
          </a>
        </div>

        <div className="opening-hours">
          <h3>Opening Hours</h3>

          <dl>
            <div>
              <dt>Monday–Saturday</dt>
              <dd>10 AM–8 PM</dd>
            </div>

            <div>
              <dt>Sunday</dt>
              <dd>10 AM–7 PM</dd>
            </div>
          </dl>

          <p>
            Leeds local time. Please call ahead for
            bank holiday hours.
          </p>
        </div>
      </div>

      <div className="location-card">
        <div
          className="location-art"
          aria-hidden="true"
        >
          <div className="road road-one" />
          <div className="road road-two" />
          <div className="road road-three" />
          <div className="park" />

          <span className="lane-label">
            HAREHILLS LANE
          </span>

          <span className="map-marker">
            <svg viewBox="0 0 24 24">
              <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
          </span>

          <span className="location-word">
            Hello,
            <br />
            Leeds.
          </span>

          <span className="map-note">
            Illustration · not to scale
          </span>
        </div>

        <div className="location-bottom">
          <span>
            <strong>
              Your local essentials stop.
            </strong>
            <br />
            221 Harehills Lane · LS8 3QH
          </span>

          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Find The Essentials Store on Google Maps"
          >
            ↗
          </a>
        </div>
      </div>
    </section>
  );
}
