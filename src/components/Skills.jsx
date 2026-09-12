import React, { useState } from 'react';
import { Wrench, Plus, X, Sparkles } from 'lucide-react';

const SUGGESTED_SKILLS = [
  'React.js',
  'TypeScript',
  'JavaScript',
  'Node.js',
  'Python',
  'HTML5 / CSS3',
  'Tailwind CSS',
  'Next.js',
  'Git',
  'REST APIs',
  'GraphQL',
  'Docker',
  'PostgreSQL',
  'MongoDB',
  'AWS',
  'Figma',
  'Agile / Scrum',
  'Problem Solving',
  'Communication',
];

export default function Skills({ skills, onChange }) {
  const [inputValue, setInputValue] = useState('');

  const handleAddSkill = (skillToAdd) => {
    const trimmed = (skillToAdd || inputValue).trim();
    if (!trimmed) return;
    if (skills.some((s) => s.toLowerCase() === trimmed.toLowerCase())) {
      setInputValue('');
      return;
    }
    onChange([...skills, trimmed]);
    setInputValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    onChange(skills.filter((s) => s !== skillToRemove));
  };

  return (
    <div className="rf-card">
      <div className="rf-card-header">
        <div className="rf-card-title-group">
          <div className="rf-section-icon icon-emerald">
            <Wrench size={20} />
          </div>
          <div>
            <h3 className="rf-card-title">Skills & Proficiencies</h3>
            <p className="rf-card-subtitle">
              Highlight languages, frameworks, developer tools, and interpersonal abilities.
            </p>
          </div>
        </div>
        <span className="rf-counter-pill">
          {skills.length} {skills.length === 1 ? 'skill' : 'skills'} added
        </span>
      </div>

      <div className="rf-card-body">
        <div className="rf-skill-input-bar">
          <div className="rf-input-wrapper" style={{ flex: 1 }}>
            <span className="rf-input-icon">
              <Plus size={16} />
            </span>
            <input
              type="text"
              className="rf-input has-icon"
              placeholder="Type a skill and press Enter or comma (e.g. React, Docker...)"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <button
            type="button"
            className="rf-btn-primary rf-btn-sm"
            onClick={() => handleAddSkill()}
          >
            <Plus size={16} />
            <span>Add</span>
          </button>
        </div>

        <div className="rf-skills-container">
          {skills.length === 0 ? (
            <p className="rf-empty-hint">No skills added yet. Choose from suggestions below or type your own!</p>
          ) : (
            <div className="rf-skills-tags-wrap">
              {skills.map((skill) => (
                <span key={skill} className="rf-skill-chip">
                  <span>{skill}</span>
                  <button
                    type="button"
                    className="rf-skill-remove"
                    onClick={() => handleRemoveSkill(skill)}
                    title={`Remove ${skill}`}
                    aria-label={`Remove ${skill}`}
                  >
                    <X size={13} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="rf-suggested-section">
          <div className="rf-suggested-header">
            <Sparkles size={14} className="rf-text-emerald" />
            <span>Click to add popular skills:</span>
          </div>
          <div className="rf-suggested-chips">
            {SUGGESTED_SKILLS.filter(
              (s) => !skills.some((existing) => existing.toLowerCase() === s.toLowerCase())
            )
              .slice(0, 12)
              .map((suggested) => (
                <button
                  key={suggested}
                  type="button"
                  className="rf-suggested-chip"
                  onClick={() => handleAddSkill(suggested)}
                >
                  <Plus size={12} />
                  <span>{suggested}</span>
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
