import React from 'react';
import { Briefcase, Plus, Trash2, Calendar, MapPin, Building2, CheckSquare, Square } from 'lucide-react';

export default function Experience({ experience, onChange }) {
  const handleItemChange = (id, field, value) => {
    const updated = experience.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    onChange(updated);
  };

  const handleToggleCurrent = (id, currentValue) => {
    const updated = experience.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          current: !currentValue,
          endDate: !currentValue ? 'Present' : '',
        };
      }
      return item;
    });
    onChange(updated);
  };

  const handleAdd = () => {
    const newItem = {
      id: 'exp-' + Date.now(),
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
    onChange([...experience, newItem]);
  };

  const handleRemove = (id) => {
    if (experience.length <= 1) {
      onChange([
        {
          id: 'exp-' + Date.now(),
          title: '',
          company: '',
          location: '',
          startDate: '',
          endDate: '',
          current: false,
          description: '',
        },
      ]);
      return;
    }
    onChange(experience.filter((item) => item.id !== id));
  };

  return (
    <div className="rf-card">
      <div className="rf-card-header">
        <div className="rf-card-title-group">
          <div className="rf-section-icon icon-rose">
            <Briefcase size={20} />
          </div>
          <div>
            <h3 className="rf-card-title">Work Experience</h3>
            <p className="rf-card-subtitle">
              Past positions, internships, and key accomplishments with measurable impact.
            </p>
          </div>
        </div>
        <button
          type="button"
          className="rf-btn-secondary rf-btn-sm"
          onClick={handleAdd}
        >
          <Plus size={16} />
          <span>Add Experience</span>
        </button>
      </div>

      <div className="rf-card-body rf-entries-list">
        {experience.map((item, index) => (
          <div key={item.id} className="rf-entry-item">
            <div className="rf-entry-header">
              <div className="rf-entry-badge">
                <Briefcase size={14} />
                <span>
                  {item.title ? item.title : `Experience #${index + 1}`}
                  {item.company ? ` at ${item.company}` : ''}
                </span>
              </div>
              <button
                type="button"
                className="rf-icon-btn rf-delete-btn"
                onClick={() => handleRemove(item.id)}
                title="Remove Experience"
                aria-label="Remove Experience"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="rf-grid rf-grid-2">
              <div className="rf-input-group">
                <label className="rf-label">
                  Job Title <span className="rf-required">*</span>
                </label>
                <div className="rf-input-wrapper">
                  <span className="rf-input-icon">
                    <Briefcase size={16} />
                  </span>
                  <input
                    type="text"
                    className="rf-input has-icon"
                    placeholder="e.g. Senior Frontend Engineer"
                    value={item.title || ''}
                    onChange={(e) => handleItemChange(item.id, 'title', e.target.value)}
                  />
                </div>
              </div>

              <div className="rf-input-group">
                <label className="rf-label">
                  Company / Organization <span className="rf-required">*</span>
                </label>
                <div className="rf-input-wrapper">
                  <span className="rf-input-icon">
                    <Building2 size={16} />
                  </span>
                  <input
                    type="text"
                    className="rf-input has-icon"
                    placeholder="e.g. Google, Stripe, or Startup"
                    value={item.company || ''}
                    onChange={(e) => handleItemChange(item.id, 'company', e.target.value)}
                  />
                </div>
              </div>

              <div className="rf-input-group">
                <label className="rf-label">Location</label>
                <div className="rf-input-wrapper">
                  <span className="rf-input-icon">
                    <MapPin size={16} />
                  </span>
                  <input
                    type="text"
                    className="rf-input has-icon"
                    placeholder="e.g. New York, NY (or Remote)"
                    value={item.location || ''}
                    onChange={(e) => handleItemChange(item.id, 'location', e.target.value)}
                  />
                </div>
              </div>

              <div className="rf-input-group">
                <div className="rf-label-row">
                  <label className="rf-label">Dates Employed</label>
                  <button
                    type="button"
                    className="rf-checkbox-btn"
                    onClick={() => handleToggleCurrent(item.id, item.current)}
                  >
                    {item.current ? (
                      <CheckSquare size={14} className="rf-text-teal" />
                    ) : (
                      <Square size={14} />
                    )}
                    <span>Current Role</span>
                  </button>
                </div>
                <div className="rf-date-range">
                  <div className="rf-input-wrapper">
                    <span className="rf-input-icon">
                      <Calendar size={16} />
                    </span>
                    <input
                      type="text"
                      className="rf-input has-icon"
                      placeholder="Start (e.g. Jan 2022)"
                      value={item.startDate || ''}
                      onChange={(e) => handleItemChange(item.id, 'startDate', e.target.value)}
                    />
                  </div>
                  <span className="rf-date-sep">–</span>
                  <div className="rf-input-wrapper">
                    <input
                      type="text"
                      className="rf-input"
                      placeholder="End (e.g. Present)"
                      disabled={item.current}
                      value={item.current ? 'Present' : item.endDate || ''}
                      onChange={(e) => handleItemChange(item.id, 'endDate', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="rf-input-group rf-col-span-2">
                <div className="rf-label-row">
                  <label className="rf-label">
                    Key Responsibilities & Achievements
                  </label>
                  <span className="rf-hint-text">
                    Use bullet points with action verbs and metrics
                  </span>
                </div>
                <textarea
                  className="rf-textarea"
                  rows={4}
                  placeholder="• Spearheaded refactoring of billing service, saving $40K monthly&#10;• Mentored 4 junior engineers on React and TypeScript best practices&#10;• Decreased customer-reported bugs by 35% through robust automated tests"
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
