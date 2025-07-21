import React, { useState, useEffect, useMemo } from 'react';
import { X, ArrowRight, Leaf, Zap, Target, Heart, ChevronRight } from 'lucide-react';
import { RoadmapContent } from '../helpers/roadmapContent';
import styles from './SectionExperience.module.css';

// --- Reusable Animated Components ---

const AnimatedCounter = ({
  end,
  duration = 2000,
  suffix = '',
  prefix = '',
}: {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (end === 0) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [end, duration]);

  return (
    <span>
      {prefix}
      {count}
      {suffix}
    </span>
  );
};

// --- Content Block Components ---

const HeroSection = ({ title, description }: { title: string; description: string }) => (
  <section className={`${styles.contentBlock} ${styles.heroSection}`}>
    <div className={styles.heroText}>
      <h1 className={styles.heroTitle}>{title}</h1>
      <p className={styles.heroSubtitle}>{description}</p>
    </div>
  </section>
);

const MetricsSection = ({ metrics }: { metrics: { label: string; value: string }[] }) => {
  const parseValue = (value: string) => {
    const numberPart = parseFloat(value.replace(/[^0-9.]/g, ''));
    const suffix = value.replace(/[0-9,.]/g, '').trim();
    return { number: isNaN(numberPart) ? 0 : numberPart, suffix };
  };

  return (
    <section className={styles.contentBlock}>
      <div className={styles.sectionHeader}>
        <Zap className={styles.sectionIcon} />
        <h2>Impact Metrics</h2>
      </div>
      <div className={styles.metricsGrid}>
        {metrics.map((metric, index) => {
          const { number, suffix } = parseValue(metric.value);
          return (
            <div key={index} className={styles.metricCard}>
              <div className={styles.metricValue}>
                <AnimatedCounter end={number} suffix={suffix} />
              </div>
              <div className={styles.metricLabel}>{metric.label}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

const DetailsSection = ({ title, items, icon: Icon }: { title: string; items: string[]; icon: React.ElementType }) => (
  <section className={styles.contentBlock}>
    <div className={styles.sectionHeader}>
      <Icon className={styles.sectionIcon} />
      <h2>{title}</h2>
    </div>
    <ul className={styles.detailsList}>
      {items.map((item, index) => (
        <li key={index} style={{ animationDelay: `${index * 100}ms` }}>
          {item}
        </li>
      ))}
    </ul>
  </section>
);

const SubContentSection = ({
  subContent,
  onSubContentClick,
}: {
  subContent: RoadmapContent[];
  onSubContentClick: (content: RoadmapContent) => void;
}) => (
  <section className={styles.contentBlock}>
    <div className={styles.sectionHeader}>
      <ArrowRight className={styles.sectionIcon} />
      <h2>Explore Further</h2>
    </div>
    <div className={styles.subContentGrid}>
      {subContent.map((item, index) => (
        <div
          key={item.id}
          className={styles.subContentCard}
          onClick={() => onSubContentClick(item)}
          style={{ animationDelay: `${index * 150}ms` }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSubContentClick(item)}
        >
          <h4>{item.title}</h4>
          <p>{item.description}</p>
          <div className={styles.subContentFooter}>
            <span>View Details</span>
            <ChevronRight size={16} />
          </div>
        </div>
      ))}
    </div>
  </section>
);

// --- Main SectionExperience Component ---

interface SectionExperienceProps {
  isOpen: boolean;
  onClose: () => void;
  content: RoadmapContent | null;
  onNavigate: (content: RoadmapContent) => void;
}

export const SectionExperience = ({ isOpen, onClose, content, onNavigate }: SectionExperienceProps) => {
  const [history, setHistory] = useState<RoadmapContent[]>([]);
  const currentContent = history.length > 0 ? history[history.length - 1] : content;

  useEffect(() => {
    if (isOpen && content) {
      setHistory([content]);
    } else if (!isOpen) {
      // Delay clearing history to allow for exit animation
      const timer = setTimeout(() => setHistory([]), 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, content]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleEscapeNavigation();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  const handleClose = () => {
    onClose();
  };

  const handleEscapeNavigation = () => {
    if (history.length > 1) {
      setHistory((prev) => prev.slice(0, -1));
    } else {
      onClose();
    }
  };

  const handleSubContentClick = (subContent: RoadmapContent) => {
    setHistory((prev) => [...prev, subContent]);
    onNavigate(subContent);
  };

  const renderContent = useMemo(() => {
    if (!currentContent) return null;

    return (
      <>
        <HeroSection title={currentContent.title} description={currentContent.description} />
        {currentContent.metrics && currentContent.metrics.length > 0 && (
          <MetricsSection metrics={currentContent.metrics} />
        )}
        {currentContent.keyAchievements && currentContent.keyAchievements.length > 0 && (
          <DetailsSection title="Key Achievements" items={currentContent.keyAchievements} icon={Target} />
        )}
        {currentContent.details && currentContent.details.length > 0 && (
          <DetailsSection title="Details" items={currentContent.details} icon={Heart} />
        )}
        {currentContent.subContent && currentContent.subContent.length > 0 && (
          <SubContentSection subContent={currentContent.subContent} onSubContentClick={handleSubContentClick} />
        )}
      </>
    );
  }, [currentContent, handleSubContentClick]);

  return (
    <div className={`${styles.sectionExperience} ${isOpen ? styles.sectionExperienceOpen : ''}`}>
      <div className={styles.particleContainer}>
        {Array.from({ length: 20 }).map((_, i) => (
          <Leaf
            key={i}
            className={styles.floatingParticle}
            size={12 + Math.random() * 8}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <header className={styles.experienceHeader}>
        <div className={styles.breadcrumbs}>
          {history.map((item, index) => (
            <React.Fragment key={item.id}>
              <span
                className={index < history.length - 1 ? styles.breadcrumbLink : styles.breadcrumbActive}
                onClick={() => index < history.length - 1 && setHistory(history.slice(0, index + 1))}
              >
                {item.title}
              </span>
              {index < history.length - 1 && <ChevronRight size={16} className={styles.breadcrumbSeparator} />}
            </React.Fragment>
          ))}
        </div>
        <button 
          className={styles.closeButton} 
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }} 
          aria-label="Close section"
        >
          <X size={24} />
        </button>
      </header>

      <div className={styles.experienceContent} key={currentContent?.id}>
        {renderContent}
      </div>
    </div>
  );
};