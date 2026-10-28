import { useEffect, useRef, useState } from 'react';
import './ProductShowcase.css';

const slides = [
  { image: 'everyday-essentials', title: 'Everyday, made easier.', label: 'A little of everything', category: 'Explore our range', href: '#range', colour: '#ffb51b', alt: 'Illustrative cookware, bowls, utensils and everyday household essentials on cream display plinths' },
  { image: 'showcase-kitchen', title: 'Good things start here.', label: 'Cook & serve', category: 'Kitchen essentials', href: '#kitchen', colour: '#f45116', alt: 'Illustrative pressure cooker, enamel pot, bowls and utensils in a sunlit kitchenware arrangement' },
  { image: 'showcase-diy', title: 'For your next little fix.', label: 'Fix & finish', category: 'DIY & tools', href: '#diy', colour: '#00aaa7', alt: 'Illustrative screwdrivers, paint supplies, tape measure and hardware on cream display plinths' },
  { image: 'showcase-play', title: 'A little more possibility.', label: 'Create & play', category: 'Stationery & toys', href: '#range', colour: '#ffb51b', alt: 'Illustrative notebooks, pencils, toy car, building blocks and teddy bear on cream display plinths' },
];

function Chevron({ previous = false }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d={previous ? 'm14 6-6 6 6 6' : 'm10 6 6 6-6 6'} /></svg>;
}

export default function ProductShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const rootRef = useRef(null);
  const touchStart = useRef(null);
  const playing = !paused && !hovered && !reducedMotion && visible && pageVisible;

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotion = () => setReducedMotion(media.matches);
    const syncVisibility = () => setPageVisible(!document.hidden);
    syncMotion();
    syncVisibility();
    media.addEventListener('change', syncMotion);
    document.addEventListener('visibilitychange', syncVisibility);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.2 });
    observer.observe(rootRef.current);
    return () => {
      media.removeEventListener('change', syncMotion);
      document.removeEventListener('visibilitychange', syncVisibility);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => setActive((index) => (index + 1) % slides.length), 6500);
    return () => window.clearTimeout(timer);
  }, [active, playing]);

  function select(index) {
    setPaused(true);
    setActive((index + slides.length) % slides.length);
  }

  return (
    <section
      className="product-showcase"
      ref={rootRef}
      aria-label="Discover our everyday essentials"
      aria-roledescription="carousel"
      style={{ '--showcase-accent': slides[active].colour }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget) && !event.target.closest('[data-rotation-control]')) setPaused(true);
      }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
          event.preventDefault();
          select(active + (event.key === 'ArrowRight' ? 1 : -1));
        }
      }}
    >
      <div className="showcase-heading">
        <span><i /> THE EVERYDAY COLLECTION</span>
        <span className="showcase-count" aria-hidden="true">0{active + 1} <span>/ 04</span></span>
      </div>

      <div
        className="showcase-stage"
        onTouchStart={(event) => {
          if (event.touches.length !== 1) { touchStart.current = null; return; }
          touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
          setPaused(true);
        }}
        onTouchCancel={() => { touchStart.current = null; }}
        onTouchEnd={(event) => {
          if (!touchStart.current) return;
          const dx = event.changedTouches[0].clientX - touchStart.current.x;
          const dy = event.changedTouches[0].clientY - touchStart.current.y;
          if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.4) select(active + (dx < 0 ? 1 : -1));
          touchStart.current = null;
        }}
      >
        <div className="showcase-orbit" aria-hidden="true" />
        <div className="showcase-floor" aria-hidden="true" />
        <div className="showcase-deck">
          {slides.map((slide, index) => (
            <article
              key={slide.image}
              className={`showcase-slide showcase-position-${(index - active + slides.length) % slides.length}${active === index ? ' is-active' : ''}`}
              aria-hidden={active !== index}
              inert={active !== index}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${slides.length}: ${slide.category}`}
            >
              <img
                src={`/assets/${slide.image}-1000.webp`}
                srcSet={`/assets/${slide.image}-640.webp 640w, /assets/${slide.image}-1000.webp 1000w, /assets/${slide.image}-1536.webp 1536w`}
                sizes="(max-width: 760px) 90vw, (max-width: 1400px) 45vw, 600px"
                width="1536"
                height="1024"
                alt={slide.alt}
                fetchPriority={index === 0 ? 'high' : 'low'}
                decoding="async"
                draggable="false"
              />
              <div className="showcase-shade" />
              <div className="showcase-copy">
                <span className="showcase-label">{slide.label}</span>
                <h2>{slide.title}</h2>
                <a href={slide.href}>{slide.category}<span aria-hidden="true">↗</span></a>
              </div>
            </article>
          ))}
        </div>
        <div className="showcase-seal" aria-hidden="true"><span>BIG VALUE.</span><strong>Everyday<br />finds.</strong><span>EXTRA USEFUL.</span></div>
      </div>

      <div className="showcase-controls">
        <div className="showcase-dots" role="group" aria-label="Choose product slide">
          {slides.map((slide, index) => (
            <button key={slide.image} type="button" aria-label={`Show ${slide.category}`} aria-current={active === index ? 'true' : undefined} onClick={() => select(index)}>
              <span />
            </button>
          ))}
        </div>
        <div className="showcase-buttons">
          {!reducedMotion && <button data-rotation-control type="button" aria-label={paused ? 'Start automatic slideshow' : 'Pause automatic slideshow'} onClick={() => setPaused((value) => !value)}>
            <svg viewBox="0 0 24 24" aria-hidden="true">{paused ? <path d="m9 5 11 7-11 7Z" /> : <path d="M9 5v14M15 5v14" />}</svg>
          </button>}
          <button type="button" aria-label="Previous product slide" onClick={() => select(active - 1)}><Chevron previous /></button>
          <button type="button" aria-label="Next product slide" onClick={() => select(active + 1)}><Chevron /></button>
        </div>
      </div>
      <p className="showcase-disclaimer">A little inspiration. Imagery is illustrative; ask us about availability.</p>
      <span className="sr-only" aria-live={playing ? 'off' : 'polite'} aria-atomic="true">Slide {active + 1} of {slides.length}: {slides[active].category}</span>
    </section>
  );
}
