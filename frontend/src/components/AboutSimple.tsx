import { motion } from 'framer-motion'
import React from 'react'
import SkillCards from './SkillCards'

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
              style={{ color: '#1f2937' }}
            >
              Men haqimda
            </h2>
            <div
              className='h-1 w-20 sm:w-24 mb-6 rounded-full'
              style={{
                background: 'linear-gradient(to right, #3b82f6, #60a5fa)',
              }}
            ></div>
          </div>

          {/* About Content Card */}
          <div className='bg-white rounded-2xl shadow-md p-4 sm:p-6 md:p-8 border border-gray-100'>
            <div className='grid md:grid-cols-2 gap-6 sm:gap-8 items-center'>
              <div>
                <p className='text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed' style={{ color: '#111827' }}>
                  Assalomu alaykum, men Javohir Jabborov - professional full-stack
                  dasturchi sifatida zamonaviy web ilovalar yaratishga qaratilganman...
                </p>

                <p className='text-base sm:text-lg leading-relaxed' style={{ color: '#111827' }}>
                  Men ReactJS, Node.js, Java/Spring Boot, MongoDB/PostgreSQL, TailwindCSS...
                </p>
              </div>

              <div className='flex justify-center'>
                <div className='bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 sm:p-6 w-full max-w-sm sm:max-w-md'>
                  <div className='text-center'>
                    <div className='inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-blue-100 mb-4'>
                      <svg
                        className='w-6 h-6 sm:w-8 sm:h-8 text-blue-600'
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
                    <h3 className='text-lg sm:text-xl font-bold mb-2' style={{ color: '#1f2937' }}>
                      Professional Yondashuv
                    </h3>
                    <p className='text-gray-600 text-sm sm:text-base'>
                      Har bir loyiha uchun individual yechimlar, zamonaviy texnologiyalar...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
              style={{ color: '#1f2937' }}
            >
              Ko'nikmalar
            </h3>
            <div
              className='h-1 w-16 sm:w-20 mb-6 rounded-full'
              style={{
                background: 'linear-gradient(to right, #3b82f6, #60a5fa)',
              }}
            ></div>
          </div>

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
              style={{
                background: 'linear-gradient(to right, #3b82f6, #60a5fa)',
              }}
            >
              Bog'lanish
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
