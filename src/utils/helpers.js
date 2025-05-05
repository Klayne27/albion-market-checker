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

export function formatTimeAgoUTC(isoString) {
  let postedDateUtc;

  try {
    const parts = isoString.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/);

     if (!parts) {
        const dateCandidate = new Date(isoString);
         if (!isNaN(dateCandidate.getTime())) {
              postedDateUtc = dateCandidate;
         } else {
            throw new Error("Invalid ISO 8601 format");
         }
     } else {
        postedDateUtc = new Date(Date.UTC(
          parseInt(parts[1], 10), 
          parseInt(parts[2], 10) - 1,
          parseInt(parts[3], 10),
          parseInt(parts[4], 10),
          parseInt(parts[5], 10),
          parseInt(parts[6], 10)
        ));
     }

    if (isNaN(postedDateUtc.getTime())) {
      throw new Error("Could not create valid UTC date");
    }

  } catch (error) {
    console.error("Error parsing date in formatTimeAgoUTC:", error);
    return "Invalid date";
  }

  const nowUtcTime = new Date().getTime();
  const postedUtcTime = postedDateUtc.getTime();

  const diffMilliseconds = nowUtcTime - postedUtcTime;

  if (diffMilliseconds < 0) {
       return "Posted in the future";
  }

  const diffSeconds = diffMilliseconds / 1000;
  const diffMinutes = diffSeconds / 60;
  const diffHours = diffMinutes / 60;
  const diffDays = diffHours / 24;

  if (diffMinutes < 1) {
      return "Just now";
  } else if (diffMinutes < 60) {
      return `${Math.round(diffMinutes)} minutes ago`;
  } else if (diffHours < 24) {
      return `${diffHours.toFixed(1)} hrs ago`;
  } else if (diffDays < 7) {
      return `${Math.round(diffDays)} days ago`;
  }
  else {
       return postedDateUtc.toISOString().split('T')[0];
  }
}