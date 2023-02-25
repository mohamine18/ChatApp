type dateTypes = {
  dateDifferenceString: string;
  time: string;
  localDate: { simple: string; withWeekday: string };
  isToday: boolean;
};

export default (timestamp: string): dateTypes => {
  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  const date = new Date(timestamp);
  const today = new Date();

  // convert the date to local time
  const time = date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // convert the date to local date
  const localDate1 = date.toLocaleDateString("en-FR", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  });
  const localDate2 = date.toLocaleDateString("en-FR", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  });

  // calculate the difference between dates
  const utc1 = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  const utc2 = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  const diff = Math.floor((utc2 - utc1) / MS_PER_DAY);

  let dateDifferenceString;
  if (diff === 0) dateDifferenceString = `  Today  `;
  else if (diff === 1) dateDifferenceString = "Yesterday";
  else if (diff > 1 && diff <= 3) dateDifferenceString = `${diff} days ago`;
  else dateDifferenceString = localDate1;

  // check if it's today
  const isToday = diff === 0 ? true : false;

  return {
    dateDifferenceString,
    time,
    localDate: { simple: localDate1, withWeekday: localDate2 },
    isToday,
  };
};
