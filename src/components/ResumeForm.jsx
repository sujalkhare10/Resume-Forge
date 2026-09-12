import React, { useState } from 'react';
import {
  User,
  FileText,
  GraduationCap,
  Briefcase,
  Wrench,
  FolderGit2,
  ShieldCheck,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  Eye,
  Layers,
} from 'lucide-react';

import PersonalInfo from './PersonalInfo';
import Summary from './Summary';
import Education from './Education';
import Experience from './Experience';
import Skills from './Skills';
import Projects from './Projects';
import Certifications from './Certifications';

const SECTIONS = [
  { id: 'all', label: 'All Sections', icon: Layers },
  { id: 'personal', label: 'Personal Info', icon: User },
  { id: 'summary', label: 'Summary', icon: FileText },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'skills', label: 'Skills', icon: Wrench },
  { id: 'projects', label: 'Projects', icon: FolderGit2 },
  { id: 'certifications', label: 'Certifications', icon: ShieldCheck },
];

export default function ResumeForm({
  resumeData,
  onChange,
  onLoadSample,
  onClear,
  onTogglePreviewMobile,
  showMobilePreview,
}) {
  const [activeSection, setActiveSection] = useState('all');

  const calculateProgress = () => {
    let totalFields = 7;
    let completed = 0;

    if (resumeData.personalInfo?.fullName && resumeData.personalInfo?.email) completed++;
    if (resumeData.summary?.trim().length > 10) completed++;
    if (resumeData.experience?.some((e) => e.title && e.company)) completed++;
    if (resumeData.education?.some((e) => e.degree && e.school)) completed++;
    if (resumeData.skills?.length > 0) completed++;
    if (resumeData.projects?.some((p) => p.title)) completed++;
    if (resumeData.certifications?.some((c) => c.name)) completed++;

    return Math.round((completed / totalFields) * 100);
  };

  const progress = calculateProgress();

  const handleUpdateSection = (sectionKey, value) => {
    onChange({
      ...resumeData,
      [sectionKey]: value,
    });
  };

  return (
    <div className="rf-form-container">
      {/* Form Top Utility Bar */}
      <div className="rf-form-topbar">
        <div className="rf-progress-box">
          <div className="rf-progress-info">
            <span className="rf-progress-label">Resume Strength</span>
            <span className="rf-progress-pct">{progress}%</span>
          </div>
          <div className="rf-progress-track">
            <div
              className="rf-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="rf-topbar-actions">
          <button
            type="button"
            className="rf-btn-ghost rf-btn-sm"
            onClick={onLoadSample}
            title="Fill with realistic sample data"
          >
            <Sparkles size={14} className="rf-text-teal" />
            <span>Load Sample</span>
          </button>

          <button
            type="button"
            className="rf-btn-ghost rf-btn-sm"
            onClick={onClear}
            title="Reset form fields"
          >
            <RotateCcw size={14} />
            <span>Clear</span>
          </button>

          {onTogglePreviewMobile && (
            <button
              type="button"
              className="rf-btn-primary rf-btn-sm rf-mobile-preview-btn"
              onClick={onTogglePreviewMobile}
            >
              <Eye size={14} />
              <span>{showMobilePreview ? 'Edit Form' : 'View Preview'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Section Quick Navigator (Pills) */}
      <nav className="rf-nav-pills" aria-label="Resume Form Sections">
        {SECTIONS.map((sec) => {
          const Icon = sec.icon;
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              type="button"
              className={`rf-nav-pill ${isActive ? 'active' : ''}`}
              onClick={() => setActiveSection(sec.id)}
            >
              <Icon size={15} />
              <span>{sec.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Form Sections */}
      <div className="rf-sections-stack">
        {(activeSection === 'all' || activeSection === 'personal') && (
          <section id="section-personal" className="rf-section-wrapper">
            <PersonalInfo
              data={resumeData.personalInfo || {}}
              onChange={(val) => handleUpdateSection('personalInfo', val)}
            />
          </section>
        )}

        {(activeSection === 'all' || activeSection === 'summary') && (
          <section id="section-summary" className="rf-section-wrapper">
            <Summary
              summary={resumeData.summary || ''}
              onChange={(val) => handleUpdateSection('summary', val)}
            />
          </section>
        )}

        {(activeSection === 'all' || activeSection === 'experience') && (
          <section id="section-experience" className="rf-section-wrapper">
            <Experience
              experience={resumeData.experience || []}
              onChange={(val) => handleUpdateSection('experience', val)}
            />
          </section>
        )}

        {(activeSection === 'all' || activeSection === 'education') && (
          <section id="section-education" className="rf-section-wrapper">
            <Education
              education={resumeData.education || []}
              onChange={(val) => handleUpdateSection('education', val)}
            />
          </section>
        )}

        {(activeSection === 'all' || activeSection === 'skills') && (
          <section id="section-skills" className="rf-section-wrapper">
            <Skills
              skills={resumeData.skills || []}
              onChange={(val) => handleUpdateSection('skills', val)}
            />
          </section>
        )}

        {(activeSection === 'all' || activeSection === 'projects') && (
          <section id="section-projects" className="rf-section-wrapper">
            <Projects
              projects={resumeData.projects || []}
              onChange={(val) => handleUpdateSection('projects', val)}
            />
          </section>
        )}

        {(activeSection === 'all' || activeSection === 'certifications') && (
          <section id="section-certifications" className="rf-section-wrapper">
            <Certifications
              certifications={resumeData.certifications || []}
              onChange={(val) => handleUpdateSection('certifications', val)}
            />
          </section>
        )}
      </div>

      <div className="rf-form-footer">
        <div className="rf-footer-status">
          <CheckCircle2 size={16} className="rf-text-teal" />
          <span>Auto-saved to browser storage</span>
        </div>
      </div>
    </div>
  );
}
