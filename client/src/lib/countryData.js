export const countryOptions = [
  {
    label: "Canada",
    value: "+1",
    code: "CA (+1)",
    format: "(###) ###-####",
  },
  {
    label: "United Kingdom ",
    value: "+44",
    code: "GB (+44)",
    format: "#### ######",
  },
  {
    label: "Australia",
    value: "+61",
    code: "AU (+61)",
    format: "### ### ###",
  },
  {
    label: "India",
    value: "+91",
    code: "IN (+91)",
    format: "##### #####",
  },
  {
    label: "China",
    value: "+86",
    code: "CN (+86)",
    format: "### #### ####",
  },
  {
    label: "Japan",
    value: "+81",
    code: "JP (+81)",
    format: "## #### ####",
  },
  {
    label: "Germany",
    value: "+49",
    code: "DE (+49)",
    format: "### #######",
  },
  {
    label: "France",
    value: "+33",
    code: "FR (+33)",
    format: "# ## ## ## ##",
  },
  {
    label: "Brazil",
    value: "+55",
    code: "BR (+55)",
    format: "## #####-####",
  },
];

export const getCountryFormat = (countryCode) => {
  const country = countryOptions.find((option) => option.value === countryCode);
  return country ? country.format : "(###) ###-####";
};

export const getCountryByDialCode = (dialCode) => {
  return countryOptions.find((option) => option.value === dialCode);
};

export default countryOptions;
