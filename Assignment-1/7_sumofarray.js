function arraySum(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}
let arr = [2, 2, 3, 4, 3, 1, 20, 15, -12];
console.log(arraySum(arr));
