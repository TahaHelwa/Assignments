function isPalindrome(x) {
  for (let i = 0, j = x.length - 1; i < x.length / 2; i++, j--) {
    if (x[i] != x[j]) return false;
  }
  return true;
}
let x = "01110";
if (isPalindrome(x)) {
  console.log("entry is palindrome");
} else {
  console.log("entry is not palindrome");
}
