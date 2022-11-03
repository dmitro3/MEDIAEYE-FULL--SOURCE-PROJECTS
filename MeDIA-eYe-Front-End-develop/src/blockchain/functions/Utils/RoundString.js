export function roundString(stringNum, decimals) {
  stringNum = String(stringNum);
  if (!stringNum.includes('.')) return stringNum;
  return stringNum.substring(0, stringNum.indexOf('.') + decimals + 1);
}

export function numberRoundConverter(stringNum, decimals, minimum = 0) {
  stringNum = String(stringNum);
  if (!stringNum.includes('.')) return stringNum;
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: minimum,
    maximumFractionDigits: decimals
  });
  return formatter.format(stringNum).replace(/\,/g, '');
}

export function allowOnlyNumber(value, allowdots = true) {
  if (allowdots) {
    return value ? value.replace(/[^\d.]/g, '') : value;
  } else {
    return value ? value.replace(/[^\d]/g, '') : value;
  }
}
