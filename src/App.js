import React, { useState, useRef } from 'react';
import './App.css';

function Nav({ profileUrl, onProfileSelect, currentPage, setCurrentPage }) {
  const fileRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [imageLoading, setImageLoading] = useState(!!profileUrl);
  const openPicker = () => fileRef.current && fileRef.current.click();

  // Reset loading state whenever profile URL changes
  React.useEffect(() => {
    if (profileUrl) {
      setImageLoading(true);
    } else {
      setImageLoading(false);
    }
  }, [profileUrl]);
  
  // Close mobile menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.nav-actions') && !event.target.closest('.mobile-menu-toggle')) {
        setIsMobileMenuOpen(false);
      }
    };
    
    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);
  
  const navItems = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'journey', label: 'Journey', href: '#journey' },
    {
      id: 'projects',
      label: 'Projects',
      href: '#projects',
      children: [
        { id: 'ai-agent', label: 'AI Agent', href: '#ai-agent' },
        { id: 'erp', label: 'ERP', href: '#erp' },
        { id: 'saas', label: 'SaaS', href: '#saas' },
      ],
    },
    { id: 'client-stories', label: 'Success Stories', href: '#client-stories' },
    { id: 'skills', label: 'Skills', href: '#skills' },
    { id: 'contact', label: 'Contact', href: '#contact' }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = (itemId) => {
    setCurrentPage(itemId);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="nav glass">
      <div className="container nav-inner">
        <div className="profile-wrap" onClick={openPicker} style={{cursor:'pointer'}}>
          <div className="avatar-lg-wrap">
            <div className="avatar-lg-ring" />
            <div className="avatar-lg-bg" />
            {profileUrl ? (
              <img 
                src={profileUrl} 
                alt="Ali Imran - Senior SQA Engineer" 
                className="avatar-lg" 
                onLoad={() => setImageLoading(false)}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                  setImageLoading(false);
                }}
              />
            ) : null}
            <div className="avatar-lg avatar-placeholder" style={{display: profileUrl && !imageLoading ? 'none' : 'flex'}}>
              {imageLoading && profileUrl ? (
                <div className="loading-spinner"></div>
              ) : (
                <span className="avatar-initials">AI</span>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" onChange={onProfileSelect} style={{display:'none'}} />
          </div>
          <div>
            <div className="brand">Ali Imran</div>
            <div className="muted" style={{fontSize:'12px'}}>Senior SQA Engineer</div>
          </div>
        </div>
        
        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}></span>
        </button>
        
        <div className={`nav-actions ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          {navItems.map((item, index) => (
            item.children ? (
              <div key={item.id} className={`dropdown ${currentPage === item.id ? 'active' : ''}`} style={{'--i': index}}>
                <a 
                  href={item.href}
                  className={currentPage === item.id ? 'active' : ''}
                  onClick={(e) => {
                    e.preventDefault();
                    // On click, default to parent projects page
                    handleNavClick('projects');
                  }}
                >
                  {item.label}
                </a>
                <div className="dropdown-menu">
                  {item.children.map((child, cidx) => (
                    <a
                      key={child.id}
                      href={child.href}
                      className={currentPage === child.id ? 'active' : ''}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(child.id);
                      }}
                    >
                      {child.label}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <a 
                key={item.id}
                href={item.href} 
                className={currentPage === item.id ? 'active' : ''}
                style={{'--i': index}}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
              >
                {item.label}
              </a>
            )
          ))}
          <a 
            href="#contact" 
            className="btn hire-btn"
            style={{'--i': navItems.length}}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('contact');
            }}
          >
            Hire Me
          </a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="section hero">
      <div className="container hero-inner">
        <div className="orb lg purple float" style={{left: '-120px', top: '-60px'}} />
        <div className="orb md cyan float" style={{right: '-80px', top: '120px', animationDelay: '1.2s'}} />
        <div className="orb sm pink float" style={{left: '20%', top: '420px', animationDelay: '0.4s'}} />
        <span className="badge">QA Engineer • Automation • Manual • API</span>
        <h1>
          Future‑proof Quality Assurance that ships <span className="gradient">bug‑free experiences</span>
        </h1>
        <p className="subtitle">
          I help teams prevent defects early and accelerate delivery with data‑driven testing, robust automation, and empathetic quality advocacy.
        </p>
        <div className="cta">
          <a href="#contact" className="btn">Get a Quote</a>
          <a href="#projects" className="btn ghost">View Work</a>
        </div>
        <div className="kpis grid grid-3">
          <div className="kpi glass"><strong>95%+</strong><span>Critical defects caught pre‑release</span></div>
          <div className="kpi glass"><strong>80%+</strong><span>Regression automated</span></div>
          <div className="kpi glass"><strong>3x</strong><span>Faster release cycles</span></div>
        </div>
      </div>
    </section>
  );
}


function AboutSection({ profileUrl, onProfileSelect }) {
  return (
    <section id="about" className="section">
      <div className="container grid grid-2 about">
        <div className="glass about-card">
          {profileUrl ? (
            <img 
              src={profileUrl} 
              alt="Ali Imran - Senior SQA Engineer" 
              className="avatar" 
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <div className="avatar avatar-placeholder" style={{display: profileUrl ? 'none' : 'flex'}}>
            <span className="avatar-initials">AI</span>
          </div>
          <label className="btn ghost" style={{marginTop:'8px', cursor:'pointer'}}>
            {profileUrl ? 'Change profile image' : 'Add profile image'}
            <input type="file" accept="image/*" onChange={onProfileSelect} style={{display:'none'}} />
          </label>
          <h2>About Me</h2>
          <p>
            I am a Software Quality Assurance Engineer specializing in test strategy, automation frameworks, and CI/CD quality gates across web and mobile.
          </p>
          <ul className="bullets">
            <li>Automation: Playwright, Cypress, Selenium</li>
            <li>API: Postman, REST Assured</li>
            <li>Performance: k6, JMeter</li>
            <li>CI/CD: GitHub Actions, Jenkins</li>
          </ul>
        </div>
        <div className="glass about-card">
          <h3>What I Deliver</h3>
          <ul className="checks">
            <li>Test strategies aligned to business risk</li>
            <li>Scalable, maintainable automation suites</li>
            <li>Shift‑left quality with early feedback loops</li>
            <li>Clear reporting and actionable metrics</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function ManualTesting() {
  const artifacts = [
    { t: 'Test Plan', d: 'Scope, objectives, resources, schedule, risks, and exit criteria.', k: ['Scope', 'Approach', 'Risks'] },
    { t: 'Test Cases', d: 'Well‑defined, re‑usable test cases with clear steps and oracles.', k: ['ID', 'Steps', 'Expected'] },
    { t: 'Bug Reports', d: 'Reproducible defects with impact, environment, evidence, and priority.', k: ['Repro', 'Evidence', 'Priority'] },
    { t: 'Checklists', d: 'Lean validations for smoke and sanity runs.', k: ['Smoke', 'Sanity', 'Release'] },
  ];
  const examples = [
    {
      title: 'Login Negative Scenarios',
      items: ['Invalid credentials lockout after 5 attempts', 'XSS in username blocked', 'Rate limiting on brute force'],
    },
    {
      title: 'Checkout Edge Cases',
      items: ['Coupon stacking not allowed', 'Address validation for APO/FPO', '3DS challenge fallback'],
    },
  ];
  return (
    <section id="manual" className="section">
      <div className="container">
        <h2>Manual Testing</h2>
        <p className="subtitle">Exploratory depth with structured artifacts for stakeholder clarity.</p>
        <div className="grid grid-4-responsive">
          {artifacts.map((a) => (
            <div key={a.t} className="glass card-md">
              <h3>{a.t}</h3>
              <p className="muted">{a.d}</p>
              <div className="tags">
                {a.k.map((x) => (
                  <span key={x} className="tag">{x}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-2 examples">
          {examples.map((ex) => (
            <div key={ex.title} className="glass card-md">
              <h3>{ex.title}</h3>
              <ul className="bullets">
                {ex.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const skills = [
    { name: 'Playwright', level: 'Expert' },
    { name: 'Cypress', level: 'Advanced' },
    { name: 'Selenium', level: 'Advanced' },
    { name: 'TypeScript/JS', level: 'Advanced' },
    { name: 'Postman/REST', level: 'Advanced' },
    { name: 'k6/JMeter', level: 'Intermediate' },
  ];
  return (
    <section id="skills" className="section">
      <div className="container">
        <h2>Core Skills</h2>
        <div className="grid grid-3">
          {skills.map((s) => (
            <div key={s.name} className="skill glass">
              <div className="skill-head">
                <span className="dot" />
                <strong>{s.name}</strong>
                <span className="pill">{s.level}</span>
              </div>
              <div className="bar">
                <span className={`fill ${s.level.toLowerCase()}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const projects = [
    {
      title: 'E‑commerce Checkout Reliability',
      impact: 'Reduced checkout failures by 92% with end‑to‑end automation and API mocks.',
      tags: ['Playwright', 'Contract Tests', 'CI Gates'],
    },
    {
      title: 'Banking App Regression Suite',
      impact: '80% regression automated; release time from 2 weeks to 4 days.',
      tags: ['Cypress', 'Jenkins', 'Allure'],
    },
    {
      title: 'Performance Baselines',
      impact: 'Established k6 thresholds; prevented 3 incidents via early detection.',
      tags: ['k6', 'Grafana', 'APM'],
    },
  ];
  return (
    <section id="projects" className="section">
      <div className="container">
        <h2>Selected Projects</h2>
        <div className="grid grid-3">
          {projects.map((p) => (
            <div key={p.title} className="project glass">
              <h3>{p.title}</h3>
              <p className="impact">{p.impact}</p>
              <div className="tags">
                {p.tags.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    { n: '01', t: 'Discover', d: 'Understand product risks and user journeys.' },
    { n: '02', t: 'Plan', d: 'Define test strategy, tooling, environments.' },
    { n: '03', t: 'Automate', d: 'Build stable, maintainable test suites.' },
    { n: '04', t: 'Validate', d: 'Shift‑left checks in CI with clear gates.' },
    { n: '05', t: 'Report', d: 'Metrics that inform decisions and quality.' },
  ];
  return (
    <section id="process" className="section">
      <div className="container">
        <h2>Quality Process</h2>
        <div className="grid grid-3">
          {steps.map((s) => (
            <div key={s.n} className="step glass">
              <span className="step-n">{s.n}</span>
              <strong>{s.t}</strong>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    { q: 'Caught critical bugs before production and tightened our release pipeline.', a: 'CTO, FinTech' },
    { q: 'Our regression time dropped drastically. Communication was top‑notch.', a: 'PM, Retail' },
  ];
  return (
    <section className="section">
      <div className="container">
        <h2>Client Feedback</h2>
        <div className="grid grid-2">
          {items.map((it, idx) => (
            <div key={idx} className="testimonial glass">
              <p className="quote">“{it.q}”</p>
              <span className="author">— {it.a}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Tools() {
  const tools = [
    'Playwright', 'Cypress', 'Selenium', 'Postman', 'REST Assured', 'k6', 'JMeter', 'GitHub Actions', 'Jenkins', 'Allure'
  ];
  return (
    <section className="section">
      <div className="container">
        <h2>Tools & Stack</h2>
        <div className="grid grid-3 tools">
          {tools.map((t) => (
            <div key={t} className="tool glass">
              <span className="dot" />
              <strong>{t}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Publications() {
  const posts = [
    { title: 'Risk‑Based Testing in Fast‑Moving Teams', meta: 'Article • 8 min read', link: '#', summary: 'Prioritize test depth by impact, probability, and detectability.' },
    { title: 'Playwright vs Cypress: Stability at Scale', meta: 'Case Study • 10 min read', link: '#', summary: 'Choosing tooling for maintainability, flake control, and DX.' },
    { title: 'Designing Quality Gates for CI/CD', meta: 'Guide • 7 min read', link: '#', summary: 'From smoke to performance thresholds with clear pass/fail.' },
  ];
  return (
    <section id="publications" className="section">
      <div className="container">
        <h2>Publications</h2>
        <div className="grid grid-3">
          {posts.map((p) => (
            <a key={p.title} href={p.link} className="post glass">
              <h3>{p.title}</h3>
              <span className="muted">{p.meta}</span>
              <p className="muted" style={{marginTop: '8px'}}>{p.summary}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="contact glass">
          <h2>Let’s collaborate</h2>
          <p>Tell me about your product and goals. I’ll respond within 24 hours.</p>
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-2">
              <input className="input" placeholder="Your name" required />
              <input className="input" placeholder="Company / Project" />
            </div>
            <div className="grid grid-2">
              <input type="email" className="input" placeholder="Email" required />
              <input className="input" placeholder="Budget (optional)" />
            </div>
            <textarea className="input" rows="4" placeholder="What are you building? What do you need help with?" />
            <button className="btn" type="submit">Request Proposal</button>
          </form>
        </div>
      </div>
    </section>
  );
}

// Professional Journey Page
function ProfessionalJourney() {
  const milestones = [
    {
      year: '2024',
      title: 'Senior SQA Engineer',
      company: 'TechCorp Solutions',
      description: 'Leading quality assurance for AI-powered enterprise applications. Implemented automated testing frameworks that reduced regression time by 75%.',
      achievements: ['Built comprehensive test automation suite', 'Mentored 5 junior QA engineers', 'Reduced production bugs by 90%'],
      technologies: ['Playwright', 'Cypress', 'AI Testing', 'CI/CD']
    },
    {
      year: '2022',
      title: 'SQA Engineer',
      company: 'InnovateTech',
      description: 'Specialized in ERP and SaaS platform testing. Developed risk-based testing strategies for complex enterprise workflows.',
      achievements: ['Implemented API testing framework', 'Established performance testing baselines', 'Created test data management system'],
      technologies: ['Selenium', 'Postman', 'JMeter', 'SQL']
    },
    {
      year: '2020',
      title: 'QA Analyst',
      company: 'StartupX',
      description: 'Started career in manual testing and gradually transitioned to automation. Focused on web and mobile application testing.',
      achievements: ['Created first automated test suite', 'Reduced manual testing effort by 60%', 'Improved test coverage to 85%'],
      technologies: ['Manual Testing', 'Selenium', 'JavaScript', 'Git']
    }
  ];

  const certifications = [
    { name: 'ISTQB Advanced Level Test Manager', year: '2023', issuer: 'ISTQB' },
    { name: 'AWS Certified Cloud Practitioner', year: '2022', issuer: 'Amazon Web Services' },
    { name: 'Certified Agile Tester', year: '2021', issuer: 'Agile Alliance' },
    { name: 'Selenium WebDriver with Java', year: '2020', issuer: 'Udemy' }
  ];

  return (
    <section id="journey" className="section">
      <div className="container">
        <h2>Professional Journey</h2>
        <p className="subtitle">My path to becoming a Senior SQA Engineer specializing in AI, ERP, and SaaS platforms</p>
        
        <div className="timeline">
          {milestones.map((milestone, index) => (
            <div key={index} className="timeline-item glass">
              <div className="timeline-marker">
                <div className="timeline-year">{milestone.year}</div>
              </div>
              <div className="timeline-content">
                <h3>{milestone.title}</h3>
                <div className="company">{milestone.company}</div>
                <p className="description">{milestone.description}</p>
                <div className="achievements">
                  <h4>Key Achievements:</h4>
                  <ul>
                    {milestone.achievements.map((achievement, idx) => (
                      <li key={idx}>{achievement}</li>
                    ))}
                  </ul>
                </div>
                <div className="technologies">
                  {milestone.technologies.map((tech, idx) => (
                    <span key={idx} className="tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="certifications-section">
          <h3>Certifications & Learning</h3>
          <div className="grid grid-2">
            {certifications.map((cert, index) => (
              <div key={index} className="certification glass">
                <h4>{cert.name}</h4>
                <div className="cert-meta">
                  <span className="year">{cert.year}</span>
                  <span className="issuer">{cert.issuer}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// AI Agent Testing Page
function AIAgentTesting() {
  const projects = [
    {
      title: 'Intelligent Test Case Generation',
      description: 'Developed AI-powered test case generation system that automatically creates comprehensive test scenarios based on user stories and requirements.',
      impact: 'Reduced test case creation time by 80% and improved coverage by 45%',
      technologies: ['Python', 'Machine Learning', 'NLP', 'Selenium'],
      metrics: ['80% time reduction', '45% coverage increase', '95% accuracy']
    },
    {
      title: 'Automated Bug Prediction',
      description: 'Built ML model to predict potential bug locations in code changes, enabling proactive testing and early defect detection.',
      impact: 'Prevented 60% of potential production bugs through predictive testing',
      technologies: ['TensorFlow', 'Python', 'Git Analysis', 'Test Automation'],
      metrics: ['60% bug prevention', '40% faster releases', '90% prediction accuracy']
    },
    {
      title: 'Smart Test Data Management',
      description: 'Created AI-driven test data generation and management system that produces realistic, anonymized test data for complex scenarios.',
      impact: 'Eliminated test data bottlenecks and improved test reliability by 70%',
      technologies: ['AI/ML', 'Data Privacy', 'Test Data Factory', 'Automation'],
      metrics: ['70% reliability improvement', '100% data privacy compliance', '50% faster test execution']
    }
  ];

  return (
    <section id="ai-agent" className="section">
      <div className="container">
        <h2>AI Agent Testing Expertise</h2>
        <p className="subtitle">Pioneering the future of quality assurance with artificial intelligence and machine learning</p>
        
        <div className="ai-intro glass">
          <h3>Revolutionizing QA with AI</h3>
          <p>I specialize in integrating artificial intelligence into testing processes, creating intelligent automation frameworks that adapt, learn, and evolve with your applications. My approach combines traditional QA expertise with cutting-edge AI technologies to deliver unprecedented quality assurance capabilities.</p>
        </div>

        <div className="grid grid-3">
          {projects.map((project, index) => (
            <div key={index} className="ai-project glass">
              <h3>{project.title}</h3>
              <p className="description">{project.description}</p>
              <div className="impact">
                <strong>Impact:</strong> {project.impact}
              </div>
              <div className="metrics">
                {project.metrics.map((metric, idx) => (
                  <div key={idx} className="metric">
                    <span className="metric-value">{metric}</span>
                  </div>
                ))}
              </div>
              <div className="technologies">
                {project.technologies.map((tech, idx) => (
                  <span key={idx} className="tag">{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="ai-benefits glass">
          <h3>Why AI-Powered Testing?</h3>
          <div className="grid grid-2">
            <div className="benefit">
              <h4>🚀 Intelligent Automation</h4>
              <p>AI learns from your application behavior and automatically adapts test cases to changing requirements.</p>
            </div>
            <div className="benefit">
              <h4>🎯 Predictive Quality</h4>
              <p>Machine learning models predict potential failure points before they impact users.</p>
            </div>
            <div className="benefit">
              <h4>⚡ Self-Healing Tests</h4>
              <p>Tests automatically update when UI changes, reducing maintenance overhead by 90%.</p>
            </div>
            <div className="benefit">
              <h4>📊 Smart Analytics</h4>
              <p>AI-driven insights provide actionable recommendations for improving application quality.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ERP Testing Page
function ERPTesting() {
  const erpModules = [
    {
      module: 'Financial Management',
      description: 'Comprehensive testing of accounting, budgeting, and financial reporting modules',
      testTypes: ['Functional Testing', 'Data Integrity', 'Compliance Testing', 'Performance Testing'],
      challenges: ['Complex calculations', 'Regulatory compliance', 'Data accuracy', 'Multi-currency support']
    },
    {
      module: 'Supply Chain Management',
      description: 'End-to-end testing of procurement, inventory, and logistics workflows',
      testTypes: ['Integration Testing', 'Workflow Testing', 'Data Migration', 'API Testing'],
      challenges: ['Multi-vendor integration', 'Real-time synchronization', 'Inventory accuracy', 'Order processing']
    },
    {
      module: 'Human Resources',
      description: 'Testing HR processes including payroll, benefits, and employee management',
      testTypes: ['Security Testing', 'Data Privacy', 'Workflow Testing', 'Reporting Testing'],
      challenges: ['Data privacy compliance', 'Complex approval workflows', 'Integration with external systems', 'Audit requirements']
    },
    {
      module: 'Customer Relationship Management',
      description: 'Testing CRM functionality including lead management, sales processes, and customer service',
      testTypes: ['User Experience Testing', 'Integration Testing', 'Mobile Testing', 'Performance Testing'],
      challenges: ['User adoption', 'Mobile compatibility', 'Third-party integrations', 'Real-time data sync']
    }
  ];

  const successStories = [
    {
      client: 'Global Manufacturing Corp',
      challenge: 'Legacy ERP system causing 40% data inconsistencies and compliance issues',
      solution: 'Implemented comprehensive test automation suite with data validation framework',
      results: ['95% data accuracy improvement', '60% reduction in compliance issues', '50% faster month-end closing'],
      duration: '6 months'
    },
    {
      client: 'Financial Services Ltd',
      challenge: 'Critical financial calculations failing in production, causing regulatory violations',
      solution: 'Developed automated testing framework for financial calculations with real-time validation',
      results: ['100% calculation accuracy', 'Zero regulatory violations', '80% faster financial reporting'],
      duration: '4 months'
    }
  ];

  return (
    <section id="erp" className="section">
      <div className="container">
        <h2>ERP Testing Excellence</h2>
        <p className="subtitle">Specialized expertise in enterprise resource planning systems across multiple industries</p>
        
        <div className="erp-intro glass">
          <h3>Enterprise-Grade Quality Assurance</h3>
          <p>With extensive experience in ERP systems including SAP, Oracle, and Microsoft Dynamics, I ensure your enterprise software meets the highest standards of reliability, security, and performance. My approach focuses on business-critical workflows and regulatory compliance.</p>
        </div>

        <div className="erp-modules">
          <h3>ERP Module Expertise</h3>
          <div className="grid grid-2">
            {erpModules.map((module, index) => (
              <div key={index} className="erp-module glass">
                <h4>{module.module}</h4>
                <p className="description">{module.description}</p>
                <div className="test-types">
                  <h5>Testing Types:</h5>
                  <div className="tags">
                    {module.testTypes.map((type, idx) => (
                      <span key={idx} className="tag">{type}</span>
                    ))}
                  </div>
                </div>
                <div className="challenges">
                  <h5>Key Challenges Addressed:</h5>
                  <ul>
                    {module.challenges.map((challenge, idx) => (
                      <li key={idx}>{challenge}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="success-stories">
          <h3>Client Success Stories</h3>
          <div className="grid grid-2">
            {successStories.map((story, index) => (
              <div key={index} className="success-story glass">
                <h4>{story.client}</h4>
                <div className="challenge">
                  <strong>Challenge:</strong> {story.challenge}
                </div>
                <div className="solution">
                  <strong>Solution:</strong> {story.solution}
                </div>
                <div className="results">
                  <strong>Results:</strong>
                  <ul>
                    {story.results.map((result, idx) => (
                      <li key={idx}>{result}</li>
                    ))}
                  </ul>
                </div>
                <div className="duration">
                  <strong>Duration:</strong> {story.duration}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// SaaS Testing Page
function SAASTesting() {
  const saasFeatures = [
    {
      feature: 'Multi-Tenancy Testing',
      description: 'Ensuring data isolation and security across multiple tenant environments',
      testScenarios: ['Data segregation', 'User access control', 'Resource allocation', 'Billing accuracy'],
      tools: ['Cypress', 'Postman', 'Custom Test Framework', 'Database Testing']
    },
    {
      feature: 'API & Integration Testing',
      description: 'Comprehensive testing of RESTful APIs and third-party integrations',
      testScenarios: ['API contract validation', 'Rate limiting', 'Authentication', 'Error handling'],
      tools: ['Postman', 'REST Assured', 'Newman', 'API Mocking']
    },
    {
      feature: 'Performance & Scalability',
      description: 'Load testing and performance optimization for cloud-based applications',
      testScenarios: ['Load testing', 'Stress testing', 'Scalability testing', 'Resource monitoring'],
      tools: ['k6', 'JMeter', 'Grafana', 'CloudWatch']
    },
    {
      feature: 'Security & Compliance',
      description: 'Security testing and compliance validation for SaaS platforms',
      testScenarios: ['OWASP testing', 'Data encryption', 'GDPR compliance', 'Penetration testing'],
      tools: ['OWASP ZAP', 'Burp Suite', 'Custom Security Tests', 'Compliance Tools']
    }
  ];

  const saasClients = [
    {
      name: 'CloudTech Solutions',
      industry: 'Project Management SaaS',
      challenge: 'High customer churn due to performance issues and frequent outages',
      solution: 'Implemented comprehensive performance testing and monitoring framework',
      results: ['99.9% uptime achieved', '60% reduction in customer churn', '50% improvement in page load times'],
      technologies: ['React', 'Node.js', 'AWS', 'MongoDB']
    },
    {
      name: 'DataFlow Analytics',
      industry: 'Business Intelligence Platform',
      challenge: 'API reliability issues affecting third-party integrations',
      solution: 'Developed robust API testing suite with automated contract testing',
      results: ['99.5% API reliability', '90% reduction in integration issues', '40% faster API response times'],
      technologies: ['Python', 'FastAPI', 'PostgreSQL', 'Redis']
    }
  ];

  return (
    <section id="saas" className="section">
      <div className="container">
        <h2>SaaS Platform Testing</h2>
        <p className="subtitle">Specialized expertise in cloud-based software testing with focus on scalability, security, and user experience</p>
        
        <div className="saas-intro glass">
          <h3>Cloud-Native Quality Assurance</h3>
          <p>I specialize in testing modern SaaS applications, ensuring they deliver exceptional performance, security, and user experience at scale. My expertise covers multi-tenancy, API testing, performance optimization, and compliance requirements.</p>
        </div>

        <div className="saas-features">
          <h3>Core SaaS Testing Capabilities</h3>
          <div className="grid grid-2">
            {saasFeatures.map((feature, index) => (
              <div key={index} className="saas-feature glass">
                <h4>{feature.feature}</h4>
                <p className="description">{feature.description}</p>
                <div className="test-scenarios">
                  <h5>Test Scenarios:</h5>
                  <ul>
                    {feature.testScenarios.map((scenario, idx) => (
                      <li key={idx}>{scenario}</li>
                    ))}
                  </ul>
                </div>
                <div className="tools">
                  <h5>Tools & Technologies:</h5>
                  <div className="tags">
                    {feature.tools.map((tool, idx) => (
                      <span key={idx} className="tag">{tool}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="saas-clients">
          <h3>Client Success Stories</h3>
          <div className="grid grid-2">
            {saasClients.map((client, index) => (
              <div key={index} className="saas-client glass">
                <h4>{client.name}</h4>
                <div className="industry">{client.industry}</div>
                <div className="challenge">
                  <strong>Challenge:</strong> {client.challenge}
                </div>
                <div className="solution">
                  <strong>Solution:</strong> {client.solution}
                </div>
                <div className="results">
                  <strong>Results:</strong>
                  <ul>
                    {client.results.map((result, idx) => (
                      <li key={idx}>{result}</li>
                    ))}
                  </ul>
                </div>
                <div className="technologies">
                  <strong>Technologies:</strong>
                  <div className="tags">
                    {client.technologies.map((tech, idx) => (
                      <span key={idx} className="tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Client Success Stories Page
function ClientSuccessStories() {
  const stories = [
    {
      client: 'TechStart Inc.',
      industry: 'FinTech',
      project: 'Mobile Banking Application',
      challenge: 'Critical security vulnerabilities and performance issues in production',
      approach: 'Comprehensive security testing and performance optimization',
      solution: 'Implemented automated security testing suite and performance monitoring framework',
      results: {
        security: '100% OWASP compliance achieved',
        performance: '70% improvement in app load times',
        reliability: '99.8% uptime maintained',
        userSatisfaction: '4.8/5 app store rating'
      },
      technologies: ['React Native', 'Node.js', 'AWS', 'Security Testing Tools'],
      duration: '3 months',
      testimonial: '"Ali\'s expertise in security testing saved us from potential data breaches. The performance improvements were remarkable."',
      author: 'Sarah Johnson, CTO'
    },
    {
      client: 'HealthCare Plus',
      industry: 'Healthcare',
      project: 'Patient Management System',
      challenge: 'HIPAA compliance issues and data integrity problems',
      approach: 'Compliance-focused testing with emphasis on data security and privacy',
      solution: 'Developed comprehensive compliance testing framework with automated data validation',
      results: {
        compliance: '100% HIPAA compliance achieved',
        dataAccuracy: '99.9% data integrity maintained',
        security: 'Zero security incidents',
        efficiency: '50% reduction in manual data entry errors'
      },
      technologies: ['Angular', 'Java', 'PostgreSQL', 'Compliance Testing Tools'],
      duration: '4 months',
      testimonial: '"The compliance testing framework Ali built gave us complete confidence in our data security. Outstanding work!"',
      author: 'Dr. Michael Chen, IT Director'
    },
    {
      client: 'E-Commerce Global',
      industry: 'E-Commerce',
      project: 'Multi-Platform E-Commerce Solution',
      challenge: 'Cross-platform compatibility issues and payment processing failures',
      approach: 'End-to-end testing across multiple platforms and payment gateways',
      solution: 'Implemented comprehensive cross-platform testing suite with payment gateway validation',
      results: {
        compatibility: '100% cross-platform compatibility',
        payments: '99.9% payment success rate',
        performance: '60% improvement in checkout completion',
        revenue: '25% increase in conversion rate'
      },
      technologies: ['React', 'Vue.js', 'Node.js', 'Payment Gateway APIs'],
      duration: '5 months',
      testimonial: '"Ali\'s testing approach eliminated our payment issues completely. The revenue impact was immediate and significant."',
      author: 'David Rodriguez, VP Engineering'
    }
  ];

  return (
    <section id="client-stories" className="section">
      <div className="container">
        <h2>Client Success Stories</h2>
        <p className="subtitle">Real results from real clients across various industries and technologies</p>
        
        <div className="stories-intro glass">
          <h3>Proven Track Record</h3>
          <p>These success stories demonstrate my ability to deliver exceptional results across different industries, technologies, and project complexities. Each project showcases my commitment to quality, innovation, and client success.</p>
        </div>

        <div className="success-stories-grid">
          {stories.map((story, index) => (
            <div key={index} className="success-story-detailed glass">
              <div className="story-header">
                <h3>{story.client}</h3>
                <div className="industry-badge">{story.industry}</div>
                <div className="project-title">{story.project}</div>
              </div>
              
              <div className="story-content">
                <div className="challenge-section">
                  <h4>Challenge</h4>
                  <p>{story.challenge}</p>
                </div>
                
                <div className="approach-section">
                  <h4>My Approach</h4>
                  <p>{story.approach}</p>
                </div>
                
                <div className="solution-section">
                  <h4>Solution Delivered</h4>
                  <p>{story.solution}</p>
                </div>
                
                <div className="results-section">
                  <h4>Results Achieved</h4>
                  <div className="results-grid">
                    {Object.entries(story.results).map(([key, value]) => (
                      <div key={key} className="result-item">
                        <span className="result-label">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</span>
                        <span className="result-value">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="technologies-section">
                  <h4>Technologies Used</h4>
                  <div className="tags">
                    {story.technologies.map((tech, idx) => (
                      <span key={idx} className="tag">{tech}</span>
                    ))}
                  </div>
                </div>
                
                <div className="testimonial-section">
                  <blockquote className="testimonial">
                    "{story.testimonial}"
                  </blockquote>
                  <cite className="author">— {story.author}</cite>
                </div>
                
                <div className="project-meta">
                  <span className="duration">Duration: {story.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span>© {new Date().getFullYear()} Ali Imran • Senior SQA Engineer • Available for contracts</span>
        <div className="links">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const [profileUrl, setProfileUrl] = useState('https://media.licdn.com/dms/image/v2/D4D03AQH5EfiZwi1_lQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1713723971661?e=2147483647&v=beta&t=cGFYEE90_-beDjBeOMb8fvgrHk-lok38R4Xj_rPYNsA');
  const [currentPage, setCurrentPage] = useState('home');
  const [imageLoading, setImageLoading] = useState(true);
  
  
  const onProfileSelect = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file (JPG, PNG, GIF, etc.)');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      
      // Show loading state
      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target.result;
      setProfileUrl(url);
        
        // Save to localStorage for persistence
        localStorage.setItem('profileImage', url);
        
        // Show success message
        console.log('Profile image updated successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  // Load saved profile image on component mount
  React.useEffect(() => {
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
      setProfileUrl(savedImage);
    }
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero />
            <AboutSection profileUrl={profileUrl} onProfileSelect={onProfileSelect} />
            <ManualTesting />
            <Skills />
            <Projects />
            <Process />
            <Testimonials />
            <Tools />
            <Publications />
          </>
        );
      case 'journey':
        return <ProfessionalJourney />;
      case 'ai-agent':
        return <AIAgentTesting />;
      case 'erp':
        return <ERPTesting />;
      case 'saas':
        return <SAASTesting />;
      case 'client-stories':
        return <ClientSuccessStories />;
      case 'projects':
        return (
          <>
            <Projects />
            <Process />
            <Tools />
          </>
        );
      case 'skills':
        return (
          <>
            <Skills />
            <ManualTesting />
            <Tools />
          </>
        );
      case 'contact':
        return <Contact />;
      default:
  return (
          <>
      <Hero />
      <AboutSection profileUrl={profileUrl} onProfileSelect={onProfileSelect} />
      <ManualTesting />
      <Skills />
      <Projects />
      <Process />
      <Testimonials />
      <Tools />
      <Publications />
          </>
        );
    }
  };

  return (
    <div>
      <Nav 
        profileUrl={profileUrl} 
        onProfileSelect={onProfileSelect} 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      {renderPage()}
      <Contact />
      <Footer />
    </div>
  );
}

export default App;