import React, { useEffect, useState } from 'react'
import About from './components/AboutSimple'
import BackToTop from './components/BackToTop'
import Contact from './components/Contact'
import Hero from './components/Hero'
import { WhiteLogo } from './components/LogoVariants'
import Projects from './components/Projects'
import Sidebar from './components/Sidebar'

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'projects', 'contact']
      const scrollPosition = window.scrollY + 200

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    // Mobile versiyada section bosilganda sidebar yopiladi
    if (window.innerWidth < 1024) {
      setSidebarOpen(false)
    }
  }

  return (
    <div className='min-h-screen bg-sky-100'>
      {/* Desktop Layout */}
      <div className='hidden lg:flex'>
        <div className='fixed left-0 top-0 w-80 h-full'>
          <Sidebar activeSection={activeSection} onSectionChange={scrollToSection} />
        </div>
        <main className='flex-1 ml-80'>
          <Hero />
          <About />
          <Projects />
          <Contact />
        </main>
      </div>

      {/* Mobile Layout */}
      <div className='lg:hidden'>
        {/* Mobile Header */}
        <div className='sticky top-0 z-50 flex items-center justify-between p-4 bg-gray-900 text-white shadow-lg'>
          <div className='flex items-center'>
            <WhiteLogo size='md' />
          </div>

          <button
            onClick={() => setSidebarOpen(true)}
            className='p-2 rounded-md text-gray-300 hover:text-white focus:outline-none hover:bg-gray-700 transition-colors'
            aria-label='Toggle sidebar'
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 6h16M4 12h16M4 18h16'
              />
            </svg>
          </button>
        </div>

        {/* Mobile Sidebar (Drawer) */}
        {sidebarOpen && (
          <div className='fixed inset-0 z-40 flex'>
            {/* Overlay */}
            <div
              className='fixed inset-0 bg-black bg-opacity-70'
              onClick={() => setSidebarOpen(false)}
            ></div>

            {/* Drawer */}
            <div className='relative w-72 bg-gray-900 h-full z-50 shadow-2xl'>
              <div className='flex justify-end p-4'>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className='text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-800 transition-colors'
                  aria-label='Close sidebar'
                >
                  <svg
                    className='w-6 h-6'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </button>
              </div>
              <Sidebar activeSection={activeSection} onSectionChange={scrollToSection} />
            </div>
          </div>
        )}

        <main>
          <Hero />
          <About />
          <Projects />
          <Contact />
        </main>
      </div>

      {/* Back to Top Button */}
      <BackToTop />
    </div>
  )
}

export default App
