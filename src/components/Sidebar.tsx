import React, { useState } from 'react';
import { bubble as Menu } from 'react-burger-menu';
import Link from 'next/link';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleStateChange = (state: { isOpen: boolean }) => {
    setIsOpen(state.isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <Menu
      pageWrapId="page-wrap"
      outerContainerId="outer-container"
      width={220}
      isOpen={isOpen}
      onStateChange={handleStateChange}
      itemListElement="div"
      className="no-aria-hidden"
    >
      <div className="sidebar-link"><Link href="/" className="menu-item" onClick={closeMenu}>Home</Link></div>
      <hr />
      <div className="sidebar-link"><Link href="/my-charms" className="menu-item" onClick={closeMenu}>My Charms</Link></div>
      <hr />
      <div className="sidebar-link"><Link href="/store" className="menu-item" onClick={closeMenu}>Store</Link></div>
      <hr />
      <div className="sidebar-link"><Link href="/about" className="menu-item" onClick={closeMenu}>About</Link></div>
    </Menu>
  );
};

export default Sidebar;