import React from 'react';

const Avatar = ({ username }) => {
  // obtener las iniciales del nombre
  const getInitials = (name) => {
    const names = name.split(' ');
    return names.map(name => name.charAt(0)).join('');
  };

  // generar un color basado en las iniciales del nombre
  const getColorFromInitials = (initials) => {
    let hash = 0;
    for (let i = 0; i < initials.length; i++) {
      hash = initials.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = '#'+((hash>>16)&0xFF).toString(16).padStart(2, '0')+((hash>>8)&0xFF).toString(16).padStart(2, '0')+((hash)&0xFF).toString(16).padStart(2, '0');
    return color;
  };

  const initials = getInitials(username);
  const avatarColor = getColorFromInitials(initials);

  return (
    <div className="flex items-center justify-center w-12 h-12 rounded-full text-white font-medium text-lg" style={{ backgroundColor: avatarColor }}>
      {initials}
    </div>
  );
};

export default Avatar;
