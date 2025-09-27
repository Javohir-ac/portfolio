import { motion } from 'framer-motion'
import React from 'react'
import SkillCards from './SkillCards'

interface AboutProps {
  onSectionChange?: (section: string) => void
}

const About: React.FC<AboutProps> = ({ onSectionChange }) => {
  const handleContactClick = () => {
    if (onSectionChange) {
      onSectionChange('contact')
    } else {
      // Fallback for when not using centralized navigation
      const element = document.getElementById('contact')
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        })
      }
    }
  }
  return (
    <section
      id='about'
      className='min-h-screen py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8'
      style={{ backgroundColor: '#ffffff' }}
    >
      <div className='max-w-6xl mx-auto w-full'>
        {/* About Me Section */}
        <div className='mb-10 sm:mb-12 md:mb-16'>
          {/* Section Header */}
          <div className='text-left mb-5 sm:mb-6 md:mb-8'>
            <h2
              className='text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4'
              style={{ color: '#1f2937' }}
            >
              Men haqimda
            </h2>
            <div
              className='h-1 w-16 sm:w-20 md:w-24 mb-5 sm:mb-6 rounded-full'
              style={{
                background: 'linear-gradient(to right, #3b82f6, #60a5fa)',
              }}
            ></div>
          </div>

          {/* About Content Card */}
          <div className='bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6 md:p-8 border border-gray-100'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-8 items-center'>
              <div>
                <p
                  className='text-base sm:text-lg mb-3 sm:mb-4 md:mb-6 leading-relaxed'
                  style={{ color: '#111827' }}
                >
                  Assalomu alaykum, men Javohir Jabborov - professional full-stack
                  dasturchi sifatida zamonaviy web ilovalar yarataman...
                </p>

                <p
                  className='text-base sm:text-lg leading-relaxed'
                  style={{ color: '#111827' }}
                >
                  Men ReactJS, Node.js, Java/Spring Boot, MongoDB/PostgreSQL, TailwindCSS
                  kabi texnologiyalardan foydalanaman
                </p>
              </div>

              <div className='flex justify-center'>
                <div className='bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 w-full max-w-sm sm:max-w-md'>
                  <div className='text-center'>
                    <div className='inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full bg-blue-100 mb-3 sm:mb-4'>
                      <svg
                        className='w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-blue-600'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                        ></path>
                      </svg>
                    </div>
                    <h3
                      className='text-base sm:text-lg md:text-xl font-bold mb-2'
                      style={{ color: '#1f2937' }}
                    >
                      Professional Yondashuv
                    </h3>
                    <p className='text-gray-600 text-xs sm:text-sm md:text-base'>
                      Har bir loyiha uchun individual yechimlar, zamonaviy
                      texnologiyalar...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className='mb-10 sm:mb-12 md:mb-16'>
          <div className='text-left mb-5 sm:mb-6 md:mb-8'>
            <h3
              className='text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4'
              style={{ color: '#1f2937' }}
            >
              Ko'nikmalar
            </h3>
            <div
              className='h-1 w-12 sm:w-16 md:w-20 mb-5 sm:mb-6 rounded-full'
              style={{
                background: 'linear-gradient(to right, #3b82f6, #60a5fa)',
              }}
            ></div>
          </div>

          <div className='bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6 md:p-8 border border-gray-100'>
            <SkillCards />
          </div>
        </div>

        {/* Call to Action */}
        <div className='text-center'>
          <div className='bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 mb-6 sm:mb-8'>
            <h3
              className='text-xl sm:text-2xl font-bold mb-3 sm:mb-4'
              style={{ color: '#1f2937' }}
            >
              Bilim va ko'nikmalaringizni bahslashaylik!
            </h3>
            <p className='text-gray-600 text-sm sm:text-base mb-5 sm:mb-6 px-4 max-w-lg sm:max-w-xl md:max-w-2xl mx-auto'>
              Loyihangiz haqida gaplashish yoki hamkorlik qilish uchun menga murojaat
              qiling...
            </p>
            <motion.button
              onClick={handleContactClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='inline-block px-5 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 rounded-lg font-semibold text-white transition-all duration-300 shadow-md hover:shadow-lg text-sm sm:text-base w-full sm:w-auto'
              style={{
                background: 'linear-gradient(to right, #3b82f6, #60a5fa)',
              }}
            >
              Bog'lanish
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
