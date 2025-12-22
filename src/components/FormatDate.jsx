const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-");
  return `${day}-${month}-${year}`;
};
export default formatDate;

export const formattedDate = (date) => {
  if (!date) return "-";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "-";

  const day = d.getDate();        // 1–31
  const month = d.getMonth() + 1; // 1–12
  const year = d.getFullYear();

  return `${day}-${month}-${year}`;
};


