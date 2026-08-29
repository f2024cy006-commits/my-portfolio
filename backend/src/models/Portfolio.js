const mongoose = require('mongoose')

const statSchema = new mongoose.Schema({
  value: { type: String, required: true },
  label: { type: String, required: true },
})

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, default: '' },
  category: {
    type: String,
    enum: ['Web Dev', 'Security', 'Systems', 'Other'],
    default: 'Other',
  },
})

const experienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  period: { type: String, required: true },
  bullets: [{ type: String }],
})

const educationSchema = new mongoose.Schema({
  institution: { type: String, required: true },
  degree: { type: String, required: true },
  location: { type: String, default: '' },
  coursework: { type: String, default: '' },
})

const portfolioSchema = new mongoose.Schema(
  {
    about: {
      name: { type: String, default: 'Maarij Ur Rehman' },
      avatarInitials: { type: String, default: 'MR' },
      eyebrow: { type: String, default: 'Cyber Security Undergraduate' },
      headline: {
        type: String,
        default: 'Secure products, clean interfaces, and dependable systems.',
      },
      bio: {
        type: String,
        default:
          'Cyber Security undergraduate at NASTP NIT Lahore with practical experience in secure web development, object-oriented systems, and data storage solutions.',
      },
      availableForWork: { type: Boolean, default: true },
      taglines: {
        type: [String],
        default: [
          'Frontend development with modern UI',
          'Secure and responsive web experiences',
          'Focused on reliable, user-centered design',
        ],
      },
      subRole: {
        type: String,
        default: 'Cyber Security Student & Frontend Developer',
      },
    },
    stats: { type: [statSchema], default: [] },
    skills: { type: [String], default: [] },
    projects: { type: [projectSchema], default: [] },
    experience: { type: [experienceSchema], default: [] },
    education: { type: [educationSchema], default: [] },
    contact: {
      email: { type: String, default: '' },
      phone: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      github: { type: String, default: '' },
    },
  },
  { timestamps: true },
)

// Enforce a single portfolio document
portfolioSchema.statics.getInstance = async function () {
  let doc = await this.findOne()
  if (!doc) {
    doc = await this.create({})
  }
  return doc
}

module.exports = mongoose.model('Portfolio', portfolioSchema)

