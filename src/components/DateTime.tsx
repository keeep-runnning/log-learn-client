import { Text } from "@chakra-ui/react";
import { formatDate, formatRelativeDateTime } from "../utils/dateTimeFormatter";

type DateTimeProps = {
  dateTime: Date;
};

export default function DateTime({ dateTime }: DateTimeProps) {
  return (
    <Text color="gray.500" fontSize="sm">
      {format(dateTime)}
    </Text>
  );
}

function format(dateTime: Date): string {
  const diffInMS = Date.now() - dateTime.getTime();

  if (diffInMS < 7 * 24 * 60 * 60 * 1000) {
    return formatRelativeDateTime(dateTime);
  }

  return formatDate(dateTime);
}
