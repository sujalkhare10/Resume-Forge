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

  // A-4 Content Distribution Algorithm
  const calculateDistribution = () => {
    const exp = (experience || []).filter((e) => e.title || e.company || e.description);
    const edu = (education || []).filter((e) => e.degree || e.school || e.description);
    const proj = (projects || []).filter((p) => p.title || p.description);
    const cert = (certifications || []).filter((c) => c.name || c.issuer);

    const p1Budget = 680;
    let currentUsage = 80;
    if (summary) {
      currentUsage += Math.max(48, Math.ceil(summary.length / 65) * 16 + 28);
    }

    const expP1 = [];
    const expP2 = [];
    exp.forEach((item) => {
      let itemH = 52;
      if (item.description) itemH += Math.ceil(item.description.length / 58) * 16;
      if (expP2.length === 0 && currentUsage + itemH <= p1Budget) {
        expP1.push(item);
        currentUsage += itemH;
      } else {
        expP2.push(item);
      }
    });

    const eduP1 = [];
    const eduP2 = [];
    edu.forEach((item) => {
      let itemH = 46;
      if (item.description) itemH += Math.ceil(item.description.length / 58) * 16;
      if (expP2.length === 0 && eduP2.length === 0 && currentUsage + itemH <= p1Budget) {
        eduP1.push(item);
        currentUsage += itemH;
      } else {
        eduP2.push(item);
      }
    });

    const projP1 = [];
    const projP2 = [];
    proj.forEach((item) => {
      let itemH = 50;
      if (item.description) itemH += Math.ceil(item.description.length / 58) * 16;
      if (expP2.length === 0 && eduP2.length === 0 && projP2.length === 0 && currentUsage + itemH <= p1Budget) {
        projP1.push(item);
        currentUsage += itemH;
      } else {
        projP2.push(item);
      }
    });

    const certP1 = [];
    const certP2 = [];
    cert.forEach((item) => {
      let itemH = 36;
      if (expP2.length === 0 && eduP2.length === 0 && projP2.length === 0 && certP2.length === 0 && currentUsage + itemH <= p1Budget) {
        certP1.push(item);
        currentUsage += itemH;
      } else {
        certP2.push(item);
      }
    });

    const isTwoPages = (expP2.length > 0 || eduP2.length > 0 || projP2.length > 0 || certP2.length > 0);
    return { expP1, expP2, eduP1, eduP2, projP1, projP2, certP1, certP2, isTwoPages };
  };

  const dist = calculateDistribution();

  const PageBreak = () => (
    <div
      className="resume-page-break active"
      style={{
        display: 'flex',
        width: '100%',
        maxWidth: 595,
        margin: '16px 0',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
      }}
    >
      <div
        className="resume-page-break-line"
        style={{ flex: 1, height: 1, borderTop: '1px dashed rgba(148, 163, 184, 0.6)' }}
      />
      <span
        className="resume-page-break-tag"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          background: '#1e293b',
          color: '#f1f5f9',
          padding: '4px 12px',
          borderRadius: 14,
          fontSize: '0.68rem',
          fontWeight: 600,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
        }}
      >
        📄 Page 2 · A4 (297mm)
      </span>
      <div
        className="resume-page-break-line"
        style={{ flex: 1, height: 1, borderTop: '1px dashed rgba(148, 163, 184, 0.6)' }}
      />
    </div>
  );

  const pageStyle = {
    width: 595,
    maxWidth: 595,
    height: 842,
    minHeight: 842,
    maxHeight: 842,
    boxSizing: 'border-box',
    overflow: 'hidden',
    position: 'relative',
    background: '#ffffff',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.28)',
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'column',
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
          <span
            className="preview-page-pill"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
              background: dist.isTwoPages ? 'rgba(99, 102, 241, 0.14)' : 'rgba(13, 148, 136, 0.12)',
              color: dist.isTwoPages ? '#6366f1' : '#0d9488',
              border: dist.isTwoPages ? '1px solid rgba(99, 102, 241, 0.32)' : '1px solid rgba(13, 148, 136, 0.28)',
              padding: '3px 10px',
              borderRadius: 20,
              fontSize: '0.74rem',
              fontWeight: 600,
              marginLeft: 8,
            }}
          >
            {dist.isTwoPages ? '📄 2 Pages (A4)' : '📄 1 Page (A4)'}
          </span>
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
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'top center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* ========================================================= */}
          {/* TEMPLATE 1: MODERN (MULTI-PAGE A4)                        */}
          {/* ========================================================= */}
          {template === 'modern' && (
            <div className="resume-sheet" id="print-area">
              {/* Modern Page 1 */}
              <div className="resume-page resume-page-1 res-modern" style={pageStyle}>
                <div style={{ display: 'flex', width: '100%', height: '100%', flex: 1 }}>
                  <aside className="res-modern-sidebar" style={{ width: '32%', background: '#0f172a', color: '#e2e8f0', padding: '24px 18px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div className="res-modern-avatar">
                      {personalInfo.fullName ? personalInfo.fullName.charAt(0).toUpperCase() : 'RF'}
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

                    {dist.certP1.length > 0 && (
                      <div className="res-sidebar-section">
                        <h4 className="res-sidebar-title">Certifications</h4>
                        <div className="res-sidebar-certs">
                          {dist.certP1.map((c) => (
                            <div key={c.id || c.name} className="res-sidebar-cert-item">
                              <strong>{c.name}</strong>
                              {c.issuer && <div className="res-sub">{c.issuer}</div>}
                              {c.issueDate && <div className="res-date-sub">{c.issueDate}</div>}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </aside>

                  <main className="res-modern-main" style={{ flex: 1, padding: '26px 22px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <header className="res-modern-header">
                      <h1 className="res-main-name">{personalInfo.fullName || 'Your Name'}</h1>
                      <h2 className="res-main-title">{personalInfo.jobTitle || 'Your Desired Job Title'}</h2>
                    </header>

                    {summary && (
                      <section className="res-section">
                        <h3 className="res-section-title">Professional Summary</h3>
                        <p className="res-text">{summary}</p>
                      </section>
                    )}

                    {dist.expP1.length > 0 && (
                      <section className="res-section">
                        <h3 className="res-section-title">Work Experience</h3>
                        <div className="res-entries">
                          {dist.expP1.map((exp) => (
                            <div key={exp.id || exp.title} className="res-entry">
                              <div className="res-entry-head">
                                <div>
                                  <span className="res-entry-title">{exp.title || 'Job Title'}</span>
                                  <span className="res-entry-company">{exp.company ? ` · ${exp.company}` : ''}</span>
                                </div>
                                <span className="res-entry-dates">
                                  {[exp.startDate, exp.endDate].filter(Boolean).join(' – ')}
                                </span>
                              </div>
                              {exp.location && <div className="res-entry-loc">{exp.location}</div>}
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

                    {dist.eduP1.length > 0 && (
                      <section className="res-section">
                        <h3 className="res-section-title">Education</h3>
                        <div className="res-entries">
                          {dist.eduP1.map((edu) => (
                            <div key={edu.id || edu.degree} className="res-entry">
                              <div className="res-entry-head">
                                <div>
                                  <span className="res-entry-title">{edu.degree || 'Degree'}</span>
                                  <span className="res-entry-company">{edu.school ? ` · ${edu.school}` : ''}</span>
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

                    {dist.projP1.length > 0 && (
                      <section className="res-section">
                        <h3 className="res-section-title">Projects</h3>
                        <div className="res-entries">
                          {dist.projP1.map((proj) => (
                            <div key={proj.id || proj.title} className="res-entry">
                              <div className="res-entry-head">
                                <div>
                                  <span className="res-entry-title">{proj.title}</span>
                                  {proj.role && <span className="res-entry-company"> · {proj.role}</span>}
                                </div>
                                {proj.link && (
                                  <a href={proj.link} target="_blank" rel="noreferrer" className="res-entry-link">
                                    Demo <ExternalLink size={10} />
                                  </a>
                                )}
                              </div>
                              {proj.technologies && <div className="res-entry-tech"><strong>Stack:</strong> {proj.technologies}</div>}
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
                <div className="resume-page-footer" style={{ position: 'absolute', bottom: 8, right: 16, fontSize: '0.62rem', color: '#94a3b8' }}>
                  Page 1 of {dist.isTwoPages ? '2' : '1'}
                </div>
              </div>

              {/* Modern Page 2 */}
              {dist.isTwoPages && (
                <>
                  <PageBreak />
                  <div className="resume-page resume-page-2 res-modern" style={pageStyle}>
                    <div style={{ display: 'flex', width: '100%', height: '100%', flex: 1 }}>
                      <aside className="res-modern-sidebar" style={{ width: '32%', background: '#0f172a', color: '#e2e8f0', padding: '24px 18px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingBottom: 8, borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
                          <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg, #0d9488, #2dd4bf)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem' }}>
                            {personalInfo.fullName ? personalInfo.fullName.charAt(0).toUpperCase() : 'M'}
                          </div>
                          <span style={{ fontSize: '0.76rem', fontWeight: 700, color: '#f8fafc' }}>{personalInfo.fullName || 'Mukesh Ambani'}</span>
                        </div>

                        {dist.certP2.length > 0 && (
                          <div className="res-sidebar-section">
                            <h4 className="res-sidebar-title">Certifications</h4>
                            <div className="res-sidebar-certs">
                              {dist.certP2.map((c) => (
                                <div key={c.id || c.name} className="res-sidebar-cert-item">
                                  <strong>{c.name}</strong>
                                  {c.issuer && <div className="res-sub">{c.issuer}</div>}
                                  {c.issueDate && <div className="res-date-sub">{c.issueDate}</div>}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </aside>

                      <main className="res-modern-main" style={{ flex: 1, padding: '26px 22px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '2px solid #0d9488', paddingBottom: 8 }}>
                          <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>{personalInfo.fullName || 'Your Name'}</span>
                          <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#0d9488', textTransform: 'uppercase' }}>Curriculum Vitae · Page 2</span>
                        </div>

                        {dist.expP2.length > 0 && (
                          <section className="res-section">
                            <h3 className="res-section-title">Work Experience (Cont.)</h3>
                            <div className="res-entries">
                              {dist.expP2.map((exp) => (
                                <div key={exp.id || exp.title} className="res-entry">
                                  <div className="res-entry-head">
                                    <div>
                                      <span className="res-entry-title">{exp.title || 'Job Title'}</span>
                                      <span className="res-entry-company">{exp.company ? ` · ${exp.company}` : ''}</span>
                                    </div>
                                    <span className="res-entry-dates">
                                      {[exp.startDate, exp.endDate].filter(Boolean).join(' – ')}
                                    </span>
                                  </div>
                                  {exp.location && <div className="res-entry-loc">{exp.location}</div>}
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

                        {dist.eduP2.length > 0 && (
                          <section className="res-section">
                            <h3 className="res-section-title">Education</h3>
                            <div className="res-entries">
                              {dist.eduP2.map((edu) => (
                                <div key={edu.id || edu.degree} className="res-entry">
                                  <div className="res-entry-head">
                                    <div>
                                      <span className="res-entry-title">{edu.degree || 'Degree'}</span>
                                      <span className="res-entry-company">{edu.school ? ` · ${edu.school}` : ''}</span>
                                    </div>
                                    <span className="res-entry-dates">
                                      {[edu.startDate, edu.endDate].filter(Boolean).join(' – ')}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </section>
                        )}

                        {dist.projP2.length > 0 && (
                          <section className="res-section">
                            <h3 className="res-section-title">Projects</h3>
                            <div className="res-entries">
                              {dist.projP2.map((proj) => (
                                <div key={proj.id || proj.title} className="res-entry">
                                  <div className="res-entry-head">
                                    <div>
                                      <span className="res-entry-title">{proj.title}</span>
                                      {proj.role && <span className="res-entry-company"> · {proj.role}</span>}
                                    </div>
                                  </div>
                                  {proj.technologies && <div className="res-entry-tech"><strong>Stack:</strong> {proj.technologies}</div>}
                                </div>
                              ))}
                            </div>
                          </section>
                        )}
                      </main>
                    </div>
                    <div className="resume-page-footer" style={{ position: 'absolute', bottom: 8, right: 16, fontSize: '0.62rem', color: '#94a3b8' }}>
                      Page 2 of 2
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* TEMPLATE 2: MINIMAL (MULTI-PAGE A4)                       */}
          {/* ========================================================= */}
          {template === 'minimal' && (
            <div className="resume-sheet" id="print-area">
              {/* Minimal Page 1 */}
              <div className="resume-page resume-page-1 res-minimal" style={{ ...pageStyle, padding: '32px 30px 36px' }}>
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

                {dist.expP1.length > 0 && (
                  <section className="res-min-section">
                    <h3 className="res-min-heading">Experience</h3>
                    <div className="res-min-divider" />
                    {dist.expP1.map((exp) => (
                      <div key={exp.id || exp.title} className="res-entry">
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

                {dist.eduP1.length > 0 && (
                  <section className="res-min-section">
                    <h3 className="res-min-heading">Education</h3>
                    <div className="res-min-divider" />
                    {dist.eduP1.map((edu) => (
                      <div key={edu.id || edu.degree} className="res-entry">
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

                {dist.projP1.length > 0 && (
                  <section className="res-min-section">
                    <h3 className="res-min-heading">Projects</h3>
                    <div className="res-min-divider" />
                    {dist.projP1.map((p) => (
                      <div key={p.id || p.title} className="res-entry">
                        <div className="res-entry-head">
                          <strong>{p.title}</strong>
                          {p.technologies && <span className="res-entry-dates">{p.technologies}</span>}
                        </div>
                        {p.description && <p className="res-text">{p.description}</p>}
                      </div>
                    ))}
                  </section>
                )}

                {dist.certP1.length > 0 && (
                  <section className="res-min-section">
                    <h3 className="res-min-heading">Certifications</h3>
                    <div className="res-min-divider" />
                    {dist.certP1.map((c) => (
                      <div key={c.id || c.name} className="res-entry-head" style={{ marginBottom: 4 }}>
                        <span><strong>{c.name}</strong> — {c.issuer}</span>
                        {c.issueDate && <span className="res-entry-dates">{c.issueDate}</span>}
                      </div>
                    ))}
                  </section>
                )}

                <div className="resume-page-footer" style={{ position: 'absolute', bottom: 8, right: 16, fontSize: '0.62rem', color: '#94a3b8' }}>
                  Page 1 of {dist.isTwoPages ? '2' : '1'}
                </div>
              </div>

              {/* Minimal Page 2 */}
              {dist.isTwoPages && (
                <>
                  <PageBreak />
                  <div className="resume-page resume-page-2 res-minimal" style={{ ...pageStyle, padding: '32px 30px 36px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid #cbd5e1', paddingBottom: 8, marginBottom: 12 }}>
                      <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>{personalInfo.fullName || 'Your Name'}</span>
                      <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500 }}>Curriculum Vitae · Page 2</span>
                    </div>

                    {dist.expP2.length > 0 && (
                      <section className="res-min-section">
                        <h3 className="res-min-heading">Experience (Cont.)</h3>
                        <div className="res-min-divider" />
                        {dist.expP2.map((exp) => (
                          <div key={exp.id || exp.title} className="res-entry">
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

                    {dist.eduP2.length > 0 && (
                      <section className="res-min-section">
                        <h3 className="res-min-heading">Education</h3>
                        <div className="res-min-divider" />
                        {dist.eduP2.map((edu) => (
                          <div key={edu.id || edu.degree} className="res-entry">
                            <div className="res-entry-head">
                              <strong>{edu.degree} — {edu.school}</strong>
                              <span className="res-entry-dates">
                                {[edu.startDate, edu.endDate].filter(Boolean).join(' – ')}
                              </span>
                            </div>
                          </div>
                        ))}
                      </section>
                    )}

                    {dist.projP2.length > 0 && (
                      <section className="res-min-section">
                        <h3 className="res-min-heading">Projects</h3>
                        <div className="res-min-divider" />
                        {dist.projP2.map((p) => (
                          <div key={p.id || p.title} className="res-entry">
                            <div className="res-entry-head">
                              <strong>{p.title}</strong>
                            </div>
                            {p.description && <p className="res-text">{p.description}</p>}
                          </div>
                        ))}
                      </section>
                    )}

                    {dist.certP2.length > 0 && (
                      <section className="res-min-section">
                        <h3 className="res-min-heading">Certifications</h3>
                        <div className="res-min-divider" />
                        {dist.certP2.map((c) => (
                          <div key={c.id || c.name} className="res-entry-head" style={{ marginBottom: 4 }}>
                            <span><strong>{c.name}</strong> — {c.issuer}</span>
                            {c.issueDate && <span className="res-entry-dates">{c.issueDate}</span>}
                          </div>
                        ))}
                      </section>
                    )}

                    <div className="resume-page-footer" style={{ position: 'absolute', bottom: 8, right: 16, fontSize: '0.62rem', color: '#94a3b8' }}>
                      Page 2 of 2
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* TEMPLATE 3: CREATIVE (MULTI-PAGE A4)                      */}
          {/* ========================================================= */}
          {template === 'creative' && (
            <div className="resume-sheet" id="print-area">
              {/* Creative Page 1 */}
              <div className="resume-page resume-page-1 res-creative" style={pageStyle}>
                <div className="res-cr-topbar" style={{ height: 8, background: 'linear-gradient(90deg, #0284c7 0%, #8b5cf6 35%, #ec4899 70%, #f59e0b 100%)' }} />
                <div className="res-cr-content" style={{ padding: '24px 22px 30px' }}>
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

                  <div className="res-cr-body-grid" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16 }}>
                    <div className="res-cr-col-main">
                      {dist.expP1.length > 0 && (
                        <section className="res-cr-section">
                          <h3 className="res-cr-heading" style={{ color: '#0284c7' }}>Work Experience</h3>
                          {dist.expP1.map((exp) => (
                            <div key={exp.id || exp.title} className="res-cr-card">
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

                      {dist.projP1.length > 0 && (
                        <section className="res-cr-section">
                          <h3 className="res-cr-heading" style={{ color: '#0284c7' }}>Featured Projects</h3>
                          {dist.projP1.map((p) => (
                            <div key={p.id || p.title} className="res-cr-card">
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
                          <h3 className="res-cr-heading" style={{ color: '#db2777' }}>Core Skills</h3>
                          <div className="res-cr-skills-wrap">
                            {skills.map((s) => (
                              <span key={s} className="res-cr-skill-pill">
                                {s}
                              </span>
                            ))}
                          </div>
                        </section>
                      )}

                      {dist.eduP1.length > 0 && (
                        <section className="res-cr-section">
                          <h3 className="res-cr-heading" style={{ color: '#7c3aed' }}>Education</h3>
                          {dist.eduP1.map((edu) => (
                            <div key={edu.id || edu.degree} className="res-cr-side-item">
                              <strong>{edu.degree}</strong>
                              <div>{edu.school}</div>
                              <div className="res-date-sub">{[edu.startDate, edu.endDate].filter(Boolean).join(' – ')}</div>
                            </div>
                          ))}
                        </section>
                      )}

                      {dist.certP1.length > 0 && (
                        <section className="res-cr-section">
                          <h3 className="res-cr-heading" style={{ color: '#d97706' }}>Certifications</h3>
                          {dist.certP1.map((c) => (
                            <div key={c.id || c.name} className="res-cr-side-item">
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
                <div className="resume-page-footer" style={{ position: 'absolute', bottom: 8, right: 16, fontSize: '0.62rem', color: '#94a3b8' }}>
                  Page 1 of {dist.isTwoPages ? '2' : '1'}
                </div>
              </div>

              {/* Creative Page 2 */}
              {dist.isTwoPages && (
                <>
                  <PageBreak />
                  <div className="resume-page resume-page-2 res-creative" style={pageStyle}>
                    <div className="res-cr-topbar" style={{ height: 8, background: 'linear-gradient(90deg, #0284c7 0%, #8b5cf6 35%, #ec4899 70%, #f59e0b 100%)' }} />
                    <div className="res-cr-content" style={{ padding: '24px 22px 30px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1.5px solid #e2e8f0', paddingBottom: 8, marginBottom: 12 }}>
                        <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>{personalInfo.fullName || 'Your Name'}</span>
                        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#8b5cf6', textTransform: 'uppercase' }}>Page 2 · A4</span>
                      </div>

                      <div className="res-cr-body-grid" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16 }}>
                        <div className="res-cr-col-main">
                          {dist.expP2.length > 0 && (
                            <section className="res-cr-section">
                              <h3 className="res-cr-heading" style={{ color: '#0284c7' }}>Experience (Cont.)</h3>
                              {dist.expP2.map((exp) => (
                                <div key={exp.id || exp.title} className="res-cr-card">
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

                          {dist.projP2.length > 0 && (
                            <section className="res-cr-section">
                              <h3 className="res-cr-heading" style={{ color: '#0284c7' }}>Featured Projects</h3>
                              {dist.projP2.map((p) => (
                                <div key={p.id || p.title} className="res-cr-card">
                                  <div className="res-cr-card-top">
                                    <span className="res-cr-card-title">{p.title}</span>
                                  </div>
                                  {p.technologies && <div className="res-cr-card-sub">{p.technologies}</div>}
                                </div>
                              ))}
                            </section>
                          )}
                        </div>

                        <div className="res-cr-col-side">
                          {dist.eduP2.length > 0 && (
                            <section className="res-cr-section">
                              <h3 className="res-cr-heading" style={{ color: '#7c3aed' }}>Education</h3>
                              {dist.eduP2.map((edu) => (
                                <div key={edu.id || edu.degree} className="res-cr-side-item">
                                  <strong>{edu.degree}</strong>
                                  <div>{edu.school}</div>
                                </div>
                              ))}
                            </section>
                          )}

                          {dist.certP2.length > 0 && (
                            <section className="res-cr-section">
                              <h3 className="res-cr-heading" style={{ color: '#d97706' }}>Certifications</h3>
                              {dist.certP2.map((c) => (
                                <div key={c.id || c.name} className="res-cr-side-item">
                                  <strong>{c.name}</strong>
                                  <div>{c.issuer}</div>
                                </div>
                              ))}
                            </section>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="resume-page-footer" style={{ position: 'absolute', bottom: 8, right: 16, fontSize: '0.62rem', color: '#94a3b8' }}>
                      Page 2 of 2
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
