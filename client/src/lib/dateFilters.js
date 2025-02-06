import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

export const filterByToday = (data) => {
  const today = dayjs().startOf("day");
  return data.filter((item) => dayjs(item.createdAt).isSame(today, "day"));
};

export const filterByYesterday = (data) => {
  const yesterday = dayjs().subtract(1, "day").startOf("day");
  return data.filter((item) => dayjs(item.createdAt).isSame(yesterday, "day"));
};

export const filterByLast7Days = (data) => {
  const last7Days = dayjs().subtract(7, "day").startOf("day");
  return data.filter((item) => dayjs(item.createdAt).isAfter(last7Days));
};

export const filterByThisMonth = (data) => {
  const startOfMonth = dayjs().startOf("month");
  return data.filter((item) => dayjs(item.createdAt).isAfter(startOfMonth));
};

export const filterByThisYear = (data) => {
  const startOfYear = dayjs().startOf("year");
  return data.filter((item) => dayjs(item.createdAt).isAfter(startOfYear));
};

export const filterByDateRange = (data, startDate, endDate) => {
  const start = dayjs(startDate).startOf("day");
  const end = dayjs(endDate).endOf("day");
  return data.filter((item) =>
    dayjs(item.createdAt).isBetween(start, end, null, "[]")
  );
};
