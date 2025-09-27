import { motion } from 'framer-motion'
import React, { useState } from 'react'

// Define the project interface
interface Project {
  id: number
  title: string
  description: string
  category: string
  technologies: string[]
  image: string
  demoUrl: string
  githubUrl: string
  features: string[]
}

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const filters = ['All', 'Frontend', 'Backend', 'Full-Stack']

  const projects = [
    {
      id: 1,
      title: 'E-commerce Dashboard',
      description:
        'React va Node.js bilan yaratilgan zamonaviy e-commerce boshqaruv paneli.',
      category: 'Full-Stack',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
      image:
        'https://via.placeholder.com/400x250/3b82f6/ffffff?text=E-commerce+Dashboard',
      demoUrl: 'https://demo1.example.com',
      githubUrl: 'https://github.com/javohir/ecommerce-dashboard',
      features: [
        'User authentication',
        'Product management',
        'Order tracking',
        'Analytics dashboard',
      ],
    },
    {
      id: 2,
      title: 'Weather App',
      description: 'Responsive ob-havo ilovasi OpenWeather API integratsiyasi bilan.',
      category: 'Frontend',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'API Integration'],
      image: 'https://via.placeholder.com/400x250/2563eb/ffffff?text=Weather+App',
      demoUrl: 'https://demo2.example.com',
      githubUrl: 'https://github.com/javohir/weather-app',
      features: [
        'Real-time weather data',
        'Location search',
        '5-day forecast',
        'Responsive design',
      ],
    },
    {
      id: 3,
      title: 'REST API Server',
      description: 'Express.js va MongoDB bilan yaratilgan RESTful API server.',
      category: 'Backend',
      technologies: ['Node.js', 'Express', 'MongoDB', 'JWT'],
      image: 'https://via.placeholder.com/400x250/1f2937/ffffff?text=REST+API+Server',
      demoUrl: 'https://api.example.com/docs',
      githubUrl: 'https://github.com/javohir/rest-api-server',
      features: [
        'JWT authentication',
        'CRUD operations',
        'Data validation',
        'API documentation',
      ],
    },
  ]

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter(project => project.category === activeFilter)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  }

  return (
    <section
      id='projects'
      className='min-h-screen py-16 sm:py-20 px-4 sm:px-6 lg:px-8'
      style={{ backgroundColor: '#E0F2FF' }}
    >
      <div className='max-w-7xl mx-auto w-full'>
        <div>
          {/* Header */}
          <div className='text-center mb-12 sm:mb-16'>
            <h2
              className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-4'
              style={{ color: '#1f2937' }}
            >
              Loyihalar
            </h2>
            <div
              className='w-20 h-1 sm:w-24 mx-auto mb-5 sm:mb-6'
              style={{ backgroundColor: '#3b82f6' }}
            ></div>
            <p
              className='text-base sm:text-xl max-w-2xl mx-auto px-4'
              style={{ color: '#111827' }}
            >
              Zamonaviy texnologiyalar bilan yaratilgan loyihalarimga nazar tashlang.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className='flex justify-center mb-8 sm:mb-12'>
            <div className='flex flex-nowrap overflow-x-auto gap-1.5 sm:gap-2 p-1 bg-white rounded-lg shadow-md scrollbar-hide'>
              {filters.map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-2 sm:px-4 sm:py-2 rounded-md font-medium whitespace-nowrap flex-shrink-0 text-sm sm:text-base ${
                    activeFilter === filter ? 'text-white shadow-md' : 'text-gray-600'
                  } min-w-[80px] sm:min-w-[100px] md:min-w-[120px] flex items-center justify-center transition-all duration-200 hover:scale-105`}
                  style={{
                    backgroundColor: activeFilter === filter ? '#3b82f6' : 'transparent',
                  }}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
            {filteredProjects.map(project => (
              <div
                key={project.id}
                className='bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition w-full'
                style={{ border: '1px solid #e5e7eb' }}
                onClick={() => setSelectedProject(project)}
              >
                <div className='relative overflow-hidden'>
                  <img
                    src={project.image}
                    alt={project.title}
                    className='w-full h-40 sm:h-48 md:h-56 object-cover'
                  />
                  <div className='absolute top-3 sm:top-4 right-3 sm:right-4'>
                    <span
                      className='px-2.5 py-1 sm:px-3 sm:py-1 bg-white bg-opacity-90 rounded-full text-xs sm:text-sm font-medium'
                      style={{ color: '#3b82f6' }}
                    >
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className='p-4 sm:p-6'>
                  <h3
                    className='text-lg sm:text-xl font-bold mb-2 sm:mb-3'
                    style={{ color: '#1f2937' }}
                  >
                    {project.title}
                  </h3>
                  <p className='text-gray-600 text-sm sm:text-base mb-3 sm:mb-4 line-clamp-2'>
                    {project.description}
                  </p>
                  <div className='flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4'>
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className='px-2 py-1 sm:px-3 sm:py-1 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm'
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className='flex flex-col sm:flex-row gap-2 sm:gap-3'>
                    <a
                      href={project.demoUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex-1 text-center px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-medium text-white text-sm sm:text-base'
                      style={{ backgroundColor: '#3b82f6' }}
                      onClick={e => e.stopPropagation()}
                    >
                      Demo
                    </a>
                    <a
                      href={project.githubUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex-1 text-center px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-medium border text-sm sm:text-base'
                      style={{
                        color: '#3b82f6',
                        borderColor: '#3b82f6',
                        backgroundColor: 'transparent',
                      }}
                      onClick={e => e.stopPropagation()}
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className='bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto'
            onClick={e => e.stopPropagation()}
          >
            <div className='relative'>
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className='w-full h-48 sm:h-64 object-cover'
              />
              <button
                onClick={() => setSelectedProject(null)}
                className='absolute top-3 sm:top-4 right-3 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 bg-white bg-opacity-90 rounded-full flex items-center justify-center'
              >
                <svg
                  className='w-5 h-5 sm:w-6 sm:h-6 text-gray-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>
            <div className='p-5 sm:p-8'>
              <div className='flex flex-wrap items-center gap-3 sm:gap-4 mb-4'>
                <h3
                  className='text-2xl sm:text-3xl font-bold'
                  style={{ color: '#1f2937' }}
                >
                  {selectedProject.title}
                </h3>
                <span
                  className='px-2.5 py-1 sm:px-3 sm:py-1 bg-blue-100 rounded-full text-xs sm:text-sm font-medium'
                  style={{ color: '#3b82f6' }}
                >
                  {selectedProject.category}
                </span>
              </div>
              <p className='text-base sm:text-lg text-gray-600 mb-5 sm:mb-6'>
                {selectedProject.description}
              </p>

              <div className='mb-5 sm:mb-6'>
                <h4
                  className='text-lg sm:text-xl font-semibold mb-3'
                  style={{ color: '#1f2937' }}
                >
                  Xususiyatlar:
                </h4>
                <ul className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                  {selectedProject.features.map((feature: string, index: number) => (
                    <li
                      key={index}
                      className='flex items-center text-gray-600 text-sm sm:text-base'
                    >
                      <svg
                        className='w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-500 flex-shrink-0'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path
                          fillRule='evenodd'
                          d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                          clipRule='evenodd'
                        />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className='mb-5 sm:mb-6'>
                <h4
                  className='text-lg sm:text-xl font-semibold mb-3'
                  style={{ color: '#1f2937' }}
                >
                  Texnologiyalar:
                </h4>
                <div className='flex flex-wrap gap-2'>
                  {selectedProject.technologies.map((tech: string, index: number) => (
                    <span
                      key={index}
                      className='px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-100 text-gray-700 rounded-lg font-medium text-sm sm:text-base'
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className='flex flex-col sm:flex-row gap-3 sm:gap-4'>
                <a
                  href={selectedProject.demoUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex-1 text-center px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg font-semibold text-white'
                  style={{ backgroundColor: '#3b82f6' }}
                >
                  Demo ko'rish
                </a>
                <a
                  href={selectedProject.githubUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex-1 text-center px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg font-semibold border-2'
                  style={{ color: '#3b82f6', borderColor: '#3b82f6' }}
                >
                  GitHub Repository
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}

export default Projects
