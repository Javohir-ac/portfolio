import React, { useCallback, useEffect, useRef, useState } from 'react'
import About from './components/AboutSimple'
import BackToTop from './components/BackToTop'
import Contact from './components/Contact'
import Hero from './components/Hero'
import MobileNavbar from './components/MobileNavbar'
import Projects from './components/Projects'
import Sidebar from './components/Sidebar'

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero')
  const [sidebarTarget, setSidebarTarget] = useState<string | null>(null)
  const [mobileSidebarVisible, setMobileSidebarVisible] = useState(false)
  const isScrollingRef = useRef(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isMobileRef = useRef(false)
  const pendingScrollRef = useRef<string | null>(null)
  const sidebarAnimationTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const sidebarClosingRef = useRef(false)
  const lastActiveSectionRef = useRef(activeSection)

  useEffect(() => {
    const checkMobile = () => {
      const wasMobile = isMobileRef.current
      isMobileRef.current = window.innerWidth < 1024
      if (wasMobile !== isMobileRef.current) {
        if (pendingScrollRef.current) pendingScrollRef.current = null
        if (sidebarAnimationTimeoutRef.current) {
          clearTimeout(sidebarAnimationTimeoutRef.current)
          sidebarAnimationTimeoutRef.current = null
        }
        isScrollingRef.current = false
        sidebarClosingRef.current = false
        setSidebarTarget(null)
      }
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const sections = ['hero', 'about', 'projects', 'contact']
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    }

    const observer = new IntersectionObserver(entries => {
      if (isScrollingRef.current) return
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id
          setActiveSection(sectionId)
          lastActiveSectionRef.current = sectionId
        }
      })
    }, observerOptions)

    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId)
      if (element) observer.observe(element)
    })

    return () => {
      sections.forEach(sectionId => {
        const element = document.getElementById(sectionId)
        if (element) observer.unobserve(element)
      })
    }
  }, [])

  const performScroll = useCallback((element: HTMLElement, sectionId: string) => {
    isScrollingRef.current = true
    setActiveSection(sectionId)
    lastActiveSectionRef.current = sectionId

    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
    element.scrollIntoView({ behavior: 'smooth' })

    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false
      setSidebarTarget(null)
      pendingScrollRef.current = null
    }, 1000)
  }, [])

  const scrollToSection = useCallback(
    (sectionId: string) => {
      const element = document.getElementById(sectionId)
      if (!element) return

      if (isMobileRef.current && mobileSidebarVisible) {
        setMobileSidebarVisible(false)
        pendingScrollRef.current = sectionId
        setSidebarTarget(sectionId)

        setTimeout(() => {
          if (pendingScrollRef.current) {
            const targetElement = document.getElementById(pendingScrollRef.current)
            if (targetElement) performScroll(targetElement, pendingScrollRef.current)
          }
        }, 350)
      } else {
        performScroll(element, sectionId)
      }
    },
    [mobileSidebarVisible, performScroll]
  )

  const handleSidebarClose = useCallback(() => {
    sidebarClosingRef.current = true
    setMobileSidebarVisible(false)
    setSidebarTarget(null)
    pendingScrollRef.current = null
    isScrollingRef.current = false

    sidebarAnimationTimeoutRef.current = setTimeout(() => {
      sidebarClosingRef.current = false
    }, 350)
  }, [])

  const handleBackToTop = useCallback(() => {
    scrollToSection('hero')
  }, [scrollToSection])

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
      if (sidebarAnimationTimeoutRef.current) clearTimeout(sidebarAnimationTimeoutRef.current)
      sidebarClosingRef.current = false
    }
  }, [])

  return (
    <div className='min-h-screen bg-sky-100'>
      {/* Desktop Sidebar */}
      <div className='hidden lg:block fixed left-0 top-0 w-80 h-full z-50'>
        <Sidebar
          activeSection={activeSection}
          onSectionChange={scrollToSection}
          sidebarTarget={sidebarTarget}
        />
      </div>

      {/* Mobile Navbar */}
      <MobileNavbar
        isSidebarOpen={mobileSidebarVisible}
        onToggleSidebar={() => setMobileSidebarVisible(!mobileSidebarVisible)}
      />

      {/* Mobile Sidebar */}
      <div
        className={`lg:hidden fixed left-0 top-16 w-64 h-full z-50 transition-transform duration-300 transform ${
          mobileSidebarVisible ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar
          activeSection={activeSection}
          onSectionChange={scrollToSection}
          sidebarTarget={sidebarTarget}
          onClose={handleSidebarClose}
        />
      </div>

      {/* Mobile Overlay */}
      {mobileSidebarVisible && (
        <div
          className='lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30'
          onClick={handleSidebarClose}
        />
      )}

      {/* Content */}
      <main className='flex-1 ml-0 lg:ml-80 pt-16 lg:pt-0'>
        <div id='hero'>
          <Hero onSectionChange={scrollToSection} />
        </div>
        <div id='about'>
          <About onSectionChange={scrollToSection} />
        </div>
        <div id='projects'>
          <Projects />
        </div>
        <div id='contact'>
          <Contact onSectionChange={scrollToSection} />
        </div>
      </main>

      {/* Back to Top */}
      <BackToTop onScrollToTop={handleBackToTop} />
    </div>
  )
}

export default App
