import React from 'react';
import styles from './Home.module.scss';

function HomePage({ onSignIn, onSignOut }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Customer Service Business Portal</h1>
      <p className={styles.subtitle}>
        Create or update your business rules and guidelines for the customer service bot.
      </p>
      <div className={styles.buttonGroup}>
        <button onClick={onSignIn} className={styles.button}>Sign in</button>
        <button onClick={onSignOut} className={styles.button}>Sign out</button>
      </div>
    </div>
  );
}

export default HomePage;
