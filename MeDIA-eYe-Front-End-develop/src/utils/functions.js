export function kFormatter(num) {
  return Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'k'
    : Math.sign(num) * Math.abs(num);
}

export function trimString(string, limits) {
  if (string.length > limits) {
    return string.substr(0, limits) + '...';
  }
  return string;
}

export function subString(text, number) {
  var string = text.slice(0, number);
  if (string.length < text.length) {
    string += '...';
  }
  return string;
}

export function getToketImage(image) {
  let img = '';
  if (image === 'BNB') {
    img = '/img/token/34/BNB.png';
  } else if (image === 'BUSD') {
    img = '/img/token/34/BUSD.png';
  } else if (image === 'WBNB') {
    img = '/img/token/34/WBNB.png';
  } else if (image === 'ETH') {
    img = '/img/token/34/ETH.png';
  } else if (image === 'USDT') {
    img = '/img/token/34/USDT.png';
  } else if (image === 'WETH') {
    img = '/img/token/34/WETH.png';
  } else if (image === 'FTM') {
    img = '/img/token/34/FTM.png';
  } else if (image === 'WFTM') {
    img = '/img/token/34/WFTM.png';
  } else if (image === 'USDC') {
    img = '/img/token/34/USDC.png';
  } else if (image === 'WFTM') {
    img = '/img/token/34/WFTM.png';
  }
  return img;
}

export function extraLength(data, limit = 3) {
  return data?.length > 0 && (data?.length / limit).toString().indexOf('.') > -1 ? 'true' : 'false'
}
