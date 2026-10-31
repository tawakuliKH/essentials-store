
import "./ProductRange.css";

const categories = [
  {
    id: "kitchen",
    number: "01 / COOK & SERVE",
    title: "Kitchenware",
    description: "Good things start in the kitchen.",
    className: "kitchen",
    icon: "pot",
    details: "Pots, pans, pressure cookers, spoons, forks and kitchen utensils.",
  },
  {
    id: "diy",
    number: "02 / FIX & FINISH",
    title: "DIY & Tools",
    description: "For the jobs on your list.",
    className: "diy",
    icon: "tools",
    details: "Screwdrivers, nails, screws, paint and tools for everyday projects.",
  },
  {
    id: "stationery",
    number: "03 / WRITE & CREATE",
    title: "Stationery",
    description: "Make room for bright ideas.",
    className: "stationery",
    icon: "pencil",
    details: "Explore stationery for everyday writing, schoolwork and creativity.",
  },
  {
    id: "toys",
    number: "04 / PLAY & DISCOVER",
    title: "Toys & Play",
    description: "A little more fun in every day.",
    className: "toys",
    icon: "toy",
    details: "Discover our toy selection in store and find a little inspiration for play.",
  },
];

function CategoryIcon({ type }) {
  const paths = {
    pot: (
      <path d="M13 27h38v20a7 7 0 0 1-7 7H20a7 7 0 0 1-7-7Zm-7 7h7m38 0h7M10 25h44M20 21c0-10 24-10 24 0M29 13V9h6v4" />
    ),
    tools: (
      <path d="M37 12a13 13 0 0 0-9 18L8 50a5 5 0 0 0 7 7l20-20a13 13 0 0 0 18-16l-9 9-10-10 9-9ZM13 8l10 10-5 5L8 13Zm10 15 6 6m11 11 14 14a4 4 0 0 1-6 6L34 46" />
    ),
    pencil: (
      <path d="M12 10h27v44H12ZM19 20h12m-12 8h8m-8 8h5M35 46l6-2 17-26-7-5-17 26Zm13-28 7 5" />
    ),
    toy: (
      <path d="m8 29 18-10 18 10v21L26 60 8 50Zm0 0 18 10 18-10M26 39v21M30 12l12-7 15 9v17l-7 4M42 5v15l15 11M30 12l12 8" />
    ),
  };

  return (
    <svg className="category-icon" viewBox="0 0 64 64" aria-hidden="true">
      {paths[type]}
    </svg>
  );
}

function tiltCard(event) {
  if (
    event.pointerType !== "mouse" ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) return;

  const card = event.currentTarget;
  const bounds = card.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width - 0.5;
  const y = (event.clientY - bounds.top) / bounds.height - 0.5;

  card.style.setProperty("--tilt-x", `${-y * 10}deg`);
  card.style.setProperty("--tilt-y", `${x * 10}deg`);
}

function resetTilt(event) {
  event.currentTarget.style.setProperty("--tilt-x", "0deg");
  event.currentTarget.style.setProperty("--tilt-y", "0deg");
}

export default function ProductRange() {
  return (
    <>
      <div className="benefit-bar">
        <div className="container">
          <span>Useful Things for Real Homes</span>

          <span>
            <span className="benefit-dot" aria-hidden="true">£</span>
            Everyday Value
          </span>

          <span>Find Us on Harehills Lane</span>
        </div>
      </div>

      <section
        className="section container"
        id="range"
        aria-labelledby="range-title"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">EXPLORE THE ESSENTIALS</p>
            <h2 id="range-title">
              A Little of Everything.
              <br />
              A Lot of Everyday Useful.
            </h2>
          </div>

          <p>
            For cooking, fixing, creating and playing.
            <br />
            Discover what you’ll find in store.
          </p>
        </div>

        <div className="category-grid category-grid-3d">
          {categories.map((category) => (
            <a
              key={category.id}
              className={`category category-3d ${category.className}`}
              onPointerMove={tiltCard}
              onPointerLeave={resetTilt}
              onPointerCancel={resetTilt}
              href={`#${category.id}`}
            >
              <span className="category-number">
                {category.number}
              </span>

              <div className="category-object" aria-hidden="true">
                <span className="category-orbit" />
                <span className="category-plinth" />
                <span className="category-medallion">
                  <CategoryIcon type={category.icon} />
                </span>
              </div>

              <div className="category-copy">
                <h3>{category.title}</h3>
                <p>{category.description}</p>
              </div>

              <span className="circle-arrow" aria-hidden="true">↗</span>
            </a>
          ))}
        </div>

        <p className="range-note">
          Our range changes. Call us to check a particular item before you visit.
        </p>
      </section>

      <section
        className="container"
        aria-labelledby="range-details-title"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">A CLOSER LOOK</p>
            <h2 id="range-details-title">
              Find Your Everyday Essentials.
            </h2>
          </div>
        </div>

        <div className="range-list">
          {categories.map((category, index) => (
            <article id={category.id} key={category.id}>
              <span className="list-index">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="category-copy">
                <h3>{category.title}</h3>
                <p>{category.details}</p>
              </div>

              <a className="text-link" href="tel:+441133183217">
                Ask Us
                <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
