function avarageNums(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum / arr.length;
}
let arr = [1, 23, 4, 5, 6, 7, 3, 2, 12]; // 7
console.log(avarageNums(arr));
