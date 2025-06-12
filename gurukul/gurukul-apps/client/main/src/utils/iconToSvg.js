// utils/iconToSvg.js
import { Heart, Star, Zap, Shield, Crown, Gem } from 'lucide-react';
import { renderToStaticMarkup } from 'react-dom/server';

const iconMap = {
  Heart,
  Star,
  Zap,
  Shield,
  Crown,
  Gem,
};

export const getSvgStringFromIconName = (iconName, color = '#000000') => {
  const Icon = iconMap[iconName];
  if (!Icon) throw new Error(`Invalid icon name: ${iconName}`);

  const svgMarkup = renderToStaticMarkup(<Icon color={color} />);
  return `<?xml version="1.0" encoding="UTF-8"?>${svgMarkup}`;
};
