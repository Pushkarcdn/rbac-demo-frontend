/* eslint-disable @typescript-eslint/no-explicit-any */
export const today = new Date().toISOString().split("T")[0]; // today's date

export function formatDate(
  dateString: string | Date,
  format: "short" | "long" = "short"
): string {
  const inputDate = new Date(dateString);
  // Remove time component from inputDate
  inputDate.setHours(0, 0, 0, 0);

  // Get today's date at midnight
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Get yesterday's date at midnight
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  // Compare the input date
  if (inputDate.getTime() === today.getTime()) {
    return "Today";
  } else if (inputDate.getTime() === yesterday.getTime()) {
    return "Yesterday";
  } else {
    // Format options based on the provided format
    const options: Intl.DateTimeFormatOptions =
      format === "short"
        ? { month: "short", day: "numeric" }
        : { month: "short", day: "numeric", year: "numeric" };

    return `${inputDate.toLocaleDateString("en-US", options)}`;
  }
}

export function hoursAgo(dateString: any) {
  if (!dateString) return null;

  const date = new Date(dateString) as any; // Convert the input string to a Date object
  const now = new Date() as any; // Get the current time

  const diffInMilliseconds = now - date; // Calculate the difference in milliseconds
  const diffInHours = diffInMilliseconds / (1000 * 60 * 60); // Convert milliseconds to hours

  return Math.floor(diffInHours); // Return the number of hours rounded down
}

export function getDateForField(date: string) {
  return new Date(date).toISOString().split("T")[0];
}
