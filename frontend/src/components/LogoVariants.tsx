import React from 'react'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

// White Logo - Used in Sidebar and Mobile Header
export const WhiteLogo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: {
      container: 'w-8 h-8',
      text: 'text-sm',
      containerText: 'text-sm',
      logoContainer: 'w-6 h-6',
      logoText: 'text-xs',
    },
    md: {
      container: 'w-10 h-10',
      text: 'text-base',
      containerText: 'text-lg',
      logoContainer: 'w-8 h-8',
      logoText: 'text-sm',
    },
    lg: {
      container: 'w-12 h-12',
      text: 'text-lg',
      containerText: 'text-xl',
      logoContainer: 'w-10 h-10',
      logoText: 'text-base',
    },
  }

  return (
    <div className={`flex items-center ${className}`}>
      {/* Logo container with blue background */}
      <div
        className={`${sizes[size].container} rounded-lg flex items-center justify-center mr-3`}
        style={{ backgroundColor: '#3b82f6' }}
      >
        {/* Inner white container */}
        <div
          className={`${sizes[size].logoContainer} rounded flex items-center justify-center`}
          style={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
          }}
        >
          {/* JT Letters */}
          <span
            className={`font-bold ${sizes[size].logoText}`}
            style={{ color: '#3b82f6' }}
          >
            JT
          </span>
        </div>
      </div>
      <span className={`font-bold ${sizes[size].containerText} text-white`}>Javohir</span>
    </div>
  )
}

export default WhiteLogo
