import React from 'react';
import { cn } from '@/utils/cn';
import logoNavbarWhite from '@/assets/logos/logo-branca-sem-bg.png';
import logoNavbarBlue from '@/assets/logos/logo-azul-sem-bg.png';
import logoHorizontal from '@/assets/logos/logo-horizontal-gci.png';

interface LogoProps {
  variant?: 'light' | 'dark' | 'horizontal';
  className?: string;
}

export const Logo = ({ variant = 'dark', className }: LogoProps) => {
  const src =
    variant === 'light' ? logoNavbarWhite : variant === 'horizontal' ? logoHorizontal : logoNavbarBlue;
  const size =
    variant === 'light' ? 'h-12 md:h-14' : variant === 'horizontal' ? 'h-24 md:h-28' : 'h-[52px] md:h-[60px]';

  return (
    <img
      src={src}
      alt="Grupo Ceres Investimentos"
      className={cn('w-auto object-contain', size, className)}
    />
  );
};
