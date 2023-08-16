export const StringToArray = (string: string | null): string[] => {
  if (string) {
    return string.split(",");
  }
  return [];
}

export const ArrayToString = (array: string[]): string => {
  return array.toString();
}

export const currentDate = (format: ParamDateFormat = "yyyy-mm-dd"): string => {
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, '0');
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const year = currentDate.getFullYear();

  if (format === "dd/mm/yyyy") {
    return `${day}/${month}/${year}`;
  }
  return `${year}-${month}-${day}`;
}

export const optionSelectToArray = (option: Option[]) => {
  return []
}