export const formatTimeAgo = (dateString: string): string => {
  const currentDate = new Date();
  const inputDate = new Date(dateString);
  const diffInMs = currentDate.getTime() - inputDate.getTime();
  const diffInMinutes = Math.floor(diffInMs / 60000);

  if (diffInMinutes < 1) {
    return "just now";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes === 1 ? "" : "s"} ago`;
  } else if (diffInMinutes < 1440) {
    // less than 24 hours
    const hoursAgo = Math.floor(diffInMinutes / 60);
    return `${hoursAgo} hour${hoursAgo === 1 ? "" : "s"} ago`;
  } else {
    // Return the date in "Month day, year" format
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    return inputDate.toLocaleDateString("en-US", options);
  }
};

const formattedTimeAgo: string = formatTimeAgo("12/18/2002");
console.log(formattedTimeAgo);
