import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          className='fixed bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-10 lg:right-10 
                     z-50 p-3 sm:p-4 lg:p-5 
                     rounded-full shadow-lg transition-all duration-300 
                     hover:shadow-xl transform hover:scale-110 bg-blue-500 text-white'
          title='Yuqoriga qaytish'
        >
          <svg
            className='w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M5 10l7-7m0 0l7 7m-7-7v18'
            />
          </svg>
        </motion.button>
      )}
    </>
  )
}

export default BackToTop
