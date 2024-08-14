'use client';

import { useGlobalContex } from '../Provider';

export default function HamburgerButton() {

  const {setIsSideMenuOpen} = useGlobalContex();
  return (
    <button
      className=" bf-i-ph-list before:mie-0"
      aria-label="Open Menu"
      onClick={() => setIsSideMenuOpen((state) => !state)}
    >
      <span className="sr-only">Open Menu</span>
    </button>
  );
}
