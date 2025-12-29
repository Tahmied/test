'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSubMenus, setActiveSubMenus] = useState(new Set());

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSubMenuToggle = (e, index) => {
    e.preventDefault();
    setActiveSubMenus(prev => {
      const newSet = new Set(prev);
      newSet.has(index) ? newSet.delete(index) : newSet.add(index);
      return newSet;
    });
  };

  return (
    <header className={isMobile ? "header-container-mobile" : "header-container"}>
      <nav className={isMobile ? "navbar-container-mobile" : "navbar-container"}>
        <div className={isMobile ? "logo-container-mobile" : "logo-container"}>
          <Link href="/">
            <Image
              src="/Images/Header/gimbals insider logo.png"
              width={130}
              height={28}
              alt="Logo"
              className="logo"
              priority
            />
          </Link>
        </div>

        {!isMobile ? (
          <>
            <div className="menu">
              <ul className="menu-list-pc">
                <li className="menu-item active"><Link href="/">Home</Link></li>
                <li className="menu-item menu-item-has-children">
                  <Link href="/features">Features</Link>
                  <ul className="sub-menu">
                    <li className="menu-item"><Link href="/features/a">Feature A</Link></li>
                    <li className="menu-item"><Link href="/features/b">Feature B</Link></li>
                    <li className="menu-item"><Link href="/features/c">Feature C</Link></li>
                  </ul>
                </li>
                <li className="menu-item menu-item-has-children">
                  <Link href="/products">Products</Link>
                  <ul className="sub-menu">
                    <li className="menu-item"><Link href="/products/p1">Product 1</Link></li>
                    <li className="menu-item"><Link href="/products/p2">Product 2</Link></li>
                  </ul>
                </li>
                <li className="menu-item"><Link href="/about">About</Link></li>
                <li className="menu-item"><Link href="/contact">Contact</Link></li>
              </ul>
            </div>
            <div className="navbar-cta">
              <Link href="/signup" className="cta-top">Discover Now!</Link>
            </div>
          </>
        ) : (
          <>
            <button
              className="menu-toggle-mobile"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Image
                src={menuOpen ? "/Images/Header/close-icon.svg" : "/Images/Header/menu-icon.svg"}
                width={30}
                height={30}
                alt="Menu"
              />
            </button>
            {menuOpen && (
              <div className="menu-mobile active">
                <ul className="menu-list-mobile">
                  <li className="menu-item active">
                    <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
                  </li>
                  <li className={`menu-item menu-item-has-children ${activeSubMenus.has(0) ? 'active' : ''}`}>
                    <a href="/features" onClick={(e) => handleSubMenuToggle(e, 0)}>
                      <span>Features</span>
                    </a>
                    <ul className={`sub-menu ${activeSubMenus.has(0) ? 'active' : ''}`}>
                      <li><a href="/features/a" onClick={() => setMenuOpen(false)}>Feature A</a></li>
                      <li><a href="/features/b" onClick={() => setMenuOpen(false)}>Feature B</a></li>
                    </ul>
                  </li>
                  <li className={`menu-item menu-item-has-children ${activeSubMenus.has(1) ? 'active' : ''}`}>
                    <a href="/products" onClick={(e) => handleSubMenuToggle(e, 1)}>
                      <span>Products</span>
                    </a>
                    <ul className={`sub-menu ${activeSubMenus.has(1) ? 'active' : ''}`}>
                      <li><a href="/products/p1" onClick={() => setMenuOpen(false)}>Product 1</a></li>
                      <li><a href="/products/p2" onClick={() => setMenuOpen(false)}>Product 2</a></li>
                    </ul>
                  </li>
                  <li><a href="/about" onClick={() => setMenuOpen(false)}>About</a></li>
                  <li><a href="/contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
                  <li><a href="/signup" onClick={() => setMenuOpen(false)}>Sign up</a></li>
                </ul>
              </div>
            )}
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;