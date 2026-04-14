import React, { useMemo, useState } from "react";

const services = [
  {
    title: "Brand Identity",
    desc: "Logo systems, brand refreshes, company profiles and visual direction built for serious businesses.",
    price: "From P450",
    tag: "Branding"
  },
  {
    title: "Print & Large Format",
    desc: "Banners, flyers, stickers, posters, signage and marketing print with sharp, modern layouts.",
    price: "From P120",
    tag: "Print"
  },
  {
    title: "Sportswear Design",
    desc: "Custom jersey concepts, sublimation-ready artwork, teamwear mockups and merchandise visuals.",
    price: "From P150",
    tag: "Apparel"
  },
  {
    title: "Website Design",
    desc: "Responsive websites, landing pages, promo pages and branded digital experiences for local businesses.",
    price: "From P1,500",
    tag: "Web"
  },
  {
    title: "Business Documents",
    desc: "Quotations, invoices, profiles, capability statements and presentation materials that look professional.",
    price: "From P100",
    tag: "Business"
  },
  {
    title: "Social Media Creatives",
    desc: "Campaign visuals, product promos, launch posts and clean layouts made to stand out online.",
    price: "From P80",
    tag: "Media"
  }
];

const stats = [
  { value: "24+", label: "Projects Delivered" },
  { value: "10+", label: "Business Categories Served" },
  { value: "100%", label: "Responsive Layout" }
];

const reasons = [
  "Clean and modern digital-first branding direction",
  "Fast local support for printing and business visuals",
  "Strong layouts for signage, apparel and web",
  "Built to look premium on both desktop and mobile"
];

function LogoMark({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 220 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Anlix logo"
      role="img"
    >
      <defs>
        <linearGradient id="brand-gradient" x1="0" y1="0" x2="220" y2="72">
          <stop offset="0%" stopColor="#22D3EE" />
          <stop offset="100%" stopColor="#0EA5E9" />
        </linearGradient>
      </defs>

      <path d="M10 62L32 24L54 62H10Z" fill="url(#brand-gradient)" />
      <path d="M46 6H70L124 62H100L46 6Z" fill="url(#brand-gradient)" />
      <text
        x="114"
        y="63"
        fill="currentColor"
        fontFamily="DM Sans, sans-serif"
        fontWeight="800"
        fontSize="54"
        letterSpacing="-2"
      >
        nlix
      </text>
    </svg>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container nav-shell">
        <a href="#home" className="brand" aria-label="Anlix home">
          <LogoMark className="brand-logo" />
        </a>

        <button
          className={`menu-toggle ${open ? "open" : ""}`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          type="button"
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`nav-links ${open ? "show" : ""}`}>
          <a href="#services" onClick={() => setOpen(false)}>Services</a>
          <a href="#about" onClick={() => setOpen(false)}>About</a>
          <a href="#contact" onClick={() => setOpen(false)}>Contact</a>
          <a href="/dashboard" className="btn-outline" onClick={() => setOpen(false)}>
            Dashboard
          </a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-orb orb-one" />
      <div className="hero-orb orb-two" />

      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="eyebrow">Digital solutions · Print · Branding</div>

          <h1>
            Build a <span>stronger</span> brand with Anlix
          </h1>

          <p className="hero-text">
            From print and signage to apparel concepts and web presence,
            Anlix helps businesses look sharp, modern and ready for growth.
          </p>

          <div className="hero-actions">
            <a href="#contact" className="btn-primary">Request Quote</a>
            <a href="#services" className="btn-secondary">View Services</a>
          </div>

          <div className="hero-stats">
            {stats.map((item) => (
              <div key={item.label} className="hero-stat">
                <div className="hero-stat-value">{item.value}</div>
                <div className="hero-stat-label">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-card-wrap">
          <div className="hero-card">
            <div className="hero-card-top">
              <span className="status-dot" />
              <span>ANLIX STUDIO</span>
            </div>

            <div className="hero-brand-panel">
              <LogoMark className="hero-panel-logo" />
            </div>

            <div className="hero-mini-grid">
              <div className="mini-card">
                <div className="mini-label">Best For</div>
                <div className="mini-value">Branding</div>
              </div>
              <div className="mini-card">
                <div className="mini-label">Mode</div>
                <div className="mini-value">Responsive</div>
              </div>
              <div className="mini-card">
                <div className="mini-label">Focus</div>
                <div className="mini-value">Premium Layout</div>
              </div>
              <div className="mini-card">
                <div className="mini-label">Support</div>
                <div className="mini-value">Local Service</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="section section-dark" id="services">
      <div className="container">
        <div className="section-kicker">What we do</div>
        <h2 className="section-title">Services built to make your business look serious</h2>
        <p className="section-subtitle">
          Every service block below is aligned, responsive and evenly spaced so the landing page
          does not break on smaller screens.
        </p>

        <div className="services-grid">
          {services.map((service) => (
            <article key={service.title} className="service-card">
              <div className="service-icon" />
              <div className="service-tag">{service.tag}</div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
              <div className="service-price">{service.price}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section" id="about">
      <div className="container about-grid">
        <div className="about-panel">
          <div className="about-panel-glow" />
          <LogoMark className="about-logo" />
          <div className="about-big-word">ANLIX</div>
        </div>

        <div className="about-copy">
          <div className="section-kicker">Why Anlix</div>
          <h2 className="section-title">Sharper visuals. Better presentation. Stronger first impression.</h2>
          <p className="section-subtitle">
            This version fixes the landing page layout by using proper grids, spacing, wrapping,
            responsive typography and card alignment across breakpoints.
          </p>

          <ul className="about-list">
            {reasons.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <section className="section section-dark" id="contact">
      <div className="container contact-grid">
        <div>
          <div className="section-kicker">Get started</div>
          <h2 className="section-title">Let’s work on your next design or website project</h2>
          <p className="section-subtitle">
            Use your real business contacts here after you confirm them.
          </p>

          <div className="contact-stack">
            <div className="contact-row">
              <span className="contact-label">Email</span>
              <span className="contact-value">hello@anlix.co.bw</span>
            </div>
            <div className="contact-row">
              <span className="contact-label">Phone</span>
              <span className="contact-value">+267 77 000 000</span>
            </div>
            <div className="contact-row">
              <span className="contact-label">Location</span>
              <span className="contact-value">Botswana</span>
            </div>
          </div>
        </div>

        <form className="contact-form">
          <div className="field-grid">
            <div className="field">
              <label htmlFor="name">Name</label>
              <input id="name" type="text" placeholder="Your name" />
            </div>
            <div className="field">
              <label htmlFor="phone">Phone</label>
              <input id="phone" type="text" placeholder="+267..." />
            </div>
          </div>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="you@example.com" />
          </div>

          <div className="field">
            <label htmlFor="service">Service Needed</label>
            <select id="service" defaultValue="">
              <option value="" disabled>Select service</option>
              <option>Brand Identity</option>
              <option>Print & Large Format</option>
              <option>Sportswear Design</option>
              <option>Website Design</option>
              <option>Business Documents</option>
              <option>Social Media Creatives</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="message">Project Details</label>
            <textarea id="message" rows="5" placeholder="Tell Anlix what you need..." />
          </div>

          <button type="button" className="btn-primary contact-submit">
            Send Request
          </button>
        </form>
      </div>

      <div className="container footer-line">
        <span>© {year} Anlix. All rights reserved.</span>
        <span>Built in React JSX for Render Web Service.</span>
      </div>
    </section>
  );
}

export default function LandingPage() {
  return (
    <>
      <Header />
      <Hero />
      <Services />
      <About />
      <Contact />
    </>
  );
}
