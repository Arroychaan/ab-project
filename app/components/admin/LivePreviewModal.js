"use client";

import { useState } from 'react';

export default function LivePreviewModal({ isOpen, onClose, page }) {
  const [viewMode, setViewMode] = useState('DESKTOP'); // 'DESKTOP' | 'MOBILE'

  if (!isOpen) return null;

  // Safe defaults if content is empty
  const title = page.title || "Judul Halaman";
  const subtitle = page.subtitle;
  const layout = page.layout || "STANDARD";
  const contentHtml = page.customHtml ? page.customHtml : (page.content || "<p>Mulai ketik sesuatu di editor untuk melihat hasilnya di sini.</p>");
  const customCss = page.customCss || "";
  const heroImgUrl = page.heroImage || '/hero-bg.webp';

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(4px)',
      zIndex: 99999, display: 'flex', flexDirection: 'column',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Modal Header */}
      <div style={{
        background: '#0f172a', color: 'white', padding: '16px 24px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderBottom: '1px solid #334155'
      }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            Live Preview
          </h2>
          <p style={{ margin: "4px 0 0 0", fontSize: '13px', color: '#94a3b8' }}>Melihat tampilan sebelum disimpan</p>
        </div>
        
        {/* View Toggles */}
        <div style={{ display: 'flex', background: '#1e293b', borderRadius: '8px', padding: '4px' }}>
          <button
            onClick={() => setViewMode('MOBILE')}
            style={{
              padding: '6px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500', fontSize: '13px',
              background: viewMode === 'MOBILE' ? '#3b82f6' : 'transparent',
              color: viewMode === 'MOBILE' ? 'white' : '#94a3b8',
              transition: '0.2s'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
            Mobile View
          </button>
          <button
            onClick={() => setViewMode('DESKTOP')}
            style={{
              padding: '6px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500', fontSize: '13px',
              background: viewMode === 'DESKTOP' ? '#3b82f6' : 'transparent',
              color: viewMode === 'DESKTOP' ? 'white' : '#94a3b8',
              transition: '0.2s'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
            PC / Desktop
          </button>
        </div>

        <button onClick={onClose} style={{
          background: 'none', border: 'none', color: '#cbd5e1', fontSize: '28px',
          cursor: 'pointer', lineHeight: 1
        }}>&times;</button>
      </div>

      {/* Preview Container Area */}
      <div style={{
        flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center',
        padding: '24px', overflowY: 'auto'
      }}>
        <div style={{
          width: viewMode === 'MOBILE' ? '375px' : '100%',
          height: '100%',
          backgroundColor: layout === 'STANDARD' ? '#f8fafc' : 'white',
          borderRadius: viewMode === 'MOBILE' ? '36px' : '8px',
          boxShadow: viewMode === 'MOBILE' 
            ? '0 0 0 12px #0f172a, 0 25px 50px -12px rgba(0,0,0,0.5)' 
            : '0 10px 15px -3px rgba(0,0,0,0.1)',
          overflowY: 'auto',
          overflowX: 'hidden',
          transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative'
        }}>
          {/* Custom CSS Target */}
          {customCss && <style>{customCss}</style>}

          {/* RENDER ENGINE (Sesuai Layout) */}
          
          {layout === 'HERO_IMAGE' && (
            <div className="dynamic-page hero-layout">
              <div style={{ 
                backgroundImage: `url(${heroImgUrl})`, 
                backgroundSize: 'cover', backgroundPosition: 'center',
                padding: viewMode === 'MOBILE' ? '60px 20px' : '100px 20px', 
                color: 'white', textAlign: 'center',
                backgroundColor: '#0f172a' // fallback color
              }}>
                <h1 style={{ fontSize: viewMode === 'MOBILE' ? '28px' : '40px', margin: '0 0 16px 0', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{title}</h1>
                {subtitle && <p style={{ fontSize: viewMode === 'MOBILE' ? '16px' : '20px', margin: 0, opacity: 0.9, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{subtitle}</p>}
              </div>
              <div style={{ padding: viewMode === 'MOBILE' ? '24px 16px' : '40px 20px', maxWidth: '1000px', margin: '0 auto', color: '#334155' }}>
                <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
              </div>
            </div>
          )}

          {layout === 'STANDARD' && (
            <div className="dynamic-page standard-layout" style={{ minHeight: "100%" }}>
              <div style={{ backgroundColor: "#0d6e3f", color: "white", padding: viewMode === 'MOBILE' ? "40px 20px" : "60px 20px", textAlign: "center" }}>
                <h1 style={{ fontSize: viewMode === 'MOBILE' ? '28px' : "36px", margin: "0 0 12px 0" }}>{title}</h1>
                {subtitle && <p style={{ opacity: 0.9, margin: 0 }}>{subtitle}</p>}
              </div>
              <div style={{ 
                padding: viewMode === 'MOBILE' ? "24px 16px" : "40px 32px", 
                maxWidth: "800px", 
                margin: viewMode === 'MOBILE' ? "-20px 16px 40px" : "-40px auto 40px", 
                backgroundColor: "white", 
                borderRadius: "12px", 
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                color: '#334155'
              }}>
                <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
              </div>
            </div>
          )}

          {layout === 'BLANK' && (
            <div className="dynamic-page blank-layout">
              <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
