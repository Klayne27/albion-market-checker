export function formatNumber(n) {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(0)}b`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}m`;
  if (n >= 1_000) return n.toLocaleString();
  return n;
}
