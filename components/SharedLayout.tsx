import React from "react";
import { Link } from "react-router-dom";
import { ThemeModeSwitch } from "./ThemeModeSwitch";
import { EcoCanvas } from "./EcoCanvas";
import styles from "./SharedLayout.module.css";

interface SharedLayoutProps {
  children: React.ReactNode;
}

export const SharedLayout = ({ children }: SharedLayoutProps) => {
  return (
    <div className={styles.container} data-eco-canvas="global-background">
      <EcoCanvas />
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Link to="/" className={styles.logo}>
            <span className={styles.logoText}>Sagar Siripuram</span>
          </Link>
          <ThemeModeSwitch />
        </div>
      </header>
      <main className={styles.mainContent}>{children}</main>
      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Sagar Siripuram. All rights reserved.</p>
      </footer>
    </div>
  );
};