/** Adiciona o item se ainda não estiver na lista; remove se já estiver. */
export function toggleListItem<T>(list: T[], item: T): T[] {
  return list.includes(item) ? list.filter((current) => current !== item) : [...list, item];
}
