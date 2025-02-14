// functie declarativa - apelata de oriunde
functie();
function functie() {
  console.log("functie iesire");
}

// functie();

// anoyous function -> doar dupa declarare
// func();

var func = function () {
  console.log("functie3");
};

func();

//arrow functions
var funct3 = () => {
  console.log("functie ()");
};

funct3();

// function with arguments

function Print(name) {
  console.log(name);
}

Print("sss433");

// function with return

// export function multiplicare(number) {
//   return number * 2;
// }

// console.log(multiplicare(4));
