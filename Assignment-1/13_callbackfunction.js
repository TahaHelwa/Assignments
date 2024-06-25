function first(win) {
  setTimeout(() => {
    console.log("the first function in callback");
    win();
  }, 2000);
}

function second() {
  setTimeout(() => {
    console.log("the second function in callback");
  }, 1000);
}

first(second);
