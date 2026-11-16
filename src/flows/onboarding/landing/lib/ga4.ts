const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim() ?? '';

declare global {
  interface Window {
    dataLayer?: unknown[];
    // gtag oficial empurra o objeto `arguments`, não um array
    gtag?: (...args: unknown[]) => void;
  }
}

/** Carrega GA4 quando `VITE_GA_MEASUREMENT_ID` está definido (build de produção). */
export function initGa4(): void {
  if (!MEASUREMENT_ID) return;

  window.dataLayer = window.dataLayer ?? [];
  // Mesmo padrão do snippet do Google: push(arguments), não push([...args])
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', MEASUREMENT_ID);

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(MEASUREMENT_ID)}`;
  document.head.appendChild(script);
}
