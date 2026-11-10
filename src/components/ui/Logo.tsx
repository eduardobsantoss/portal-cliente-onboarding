import React from 'react';
import { cn } from '@/utils/cn';
import logoNavbarWhite from '@/assets/logos/logo-branca-sem-bg.png';
import logoNavbarBlue from '@/assets/logos/logo-azul-sem-bg.png';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
}

export const Logo = ({ variant = 'dark', className }: LogoProps) => {
  const isLight = variant === 'light';
  
  return (
    <img
      src={isLight ? logoNavbarWhite : logoNavbarBlue}
      alt="Grupo Ceres Investimentos"
      className={cn(
        'w-auto object-contain',
        isLight ? 'h-12 md:h-14' : 'h-[52px] md:h-[60px]',
        className
      )}
    />
  );
};
