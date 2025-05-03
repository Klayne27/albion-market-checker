export function formatNumber(n) {
  const num = Number(n);
  if (isNaN(num)) {
    return n; 
  }

  if (num < 1000) {
    return num.toString();
  }

  if (num >= 1000 && num < 1_000_000) {
    return num.toLocaleString("en-US");
  }

  if (num >= 1_000_000 && num < 100_000_000) {
    return (num / 1_000_000).toFixed(1) +  "m";
  }

  if (num >= 100_000_000 && num < 1_000_000_000) {
    return (num / 1_000_000).toFixed(0) + "m";
  }

  if (num >= 1_000_000_000 && num < 100_000_000_000) {
    return (num / 1_000_000_000).toFixed(1) + "b";
  }

  if (num >= 100_000_000_000) {
    return (num / 1_000_000_000).toFixed(0) + "b";
  }

  return num.toString();
}
