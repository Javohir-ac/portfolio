import { motion } from 'framer-motion'
import React, { useState } from 'react'

interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

interface ContactFormResponse {
  success: boolean
  message: string
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [formErrors, setFormErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<ContactFormResponse | null>(null)
  const [copied, setCopied] = useState(false)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user starts typing
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  const validateForm = (): boolean => {
    const errors: FormErrors = {}

    if (!formData.name.trim()) {
      errors.name = 'Ism kiritish majburiy'
    } else if (formData.name.trim().length < 2) {
      errors.name = "Ism kamida 2 ta harf bo'lishi kerak"
    }

    if (!formData.email.trim()) {
      errors.email = 'Email kiritish majburiy'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Email formati noto'g'ri"
    }

    if (!formData.subject.trim()) {
      errors.subject = 'Mavzu kiritish majburiy'
    } else if (formData.subject.trim().length < 5) {
      errors.subject = "Mavzu kamida 5 ta harf bo'lishi kerak"
    }

    if (!formData.message.trim()) {
      errors.message = 'Xabar kiritish majburiy'
    } else if (formData.message.trim().length < 1) {
      errors.message = "Xabar kamida 1 ta harf bo'lishi kerak"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('jovohirjabborov85@gmail.com')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Email nusxalashda xatolik:', err)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Send data to our API route - using the updated endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        // Success
        setSubmitStatus({
          success: true,
          message: 'Xabar yuborildi! ✅',
        })
        setFormData({ name: '', email: '', subject: '', message: '' })
        setFormErrors({})
      } else {
        // Error from our API
        setSubmitStatus({
          success: false,
          message: data.message || data.error || 'Xabar yuborishda xatolik yuz berdi ❌',
        })
      }
    } catch (error) {
      console.error('Fetch error:', error)
      setSubmitStatus({
        success: false,
        message: 'Xabar yuborishda xatolik yuz berdi ❌',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: (
        <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
          <path d='M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z' />
        </svg>
      ),
      label: 'Email',
      value: 'jovohirjabborov85@gmail.com',
      link: 'mailto:jovohirjabborov85@gmail.com',
    },
    {
      icon: (
        <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
          <path d='M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z' />
        </svg>
      ),
      label: 'Telegram',
      value: '@Silent_Maze_X',
      link: 'https://t.me/Silent_Maze_X',
    },
    {
      icon: (
        <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
          <path d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z' />
        </svg>
      ),
      label: 'Joylashuv',
      value: 'Buxoro, O"zbekiston',
      link: null,
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <section
      id='contact'
      className='min-h-screen py-20 px-6 lg:px-12'
      style={{
        backgroundColor: '#E0F2FF',
      }}
    >
      <div className='max-w-6xl mx-auto'>
        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className='text-center mb-16'>
            <h2
              className='text-4xl lg:text-5xl font-bold mb-4'
              style={{ color: '#1f2937' }}
            >
              Aloqa
            </h2>
            <div
              className='w-24 h-1 mx-auto mb-6'
              style={{ backgroundColor: '#3b82f6' }}
            ></div>
            <p className='text-xl max-w-2xl mx-auto' style={{ color: '#111827' }}>
              Loyiha haqida gaplashish yoki hamkorlik qilish uchun menga murojaat qiling.
              Har doim yangi imkoniyatlarga ochiqman!
            </p>
          </motion.div>

          <div className='grid lg:grid-cols-2 gap-12'>
            {/* Contact Info */}
            <motion.div variants={itemVariants}>
              <h3 className='text-2xl font-bold text-text-dark mb-8 text-center lg:text-left'>
                Bog'lanish ma'lumotlari
              </h3>
              <div className='space-y-6'>
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className='flex items-center p-4 bg-white rounded-lg shadow-md hover-lift'
                  >
                    <div className='w-12 h-12 bg-primary-blue bg-opacity-10 rounded-lg flex items-center justify-center mr-4 text-primary-blue flex-shrink-0'>
                      {info.icon}
                    </div>
                    <div className='flex-1 min-w-0'>
                      <p className='text-sm text-gray-500 font-medium truncate'>
                        {info.label}
                      </p>
                      <div className='flex items-center justify-between'>
                        {info.link ? (
                          <a
                            href={info.link}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-text-dark hover:text-primary-blue transition-colors font-semibold truncate'
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className='text-text-dark font-semibold truncate'>
                            {info.value}
                          </p>
                        )}
                        {info.label === 'Email' && (
                          <button
                            onClick={copyEmail}
                            className='ml-2 p-2 rounded-md hover:bg-gray-100 transition-colors flex-shrink-0'
                            title='Email nusxalash'
                          >
                            {copied ? (
                              <svg
                                className='w-4 h-4 text-green-500'
                                fill='currentColor'
                                viewBox='0 0 20 20'
                              >
                                <path
                                  fillRule='evenodd'
                                  d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                                  clipRule='evenodd'
                                />
                              </svg>
                            ) : (
                              <svg
                                className='w-4 h-4 text-gray-500'
                                fill='currentColor'
                                viewBox='0 0 20 20'
                              >
                                <path d='M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z' />
                                <path d='M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z' />
                              </svg>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <motion.div variants={itemVariants} className='mt-8'>
                <h4 className='text-lg font-semibold text-text-dark mb-4 text-center lg:text-left'>
                  Ijtimoiy tarmoqlar
                </h4>
                <div className='flex space-x-4 justify-center lg:justify-start'>
                  {[
                    {
                      platform: 'GitHub',
                      url: 'https://github.com/Javohir-ac',
                      icon: (
                        <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
                          <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
                        </svg>
                      ),
                    },
                    {
                      platform: 'Telegram',
                      url: 'https://t.me/Silent_Maze_X',
                      icon: (
                        <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
                          <path d='M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z' />
                        </svg>
                      ),
                    },
                    {
                      platform: 'Twitter',
                      url: 'https://twitter.com/javohir',
                      icon: (
                        <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
                          <path d='M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' />
                        </svg>
                      ),
                    },
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='w-12 h-12 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-primary-blue hover:text-white transition-all duration-300 hover-lift'
                      title={social.platform}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <h3 className='text-2xl font-bold text-text-dark mb-8 text-center lg:text-left'>
                Xabar yuborish
              </h3>
              <form onSubmit={handleSubmit} className='space-y-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor='name'
                      className='block text-sm font-medium text-gray-700 mb-2'
                    >
                      Ismingiz *
                    </label>
                    <input
                      type='text'
                      id='name'
                      name='name'
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all ${
                        formErrors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder='Ismingizni kiriting'
                    />
                    {formErrors.name && (
                      <p className='text-red-500 text-sm mt-1'>{formErrors.name}</p>
                    )}
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor='email'
                      className='block text-sm font-medium text-gray-700 mb-2'
                    >
                      Email *
                    </label>
                    <input
                      type='email'
                      id='email'
                      name='email'
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all ${
                        formErrors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder='email@example.com'
                    />
                    {formErrors.email && (
                      <p className='text-red-500 text-sm mt-1'>{formErrors.email}</p>
                    )}
                  </motion.div>
                </div>

                <motion.div variants={itemVariants}>
                  <label
                    htmlFor='subject'
                    className='block text-sm font-medium text-gray-700 mb-2'
                  >
                    Mavzu *
                  </label>
                  <input
                    type='text'
                    id='subject'
                    name='subject'
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all ${
                      formErrors.subject ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder='Xabar mavzusi'
                  />
                  {formErrors.subject && (
                    <p className='text-red-500 text-sm mt-1'>{formErrors.subject}</p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label
                    htmlFor='message'
                    className='block text-sm font-medium text-gray-700 mb-2'
                  >
                    Xabar *
                  </label>
                  <textarea
                    id='message'
                    name='message'
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all resize-none ${
                      formErrors.message ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder='Xabaringizni bu yerda yozing...'
                  />
                  {formErrors.message && (
                    <p className='text-red-500 text-sm mt-1'>{formErrors.message}</p>
                  )}
                </motion.div>

                {/* Submit Status */}
                {submitStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg flex items-start ${
                      submitStatus.success
                        ? 'bg-green-100 text-green-800 border border-green-200'
                        : 'bg-red-100 text-red-800 border border-red-200'
                    }`}
                  >
                    <span className='flex-1'>{submitStatus.message || ''}</span>
                    <button
                      onClick={() => setSubmitStatus(null)}
                      className={`ml-2 p-1 rounded-full ${
                        submitStatus.success ? 'hover:bg-green-200' : 'hover:bg-red-200'
                      }`}
                    >
                      <svg
                        className={`w-5 h-5 ${
                          submitStatus.success ? 'text-green-800' : 'text-red-800'
                        }`}
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
                  </motion.div>
                )}

                <motion.button
                  variants={itemVariants}
                  type='submit'
                  disabled={isSubmitting}
                  className='w-full bg-primary-blue text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-blue-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  {isSubmitting ? (
                    <span className='flex items-center justify-center'>
                      <svg
                        className='w-5 h-5 mr-2'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path d='M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z' />
                      </svg>
                      Yuborilmoqda...
                    </span>
                  ) : (
                    <span className='flex items-center justify-center'>
                      <svg
                        className='w-5 h-5 mr-2'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path d='M2.01 21L23 12 2.01 3 2 10l15 2-15 2z' />
                      </svg>
                      Xabar yuborish
                    </span>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>

          {/* Call to Action */}
          <motion.div variants={itemVariants} className='text-center mt-16'>
            <div className='bg-primary-blue bg-opacity-10 rounded-2xl p-8'>
              <h3 className='text-2xl font-bold text-text-dark mb-4'>
                Keling, birgalikda ajoyib narsa yaratamiz! 🚀
              </h3>
              <p className='text-gray-600 mb-6'>
                Sizning g'oyangizni hayotga tatbiq etish uchun tayyor. Loyiha haqida
                gaplashish uchun bog'laning!
              </p>
              <a
                href='mailto:jovohirjabborov85@gmail.com'
                className='inline-flex items-center px-8 py-3 bg-primary-blue text-white rounded-lg font-medium hover:bg-primary-blue-hover transition-colors'
              >
                <svg className='w-5 h-5 mr-2' fill='currentColor' viewBox='0 0 24 24'>
                  <path d='M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z' />
                </svg>
                Hoziroq bog'lanish
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
