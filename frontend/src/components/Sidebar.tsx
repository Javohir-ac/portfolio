import { motion } from 'framer-motion'
import React from 'react'
import { WhiteLogo } from './LogoVariants'

interface NavItem {
  id: string
  label: string
  icon: React.ReactNode
}

interface SocialLink {
  platform: string
  url: string
  icon: React.ReactNode
}

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const navItems: NavItem[] = [
    {
      id: 'hero',
      label: 'Bosh sahifa',
      icon: (
        <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
          <path d='M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' />
        </svg>
      ),
    },
    {
      id: 'about',
      label: 'Men haqimda',
      icon: (
        <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
          <path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' />
        </svg>
      ),
    },
    {
      id: 'projects',
      label: 'Loyihalar',
      icon: (
        <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
          <path d='M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z' />
        </svg>
      ),
    },
    {
      id: 'contact',
      label: 'Aloqa',
      icon: (
        <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
          <path d='M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z' />
        </svg>
      ),
    },
  ]

  const socialLinks: SocialLink[] = [
    {
      platform: 'GitHub',
      url: 'https://github.com/javohir',
      icon: (
        <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
          <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
        </svg>
      ),
    },
    {
      platform: 'Telegram',
      url: 'https://t.me/Silent_Maze_X',
      icon: (
        <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
          <path d='M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z' />
        </svg>
      ),
    },
    {
      platform: 'Email',
      url: 'mailto:jovohirjabborov85@gmail.com',
      icon: (
        <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
          <path d='M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z' />
        </svg>
      ),
    },
  ]

  return (
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className='fixed top-0 left-0 h-full w-64 lg:w-80 bg-gray-900 text-white z-50 flex flex-col overflow-y-auto'
    >
      {/* Header */}
      <div className='p-6 text-center border-b border-gray-700'>
        <WhiteLogo size='lg' />
        <p className='text-gray-400 text-sm mt-2'>Full-stack Developer</p>
        <p className='text-gray-400 text-sm mt-1'>React • Node.js • TypeScript</p>
      </div>

      {/* Navigation */}
      <nav className='flex-1 p-4'>
        <h3 className='text-sm font-semibold text-gray-400 uppercase mb-3 tracking-wider'>
          Bo'limlar
        </h3>
        <ul className='space-y-3'>
          {navItems.map(item => (
            <li key={item.id}>
              <button
                onClick={() => onSectionChange(item.id)}
                className={`w-full flex items-center px-5 py-4 rounded-xl text-base transition-all duration-300 transform hover:scale-[1.02] ${
                  activeSection === item.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <span className='mr-4'>{item.icon}</span>
                <span className='font-medium'>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Social Links */}
      <div className='p-5 border-t border-gray-700'>
        <h3 className='text-sm font-semibold text-gray-400 uppercase mb-4 tracking-wider'>
          Ijtimoiy tarmoqlar
        </h3>
        <div className='grid grid-cols-3 gap-3'>
          {socialLinks.map(link => (
            <a
              key={link.platform}
              href={link.url}
              target='_blank'
              rel='noopener noreferrer'
              className='flex flex-col items-center p-3 rounded-xl hover:bg-gray-800 transition-all duration-300 transform hover:scale-105'
            >
              <span className='mb-2 w-6 h-6'>{link.icon}</span>
              <span className='text-xs font-medium'>{link.platform}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className='p-4 text-center border-t border-gray-700'>
        <p className='text-sm text-gray-500'>© 2024 Java-Tech</p>
      </div>
    </motion.div>
  )
}

export default Sidebar
