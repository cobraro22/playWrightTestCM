export class Utils {
  static generateRandomText(length: number): string {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomText = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomText += characters[randomIndex];
    }

    return randomText;
  }

  static generateRandomNumber(length: number): string {
    const characters = "0123456789";
    let randomText = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomText += characters[randomIndex];
    }

    return randomText;
  }

  static generateRandomNumber2(length: number): string {
    const characters = "01";
    let randomText = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);

      i == 0 && characters[randomIndex] == "0"
        ? i--
        : (randomText += characters[randomIndex]);
    }

    return randomText;
  }
}
