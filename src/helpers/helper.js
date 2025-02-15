export function capitalizeFirstLetter(val) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

export const formatFieldLabel = (field) => {
  const addSpaceBeforeUpperCase = (str) => {
    return str.replace(/([A-Z])/g, " $1");
  };

  const handleUnderscores = (str) => {
    return str.replace(/_/g, " ");
  };

  let formattedLabel = field
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  formattedLabel = addSpaceBeforeUpperCase(formattedLabel);

  formattedLabel = formattedLabel.replace(/\s+/g, " ").trim();

  return formattedLabel;
};
