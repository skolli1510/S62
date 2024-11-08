import React from 'react';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer" role="contentinfo" aria-label="Footer">
      <div className="footer-content">
        <p>Changes done by Sushma Kolli.</p>
        <p>© {new Date().getFullYear()} S62 App</p> {/* Year updates automatically */}
      </div>
    </footer>
  );
}

export default Footer;
