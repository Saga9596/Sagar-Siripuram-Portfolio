import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Mail, MapPin, Linkedin, Github, Twitter, ExternalLink } from "lucide-react";

import { Roadmap } from "../components/Roadmap";
import styles from "./_index.module.css";

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>EcoFolio | Interactive Sustainability Portfolio</title>
        <meta
          name="description"
          content="An interactive, gamified portfolio showcasing sustainability expertise and environmental impact. Navigate through my professional journey using our innovative roadmap interface."
        />
        <meta name="keywords" content="sustainability, LCA, portfolio, environmental impact, climate, green technology" />
      </Helmet>
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Welcome to My
              <span className={styles.heroAccent}> Living Portfolio</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Exploring sustainability through a journey of growth and impact. 
              Navigate my professional story using the interactive roadmap below.
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

        <section className={styles.navigation}>
          <h2 className={styles.sectionTitle}>Explore My Journey</h2>
          <p className={styles.sectionSubtitle}>
            Click on any node to explore different aspects of my sustainability work
          </p>
          <Roadmap />
        </section>

        <section className={styles.contact} id="contact-section">
          <div className={styles.contactContent}>
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
                  <span className={styles.contactText}>San Francisco, CA</span>
                </div>
              </div>
            </div>

            <div className={styles.socialMedia}>
              <h3 className={styles.socialTitle}>Follow My Work</h3>
              <div className={styles.socialLinks}>
                <a
                  href="https://linkedin.com/in/sustainability-expert"
                  className={styles.socialLink}
                  aria-label="LinkedIn Profile"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className={styles.socialIcon} />
                  <span>LinkedIn</span>
                  <ExternalLink className={styles.externalIcon} />
                </a>
                <a
                  href="https://github.com/sustainability-expert"
                  className={styles.socialLink}
                  aria-label="GitHub Profile"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className={styles.socialIcon} />
                  <span>GitHub</span>
                  <ExternalLink className={styles.externalIcon} />
                </a>
                <a
                  href="https://twitter.com/sustainability_expert"
                  className={styles.socialLink}
                  aria-label="Twitter Profile"
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
    </>
  );
}