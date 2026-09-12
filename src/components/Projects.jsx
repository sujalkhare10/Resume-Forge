import React from 'react';
import { FolderGit2, Plus, Trash2, Globe, Layers, Tag } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function Projects({ projects, onChange }) {
  const handleItemChange = (id, field, value) => {
    const updated = projects.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    onChange(updated);
  };

  const handleAdd = () => {
    const newItem = {
      id: 'proj-' + Date.now(),
      title: '',
      role: '',
      link: '',
      github: '',
      technologies: '',
      description: '',
    };
    onChange([...projects, newItem]);
  };

  const handleRemove = (id) => {
    if (projects.length <= 1) {
      onChange([
        {
          id: 'proj-' + Date.now(),
          title: '',
          role: '',
          link: '',
          github: '',
          technologies: '',
          description: '',
        },
      ]);
      return;
    }
    onChange(projects.filter((item) => item.id !== id));
  };

  return (
    <div className="rf-card">
      <div className="rf-card-header">
        <div className="rf-card-title-group">
          <div className="rf-section-icon icon-purple">
            <FolderGit2 size={20} />
          </div>
          <div>
            <h3 className="rf-card-title">Projects</h3>
            <p className="rf-card-subtitle">
              Showcase personal, open-source, or client projects that demonstrate your capabilities.
            </p>
          </div>
        </div>
        <button
          type="button"
          className="rf-btn-secondary rf-btn-sm"
          onClick={handleAdd}
        >
          <Plus size={16} />
          <span>Add Project</span>
        </button>
      </div>

      <div className="rf-card-body rf-entries-list">
        {projects.map((item, index) => (
          <div key={item.id} className="rf-entry-item">
            <div className="rf-entry-header">
              <div className="rf-entry-badge">
                <FolderGit2 size={14} />
                <span>
                  {item.title ? item.title : `Project #${index + 1}`}
                  {item.role ? ` (${item.role})` : ''}
                </span>
              </div>
              <button
                type="button"
                className="rf-icon-btn rf-delete-btn"
                onClick={() => handleRemove(item.id)}
                title="Remove Project"
                aria-label="Remove Project"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="rf-grid rf-grid-2">
              <div className="rf-input-group">
                <label className="rf-label">
                  Project Title <span className="rf-required">*</span>
                </label>
                <div className="rf-input-wrapper">
                  <span className="rf-input-icon">
                    <FolderGit2 size={16} />
                  </span>
                  <input
                    type="text"
                    className="rf-input has-icon"
                    placeholder="e.g. DevPulse Analytics"
                    value={item.title || ''}
                    onChange={(e) => handleItemChange(item.id, 'title', e.target.value)}
                  />
                </div>
              </div>

              <div className="rf-input-group">
                <label className="rf-label">Your Role / Subtitle</label>
                <div className="rf-input-wrapper">
                  <span className="rf-input-icon">
                    <Layers size={16} />
                  </span>
                  <input
                    type="text"
                    className="rf-input has-icon"
                    placeholder="e.g. Lead Architect / Full Stack Creator"
                    value={item.role || ''}
                    onChange={(e) => handleItemChange(item.id, 'role', e.target.value)}
                  />
                </div>
              </div>

              <div className="rf-input-group">
                <label className="rf-label">Live Demo / Website Link</label>
                <div className="rf-input-wrapper">
                  <span className="rf-input-icon">
                    <Globe size={16} />
                  </span>
                  <input
                    type="url"
                    className="rf-input has-icon"
                    placeholder="https://yourproject.app"
                    value={item.link || ''}
                    onChange={(e) => handleItemChange(item.id, 'link', e.target.value)}
                  />
                </div>
              </div>

              <div className="rf-input-group">
                <label className="rf-label">GitHub Repository Link</label>
                <div className="rf-input-wrapper">
                  <span className="rf-input-icon">
                    <GithubIcon size={16} />
                  </span>
                  <input
                    type="url"
                    className="rf-input has-icon"
                    placeholder="https://github.com/username/project"
                    value={item.github || ''}
                    onChange={(e) => handleItemChange(item.id, 'github', e.target.value)}
                  />
                </div>
              </div>

              <div className="rf-input-group rf-col-span-2">
                <label className="rf-label">Technologies Used</label>
                <div className="rf-input-wrapper">
                  <span className="rf-input-icon">
                    <Tag size={16} />
                  </span>
                  <input
                    type="text"
                    className="rf-input has-icon"
                    placeholder="e.g. React, TypeScript, Node.js, PostgreSQL, Docker"
                    value={item.technologies || ''}
                    onChange={(e) => handleItemChange(item.id, 'technologies', e.target.value)}
                  />
                </div>
              </div>

              <div className="rf-input-group rf-col-span-2">
                <label className="rf-label">Project Description & Impact</label>
                <textarea
                  className="rf-textarea"
                  rows={3}
                  placeholder="e.g. Built a real-time collaboration canvas with 10k monthly active users. Integrated Stripe subscriptions and automated deployments with GitHub Actions."
                  value={item.description || ''}
                  onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
