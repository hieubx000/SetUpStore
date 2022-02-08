import * as dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export const formatFromNow = (date) => dayjs(date).fromNow();

export const formatDate = (date, format = "DD/MM/YYYY") => dayjs(date).format(format);

export const isSameTime = (date1, date2) => dayjs(date1).isSame(dayjs(date2));

export const sorterByWords = (sorterKey) => (a, b) =>
  vietnameseSlug(a[sorterKey]) > vietnameseSlug(b[sorterKey]) ? 1 : vietnameseSlug(b[sorterKey]) > vietnameseSlug(a[sorterKey]) ? -1 : 0;

export const sorterByDate = (sorterKey) => (a, b) => dayjs(b[sorterKey]) - dayjs(a[sorterKey]);

export function validateEmail(email) {
  const regexEmail =
    /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regexEmail.test(String(email).toLowerCase());
}

export const setColor = (status = "") => {
  // ["Not Processed", "Processing", "Dispatched", "Cancelled", "Completed"]
  if (status === "Cancelled") return "danger";
  if (status === "Processing" || status === "Dispatched") return "warning";
  if (status === "Completed") return "success";
};

export function vietnameseSlug(str, separator = "-") {
  if (str) {
    str = str.trim();
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g, "");
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    // eslint-disable-next-line no-useless-escape
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, "");
    str = str.replace(/ +/g, "-");
    if (separator) {
      return str.replace(/-/g, separator);
    }
    return str;
  } else return "";
}
