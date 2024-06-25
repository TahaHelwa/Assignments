function evenArray(arr) {
  let evenarr = [];
  let j = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 == 0) {
      evenarr[j] = arr[i];
      j++;
    }
  }
  console.log(evenarr);
}
let x = [24, -2, 0, 1, 2, 3, 4, 5, 6, 7];
evenArray(x);
