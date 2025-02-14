//logical operator

console.log(true && true);

console.log(true && false);

console.log(true || false);

console.log(false && false);
///

var age = 26;
var citizen = "US1";

console.log(
  "Persoana este eligibila? ->" + (age > 20 && citizen == "US").valueOf()
);
