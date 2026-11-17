/**
 * Resolve um arquivo da pasta `public/` respeitando o `base` do Vite.
 * Em produção (GitHub Pages) o site fica em `/<repositório>/`, então um caminho fixo como
 * `/assets/foto.jpg` deixaria de existir. Passe o caminho sem a barra inicial ou com ela.
 */
export function publicAsset(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}
