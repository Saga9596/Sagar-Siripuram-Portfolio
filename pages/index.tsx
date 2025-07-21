import React from "react";
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Mail, MapPin, Linkedin, Github, Twitter, ExternalLink } from "lucide-react";
import { useBackgroundSwap } from "../utils/useBackgroundSwap";

const Roadmap = dynamic(
  () => import("../components/Roadmap").then((mod) => mod.Roadmap),
  { ssr: false, loading: () => null }
);

import styles from "./index.module.css";

export default function HomePage() {
  useBackgroundSwap();

  return (
    <>
      <Head>
        <title>Living Portfolio - Sagar Siripuram</title>
        <meta
          name="description"
          content="Sagar Siripuram’s sustainability portfolio: LCA, EPDs, climate projects, and impact metrics. Explore my journey via interactive roadmap."
        />
        <link rel="canonical" href="https://your-domain.com/" />
      </Head>

      <main className={styles.main}>
        {/* Hero / About */}
        <section
          className={styles.hero}
          id="about"
          data-bg="/assets/hd/forest-canopy.jpg"
        >
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Hi, I’m Sagar Siripuram
              <span className={styles.heroAccent}>Welcome to my portfolio</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Happy to host you—but before we dive in, shall we take a quick tour?
            </p>
            <div className={styles.heroStats}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>500+</span>
                <span className={styles.statLabel}>Tons CO₂ Saved</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>50+</span>
                <span className={styles.statLabel}>Projects Completed</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>10+</span>
                <span className={styles.statLabel}>Years Experience</span>
              </div>
            </div>
          </div>
        </section>

        {/* Journey / Roadmap */}
        <section
          className={styles.navigation}
          id="journey"
          data-bg="/assets/hd/solar-farm-aerial.jpg"
        >
          <h2 className={styles.sectionTitle}>Here we go…</h2>
          <p className={styles.sectionSubtitle}>
            Alright! Click on any node to explore different aspects of my work.
          </p>
          <Roadmap />
        </section>

        {/* Contact & Social */}
        <section
          className={styles.contact}
          id="contact"
          data-bg="/assets/hd/urban-evening-glow.jpg"
        >
          <div className={styles.contactContent}>
            {/* Left column: Contact Info */}
            <div className={styles.contactInfo}>
              <h2 className={styles.sectionTitle}>Let's Connect</h2>
              <p className={styles.contactDescription}>
                Passionate about creating sustainable solutions and driving environmental impact.  
                Let's collaborate on making a difference.
              </p>
              <div className={styles.contactDetails}>
                <div className={styles.contactItem}>
                  <Mail className={styles.contactIcon} />
                  <a href="mailto:hello@ecofolio.com" className={styles.contactLink}>
                    hello@ecofolio.com
                  </a>
                </div>
                <div className={styles.contactItem}>
                  <MapPin className={styles.contactIcon} />
                  <span className={styles.contactText}>
                    Ankleshwar, Gujarat, India
                  </span>
                </div>
              </div>
            </div>

            {/* Right column: Social + Summary */}
            <div className={styles.socialMedia}>
              <h3 className={styles.socialTitle}>Follow My Work</h3>
              <div className={styles.socialLinks}>
                <a
                  href="https://linkedin.com/in/your-profile"
                  className={styles.socialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className={styles.socialIcon} />
                  <span>LinkedIn</span>
                  <ExternalLink className={styles.externalIcon} />
                </a>
                <a
                  href="https://github.com/your-username"
                  className={styles.socialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className={styles.socialIcon} />
                  <span>GitHub</span>
                  <ExternalLink className={styles.externalIcon} />
                </a>
                <a
                  href="https://twitter.com/your-handle"
                  className={styles.socialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className={styles.socialIcon} />
                  <span>Twitter</span>
                  <ExternalLink className={styles.externalIcon} />
                </a>
              </div>

              <div className={styles.professionalSummary}>
                <p>
                  <strong>Sustainability Consultant & LCA Expert</strong>
                </p>
                <p>
                  Specialized in Life Cycle Assessment, Environmental Product Declarations,  
                  and sustainable material selection. ACLCA LCACP certified with 10+ years  
                  of experience helping organizations reduce their environmental footprint.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} Sagar Siripuram. All rights reserved.</p>
      </footer>
    </>
  );
}
