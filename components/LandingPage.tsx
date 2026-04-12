"use client";

import React, { useEffect, useMemo, useState } from "react";
import PricingSection from "@/components/PricingSection";
import ContactModal from "@/components/ContactModal";

const IMAGES = {
  logo: "/images/cropped-jiujitsu-samurai-Logo1.png",

  topPage: "/images/top-page.png",
  timetable: "/images/timetable.png",
  verified: "/images/verified.png",
  waiver: "/images/waiver.png",

  // Hero背景はUIスクショではなく別画像にする
  heroBg: "/images/asakusa-lantern.jpg",
} as const;

const YOUTUBE_VIDEO_ID = "cxvPY9P93VM";
const YOUTUBE_EMBED_URL = `https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}`;

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    "https://dojo-manager-94b96.web.app";

  const navClassName = useMemo(() => (scrolled ? "scrolled" : ""), [scrolled]);
  const menuClassName = useMemo(
    () => (menuOpen ? "nav-menu active" : "nav-menu"),
    [menuOpen]
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        }),
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );

    const animatedEls = Array.from(
      document.querySelectorAll(".animate-on-scroll")
    );
    animatedEls.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute("href") || "";
    if (!href.startsWith("#")) return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  return (
    <>
      {/* Navigation */}
      <nav id="nav" className={navClassName}>
        <div className="nav-container">
          <div className="logo-section">
            <img
              className="logo-mark"
              src={IMAGES.logo}
              alt="Dojo Manager logo"
            />
            <span className="logo-text">BJJ</span>
            <a href="#home" className="logo" onClick={handleAnchorClick}>
              DOJO MANAGER · SIMPLE SYSTEMS
            </a>
          </div>

          <div
            className="hamburger"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Open menu"
            role="button"
          >
            <span />
            <span />
            <span />
          </div>

          <ul className={menuClassName} id="navMenu">
            <li>
              <a href="#home" onClick={handleAnchorClick}>
                Home
              </a>
            </li>
            <li>
              <a href="#demo-video" onClick={handleAnchorClick}>
                Demo
              </a>
            </li>
            <li>
              <a href="#product" onClick={handleAnchorClick}>
                Product
              </a>
            </li>

            <li className="dropdown">
              <a href="#solutions" onClick={handleAnchorClick}>
                Solutions
              </a>
              <div className="dropdown-content">
                <a href="#timetable" onClick={handleAnchorClick}>
                  Timetable
                </a>
                <a href="#attendance" onClick={handleAnchorClick}>
                  Attendance
                </a>
                <a href="#payments" onClick={handleAnchorClick}>
                  Payments
                </a>
              </div>
            </li>

            <li>
              <a href="#pricing" onClick={handleAnchorClick}>
                Pricing
              </a>
            </li>

            <li>
              <a href="#download" onClick={handleAnchorClick}>
                Download
              </a>
            </li>

            <li>
              <a href="#gallery" onClick={handleAnchorClick}>
                Gallery
              </a>
            </li>
            <li>
              <a href="#contact" onClick={handleAnchorClick}>
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero */}
      <section
        className="hero"
        id="home"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.62), rgba(0,0,0,0.62)), url('${IMAGES.heroBg}')`,
        }}
      >
        <div className="hero-content hero-layout">
          <div className="hero-copy">
            <div className="hero-tagline">RUN YOUR DOJO · WITH LESS ADMIN</div>
            <h1>BJJ DOJO MANAGER</h1>
            <p>
              Attendance, timetable, members, and payments —
              <br />
              a staff-first system your dojo will actually use.
            </p>

            <div className="hero-actions">
              <a
                href="#download"
                onClick={handleAnchorClick}
                className="team-cta"
                style={{ fontSize: 14, padding: "10px 24px" }}
                aria-label="Go to download section"
              >
                Download
              </a>
              <button
                className="team-cta"
                style={{ fontSize: 14, padding: "10px 24px" }}
                onClick={() => setModalOpen(true)}
                aria-label="Request a demo"
              >
                Request a demo
              </button>
            </div>
          </div>

          <div className="hero-preview animate-on-scroll">
            <img
              src={IMAGES.topPage}
              alt="BJJ Dojo Manager dashboard preview"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* Demo Video */}
      <section className="video-section" id="demo-video">
        <div className="section-content">
          <h2 className="section-title animate-on-scroll">See it in action</h2>

          <p
            className="animate-on-scroll"
            style={{
              maxWidth: 820,
              margin: "0 auto 24px",
              textAlign: "center",
              opacity: 0.9,
              lineHeight: 1.7,
            }}
          >
            Watch a quick walkthrough of BJJ Dojo Manager and see how the system
            works in real dojo operations.
          </p>

          <div
            className="animate-on-scroll"
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 960,
              margin: "0 auto",
              aspectRatio: "16 / 9",
              borderRadius: 20,
              overflow: "hidden",
              boxShadow: "0 20px 50px rgba(0,0,0,0.18)",
              background: "#000",
            }}
          >
            <iframe
              src={YOUTUBE_EMBED_URL}
              title="BJJ Dojo Manager Demo Video"
              width="100%"
              height="100%"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                border: "none",
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* About */}
      <section className="about" id="product">
        <div className="section-content">
          <h2 className="section-title animate-on-scroll">
            Built for busy coaches
          </h2>

          <div className="about-grid">
            <div className="about-images">
              <div className="about-image-wrapper tall animate-on-scroll">
                <img
                  src={IMAGES.timetable}
                  alt="Timetable view"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="about-text animate-on-scroll">
              <p>
                BJJ Dojo Manager is designed around how dojos really operate:
                staff runs the front desk, coaches focus on teaching, and members
                shouldn&apos;t be forced to use an app.
              </p>
              <p>
                Mark attendance in seconds (manual is totally fine), keep your
                timetable consistent, and maintain clean member records —
                without juggling spreadsheets.
              </p>
              <p>
                Want bookings? Turn it on. Don&apos;t want member friction? Keep
                it off. You choose the workflow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Quote */}
      <section className="values">
        <div className="section-content">
          <div className="values-quote animate-on-scroll">
            Discipline on the mats. Clarity off the mats.
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="image-grid-section" id="solutions">
        <div className="section-content">
          <h2 className="section-title animate-on-scroll">Solutions</h2>

          <div className="image-grid">
            <div className="grid-item animate-on-scroll" id="attendance">
              <img
                src={IMAGES.verified}
                alt="Attendance & verification"
                loading="lazy"
              />
            </div>

            <div className="grid-item animate-on-scroll" id="timetable">
              <img src={IMAGES.timetable} alt="Timetable" loading="lazy" />
            </div>

            <div
              className="grid-item feature-card animate-on-scroll"
              id="payments"
            >
              <div className="card-kicker">SOLUTION</div>
              <h3 className="card-title">Payments</h3>
              <p className="card-text">
                Optional, predictable, and simple. Built for staff workflows
                first.
              </p>
              <ul className="card-list">
                <li>Stripe-ready</li>
                <li>Membership status support</li>
                <li>Owner controls the workflow</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <div className="animate-on-scroll" id="pricing">
        <PricingSection
          ctaBasePath={`${appUrl}/register/select`}
          showComparison
        />
      </div>

      {/* Download */}
      <section className="image-grid-section" id="download">
        <div className="section-content">
          <h2 className="section-title animate-on-scroll">Download</h2>

          <p
            className="animate-on-scroll"
            style={{ maxWidth: 860, opacity: 0.9 }}
          >
            Desktop apps for macOS, Windows, and Linux are coming soon.
            <br />
            <span style={{ opacity: 0.7 }}>
              In the meantime, use the web app at{" "}
              <a
                href={appUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "underline", opacity: 1 }}
              >
                dojo-manager-94b96.web.app
              </a>
            </span>
          </p>

          <div className="image-grid" style={{ marginTop: 18 }}>
            <div className="grid-item feature-card animate-on-scroll">
              <div className="card-kicker">macOS</div>
              <h3 className="card-title">Coming soon</h3>
              <p className="card-text">
                Signed desktop app for macOS will be available soon.
              </p>
              <ul className="card-list">
                <li>Native desktop experience</li>
                <li>No browser needed</li>
                <li>Staff-first workflow</li>
              </ul>
              <button
                className="team-cta"
                style={{ fontSize: 13, padding: "8px 20px", marginTop: 12 }}
                onClick={() => setModalOpen(true)}
              >
                Notify me
              </button>
            </div>

            <div className="grid-item feature-card animate-on-scroll">
              <div className="card-kicker">Windows</div>
              <h3 className="card-title">Coming soon</h3>
              <p className="card-text">
                Windows installer will be available here.
              </p>
              <ul className="card-list">
                <li>One-click install</li>
                <li>Auto-updates planned</li>
              </ul>
              <button
                className="team-cta"
                style={{ fontSize: 13, padding: "8px 20px", marginTop: 12 }}
                onClick={() => setModalOpen(true)}
              >
                Notify me
              </button>
            </div>

            <div className="grid-item feature-card animate-on-scroll">
              <div className="card-kicker">Linux</div>
              <h3 className="card-title">Coming soon</h3>
              <p className="card-text">
                Linux package can be added later if needed.
              </p>
              <ul className="card-list">
                <li>AppImage / deb (planned)</li>
              </ul>
              <button
                className="team-cta"
                style={{ fontSize: 13, padding: "8px 20px", marginTop: 12 }}
                onClick={() => setModalOpen(true)}
              >
                Notify me
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="gallery" id="gallery">
        <div className="section-content">
          <h2 className="section-title animate-on-scroll">Gallery</h2>

          <div className="gallery-grid">
            <div className="gallery-item animate-on-scroll">
              <img
                src={IMAGES.topPage}
                alt="BJJ Dojo Manager top page"
                loading="lazy"
              />
            </div>
            <div className="gallery-item animate-on-scroll">
              <img
                src={IMAGES.waiver}
                alt="Member waiver and profile"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="team" id="built">
        <div className="team-container">
          <div className="team-image-wrapper animate-on-scroll">
            <img src={IMAGES.verified} alt="Identity verified" loading="lazy" />
          </div>

          <div className="team-content animate-on-scroll">
            <h2 className="team-title">— Built for Dojo Owners —</h2>
            <p className="team-intro">
              A dojo is a community — and running it well takes more than a
              generic gym app. BJJ Dojo Manager keeps the essentials simple:
              staff tools first, optional member features, and payments that fit
              your business.
            </p>
            <button
              className="team-cta"
              style={{ fontSize: 14, padding: "10px 24px" }}
              onClick={() => setModalOpen(true)}
            >
              Request a demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo-section">
              <div className="footer-logo">
                <span className="footer-logo-text">DM</span>
              </div>
              <div>
                <h3>Let&apos;s Talk</h3>
                <p>
                  Want to see it in action?
                  <br />
                  <button
                    className="footer-demo-link"
                    onClick={() => setModalOpen(true)}
                  >
                    Request a demo →
                  </button>
                </p>
              </div>
            </div>
          </div>

          <div className="footer-section">
            <h3>Based in</h3>
            <p>Vancouver, BC</p>
          </div>

          <div className="footer-section">
            <h3>Contact</h3>
            <p>
              <a href="mailto:hirokitakaya00@gmail.com">
                hirokitakaya00@gmail.com
              </a>
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} BJJ Dojo Manager</p>
        </div>
      </footer>

      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}