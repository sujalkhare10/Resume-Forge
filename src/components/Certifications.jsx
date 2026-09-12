import React from 'react';
import { ShieldCheck, Plus, Trash2, Calendar, Link as LinkIcon, Building } from 'lucide-react';

export default function Certifications({ certifications, onChange }) {
  const handleItemChange = (id, field, value) => {
    const updated = certifications.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    onChange(updated);
  };

  const handleAdd = () => {
    const newItem = {
      id: 'cert-' + Date.now(),
      name: '',
      issuer: '',
      issueDate: '',
      expiryDate: '',
      credentialId: '',
      url: '',
    };
    onChange([...certifications, newItem]);
  };

  const handleRemove = (id) => {
    if (certifications.length <= 1) {
      onChange([
        {
          id: 'cert-' + Date.now(),
          name: '',
          issuer: '',
          issueDate: '',
          expiryDate: '',
          credentialId: '',
          url: '',
        },
      ]);
      return;
    }
    onChange(certifications.filter((item) => item.id !== id));
  };

  return (
    <div className="rf-card">
      <div className="rf-card-header">
        <div className="rf-card-title-group">
          <div className="rf-section-icon icon-teal">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h3 className="rf-card-title">Certifications & Licenses</h3>
            <p className="rf-card-subtitle">
              Professional credentials, cloud certificates, and verified courses.
            </p>
          </div>
        </div>
        <button
          type="button"
          className="rf-btn-secondary rf-btn-sm"
          onClick={handleAdd}
        >
          <Plus size={16} />
          <span>Add Certification</span>
        </button>
      </div>

      <div className="rf-card-body rf-entries-list">
        {certifications.map((item, index) => (
          <div key={item.id} className="rf-entry-item">
            <div className="rf-entry-header">
              <div className="rf-entry-badge">
                <ShieldCheck size={14} />
                <span>
                  {item.name ? item.name : `Certification #${index + 1}`}
                  {item.issuer ? ` · ${item.issuer}` : ''}
                </span>
              </div>
              <button
                type="button"
                className="rf-icon-btn rf-delete-btn"
                onClick={() => handleRemove(item.id)}
                title="Remove Certification"
                aria-label="Remove Certification"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="rf-grid rf-grid-2">
              <div className="rf-input-group">
                <label className="rf-label">
                  Certification Name <span className="rf-required">*</span>
                </label>
                <div className="rf-input-wrapper">
                  <span className="rf-input-icon">
                    <ShieldCheck size={16} />
                  </span>
                  <input
                    type="text"
                    className="rf-input has-icon"
                    placeholder="e.g. AWS Certified Solutions Architect"
                    value={item.name || ''}
                    onChange={(e) => handleItemChange(item.id, 'name', e.target.value)}
                  />
                </div>
              </div>

              <div className="rf-input-group">
                <label className="rf-label">
                  Issuing Organization <span className="rf-required">*</span>
                </label>
                <div className="rf-input-wrapper">
                  <span className="rf-input-icon">
                    <Building size={16} />
                  </span>
                  <input
                    type="text"
                    className="rf-input has-icon"
                    placeholder="e.g. Amazon Web Services, Google, Coursera"
                    value={item.issuer || ''}
                    onChange={(e) => handleItemChange(item.id, 'issuer', e.target.value)}
                  />
                </div>
              </div>

              <div className="rf-input-group">
                <label className="rf-label">Issue & Expiry Dates</label>
                <div className="rf-date-range">
                  <div className="rf-input-wrapper">
                    <span className="rf-input-icon">
                      <Calendar size={16} />
                    </span>
                    <input
                      type="text"
                      className="rf-input has-icon"
                      placeholder="Issue (e.g. 2023)"
                      value={item.issueDate || ''}
                      onChange={(e) => handleItemChange(item.id, 'issueDate', e.target.value)}
                    />
                  </div>
                  <span className="rf-date-sep">–</span>
                  <div className="rf-input-wrapper">
                    <input
                      type="text"
                      className="rf-input"
                      placeholder="Expiry (or None)"
                      value={item.expiryDate || ''}
                      onChange={(e) => handleItemChange(item.id, 'expiryDate', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="rf-input-group">
                <label className="rf-label">Credential ID</label>
                <div className="rf-input-wrapper">
                  <input
                    type="text"
                    className="rf-input"
                    placeholder="e.g. ABC-12345-XYZ"
                    value={item.credentialId || ''}
                    onChange={(e) => handleItemChange(item.id, 'credentialId', e.target.value)}
                  />
                </div>
              </div>

              <div className="rf-input-group rf-col-span-2">
                <label className="rf-label">Verification Link / URL</label>
                <div className="rf-input-wrapper">
                  <span className="rf-input-icon">
                    <LinkIcon size={16} />
                  </span>
                  <input
                    type="url"
                    className="rf-input has-icon"
                    placeholder="https://credly.com/badges/..."
                    value={item.url || ''}
                    onChange={(e) => handleItemChange(item.id, 'url', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
