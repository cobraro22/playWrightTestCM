import { test } from "@playwright/test";

function generateRandomNumber(length: number): string {
  const characters = "0123456789";
  let randomText = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomText += characters[randomIndex];
  }

  return randomText;
}

class Produs {
  // private nume:string;
  constructor(public nume: string) {}

  afisareNume(): void {
    // console.log(`${this.nume}`);
  }
}

class RX extends Produs {
  afisareNume(): void {
    console.log("Clasa Rx");
  }
}

class nonRX extends Produs {
  afisareNume(): void {
    console.log("Clasa NonRX");
  }
}

function afisareFunctieNume(produs: Produs): void {
  console.log(`${produs.nume}`);
  produs.afisareNume();
}

test("test Polimorfism prin Moștenire", () => {
  console.log(generateRandomNumber(10));

  const Rx = new RX("Obiect RX");
  const nonRx = new nonRX("Obiect NonRX");

  afisareFunctieNume(Rx);

  afisareFunctieNume(nonRx);
});
