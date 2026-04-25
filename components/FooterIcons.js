'use client';
import { useState } from 'react';

const icons = ['camera_alt', 'alternate_email', 'social_leaderboard'];

export default function FooterIcons() {
  const [hovered, setHovered] = useState(null);

  return (
    <div style={{ display: 'flex', gap: 16 }}>
      {icons.map(icon => (
        <span
          key={icon}
          className="material-symbols-outlined"
          style={{
            fontSize: 18, cursor: 'pointer', transition: 'color 0.25s',
            color: hovered === icon ? '#d8b4fe' : 'rgba(255,255,255,0.3)',
          }}
          onMouseEnter={() => setHovered(icon)}
          onMouseLeave={() => setHovered(null)}
        >
          {icon}
        </span>
      ))}
    </div>
  );
}
