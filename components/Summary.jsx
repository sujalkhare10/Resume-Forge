import React from 'react';
import { FileText, Sparkles } from 'lucide-react';

export default function Summary({ summary, onChange }) {
  const wordCount = summary ? summary.trim().split(/\s+/).filter(Boolean).length : 0;

  const sampleTips = [
    "Highlight your total years of experience, core tech stack, and proudest achievement.",
    "Mention the domain impact you made (e.g. 'improved application latency by 35%').",
  ];

  return (
    <div className="rf-card">
      <div className="rf-card-header">
        <div className="rf-card-title-group">
          <div className="rf-section-icon icon-amber">
            <FileText size={20} />
          </div>
          <div>
            <h3 className="rf-card-title">About Me / Professional Summary</h3>
            <p className="rf-card-subtitle">
              A 2-4 sentence overview of your career, strengths, and unique value proposition.
            </p>
          </div>
        </div>
      </div>

      <div className="rf-card-body">
        <div className="rf-input-group">
          <div className="rf-label-row">
            <label className="rf-label" htmlFor="summary">
              Professional Summary
            </label>
            <span className="rf-hint-badge">
              {wordCount} words
            </span>
          </div>
          <textarea
            id="summary"
            className="rf-textarea"
            rows={4}
            placeholder="e.g. Results-driven Full Stack Engineer with 5+ years of experience architecting high-performance web applications..."
            value={summary || ''}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>

        <div className="rf-pro-tip">
          <Sparkles size={16} className="rf-pro-tip-icon" />
          <div className="rf-pro-tip-content">
            <strong>Pro Tip:</strong> Keep it concise and keyword-dense for Applicant Tracking Systems (ATS).
            <div className="rf-tip-bullets">
              {sampleTips.map((tip, idx) => (
                <span key={idx}>• {tip} </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
