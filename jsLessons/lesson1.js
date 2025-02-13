// afisare Nume
console.log("afisez ceva");
//variabile
var firstName = "J";
let lastName = "S";

//variabile pot fi doar declarate, ulterior asignate
var a, b, d;
a = 5;

// constantele trebuie sa fie atribuite deja
const bT = 5;

console.log(firstName + " - " + lastName);

// data types - 5 primite tipuri de date
var one = "David"; // string
var number = 3; // number
var isFalse = false; // boolean - logical operation
var yearsInMarriage = null; // null -> nicio valoare - not having value
var numberOfcars = undefined; //  undefined -> error state - nu se poate folosi ceva ce nu exista

// concatenare si interpolare

var price = 50,
  itemname = "CUP";

console.log("Pretul pentru o " + itemname + " este  de " + price + " dolari"); // concatenare
console.log(`Pretul pentru o ${itemname} este de ${price} dolars`); // interpolare
