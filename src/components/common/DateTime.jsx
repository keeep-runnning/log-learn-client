import { format, differenceInDays, formatDistanceToNow, differenceInSeconds } from "date-fns";
import { ko } from "date-fns/locale";
import PropTypes from "prop-types";
import { Text } from "@chakra-ui/react";

function formatDateTime(dateTime, now) {
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

export default function DateTime({ dateTimeStr }) {
  return (
    <Text color="gray.500" fontSize="sm">
      {formatDateTime(new Date(dateTimeStr), new Date())}
    </Text>
  );
}

DateTime.propTypes = {
  dateTimeStr: PropTypes.string.isRequired,
};
