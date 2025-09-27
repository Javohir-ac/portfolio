import React, { useCallback, useEffect, useRef, useState } from 'react'
import About from './components/AboutSimple'
import BackToTop from './components/BackToTop'
import Contact from './components/Contact'
import Hero from './components/Hero'
import MobileNavbar from './components/MobileNavbar' // Yangi import
import Projects from './components/Projects'
import Sidebar from './components/Sidebar'

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarTarget, setSidebarTarget] = useState<string | null>(null)
  const [mobileSidebarVisible, setMobileSidebarVisible] = useState(false)
  const isScrollingRef = useRef(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isMobileRef = useRef(false)
  const pendingScrollRef = useRef<string | null>(null)
  const sidebarAnimationTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const sidebarClosingRef = useRef(false)
  const lastActiveSectionRef = useRef(activeSection)
  const scrollPositionRef = useRef(0)

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      const wasMobile = isMobileRef.current
      isMobileRef.current = window.innerWidth < 1024

      // If switching between mobile/desktop, clear any pending operations
      if (wasMobile !== isMobileRef.current) {
        if (pendingScrollRef.current) {
          pendingScrollRef.current = null
        }
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

  // IntersectionObserver for better scroll detection
  useEffect(() => {
    const sections = ['hero', 'about', 'projects', 'contact']
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    }

    const observer = new IntersectionObserver(entries => {
      // Only update active section if not programmatically scrolling
      if (isScrollingRef.current) {
        return
      }

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
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      sections.forEach(sectionId => {
        const element = document.getElementById(sectionId)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [])

  // Handle scroll to section
  const performScroll = useCallback((element: HTMLElement, sectionId: string) => {
    isScrollingRef.current = true
    setActiveSection(sectionId)
    lastActiveSectionRef.current = sectionId

    // Clear any existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }

    // Scroll to element
    element.scrollIntoView({ behavior: 'smooth' })

    // Reset scrolling state after delay
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false
      setSidebarTarget(null)
      pendingScrollRef.current = null
    }, 1000) // Adjust based on scroll duration
  }, [])

  const scrollToSection = useCallback(
    (sectionId: string) => {
      const element = document.getElementById(sectionId)
      if (!element) return

      // If on mobile and sidebar is open, close it first
      if (isMobileRef.current && mobileSidebarVisible) {
        setMobileSidebarVisible(false)
        pendingScrollRef.current = sectionId
        setSidebarTarget(sectionId)

        // Wait for sidebar to close before scrolling
        setTimeout(() => {
          if (pendingScrollRef.current) {
            const targetElement = document.getElementById(pendingScrollRef.current)
            if (targetElement) {
              performScroll(targetElement, pendingScrollRef.current)
            }
          }
        }, 350) // A bit longer than animation duration (300ms)
      } else {
        performScroll(element, sectionId)
      }
    },
    [mobileSidebarVisible, performScroll]
  )

  const handleSidebarAnimationComplete = useCallback(() => {
    sidebarClosingRef.current = false

    // Check if there's a pending scroll
    if (pendingScrollRef.current) {
      const sectionId = pendingScrollRef.current
      const element = document.getElementById(sectionId)
      if (element) {
        performScroll(element, sectionId)
      } else {
        isScrollingRef.current = false
        setSidebarTarget(null)
        pendingScrollRef.current = null
      }
    }
  }, [performScroll])

  const handleSidebarToggle = useCallback((open: boolean) => {
    setSidebarOpen(open)
    setMobileSidebarVisible(open)

    if (!open) {
      // Clear any pending scroll if sidebar is manually closed
      if (pendingScrollRef.current) {
        pendingScrollRef.current = null
        isScrollingRef.current = false
      }
      setSidebarTarget(null)
    }
  }, [])

  const handleSidebarClose = useCallback(() => {
    sidebarClosingRef.current = true
    setSidebarOpen(false)
    setMobileSidebarVisible(false)

    // Clear any pending scroll if sidebar is manually closed
    if (pendingScrollRef.current) {
      pendingScrollRef.current = null
      isScrollingRef.current = false
    }
    setSidebarTarget(null)

    // Set timeout for manual close as well
    sidebarAnimationTimeoutRef.current = setTimeout(() => {
      sidebarClosingRef.current = false
    }, 350)
  }, [])

  const handleBackToTop = useCallback(() => {
    scrollToSection('hero')
  }, [scrollToSection])

  // Cleanup effect for component unmount
  useEffect(() => {
    return () => {
      // Clear all timeouts and refs on unmount
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      if (sidebarAnimationTimeoutRef.current) {
        clearTimeout(sidebarAnimationTimeoutRef.current)
      }
      sidebarClosingRef.current = false
    }
  }, [])

  return (
    <div className='min-h-screen bg-sky-100'>
      {/* Desktop Sidebar - Always Visible */}
      <div className='hidden lg:block fixed left-0 top-0 w-80 h-full z-50'>
        <Sidebar
          activeSection={activeSection}
          onSectionChange={scrollToSection}
          sidebarTarget={sidebarTarget}
        />
      </div>

      {/* Mobile Navbar - faqat mobil versiyada ko'rinadi */}
      <MobileNavbar
        isSidebarOpen={mobileSidebarVisible}
        onToggleSidebar={() => setMobileSidebarVisible(!mobileSidebarVisible)}
      />

      {/* Mobile Sidebar - Toggleable */}
      <div
        className={`lg:hidden fixed left-0 top-16 w-64 h-full z-50 transition-transform duration-300 transform ${
          mobileSidebarVisible ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar
          activeSection={activeSection}
          onSectionChange={scrollToSection}
          sidebarTarget={sidebarTarget}
          onClose={() => setMobileSidebarVisible(false)} // Yangi prop
        />
      </div>

      {/* Mobile Overlay - faqat sidebar ochiq bo'lsa ko'rinadi */}
      {mobileSidebarVisible && (
        <div
          className='lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30'
          onClick={() => setMobileSidebarVisible(false)}
        />
      )}

      {/* Shared Content (rendered once for both mobile and desktop) */}
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

      {/* Back to Top Button */}
      <BackToTop onScrollToTop={handleBackToTop} />
    </div>
  )
}

export default App
