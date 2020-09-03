export function dateFormat(date: Date | string): string {
  const dateToFormat = new Date(date);
  const dateTimeFormat = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const [
    { value: month },
    ,
    { value: day },
    ,
    { value: year },
  ] = dateTimeFormat.formatToParts(dateToFormat);

  return `${month}-${day}-${year}`;
}
