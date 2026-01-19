export const RM_LOGS_URL =
  "https://script.google.com/macros/s/AKfycbw-KksJ87Hq0iJBHr499c2Y4UOrh5pibjPrWJruwE-RHnByzhp8QTtJb3JAlZBKMju8/exec"; // replace with your Apps Script URL

export const appendRMDailyLog = async (payload: {
  rmEmail: string;
  date: string;
  loginTime?: string;
  logoutTime?: string;
}) => {
  const res = await fetch(RM_LOGS_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "appendRMDailyLog",
      ...payload,
    }),
  });
  return res.json();
};

export const fetchRMDailyLogs = async (rmEmail: string) => {
  const res = await fetch(RM_LOGS_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "fetchRMDailyLogs",
      rmEmail,
    }),
  });
  const data = await res.json();
  return data.logs || [];
};
