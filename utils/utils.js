export function arrayCommas(array) {
  if (array) {
    let text = "";
    for (let i = 0; i < array.length; i++) {
      if (array.length === 1) {
        return array[0];
      } else if (array.length === 2) {
        return array[0] + " and " + array[1];
      } else if (array.length > 2) {
        if (i === array.length - 1) {
          text += " and " + array[i];
        } else if (i === array.length - 2) {
          text += array[i];
        } else {
          text += array[i] + ", ";
        }
      }
    }
    return text;
  } else {
    return "None";
  }
}
export function numbersCommas(num) {
  let finalNum = "";
  num
    .toString()
    .split("")
    .reverse()
    .forEach((n, i) => {
      if (
        i === 2 ||
        i === 5 ||
        i === 8 ||
        i === 11 ||
        i === 14 ||
        i === 17 ||
        i === 20
      ) {
        finalNum += n + ",";
      } else {
        finalNum += n;
      }
    });
  let finalNumArr = finalNum.split("");
  if (finalNumArr[finalNumArr.length - 1] === ",") {
    finalNumArr.pop();
    return finalNumArr.reverse().join("");
  } else {
    return finalNumArr.reverse().join("");
  }
}
