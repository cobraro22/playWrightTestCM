function generateRandomNumber(length: number): string {
  const characters = "0123456789";
  let randomText = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomText += characters[randomIndex];
  }

  return randomText;
}

console.log(generateRandomNumber(10));
