export function groupOfArray(arr, step = 1) {
  if (!Array.isArray(arr)) {
    return [];
  }

  const grouped = [];

  let temp = [];

  for (let i = 0; i < arr.length; i++) {
    if (temp.length === step) {
      grouped.push(temp);
      temp = [];
    }
    temp.push(arr[i]);
  }

  grouped.push(temp);

  return grouped;
}
