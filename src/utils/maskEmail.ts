// Mask email helper: eduardo.santos@ceresinvestimentos.com -> ed•••••••@ceresinvestimentos.com
export const maskEmail = (email: string) => {
  const parts = email.split('@');
  if (parts.length !== 2) return email;
  const name = parts[0];
  const domain = parts[1];
  const visibleStart = name.slice(0, 2);
  return `${visibleStart}••••••••@${domain}`;
};
