import React from 'react';
import { User, Briefcase, Mail, Phone, MapPin, Globe } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from './Icons';

export default function PersonalInfo({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  return (
    <div className="rf-card">
      <div className="rf-card-header">
        <div className="rf-card-title-group">
          <div className="rf-section-icon icon-teal">
            <User size={20} />
          </div>
          <div>
            <h3 className="rf-card-title">Personal Information</h3>
            <p className="rf-card-subtitle">
              Your contact and identifying details employers use to reach you.
            </p>
          </div>
        </div>
      </div>

      <div className="rf-card-body">
        <div className="rf-grid rf-grid-2">
          {/* Full Name */}
          <div className="rf-input-group">
            <label className="rf-label" htmlFor="fullName">
              Full Name <span className="rf-required">*</span>
            </label>
            <div className="rf-input-wrapper">
              <span className="rf-input-icon">
                <User size={16} />
              </span>
              <input
                id="fullName"
                type="text"
                className="rf-input has-icon"
                placeholder="Mukesh Ambani"
                value={data.fullName || ''}
                onChange={(e) => handleChange('fullName', e.target.value)}
              />
            </div>
          </div>

          {/* Job Title */}
          <div className="rf-input-group">
            <label className="rf-label" htmlFor="jobTitle">
              Job Title / Headline <span className="rf-required">*</span>
            </label>
            <div className="rf-input-wrapper">
              <span className="rf-input-icon">
                <Briefcase size={16} />
              </span>
              <input
                id="jobTitle"
                type="text"
                className="rf-input has-icon"
                placeholder="Managing Director & Chairman"
                value={data.jobTitle || ''}
                onChange={(e) => handleChange('jobTitle', e.target.value)}
              />
            </div>
          </div>

          {/* Email */}
          <div className="rf-input-group">
            <label className="rf-label" htmlFor="email">
              Email Address <span className="rf-required">*</span>
            </label>
            <div className="rf-input-wrapper">
              <span className="rf-input-icon">
                <Mail size={16} />
              </span>
              <input
                id="email"
                type="email"
                className="rf-input has-icon"
                placeholder="mukesh.ambani@example.com"
                value={data.email || ''}
                onChange={(e) => handleChange('email', e.target.value)}
              />
            </div>
          </div>

          {/* Phone */}
          <div className="rf-input-group">
            <label className="rf-label" htmlFor="phone">
              Phone Number
            </label>
            <div className="rf-input-wrapper">
              <span className="rf-input-icon">
                <Phone size={16} />
              </span>
              <input
                id="phone"
                type="tel"
                className="rf-input has-icon"
                placeholder="+91 8103013690"
                value={data.phone || ''}
                onChange={(e) => handleChange('phone', e.target.value)}
              />
            </div>
          </div>

          {/* Location */}
          <div className="rf-input-group rf-col-span-2">
            <label className="rf-label" htmlFor="location">
              Location (City, Country / State)
            </label>
            <div className="rf-input-wrapper">
              <span className="rf-input-icon">
                <MapPin size={16} />
              </span>
              <input
                id="location"
                type="text"
                className="rf-input has-icon"
                placeholder="Mumbai"
                value={data.location || ''}
                onChange={(e) => handleChange('location', e.target.value)}
              />
            </div>
          </div>

          {/* LinkedIn */}
          <div className="rf-input-group">
            <label className="rf-label" htmlFor="linkedIn">
              LinkedIn Profile
            </label>
            <div className="rf-input-wrapper">
              <span className="rf-input-icon">
                <LinkedinIcon size={16} />
              </span>
              <input
                id="linkedIn"
                type="url"
                className="rf-input has-icon"
                placeholder="linkedin.com/in/Mukeshambani"
                value={data.linkedIn || ''}
                onChange={(e) => handleChange('linkedIn', e.target.value)}
              />
            </div>
          </div>

          {/* GitHub */}
          <div className="rf-input-group">
            <label className="rf-label" htmlFor="github">
              GitHub Profile
            </label>
            <div className="rf-input-wrapper">
              <span className="rf-input-icon">
                <GithubIcon size={16} />
              </span>
              <input
                id="github"
                type="url"
                className="rf-input has-icon"
                placeholder="github.com/mukeshambani"
                value={data.github || ''}
                onChange={(e) => handleChange('github', e.target.value)}
              />
            </div>
          </div>

          {/* Portfolio */}
          <div className="rf-input-group rf-col-span-2">
            <label className="rf-label" htmlFor="portfolio">
              Portfolio / Website
            </label>
            <div className="rf-input-wrapper">
              <span className="rf-input-icon">
                <Globe size={16} />
              </span>
              <input
                id="portfolio"
                type="url"
                className="rf-input has-icon"
                placeholder="mukeshambani.dev"
                value={data.portfolio || ''}
                onChange={(e) => handleChange('portfolio', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
