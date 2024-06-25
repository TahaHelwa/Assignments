function findIndexInArray(num, arr) {
  let index = -1;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == num) {
      index = i;
      console.log("the number is in index : ", index);
    }
  }
  if (index == -1) {
    console.log("the number is not found");
  }
}
let arr = [1, 2, 3, 5, 6, 8, 9, 100];
let num = 1000;
findIndexInArray(num, arr);
