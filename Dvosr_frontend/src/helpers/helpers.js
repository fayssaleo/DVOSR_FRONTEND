const moment = require("moment");
export function DateToFrenchFormat(isoDateFormat) {
  let d = new Date(isoDateFormat);
  let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
  let mo = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(d);
  let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
  return `${da}/${mo}/${ye}`;
}
export function CalculDays(start, end) {
  let startDay = parseInt(start.getDate() + "");
  let endDay = parseInt(end.getDate() + "");
  let startMonth = parseInt(start.getMonth() + "");
  let endMonth = parseInt(end.getMonth() + "");
  let startYear = parseInt(start.getYear() + "");
  let endYear = parseInt(end.getYear() + "");
  let daysNum = 1;
  let thisDate = new Date(
    1900 + startYear + "-" + (startMonth + 1) + "-" + startDay
  );
  if (thisDate.getDay() == 0 || thisDate.getDay() == 6) {
    daysNum--;
  }
  while (startDay != endDay || startMonth != endMonth || startYear != endYear) {
    daysNum++;

    if (startDay == new Date(1900 + startYear, startMonth + 1, 0).getDate()) {
      if (startMonth == 11) {
        startYear++;
        startMonth = 0;
      } else {
        startMonth++;
      }
      startDay = 1;
    } else {
      startDay++;
    }
    let thisDate = new Date(
      1900 + startYear + "-" + (startMonth + 1) + "-" + startDay
    );
    if (thisDate.getDay() == 0 || thisDate.getDay() == 6) {
      daysNum--;
    }
  }

  return daysNum;
}
export function FormatDateToISOSimpleDate(d) {
  var month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  return [year, month, day].join("-");
}
export function FormatDateStringToISOSimpleDate(d) {
  let elements = d.split("/");
  return [elements[2], elements[1], elements[0]].join("-");
}
export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
export function extractISODateFromLaravelDateTime(date) {
  return date.slice(0, 10);
}
export function extractTimeFromLaravelDateTime(date) {
  return date.split("T")[1].slice(0, 5);
}
export function extractFrenchDateFromLaravelISODateTime(date) {
  return DateToFrenchFormat(extractISODateFromLaravelDateTime(date));
}
export function FormatDateStringToISOSimpleEnglishDate(d) {
  let elements = d.split(" ");
  let dateHolderArray = elements[0].split("-");

  return (
    dateHolderArray[2] +
    "/" +
    dateHolderArray[1] +
    "/" +
    dateHolderArray[0] +
    " " +
    elements[1]
  );
}
export function formatToSimpleFormatDD_MM_YYYY_H_M_S(d) {
  return moment(d).format("DD/MM/YYYY H:M:SS");
}
export function formatToFromDD_MM_YYYY_H_M_SToDate(d) {
  return moment(d).format("DD/MM/YYYY H:M:SS");
}
