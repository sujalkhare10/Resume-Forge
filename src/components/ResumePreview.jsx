import React, { useState } from 'react';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Printer,
  Mail,
  Phone,
  MapPin,
  Globe,
  ExternalLink,
} from 'lucide-react';
import { LinkedinIcon, GithubIcon } from './Icons';

export default function ResumePreview({ resumeData, template, onTemplateChange }) {
  const [zoom, setZoom] = useState(1);

  const {
    personalInfo = {},
    summary = '',
    experience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
  } = resumeData;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="rf-preview-wrapper">
      {/* Preview Top Toolbar */}
      <div className="rf-preview-toolbar">
        <div className="rf-template-picker">
          <label className="rf-toolbar-label">Template:</label>
          <div className="rf-tpl-buttons">
            <button
              type="button"
              className={`rf-tpl-btn ${template === 'modern' ? 'active' : ''}`}
              onClick={() => onTemplateChange('modern')}
            >
              Modern
            </button>
            <button
              type="button"
              className={`rf-tpl-btn ${template === 'minimal' ? 'active' : ''}`}
              onClick={() => onTemplateChange('minimal')}
            >
              Minimal
            </button>
            <button
              type="button"
              className={`rf-tpl-btn ${template === 'creative' ? 'active' : ''}`}
              onClick={() => onTemplateChange('creative')}
            >
              Creative
            </button>
          </div>
        </div>

        <div className="rf-zoom-controls">
          <button
            type="button"
            className="rf-icon-btn"
            onClick={() => setZoom((z) => Math.max(0.6, Number((z - 0.1).toFixed(1))))}
            title="Zoom Out"
          >
            <ZoomOut size={16} />
          </button>
          <span className="rf-zoom-pct">{Math.round(zoom * 100)}%</span>
          <button
            type="button"
            className="rf-icon-btn"
            onClick={() => setZoom((z) => Math.min(1.4, Number((z + 0.1).toFixed(1))))}
            title="Zoom In"
          >
            <ZoomIn size={16} />
          </button>
          <button
            type="button"
            className="rf-icon-btn"
            onClick={() => setZoom(1)}
            title="Reset Zoom"
          >
            <Maximize2 size={16} />
          </button>
          <button
            type="button"
            className="rf-btn-primary rf-btn-sm"
            onClick={handlePrint}
          >
            <Printer size={15} />
            <span>Print / PDF</span>
          </button>
        </div>
      </div>

      {/* Resume Canvas Area */}
      <div className="rf-canvas-scroll">
        <div
          className="rf-resume-canvas"
          style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }}
        >
          {/* TEMPLATE 1: MODERN */}
          {template === 'modern' && (
            <div className="res-modern" id="print-area">
              <aside className="res-modern-sidebar">
                <div className="res-modern-avatar">
                  {personalInfo.fullName
                    ? personalInfo.fullName.charAt(0).toUpperCase()
                    : 'RF'}
                </div>

                <div className="res-sidebar-section">
                  <h4 className="res-sidebar-title">Contact</h4>
                  <div className="res-sidebar-links">
                    {personalInfo.email && (
                      <div className="res-sidebar-item">
                        <Mail size={12} />
                        <span>{personalInfo.email}</span>
                      </div>
                    )}
                    {personalInfo.phone && (
                      <div className="res-sidebar-item">
                        <Phone size={12} />
                        <span>{personalInfo.phone}</span>
                      </div>
                    )}
                    {personalInfo.location && (
                      <div className="res-sidebar-item">
                        <MapPin size={12} />
                        <span>{personalInfo.location}</span>
                      </div>
                    )}
                    {personalInfo.linkedIn && (
                      <div className="res-sidebar-item">
                        <LinkedinIcon size={12} />
                        <span>{personalInfo.linkedIn.replace(/^https?:\/\//, '')}</span>
                      </div>
                    )}
                    {personalInfo.github && (
                      <div className="res-sidebar-item">
                        <GithubIcon size={12} />
                        <span>{personalInfo.github.replace(/^https?:\/\//, '')}</span>
                      </div>
                    )}
                    {personalInfo.portfolio && (
                      <div className="res-sidebar-item">
                        <Globe size={12} />
                        <span>{personalInfo.portfolio.replace(/^https?:\/\//, '')}</span>
                      </div>
                    )}
                  </div>
                </div>

                {skills && skills.length > 0 && (
                  <div className="res-sidebar-section">
                    <h4 className="res-sidebar-title">Skills</h4>
                    <div className="res-sidebar-skills">
                      {skills.map((skill) => (
                        <span key={skill} className="res-modern-skill-pill">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {certifications && certifications.length > 0 && certifications.some((c) => c.name) && (
                  <div className="res-sidebar-section">
                    <h4 className="res-sidebar-title">Certifications</h4>
                    <div className="res-sidebar-certs">
                      {certifications
                        .filter((c) => c.name)
                        .map((c) => (
                          <div key={c.id} className="res-sidebar-cert-item">
                            <strong>{c.name}</strong>
                            {c.issuer && <div className="res-sub">{c.issuer}</div>}
                            {c.issueDate && <div className="res-date-sub">{c.issueDate}</div>}
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </aside>

              <main className="res-modern-main">
                <header className="res-modern-header">
                  <h1 className="res-main-name">
                    {personalInfo.fullName || 'Your Name'}
                  </h1>
                  <h2 className="res-main-title">
                    {personalInfo.jobTitle || 'Your Desired Job Title'}
                  </h2>
                </header>

                {summary && (
                  <section className="res-section">
                    <h3 className="res-section-title">Professional Summary</h3>
                    <p className="res-text">{summary}</p>
                  </section>
                )}

                {experience && experience.length > 0 && experience.some((e) => e.title || e.company) && (
                  <section className="res-section">
                    <h3 className="res-section-title">Work Experience</h3>
                    <div className="res-entries">
                      {experience
                        .filter((e) => e.title || e.company)
                        .map((exp) => (
                          <div key={exp.id} className="res-entry">
                            <div className="res-entry-head">
                              <div>
                                <span className="res-entry-title">{exp.title || 'Job Title'}</span>
                                <span className="res-entry-company">
                                  {exp.company ? ` · ${exp.company}` : ''}
                                </span>
                              </div>
                              <span className="res-entry-dates">
                                {[exp.startDate, exp.endDate].filter(Boolean).join(' – ')}
                              </span>
                            </div>
                            {exp.location && (
                              <div className="res-entry-loc">{exp.location}</div>
                            )}
                            {exp.description && (
                              <div className="res-entry-desc">
                                {exp.description.split('\n').map((line, idx) => (
                                  <p key={idx}>{line}</p>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                  </section>
                )}

                {education && education.length > 0 && education.some((e) => e.degree || e.school) && (
                  <section className="res-section">
                    <h3 className="res-section-title">Education</h3>
                    <div className="res-entries">
                      {education
                        .filter((e) => e.degree || e.school)
                        .map((edu) => (
                          <div key={edu.id} className="res-entry">
                            <div className="res-entry-head">
                              <div>
                                <span className="res-entry-title">{edu.degree || 'Degree'}</span>
                                <span className="res-entry-company">
                                  {edu.school ? ` · ${edu.school}` : ''}
                                </span>
                              </div>
                              <span className="res-entry-dates">
                                {[edu.startDate, edu.endDate].filter(Boolean).join(' – ')}
                              </span>
                            </div>
                            {edu.description && (
                              <div className="res-entry-desc">
                                <p>{edu.description}</p>
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                  </section>
                )}

                {projects && projects.length > 0 && projects.some((p) => p.title) && (
                  <section className="res-section">
                    <h3 className="res-section-title">Projects</h3>
                    <div className="res-entries">
                      {projects
                        .filter((p) => p.title)
                        .map((proj) => (
                          <div key={proj.id} className="res-entry">
                            <div className="res-entry-head">
                              <div>
                                <span className="res-entry-title">{proj.title}</span>
                                {proj.role && <span className="res-entry-company"> · {proj.role}</span>}
                              </div>
                              {proj.link && (
                                <a
                                  href={proj.link}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="res-entry-link"
                                >
                                  Demo <ExternalLink size={10} />
                                </a>
                              )}
                            </div>
                            {proj.technologies && (
                              <div className="res-entry-tech">
                                <strong>Stack:</strong> {proj.technologies}
                              </div>
                            )}
                            {proj.description && (
                              <div className="res-entry-desc">
                                <p>{proj.description}</p>
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                  </section>
                )}
              </main>
            </div>
          )}

          {/* TEMPLATE 2: MINIMAL */}
          {template === 'minimal' && (
            <div className="res-minimal" id="print-area">
              <header className="res-min-header">
                <h1 className="res-min-name">{personalInfo.fullName || 'Your Name'}</h1>
                <h2 className="res-min-title">{personalInfo.jobTitle || 'Your Title'}</h2>
                <div className="res-min-contacts">
                  {personalInfo.email && <span>{personalInfo.email}</span>}
                  {personalInfo.phone && <span>• {personalInfo.phone}</span>}
                  {personalInfo.location && <span>• {personalInfo.location}</span>}
                  {personalInfo.portfolio && (
                    <span>• {personalInfo.portfolio.replace(/^https?:\/\//, '')}</span>
                  )}
                  {personalInfo.github && (
                    <span>• {personalInfo.github.replace(/^https?:\/\//, '')}</span>
                  )}
                  {personalInfo.linkedIn && (
                    <span>• {personalInfo.linkedIn.replace(/^https?:\/\//, '')}</span>
                  )}
                </div>
              </header>

              {summary && (
                <section className="res-min-section">
                  <h3 className="res-min-heading">Summary</h3>
                  <div className="res-min-divider" />
                  <p className="res-text">{summary}</p>
                </section>
              )}

              {experience && experience.length > 0 && experience.some((e) => e.title || e.company) && (
                <section className="res-min-section">
                  <h3 className="res-min-heading">Experience</h3>
                  <div className="res-min-divider" />
                  {experience
                    .filter((e) => e.title || e.company)
                    .map((exp) => (
                      <div key={exp.id} className="res-entry">
                        <div className="res-entry-head">
                          <strong>{exp.title} — {exp.company}</strong>
                          <span className="res-entry-dates">
                            {[exp.startDate, exp.endDate].filter(Boolean).join(' – ')}
                          </span>
                        </div>
                        {exp.description && (
                          <div className="res-entry-desc">
                            {exp.description.split('\n').map((l, i) => (
                              <p key={i}>{l}</p>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                </section>
              )}

              {education && education.length > 0 && education.some((e) => e.degree || e.school) && (
                <section className="res-min-section">
                  <h3 className="res-min-heading">Education</h3>
                  <div className="res-min-divider" />
                  {education
                    .filter((e) => e.degree || e.school)
                    .map((edu) => (
                      <div key={edu.id} className="res-entry">
                        <div className="res-entry-head">
                          <strong>{edu.degree} — {edu.school}</strong>
                          <span className="res-entry-dates">
                            {[edu.startDate, edu.endDate].filter(Boolean).join(' – ')}
                          </span>
                        </div>
                        {edu.description && <p className="res-text">{edu.description}</p>}
                      </div>
                    ))}
                </section>
              )}

              {skills && skills.length > 0 && (
                <section className="res-min-section">
                  <h3 className="res-min-heading">Skills</h3>
                  <div className="res-min-divider" />
                  <p className="res-text">{skills.join(' • ')}</p>
                </section>
              )}

              {projects && projects.length > 0 && projects.some((p) => p.title) && (
                <section className="res-min-section">
                  <h3 className="res-min-heading">Projects</h3>
                  <div className="res-min-divider" />
                  {projects
                    .filter((p) => p.title)
                    .map((p) => (
                      <div key={p.id} className="res-entry">
                        <div className="res-entry-head">
                          <strong>{p.title}</strong>
                          {p.technologies && <span className="res-entry-dates">{p.technologies}</span>}
                        </div>
                        {p.description && <p className="res-text">{p.description}</p>}
                      </div>
                    ))}
                </section>
              )}

              {certifications && certifications.length > 0 && certifications.some((c) => c.name) && (
                <section className="res-min-section">
                  <h3 className="res-min-heading">Certifications</h3>
                  <div className="res-min-divider" />
                  {certifications
                    .filter((c) => c.name)
                    .map((c) => (
                      <div key={c.id} className="res-entry-head" style={{ marginBottom: 4 }}>
                        <span><strong>{c.name}</strong> — {c.issuer}</span>
                        {c.issueDate && <span className="res-entry-dates">{c.issueDate}</span>}
                      </div>
                    ))}
                </section>
              )}
            </div>
          )}

          {/* TEMPLATE 3: CREATIVE */}
          {template === 'creative' && (
            <div className="res-creative" id="print-area">
              <div className="res-cr-topbar" />
              <div className="res-cr-content">
                <header className="res-cr-header">
                  <div className="res-cr-header-left">
                    <h1 className="res-cr-name">{personalInfo.fullName || 'Your Name'}</h1>
                    <h2 className="res-cr-title">{personalInfo.jobTitle || 'Your Title'}</h2>
                  </div>
                  <div className="res-cr-header-contact">
                    {personalInfo.email && <div>{personalInfo.email}</div>}
                    {personalInfo.phone && <div>{personalInfo.phone}</div>}
                    {personalInfo.location && <div>{personalInfo.location}</div>}
                    {personalInfo.portfolio && (
                      <div>{personalInfo.portfolio.replace(/^https?:\/\//, '')}</div>
                    )}
                  </div>
                </header>

                {summary && (
                  <div className="res-cr-summary-callout">
                    <p>{summary}</p>
                  </div>
                )}

                <div className="res-cr-body-grid">
                  <div className="res-cr-col-main">
                    {experience && experience.some((e) => e.title) && (
                      <section className="res-cr-section">
                        <h3 className="res-cr-heading">Work Experience</h3>
                        {experience
                          .filter((e) => e.title)
                          .map((exp) => (
                            <div key={exp.id} className="res-cr-card">
                              <div className="res-cr-card-top">
                                <span className="res-cr-card-title">{exp.title}</span>
                                <span className="res-cr-card-badge">
                                  {[exp.startDate, exp.endDate].filter(Boolean).join(' – ')}
                                </span>
                              </div>
                              <div className="res-cr-card-sub">{exp.company} {exp.location ? `· ${exp.location}` : ''}</div>
                              {exp.description && (
                                <div className="res-entry-desc">
                                  {exp.description.split('\n').map((l, i) => (
                                    <p key={i}>{l}</p>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                      </section>
                    )}

                    {projects && projects.some((p) => p.title) && (
                      <section className="res-cr-section">
                        <h3 className="res-cr-heading">Featured Projects</h3>
                        {projects
                          .filter((p) => p.title)
                          .map((p) => (
                            <div key={p.id} className="res-cr-card">
                              <div className="res-cr-card-top">
                                <span className="res-cr-card-title">{p.title}</span>
                                {p.link && (
                                  <a href={p.link} target="_blank" rel="noreferrer" className="res-entry-link">
                                    Link <ExternalLink size={10} />
                                  </a>
                                )}
                              </div>
                              {p.technologies && <div className="res-cr-card-sub">{p.technologies}</div>}
                              {p.description && <p className="res-text">{p.description}</p>}
                            </div>
                          ))}
                      </section>
                    )}
                  </div>

                  <div className="res-cr-col-side">
                    {skills && skills.length > 0 && (
                      <section className="res-cr-section">
                        <h3 className="res-cr-heading">Core Skills</h3>
                        <div className="res-cr-skills-wrap">
                          {skills.map((s) => (
                            <span key={s} className="res-cr-skill-pill">
                              {s}
                            </span>
                          ))}
                        </div>
                      </section>
                    )}

                    {education && education.some((e) => e.degree) && (
                      <section className="res-cr-section">
                        <h3 className="res-cr-heading">Education</h3>
                        {education
                          .filter((e) => e.degree)
                          .map((edu) => (
                            <div key={edu.id} className="res-cr-side-item">
                              <strong>{edu.degree}</strong>
                              <div>{edu.school}</div>
                              <div className="res-date-sub">{[edu.startDate, edu.endDate].filter(Boolean).join(' – ')}</div>
                            </div>
                          ))}
                      </section>
                    )}

                    {certifications && certifications.some((c) => c.name) && (
                      <section className="res-cr-section">
                        <h3 className="res-cr-heading">Certifications</h3>
                        {certifications
                          .filter((c) => c.name)
                          .map((c) => (
                            <div key={c.id} className="res-cr-side-item">
                              <strong>{c.name}</strong>
                              <div>{c.issuer}</div>
                              {c.issueDate && <div className="res-date-sub">{c.issueDate}</div>}
                            </div>
                          ))}
                      </section>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
