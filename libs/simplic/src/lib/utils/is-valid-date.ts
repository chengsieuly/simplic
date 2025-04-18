export const isValidDate = (dateString: string, minDate?: Date): boolean => {
  const regex = /^([1-9]|1[0-2])\/([1-9]|[12]\d|3[01])\/\d{4}$/;
  if (!regex.test(dateString)) return false;

  const [month, day, year] = dateString.split('/').map(Number);
  const date = new Date(year, month - 1, day);

  // Ensure no auto-correction occurred
  const isRealDate =
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day;

  if (!isRealDate) return false;

  // Normalize both dates to midnight for comparison
  const inputDateOnly = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
  if (minDate) {
    const minDateOnly = new Date(
      minDate.getFullYear(),
      minDate.getMonth(),
      minDate.getDate()
    );
    return inputDateOnly >= minDateOnly;
  }

  return true;
};
