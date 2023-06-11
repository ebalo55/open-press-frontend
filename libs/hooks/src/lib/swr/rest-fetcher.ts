/**
 * Default fetcher for swr hooks
 * @param key
 */
export const fetcher = (key: string) => fetch(key).then(res => res.json())