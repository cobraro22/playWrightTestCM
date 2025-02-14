// conditional statement

if (1 > 1) {
  console.log("then1");
} else {
  console.log("else1");
}

1 >= 1 ? console.log("then2") : console.log("else2");

for (let i = 0; i < 5; i++) console.log(i);

var conditie = "2";
switch (conditie) {
  case "2": {
    console.log("olee");
    break;
  }
  default: {
    console.log("negasit");
  }
}

var cars = ["1", "2", "3", "4"];

cars.forEach((obiect) => {
  console.log("m" + obiect);
  //   if (carvalue=='3') break;
});

//import function
import { multiplicare } from "../jsLessons/components.js";
console.log(multiplicare(3));

// import *
import * as base from "../jsLessons/components.js";
console.log(base.multiplicare(4));
