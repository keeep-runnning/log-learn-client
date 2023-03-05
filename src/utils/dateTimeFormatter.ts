import { format, register } from "timeago.js";
import ko from "timeago.js/lib/lang/ko";

register("ko", ko);

export function formatRelativeDateTime(dateTime: Date): string {
  return format(dateTime, "ko");
}

export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const dayOfMonth = date.getDate();

  return `${year}년 ${month}월 ${dayOfMonth}일`;
}
