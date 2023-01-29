import { Text } from "@chakra-ui/react";
import { format, differenceInDays, formatDistanceToNow, differenceInSeconds } from "date-fns";
import { ko } from "date-fns/locale";

type DateTimeProps = {
  dateTimeStr: string;
};

export default function DateTime({ dateTimeStr }: DateTimeProps) {
  return (
    <Text color="gray.500" fontSize="sm">
      {formatDateTime(new Date(dateTimeStr), new Date())}
    </Text>
  );
}

function formatDateTime(dateTime: Date, now: Date): string {
  const diffDays = differenceInDays(now, dateTime);
  if (diffDays < 7) {
    const diffSeconds = differenceInSeconds(now, dateTime);
    if (diffSeconds <= 30) {
      return "방금 전";
    } else {
      return formatDistanceToNow(dateTime, { addSuffix: true, locale: ko });
    }
  }
  return format(dateTime, "yyyy년 MM월 dd일", { locale: ko });
}
