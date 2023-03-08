export const NumberOfCompleteItems = (number: number): string => {
  const string = number > 1 ? `${number} Completed Items` : `1 Completed Item`;

  return string;
};
