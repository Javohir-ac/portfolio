import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'

interface HeroProps {
  onSectionChange?: (section: string) => void
}

const Hero: React.FC<HeroProps> = ({ onSectionChange }) => {
  const [currentText, setCurrentText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const texts = [
      'I build web apps',
      'I create UI/UX',
      'I develop solutions',
      'I code the future',
    ]

    const type = () => {
      const current = texts[currentIndex]
      const shouldDelete = isDeleting

      if (shouldDelete) {
        setCurrentText(current.substring(0, currentText.length - 1))
      } else {
        setCurrentText(current.substring(0, currentText.length + 1))
      }

      if (!shouldDelete && currentText === current) {
        setTimeout(() => setIsDeleting(true), 2000)
      } else if (shouldDelete && currentText === '') {
        setIsDeleting(false)
        setCurrentIndex(prevIndex => (prevIndex + 1) % texts.length)
      }
    }

    const timeout = setTimeout(type, isDeleting ? 50 : 100)
    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentIndex])

  const handleSectionClick = (sectionId: string) => {
    if (onSectionChange) {
      onSectionChange(sectionId)
    } else {
      // Fallback for when not using centralized navigation
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <section
      id='hero'
      className='min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 text-center'
      style={{
        background: 'linear-gradient(135deg, #dbeafe, #eff6ff)',
      }}
    >
      <div className='max-w-4xl mx-auto w-full'>
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-5 sm:mb-6'
          style={{ color: '#1f2937' }}
        >
          Salom, men Javohir
        </motion.h1>

        {/* Subtitle with typing animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className='mb-6 sm:mb-8'
        >
          <p
            className='text-lg sm:text-xl md:text-2xl lg:text-3xl mb-3 sm:mb-4'
            style={{ color: '#111827' }}
          >
            Full-stack Developer
          </p>
          <div className='text-base sm:text-lg md:text-xl lg:text-2xl h-7 sm:h-8 flex items-center justify-center min-h-[2rem]'>
            <span className='text-blue-600'>
              {currentText}
              <span className='animate-pulse'>|</span>
            </span>
          </div>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          className='text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-8 sm:mb-10 px-4'
          style={{ color: '#111827' }}
        >
          React, Node.js va zamonaviy texnologiyalar bilan innovatsion web ilovalar
          yarataman. Har bir loyihani ehtiyojingizga mos ravishda ishlab chiqaman.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
          className='flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center'
        >
          <button
            onClick={() => handleSectionClick('projects')}
            className='px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 text-sm sm:text-base w-full sm:w-auto'
            style={{ backgroundColor: '#3b82f6' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#2563eb')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#3b82f6')}
          >
            Loyihalarni ko'rish
          </button>

          <button
            onClick={() => handleSectionClick('contact')}
            className='px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-lg font-semibold border-2 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 text-sm sm:text-base w-full sm:w-auto'
            style={{
              color: '#3b82f6',
              borderColor: '#3b82f6',
              backgroundColor: 'transparent',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = '#3b82f6'
              e.currentTarget.style.color = 'white'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = '#3b82f6'
            }}
          >
            Bog'lanish
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
