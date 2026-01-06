import { format, parseISO } from "date-fns";

export const safeFormat = (value) => {
  try {
    if (!value) return "-";

    let date;

    // Case 1: Already a Date object
    if (value instanceof Date) {
      if (isNaN(value.getTime())) return "-";
      date = value;
    }
    // Case 2: ISO string (yyyy-MM-dd or full ISO)
    else if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}/.test(value)) {
      date = parseISO(value);
    }
    // Case 3: Fallback
    else {
      date = new Date(value);
    }

    if (isNaN(date.getTime())) return "-";

    return format(date, "dd-MM-yyyy");
  } catch {
    return "-";
  }
};


export const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}-${month}-${year}`; // DD-MM-YYYY
};
