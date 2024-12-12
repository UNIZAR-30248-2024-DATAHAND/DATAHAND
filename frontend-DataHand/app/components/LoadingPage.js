import React from 'react';
import styles from '../styles/Load2.module.css';

const LoadingPage = () => {
  return (
      <div className={styles.loadingOverlay} data-testid="loading-overlay">
        <div className={styles.hourglassBackground}>
          <div className={styles.hourglassContainer} data-testid="hourglass-container">
            <div className={styles.hourglassCurves} data-testid="hourglass-curves"></div>
            <div className={styles.hourglassCapTop}></div>
            <div className={styles.hourglassGlassTop}></div>
            <div className={styles.hourglassSand}></div>
            <div className={styles.hourglassSandStream}></div>
            <div className={styles.hourglassCapBottom}></div>
            <div className={styles.hourglassGlass}></div>
          </div>
        </div>
      </div>
  );
};

export default LoadingPage;
