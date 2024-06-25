function reversed(x) {
  let y = "";
  for (let i = x.length - 1; i >= 0; i--) {
    y += x[i];
  }
  console.log(y);
}

let x = "100";
reversed(x);
