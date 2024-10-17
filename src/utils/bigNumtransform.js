const numStr = ["亿", "万", ""];
const numArr = [100000000, 10000, 1];

export function bigNumTransform(num) {
  let res;
  for (let i = 0; i <= numArr.length - 1; i++) {
    if (num >= numArr[i]) {
      res = (num / numArr[i]).toFixed(2) + numStr[i];
      break;
    }
  }
  return res;
}
