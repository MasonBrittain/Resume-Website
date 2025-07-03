import React, { useState } from 'react';
import {Edit3, Save, Download, Mail, Phone, MapPin, Linkedin } from 'lucide-react';

const ResumeApp = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('Experience');
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: "Mason Brittain",
      // Use only the direct image URL, not HTML markup
      profileImage: "https://i.ibb.co/KxM4HBYb/638863223775179692.jpg",
      title: "Full-Stack Developer & Data Analytics Specialist",
      location: "Seattle, WA",
      email: "masonbrittain@gmail.com",
      phone: "(425) 314-6272",
      linkedin: "linkedin.com/in/mason-brittain-4a265a1aa",
      status: "Open to Work",
      summary: "Motivated and detail-oriented developer with a strong foundation in data analytics, software development, and web technologies. Experienced in Python, SQL, C++, and Java, full-stack engineering with a passion for building efficient systems and solving real-world problems. Strong team player with management and entrepreneurial experience."
    },
    experience: [
      {
        company: "Regal Cinebarre",
        position: "Kitchen Operations Lead",
        duration: "Jun 2022 – Present",
        location: "Mountlake Terrace, WA",
        logo: "https://scontent-sea1-1.xx.fbcdn.net/v/t39.30808-6/348221816_206630625559990_7306943456160076678_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=0IvY9Ezv7T4Q7kNvwFX_YF7&_nc_oc=Admsxzx0f4V9u6o7TRRxmjsdtMutoPdnS7ho51nSJJFhYEzRgdMyfpQVCguRpFL8JWoKCKThvS2zYLN8SU7lygCQ&_nc_zt=23&_nc_ht=scontent-sea1-1.xx&_nc_gid=YYYZcb2tNKgj7dt3-f5umw&oh=00_AfOgHPHeFiSTqBLr6nt_SYg0lJ6rZU0g8v77sL7zU-ZtAg&oe=686BE418",
        description: "Oversaw operations and logistics for a high-volume kitchen team, implementing process improvements that boosted kitchen efficiency. Managed workflow optimization and team coordination in a fast-paced environment."
      },
      {
        company: "Lowe's",
        position: "Sales Specialist",
        duration: "Apr 2021 – May 2022",
        location: "Lynnwood, WA",
        logo: "https://1000logos.net/wp-content/uploads/2023/03/Lowes-logo.png",
        description: "Provided specialized sales support and customer service in a retail environment, assisting customers with product selection and ensuring a positive shopping experience."
      }
    ],
    projects: [
      {
        name: "Wacefe Database and Marketing System",
        description: "Developed a SQL-based tracking system to support marketing campaigns for teachers and business professionals. Led website updates and strategic marketing initiatives to boost outreach.",
        technologies: ["SQL", "MySQL", "Marketing Analytics", "Web Development"],
        type: "Database & Marketing"
      },
      {
        name: "Web Development & eCommerce Platform",
        description: "Designed, built, and optimized websites for small businesses using SEO, sales funnels, and market analysis. Managed product research, dropshipping logistics, and customer engagement for a personal e-commerce brand.",
        technologies: ["HTML/CSS", "JavaScript", "SEO", "Google Analytics", "React"],
        type: "Full-Stack Development"
      }
    ],
    skills: {
      languages: ["Python", "SQL", "Java", "C++", "HTML/CSS", "JavaScript"],
      frameworks: ["MySQL", "Tableau", "Google Analytics", "React", "Azure", "REST APIs", "GCP"],
      specialties: ["Responsive Design", "eCommerce", "SEO Optimization", "Data Analytics"],
      soft: ["Problem-Solving", "Communication", "Team Leadership", "Growth Mindset"]
    },
    education: [
      {
        institution: "University of Washington, Bothell",
        degree: "Bachelor's: Marketing | Bachelor's: Management Information Systems",
        minor: "Minor: Computer Science",
        duration: "Sep 2020 – Jun 2025",
        status: "Completed"
      },
      {
        institution: "Edmonds Community College",
        degree: "Associate of Arts Degree",
        duration: "Jun 2018 – Sep 2020",
        status: "Running Start Program"
      }
    ],
    certifications: [
      {
        name: "Google Analytics Certified",
        issuer: "Google",
        date: "2024"
      }
    ]
  });

  const tabs = ['Experience', 'Projects', 'Skills', 'Education', 'Connect'];

  const handleInputChange = (section, field, value, index = null) => {
    setResumeData(prev => {
      const newData = { ...prev };
      if (index !== null) {
        newData[section][index][field] = value;
      } else if (section === 'personalInfo') {
        newData.personalInfo[field] = value;
      } else {
        newData[section] = value;
      }
      return newData;
    });
  };

  const EditableField = ({ value, onChange, multiline = false, className = "" }) => {
    if (!isEditing) {
      return multiline ? (
        <div className={className} dangerouslySetInnerHTML={{ __html: value.replace(/\n/g, '<br>') }} />
      ) : (
        <span className={className}>{value}</span>
      );
    }

    return multiline ? (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full p-2 border rounded resize-none ${className}`}
        rows={4}
      />
    ) : (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full p-1 border rounded ${className}`}
      />
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Experience':
        return (
          <div className="space-y-8">
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <img 
                    src={exp.logo} 
                    alt={exp.company}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="text-sm text-gray-500 mb-1">
                      <EditableField
                        value={exp.duration}
                        onChange={(value) => handleInputChange('experience', 'duration', value, index)}
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      <EditableField
                        value={exp.position}
                        onChange={(value) => handleInputChange('experience', 'position', value, index)}
                      />
                      <span className="text-blue-600"> @ </span>
                      <EditableField
                        value={exp.company}
                        onChange={(value) => handleInputChange('experience', 'company', value, index)}
                        className="text-blue-600"
                      />
                    </h3>
                    <div className="text-sm text-gray-500 mb-3">
                      <EditableField
                        value={exp.location}
                        onChange={(value) => handleInputChange('experience', 'location', value, index)}
                      />
                    </div>
                    <EditableField
                      value={exp.description}
                      onChange={(value) => handleInputChange('experience', 'description', value, index)}
                      multiline
                      className="text-gray-700 text-sm leading-relaxed"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'Projects':
        return (
          <div className="space-y-6">
            {resumeData.projects.map((project, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                    {project.type}
                  </span>
                </div>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'Skills':
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Programming Languages</h3>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.languages.map((skill, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tools & Frameworks</h3>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.frameworks.map((skill, index) => (
                  <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Specialties</h3>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.specialties.map((skill, index) => (
                  <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Soft Skills</h3>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.soft.map((skill, index) => (
                  <span key={index} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Certifications</h3>
              {resumeData.certifications.map((cert, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{cert.name}</p>
                    <p className="text-sm text-gray-500">{cert.issuer}</p>
                  </div>
                  <span className="text-sm text-gray-500">{cert.date}</span>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'Education':
        return (
          <div className="space-y-6">
            {resumeData.education.map((edu, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                    {edu.minor && (
                      <p className="text-sm text-gray-600 mt-1">{edu.minor}</p>
                    )}
                    <p className="text-blue-600 font-medium mt-1">{edu.institution}</p>
                    {edu.status && (
                      <p className="text-sm text-gray-500 mt-1">{edu.status}</p>
                    )}
                  </div>
                  <span className="text-sm text-gray-500 bg-gray-200 px-3 py-1 rounded-full">
                    {edu.duration}
                  </span>
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'Connect':
        return (
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Let's Connect</h3>
            <div className="space-y-4">
              <p className="text-gray-700 text-sm leading-relaxed">
                {resumeData.personalInfo.summary}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="flex items-center space-x-3">
                  <Mail className="text-blue-600" size={18} />
                  <a href={`mailto:${resumeData.personalInfo.email}`} className="text-blue-600 hover:text-blue-800 text-sm">
                    {resumeData.personalInfo.email}
                  </a>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="text-blue-600" size={18} />
                  <a href={`tel:${resumeData.personalInfo.phone}`} className="text-blue-600 hover:text-blue-800 text-sm">
                    {resumeData.personalInfo.phone}
                  </a>
                </div>
                
                <div className="flex items-center space-x-3">
                  <MapPin className="text-blue-600" size={18} />
                  <span className="text-gray-700 text-sm">{resumeData.personalInfo.location}</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Linkedin className="text-blue-600" size={18} />
                  <a href={`https://${resumeData.personalInfo.linkedin}`} className="text-blue-600 hover:text-blue-800 text-sm">
                    LinkedIn Profile
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  {/*Commented out Download and edit buttons feature */}
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Edit Controls */}
        {/*
        <div className="flex justify-end mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Download size={16} />
              Download
            </button>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              {isEditing ? <Save size={16} /> : <Edit3 size={16} />}
              {isEditing ? 'Save' : 'Edit'}
            </button>
          </div>
        </div>
        */}
      

        {/* Profile Section */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-4">
            <img
              src={resumeData.personalInfo.profileImage}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover mx-auto"
            />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            <EditableField
              value={resumeData.personalInfo.name}
              onChange={(value) => handleInputChange('personalInfo', 'name', value)}
            />
          </h1>
          
          <div className="inline-flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-3">
            <EditableField
              value={resumeData.personalInfo.status}
              onChange={(value) => handleInputChange('personalInfo', 'status', value)}
            />
          </div>
          
          <p className="text-gray-600 text-sm mb-4">
            <EditableField
              value={resumeData.personalInfo.title}
              onChange={(value) => handleInputChange('personalInfo', 'title', value)}
            />
          </p>
          
          <div className="flex justify-center items-center space-x-4 text-sm text-gray-500">
            <span>Find me on:</span>
            <a href={`https://${resumeData.personalInfo.linkedin}`} className="text-blue-600 hover:text-blue-800 underline">
              LinkedIn
            </a>
            <a href={`mailto:${resumeData.personalInfo.email}`} className="text-blue-600 hover:text-blue-800 underline">
              Email
            </a>
            <span className="text-gray-600">{resumeData.personalInfo.location}</span>
          </div>
        </div>

        {/* Navigation Tabs */}
          <div className="flex justify-center mb-8">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'text-gray-900 border-b-2 border-gray-900'
                : 'text-gray-500 hover:text-gray-700'
            }`}
                >
            {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Content Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-6">{activeTab}</h2>
          {renderContent()}
        </div>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          body { margin: 0; }
          .min-h-screen { min-height: auto; }
          button { display: none !important; }
          .max-w-4xl { max-width: 100% !important; }
        }
      `}</style>
    </div>
  );
};

export default ResumeApp;