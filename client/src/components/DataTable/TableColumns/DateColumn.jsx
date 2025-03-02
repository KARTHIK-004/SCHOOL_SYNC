import React from "react";

// Simple function to format time ago
function timeAgo(createdAt) {
  const created = new Date(createdAt);
  const now = new Date();
  const seconds = Math.floor((now - created) / 1000);

  if (seconds < 60) return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;

  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days !== 1 ? "s" : ""} ago`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months !== 1 ? "s" : ""} ago`;

  const years = Math.floor(months / 12);
  return `${years} year${years !== 1 ? "s" : ""} ago`;
}

// Format date
function formatDate(date) {
  const d = new Date(date);
  if (isNaN(d.getTime())) throw new Error("Invalid date");

  const options = {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  let formatted = new Intl.DateTimeFormat("en-US", options).format(d);

  // Add ordinal suffix
  const day = d.getDate();
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";

  return formatted.replace(/\b(\d{1,2})\b/, `$1${suffix}`);
}

export default function DateColumn({ row, accessorKey }) {
  const createdAt = row.getValue(accessorKey).toString();
  const date = formatDate(createdAt);

  // Show relative time if less than 10 days old, otherwise show formatted date
  const daysAgo = Math.floor(
    (new Date() - new Date(createdAt)) / (1000 * 60 * 60 * 24)
  );

  return <div>{daysAgo > 10 ? date : timeAgo(createdAt)}</div>;
}
