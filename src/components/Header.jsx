import React, { useEffect } from 'react';
import './Header.css';

const Header = () => {
  useEffect(() => {
    // Set the document title when the component is mounted
    document.title = "Ore Classification System";
  }, []);

  return (
    <header className="ore-header">
      <h1>Ore Classification System</h1>
    </header>
  );
};

export default Header;
