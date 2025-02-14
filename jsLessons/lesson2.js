// obiecte

var customer = {
  firstName: "John",
  lastName: "Smith",
  car: ["Dacia", "Volvo", "Renault"],
};

customer.lastName = "SS";
customer["firstName"] = "MM";
console.log(customer["firstName"]);
console.log(
  `${customer.firstName} is ${customer.lastName} and has ${customer.car[0]}`
);

// array

var car = ["Dacia", "Volvo", "Renault"];

car.push("4");

console.log(car);
