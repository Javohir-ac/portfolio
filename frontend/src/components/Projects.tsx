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
      className='min-h-screen py-20 px-6 lg:px-12'
      style={{ backgroundColor: '#E0F2FF' }}
    >
      <div className='max-w-7xl mx-auto'>
        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className='text-center mb-16'>
            <h2
              className='text-4xl lg:text-5xl font-bold mb-4'
              style={{ color: '#1f2937' }}
            >
              Loyihalar
            </h2>
            <div
              className='w-24 h-1 mx-auto mb-6'
              style={{ backgroundColor: '#3b82f6' }}
            ></div>
            <p className='text-xl max-w-2xl mx-auto' style={{ color: '#111827' }}>
              Zamonaviy texnologiyalar bilan yaratilgan loyihalarimga nazar tashlang.
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div variants={itemVariants} className='flex justify-center mb-12'>
            <div className='flex flex-nowrap overflow-x-auto gap-2 p-1 bg-white rounded-lg shadow-md scrollbar-hide'>
              {filters.map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-md font-medium whitespace-nowrap flex-shrink-0 ${
                    activeFilter === filter ? 'text-white shadow-md' : 'text-gray-600'
                  }`}
                  style={{
                    backgroundColor: activeFilter === filter ? '#3b82f6' : 'transparent',
                  }}
                >
                  {filter}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'
            layout
          >
            {filteredProjects.map(project => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className='bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition'
                style={{ border: '1px solid #e5e7eb' }}
                onClick={() => setSelectedProject(project)}
              >
                <div className='relative overflow-hidden'>
                  <img
                    src={project.image}
                    alt={project.title}
                    className='w-full h-48 sm:h-56 lg:h-64 object-cover'
                  />
                  <div className='absolute top-4 right-4'>
                    <span
                      className='px-3 py-1 bg-white bg-opacity-90 rounded-full text-sm font-medium'
                      style={{ color: '#3b82f6' }}
                    >
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className='p-6'>
                  <h3 className='text-xl font-bold mb-3' style={{ color: '#1f2937' }}>
                    {project.title}
                  </h3>
                  <p className='text-gray-600 mb-4 line-clamp-2'>{project.description}</p>
                  <div className='flex flex-wrap gap-2 mb-4'>
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className='px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm'
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className='flex gap-3'>
                    <a
                      href={project.demoUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex-1 text-center px-4 py-2 rounded-lg font-medium text-white'
                      style={{ backgroundColor: '#3b82f6' }}
                      onClick={e => e.stopPropagation()}
                    >
                      Demo
                    </a>
                    <a
                      href={project.githubUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex-1 text-center px-4 py-2 rounded-lg font-medium border'
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
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
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
                className='w-full h-64 object-cover'
              />
              <button
                onClick={() => setSelectedProject(null)}
                className='absolute top-4 right-4 w-10 h-10 bg-white bg-opacity-90 rounded-full flex items-center justify-center'
              >
                <svg
                  className='w-6 h-6 text-gray-600'
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
            <div className='p-8'>
              <div className='flex items-center gap-4 mb-4'>
                <h3 className='text-3xl font-bold' style={{ color: '#1f2937' }}>
                  {selectedProject.title}
                </h3>
                <span
                  className='px-3 py-1 bg-blue-100 rounded-full text-sm font-medium'
                  style={{ color: '#3b82f6' }}
                >
                  {selectedProject.category}
                </span>
              </div>
              <p className='text-lg text-gray-600 mb-6'>{selectedProject.description}</p>

              <div className='mb-6'>
                <h4 className='text-xl font-semibold mb-3' style={{ color: '#1f2937' }}>
                  Xususiyatlar:
                </h4>
                <ul className='grid md:grid-cols-2 gap-2'>
                  {selectedProject.features.map((feature: string, index: number) => (
                    <li key={index} className='flex items-center text-gray-600'>
                      <svg
                        className='w-5 h-5 mr-2 text-green-500'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path
                          fillRule='evenodd'
                          d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                          clipRule='evenodd'
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className='mb-6'>
                <h4 className='text-xl font-semibold mb-3' style={{ color: '#1f2937' }}>
                  Texnologiyalar:
                </h4>
                <div className='flex flex-wrap gap-2'>
                  {selectedProject.technologies.map((tech: string, index: number) => (
                    <span
                      key={index}
                      className='px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium'
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className='flex gap-4'>
                <a
                  href={selectedProject.demoUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex-1 text-center px-6 py-3 rounded-lg font-semibold text-white'
                  style={{ backgroundColor: '#3b82f6' }}
                >
                  Demo ko'rish
                </a>
                <a
                  href={selectedProject.githubUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex-1 text-center px-6 py-3 rounded-lg font-semibold border-2'
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
