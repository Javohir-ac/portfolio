import React from 'react'
import { WhiteLogo } from './LogoVariants'

interface MobileNavbarProps {
  isSidebarOpen: boolean
  onToggleSidebar: () => void
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({
  isSidebarOpen,
  onToggleSidebar,
}) => {
  return (
    <div className='lg:hidden fixed top-0 left-0 right-0 h-16 bg-gray-900 shadow-lg z-40 flex items-center justify-between px-4'>
      {/* Logo - chap burchakda */}
      <div className='flex items-center'>
        <WhiteLogo size='sm' />
      </div>

      {/* Hamburger menu - o'ng burchakda */}
      <button
        onClick={onToggleSidebar}
        className='p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
        aria-label={isSidebarOpen ? 'Yopish' : 'Ochish'}
        aria-expanded={isSidebarOpen}
      >
        {isSidebarOpen ? (
          // Close icon (X)
          <svg
            className='w-6 h-6 text-white'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            aria-hidden='true'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        ) : (
          // Hamburger icon
          <svg
            className='w-6 h-6 text-white'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            aria-hidden='true'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 6h16M4 12h16M4 18h16'
            />
          </svg>
        )}
      </button>
    </div>
  )
}

export default MobileNavbar
