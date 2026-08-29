import './App.css'

const navItems = ['About', 'Projects', 'Skills', 'Contact']

const stats = [
  { value: '3+', label: 'Years of experience' },
  { value: '5+', label: 'Core projects' },
  { value: '100%', label: 'Security-focused mindset' },
]

const skills = [
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
]

const projects = [
  {
    title: 'CyberCompo (MERN Stack Project)',
    description:
      'Developed a full-stack web application for virtual testing and security assessment of digital assets using the MERN stack. Implemented secure authentication, role-based access, and interactive dashboards for managing and analyzing asset security.',
  },
  {
    title: 'E-Commerce Website',
    description:
      'Developed a complete online shopping platform with secure user authentication and encrypted data handling features. Designed intuitive UI elements and followed web security best practices for safe user transactions.',
  },
  {
    title: 'Cloud Management System (OOP-based Project)',
    description:
      'Built a cloud resource management system using C++ and OOP principles. Focused on modular structure, access control, and scalability for multi-user environment.',
  },
  {
    title: 'Secure Encrypted Data Storage (Database Project)',
    description:
      'Implemented a secure database for storing sensitive user data using encryption and role-based access control, ensuring confidentiality and integrity.',
  },
  {
    title: 'Secure File Sharing System (Console-based)',
    description:
      'Developed a console-based file sharing system emphasizing encrypted communication and controlled access for secure data transfer.',
  },
]

function App() {
  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="brand">Maarij Ur Rehman</div>
        <nav className="nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`}>
              {item}
            </a>
          ))}
        </nav>
      </header>

      <main>
        <section className="hero" id="about">
          <div className="hero-copy">
            <p className="eyebrow">Cyber Security Undergraduate</p>
            <h1>Secure products, clean interfaces, and dependable systems.</h1>
            <p className="lead">
              Cyber Security undergraduate at NASTP NIT Lahore with practical experience in secure web development, object-oriented systems, and data storage solutions. Proficient in C, C++, HTML, JavaScript, and React with a growing expertise in frontend development and UI/UX design.
            </p>
            <div className="actions">
              <a href="#projects" className="button primary">View Projects</a>
              <a href="#contact" className="button secondary">Let&apos;s Talk</a>
            </div>
          </div>

          <div className="hero-panel" aria-label="Profile summary card">
            <div className="panel-badge">Available for opportunities</div>
            <div className="profile-block">
              <div className="avatar">MR</div>
              <div>
                <strong>Maarij Ur Rehman</strong>
                <span>Cyber Security Student & Frontend Developer</span>
              </div>
            </div>
            <ul>
              <li>Frontend development with modern UI</li>
              <li>Secure and responsive web experiences</li>
              <li>Focused on reliable, user-centered design</li>
            </ul>
          </div>
        </section>

        <section className="stats" aria-label="Highlights">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-card">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </section>

        <section className="content-section" id="projects">
          <div className="section-heading">
            <p className="eyebrow">Selected work</p>
            <h2>Projects built with security and usability in mind.</h2>
          </div>

          <div className="card-grid">
            {projects.map((project) => (
              <article key={project.title} className="project-card">
                <div className="project-thumb" aria-hidden="true" />
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section" id="skills">
          <div className="section-heading">
            <p className="eyebrow">Capabilities</p>
            <h2>Skills and tools from my academic and professional work.</h2>
          </div>

          <div className="skills-list">
            {skills.map((skill) => (
              <span key={skill} className="skill-tag">
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section className="content-section" id="experience">
          <div className="section-heading">
            <p className="eyebrow">Experience</p>
            <h2>Professional work and responsibilities.</h2>
          </div>

          <div className="experience-box">
            <div className="experience-item">
              <div className="experience-header">
                <div>
                  <h3>EyraTech</h3>
                  <p>Full Stack Software Engineer (MERN)</p>
                </div>
                <span>June 2025 – December 2025</span>
              </div>
              <ul>
                <li>Focused on frontend development and UI design using React.js and Tailwind CSS for dynamic and responsive interfaces.</li>
                <li>Designed and implemented reusable React components, enhancing modularity and improving development efficiency.</li>
                <li>Worked on RESTful API integration and secure frontend data handling aligned with cybersecurity best practices.</li>
                <li>Collaborated with the backend team to ensure seamless API communication and optimized user experience.</li>
                <li>Participated in code reviews and UI/UX improvement discussions to maintain clean, efficient, and accessible design standards.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="content-section" id="education">
          <div className="section-heading">
            <p className="eyebrow">Education</p>
            <h2>Academic background.</h2>
          </div>

          <div className="education-box">
            <div className="education-row">
              <div>
                <h3>NASTP Institute of Information and Technology</h3>
                <p>Bachelor of Science in Cyber Security</p>
                <p className="muted">Coursework: Computer Networks, Information Security, Database Systems, OOP, Cloud Computing, Cryptography</p>
              </div>
              <span>Lahore, Pakistan</span>
            </div>
          </div>
        </section>

        <section className="content-section contact-section" id="contact">
          <div className="section-heading">
            <p className="eyebrow">Let&apos;s connect</p>
            <h2>Open to opportunities in secure frontend engineering and cybersecurity-focused product development.</h2>
          </div>

          <div className="contact-box">
            <a href="mailto:maarijrana162@gmail.com">maarijrana162@gmail.com</a>
            <a href="tel:+923216499623">+92 321 6499623</a>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
