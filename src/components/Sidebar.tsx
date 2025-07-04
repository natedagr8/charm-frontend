import React, { useState } from 'react';
import { elastic as Menu } from 'react-burger-menu';
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
      width={420}
      isOpen={isOpen}
      onStateChange={handleStateChange}
    >
      <Link href="/" className="menu-item" onClick={closeMenu}>
        Home
      </Link>
      <Link href="/scan" className="menu-item" onClick={closeMenu}>
        Scan Charm
      </Link>
      <Link href="/my-charms" className="menu-item" onClick={closeMenu}>
        My Charms
      </Link>
      {/* TODO */}
      {/* <Link href="/friends" className="menu-item" onClick={closeMenu}>
        Friends
      </Link> */}
      <Link href="/store" className="menu-item" onClick={closeMenu}>
        Store
      </Link>
      <Link href="/about" className="menu-item" onClick={closeMenu}>
        About
      </Link>
    </Menu>
  );
};

export default Sidebar;