import React, { useState } from 'react';
import styles from './CompanyForm.module.scss';

function CompanyForm({email, onClickLogout}) {
  const [name, setName] = useState('');
  const [rules, setRules] = useState('');
  const [guidelines, setGuidelines] = useState('');
  const [values, setValues] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`api/company`, {
        method: 'POST',
        headers: {
          'email': email,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          rules,
          guidelines,
          values,
        }),
      });

      if (response.ok) {
        setMessage('Company information submitted successfully!');
        setName('');
        setRules('');
        setGuidelines('');
        setValues('');
        console.log(response.json())
      } else {
        const data = await response.json();
        setMessage(`Submission failed: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setMessage('An unexpected error occurred.');
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h2 className={styles.title}>Company Information</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Company Name"
          />
          <textarea
            className={styles.textarea}
            value={rules}
            onChange={(e) => setRules(e.target.value)}
            placeholder="Rules"
          />
          <textarea
            className={styles.textarea}
            value={guidelines}
            onChange={(e) => setGuidelines(e.target.value)}
            placeholder="Guidelines"
          />
          <textarea
            className={styles.textarea}
            value={values}
            onChange={(e) => setValues(e.target.value)}
            placeholder="Values"
          />
          <button type="submit" className={styles.button}>Submit</button>
          <button onClick={onClickLogout} className={styles.button}>Sign out</button>
        </form>
        {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
      </div>
    </div>
  );
}
export default CompanyForm;