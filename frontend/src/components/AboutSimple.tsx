import { motion } from 'framer-motion'
import React from 'react'
import SkillCards from './SkillCards'

<<<<<<< HEAD
const About: React.FC = () => {
  return (
    <section
      id='about'
      className='min-h-screen py-12 px-4 sm:py-16 sm:px-6 md:py-20 md:px-8'
      style={{ backgroundColor: '#ffffff' }}
    >
      <div className='max-w-6xl mx-auto'>
        {/* About Me Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className='mb-12 sm:mb-16'
        >
          {/* Section Header */}
          <div className='text-left mb-6 sm:mb-8'>
            <h2
              className='text-2xl sm:text-3xl lg:text-4xl font-bold mb-4'
=======
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
        element.scrollIntoView({ behavior: 'smooth' })
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
>>>>>>> 0090d00 (Updated project with responsive navbar and sidebar fix)
              style={{ color: '#1f2937' }}
            >
              Men haqimda
            </h2>
            <div
<<<<<<< HEAD
              className='h-1 w-20 sm:w-24 mb-6 rounded-full'
=======
              className='h-1 w-16 sm:w-20 md:w-24 mb-5 sm:mb-6 rounded-full'
>>>>>>> 0090d00 (Updated project with responsive navbar and sidebar fix)
              style={{
                background: 'linear-gradient(to right, #3b82f6, #60a5fa)',
              }}
            ></div>
          </div>

          {/* About Content Card */}
<<<<<<< HEAD
          <div className='bg-white rounded-2xl shadow-md p-4 sm:p-6 md:p-8 border border-gray-100'>
            <div className='grid md:grid-cols-2 gap-6 sm:gap-8 items-center'>
              <div>
                <p className='text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed' style={{ color: '#111827' }}>
=======
          <div className='bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6 md:p-8 border border-gray-100'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-8 items-center'>
              <div>
                <p
                  className='text-base sm:text-lg mb-3 sm:mb-4 md:mb-6 leading-relaxed'
                  style={{ color: '#111827' }}
                >
>>>>>>> 0090d00 (Updated project with responsive navbar and sidebar fix)
                  Assalomu alaykum, men Javohir Jabborov - professional full-stack
                  dasturchi sifatida zamonaviy web ilovalar yaratishga qaratilganman...
                </p>

<<<<<<< HEAD
                <p className='text-base sm:text-lg leading-relaxed' style={{ color: '#111827' }}>
                  Men ReactJS, Node.js, Java/Spring Boot, MongoDB/PostgreSQL, TailwindCSS...
=======
                <p
                  className='text-base sm:text-lg leading-relaxed'
                  style={{ color: '#111827' }}
                >
                  Men ReactJS, Node.js, Java/Spring Boot, MongoDB/PostgreSQL,
                  TailwindCSS...
>>>>>>> 0090d00 (Updated project with responsive navbar and sidebar fix)
                </p>
              </div>

              <div className='flex justify-center'>
<<<<<<< HEAD
                <div className='bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 sm:p-6 w-full max-w-sm sm:max-w-md'>
                  <div className='text-center'>
                    <div className='inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-blue-100 mb-4'>
                      <svg
                        className='w-6 h-6 sm:w-8 sm:h-8 text-blue-600'
=======
                <div className='bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 w-full max-w-sm sm:max-w-md'>
                  <div className='text-center'>
                    <div className='inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full bg-blue-100 mb-3 sm:mb-4'>
                      <svg
                        className='w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-blue-600'
>>>>>>> 0090d00 (Updated project with responsive navbar and sidebar fix)
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
<<<<<<< HEAD
                    <h3 className='text-lg sm:text-xl font-bold mb-2' style={{ color: '#1f2937' }}>
                      Professional Yondashuv
                    </h3>
                    <p className='text-gray-600 text-sm sm:text-base'>
                      Har bir loyiha uchun individual yechimlar, zamonaviy texnologiyalar...
=======
                    <h3
                      className='text-base sm:text-lg md:text-xl font-bold mb-2'
                      style={{ color: '#1f2937' }}
                    >
                      Professional Yondashuv
                    </h3>
                    <p className='text-gray-600 text-xs sm:text-sm md:text-base'>
                      Har bir loyiha uchun individual yechimlar, zamonaviy
                      texnologiyalar...
>>>>>>> 0090d00 (Updated project with responsive navbar and sidebar fix)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
<<<<<<< HEAD
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className='mb-12 sm:mb-16'
        >
          <div className='text-left mb-6 sm:mb-8'>
            <h3
              className='text-xl sm:text-2xl lg:text-3xl font-bold mb-4'
=======
        </div>

        {/* Skills Section */}
        <div className='mb-10 sm:mb-12 md:mb-16'>
          <div className='text-left mb-5 sm:mb-6 md:mb-8'>
            <h3
              className='text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4'
>>>>>>> 0090d00 (Updated project with responsive navbar and sidebar fix)
              style={{ color: '#1f2937' }}
            >
              Ko'nikmalar
            </h3>
            <div
<<<<<<< HEAD
              className='h-1 w-16 sm:w-20 mb-6 rounded-full'
=======
              className='h-1 w-12 sm:w-16 md:w-20 mb-5 sm:mb-6 rounded-full'
>>>>>>> 0090d00 (Updated project with responsive navbar and sidebar fix)
              style={{
                background: 'linear-gradient(to right, #3b82f6, #60a5fa)',
              }}
            ></div>
          </div>

<<<<<<< HEAD
          <div className='bg-white rounded-2xl shadow-md p-4 sm:p-6 md:p-8 border border-gray-100'>
            <SkillCards />
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className='text-center'
        >
          <div className='bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 sm:p-8 mb-8'>
            <h3 className='text-xl sm:text-2xl font-bold mb-4' style={{ color: '#1f2937' }}>
              Bilim va ko'nikmalaringizni bahslashaylik!
            </h3>
            <p className='text-gray-600 text-sm sm:text-base mb-6 max-w-lg sm:max-w-xl md:max-w-2xl mx-auto'>
              Loyihangiz haqida gaplashish yoki hamkorlik qilish uchun menga murojaat qiling...
            </p>
            <motion.a
              href='#contact'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='inline-block px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold text-white transition-all duration-300 shadow-md hover:shadow-lg'
=======
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
>>>>>>> 0090d00 (Updated project with responsive navbar and sidebar fix)
              style={{
                background: 'linear-gradient(to right, #3b82f6, #60a5fa)',
              }}
            >
              Bog'lanish
<<<<<<< HEAD
            </motion.a>
          </div>
        </motion.div>
=======
            </motion.button>
          </div>
        </div>
>>>>>>> 0090d00 (Updated project with responsive navbar and sidebar fix)
      </div>
    </section>
  )
}

export default About
