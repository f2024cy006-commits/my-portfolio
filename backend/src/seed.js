/**
 * Seed script — populates the MongoDB portfolio document with Maarij's data.
 * Run once: node src/seed.js
 * Safe to re-run — skips seeding if a document already exists.
 */

require('dotenv').config()
const mongoose = require('mongoose')
const Portfolio = require('./models/Portfolio')

const seedData = {
  about: {
    name: 'Maarij Ur Rehman',
    avatarInitials: 'MR',
    eyebrow: 'Cyber Security Undergraduate',
    headline: 'Secure products, clean interfaces, and dependable systems.',
    bio: 'Cyber Security undergraduate at NASTP NIT Lahore with practical experience in secure web development, object-oriented systems, and data storage solutions. Proficient in C, C++, HTML, JavaScript, and React with a growing expertise in frontend development and UI/UX design.',
    availableForWork: true,
    subRole: 'Cyber Security Student & Frontend Developer',
    taglines: [
      'Frontend development with modern UI',
      'Secure and responsive web experiences',
      'Focused on reliable, user-centered design',
    ],
  },
  stats: [
    { value: '3+', label: 'Years of experience' },
    { value: '5+', label: 'Core projects' },
    { value: '100%', label: 'Security-focused mindset' },
  ],
  skills: [
    'React',
    'Tailwind CSS',
    'HTML',
    'CSS',
    'JavaScript',
    'TypeScript',
    'Node.js',
    'Express',
    'REST APIs',
    'MongoDB',
    'Cybersecurity',
    'Data Encryption',
    'Secure Web Development',
    'Git & GitHub',
    'Problem Solving',
    'UI/UX Collaboration',
  ],
  projects: [
    {
      title: 'CyberCompo (MERN Stack Project)',
      description:
        'Developed a full-stack web application for virtual testing and security assessment of digital assets using the MERN stack. Implemented secure authentication, role-based access, and interactive dashboards for managing and analyzing asset security.',
      link: '',
      category: 'Web Dev',
    },
    {
      title: 'E-Commerce Website',
      description:
        'Developed a complete online shopping platform with secure user authentication and encrypted data handling features. Designed intuitive UI elements and followed web security best practices for safe user transactions.',
      link: '',
      category: 'Web Dev',
    },
    {
      title: 'Cloud Management System (OOP-based Project)',
      description:
        'Built a cloud resource management system using C++ and OOP principles. Focused on modular structure, access control, and scalability for multi-user environment.',
      link: '',
      category: 'Systems',
    },
    {
      title: 'Secure Encrypted Data Storage (Database Project)',
      description:
        'Implemented a secure database for storing sensitive user data using encryption and role-based access control, ensuring confidentiality and integrity.',
      link: '',
      category: 'Security',
    },
    {
      title: 'Secure File Sharing System (Console-based)',
      description:
        'Developed a console-based file sharing system emphasizing encrypted communication and controlled access for secure data transfer.',
      link: '',
      category: 'Security',
    },
  ],
  experience: [
    {
      company: 'EyraTech',
      role: 'Full Stack Software Engineer (MERN)',
      period: 'June 2025 – December 2025',
      bullets: [
        'Focused on frontend development and UI design using React.js and Tailwind CSS for dynamic and responsive interfaces.',
        'Designed and implemented reusable React components, enhancing modularity and improving development efficiency.',
        'Worked on RESTful API integration and secure frontend data handling aligned with cybersecurity best practices.',
        'Collaborated with the backend team to ensure seamless API communication and optimized user experience.',
        'Participated in code reviews and UI/UX improvement discussions to maintain clean, efficient, and accessible design standards.',
      ],
    },
  ],
  education: [
    {
      institution: 'NASTP Institute of Information and Technology',
      degree: 'Bachelor of Science in Cyber Security',
      location: 'Lahore, Pakistan',
      coursework:
        'Computer Networks, Information Security, Database Systems, OOP, Cloud Computing, Cryptography',
    },
  ],
  contact: {
    email: 'maarijrana162@gmail.com',
    phone: '+92 321 6499623',
    linkedin: 'https://www.linkedin.com/in/maarij-ur-rehman',
    github: 'https://github.com/maarij',
  },
}

async function seed() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio'
    await mongoose.connect(mongoUri)
    console.log('Connected to MongoDB')

    const existing = await Portfolio.findOne()
    if (existing) {
      console.log('Portfolio document already exists. Skipping seed.')
      console.log('To force re-seed, delete the document from MongoDB first.')
    } else {
      await Portfolio.create(seedData)
      console.log('✓ Portfolio seeded successfully!')
    }
  } catch (error) {
    console.error('Seed error:', error.message)
  } finally {
    await mongoose.disconnect()
    console.log('Disconnected from MongoDB')
  }
}

seed()

