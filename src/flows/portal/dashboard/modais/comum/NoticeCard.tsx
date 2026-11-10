import React from 'react';

interface NoticeCardProps {
  icon: React.ReactNode;
  title: string;
  text: string;
  className: string;
  iconBoxClassName: string;
  titleClassName: string;
  textClassName: string;
}

/** Cartão informativo (ícone + título + texto) dos modais de envio de arquivos. */
export const NoticeCard = ({ icon, title, text, className, iconBoxClassName, titleClassName, textClassName }: NoticeCardProps) => (
  <div className={className}>
    <div className={iconBoxClassName}>{icon}</div>
    <div>
      <h4 className={titleClassName}>{title}</h4>
      <p className={textClassName}>{text}</p>
    </div>
  </div>
);
