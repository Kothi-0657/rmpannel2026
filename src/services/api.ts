const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyekMA9l0YjjoWU7NgyegjBMd5Ul4HarknRd1edV7xXjjX-S13Rbpkk93wBfqGbz5jMmg/exec";

export const fetchCustomers = async (rmEmail: string) => {
  const res = await fetch(
    `${SCRIPT_URL}?action=getCustomers&rmEmail=${rmEmail}`
  );
  const json = await res.json();
  return json.data;
};

export const updateCustomer = async (payload: any) => {
  const res = await fetch(SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "updateCustomer",
      ...payload,
    }),
  });

  return res.json();
};
