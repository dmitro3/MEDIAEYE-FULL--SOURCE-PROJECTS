export const session = {
  save: (keyParam, valueParam) => {
    sessionStorage.setItem(keyParam, JSON.stringify(valueParam));
  },
  get: (keyParam) => {
    const val = sessionStorage.getItem(keyParam);
    return JSON.parse(val);
  },
  clear: () => {
    sessionStorage.clear();
  }
}