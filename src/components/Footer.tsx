import React from 'react';
import Image from 'next/image';
import { FaInstagram, FaTiktok, FaFacebookF, FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#000', color: '#fff', padding: '2rem', marginTop: 'auto' }}>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: '2rem' }}>
        <div>
          <Image src="/logo.png" alt="Charmski logo" width={120} height={60} style={{ borderRadius: '8px' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="mailto:support@charmski.com" style={{ color: '#fff', textDecoration: 'underline' }}>Support</a>
            <a href="mailto:feedback@charmski.com" style={{ color: '#fff', textDecoration: 'underline' }}>Feedback</a>
          </div>
          <div style={{ display: 'flex', gap: '1rem', fontSize: '1.5rem' }}>
            <a href="https://instagram.com/CharmskiOfficial" target="_blank" rel="noopener noreferrer" style={{ color: '#fff' }}><FaInstagram /></a>
            <a href="https://tiktok.com/@charmski" target="_blank" rel="noopener noreferrer" style={{ color: '#fff' }}><FaTiktok /></a>
            <a href="https://facebook.com/charmski" target="_blank" rel="noopener noreferrer" style={{ color: '#fff' }}><FaFacebookF /></a>
            <a href="https://twitter.com/charmski" target="_blank" rel="noopener noreferrer" style={{ color: '#fff' }}><FaXTwitter /></a>
          </div>
          <div style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem' }}>
            <a href="/privacy-policy" style={{ color: '#fff', textDecoration: 'underline' }}>Privacy Policy</a>
            <a href="/terms-and-conditions" style={{ color: '#fff', textDecoration: 'underline' }}>Terms &amp; Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;