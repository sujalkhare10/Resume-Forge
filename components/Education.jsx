import React from 'react';
import { GraduationCap, Plus, Trash2, Calendar, MapPin, Building2, Award } from 'lucide-react';

export default function Education({ education, onChange }) {
  const handleItemChange = (id, field, value) => {
    const updated = education.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    onChange(updated);
  };

  const handleAdd = () => {
    const newItem = {
      id: 'edu-' + Date.now(),
      degree: '',
      school: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
    };
    onChange([...education, newItem]);
  };

  const handleRemove = (id) => {
    if (education.length <= 1) {
      onChange([
        {
          id: 'edu-' + Date.now(),
          degree: '',
          school: '',
          location: '',
          startDate: '',
          endDate: '',
          description: '',
        },
      ]);
      return;
    }
    onChange(education.filter((item) => item.id !== id));
  };

  return (
    <div className="rf-card">
      <div className="rf-card-header">
        <div className="rf-card-title-group">
          <div className="rf-section-icon icon-sky">
            <GraduationCap size={20} />
          </div>
          <div>
            <h3 className="rf-card-title">Education</h3>
            <p className="rf-card-subtitle">
              Degrees, bootcamps, academic institutions, and notable achievements.
            </p>
          </div>
        </div>
        <button
          type="button"
          className="rf-btn-secondary rf-btn-sm"
          onClick={handleAdd}
        >
          <Plus size={16} />
          <span>Add Education</span>
        </button>
      </div>

      <div className="rf-card-body rf-entries-list">
        {education.map((item, index) => (
          <div key={item.id} className="rf-entry-item">
            <div className="rf-entry-header">
              <div className="rf-entry-badge">
                <GraduationCap size={14} />
                <span>
                  {item.degree ? item.degree : `Education #${index + 1}`}
                  {item.school ? ` · ${item.school}` : ''}
                </span>
              </div>
              <button
                type="button"
                className="rf-icon-btn rf-delete-btn"
                onClick={() => handleRemove(item.id)}
                title="Remove Education"
                aria-label="Remove Education"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="rf-grid rf-grid-2">
              <div className="rf-input-group">
                <label className="rf-label">
                  Degree / Field of Study <span className="rf-required">*</span>
                </label>
                <div className="rf-input-wrapper">
                  <span className="rf-input-icon">
                    <Award size={16} />
                  </span>
                  <input
                    type="text"
                    className="rf-input has-icon"
                    placeholder="e.g. B.S. in Computer Science"
                    value={item.degree || ''}
                    onChange={(e) => handleItemChange(item.id, 'degree', e.target.value)}
                  />
                </div>
              </div>

              <div className="rf-input-group">
                <label className="rf-label">
                  School / University <span className="rf-required">*</span>
                </label>
                <div className="rf-input-wrapper">
                  <span className="rf-input-icon">
                    <Building2 size={16} />
                  </span>
                  <input
                    type="text"
                    className="rf-input has-icon"
                    placeholder="e.g. Stanford University"
                    value={item.school || ''}
                    onChange={(e) => handleItemChange(item.id, 'school', e.target.value)}
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
                    placeholder="e.g. Stanford, CA"
                    value={item.location || ''}
                    onChange={(e) => handleItemChange(item.id, 'location', e.target.value)}
                  />
                </div>
              </div>

              <div className="rf-input-group">
                <label className="rf-label">Years / Duration</label>
                <div className="rf-date-range">
                  <div className="rf-input-wrapper">
                    <span className="rf-input-icon">
                      <Calendar size={16} />
                    </span>
                    <input
                      type="text"
                      className="rf-input has-icon"
                      placeholder="Start (e.g. 2018)"
                      value={item.startDate || ''}
                      onChange={(e) => handleItemChange(item.id, 'startDate', e.target.value)}
                    />
                  </div>
                  <span className="rf-date-sep">–</span>
                  <div className="rf-input-wrapper">
                    <input
                      type="text"
                      className="rf-input"
                      placeholder="End (e.g. 2022)"
                      value={item.endDate || ''}
                      onChange={(e) => handleItemChange(item.id, 'endDate', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="rf-input-group rf-col-span-2">
                <label className="rf-label">Notable Achievements / GPA / Honors</label>
                <textarea
                  className="rf-textarea"
                  rows={2}
                  placeholder="e.g. Dean's Honor List (GPA 3.8/4.0), Relevant Coursework: Data Structures, Distributed Systems..."
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
