import React from 'react';
import styles from '../styles/Load1.module.css';

const LoadingPage = () => {
  return (
    <div style={{ backgroundColor: 'orange', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className={styles.main}>
        <div className={styles.up}>
          <div className={styles.loaders}>
            {/* Generando las bolas de carga */}
            {[...Array(10)].map((_, index) => (
              <div key={index} className={styles.loader}>
                <div className={`${styles[`ball${index}`]} ${styles.loaderA}`} />
              </div>
            ))}
          </div>
          <div className={styles.loadersB}>
            {/* Agregando las bolas A (para animación adicional si es necesario) */}
            {[...Array(10)].map((_, index) => (
              <div key={index} className={styles.loaderA}>
                <div className={styles[`ball${index}`]} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
