import { test, expect } from "@playwright/test";

test.describe("API test", () => {
  test("GET API", async ({ request }) => {
    const APIurl = "https://api.practicesoftwaretesting.com";
    const response = await request.get(APIurl + "/products");
    expect(response.status()).toBe(200);
    expect(response.statusText()).toBe("OK");
    const body = await response.json();
    expect(body.data.length).toBe(9);
    expect(body.total).toBe(50);
    // console.log(body);
  });

  test("Login Post /users/login ", async ({ request }) => {
    const APIurl = "https://api.practicesoftwaretesting.com";
    const response = await request.post(APIurl + "/users/login", {
      data: {
        email: "customer@practicesoftwaretesting.com",
        password: "welcome01",
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toBeTruthy();

    console.log(body.access_token);
    expect(body.access_token).toBeTruthy();
  });

  test.only("searchFilter", async ({ request }) => {
    const APIUrl = "https://api.practicesoftwaretesting.com";
    const search = "ham";
    const response = await request.get(APIUrl + "/products/search?q=" + search);
    expect(response.status()).toBe(200);
    // console.log(body.data);
    const body = await response.json();
    console.log(body.data);
    expect(body.data.length).toBeGreaterThan(0);

    const productArray = body.data.map((product: { name: string }) =>
      product.name.toLowerCase()
    );

    expect(
      productArray.some((name: string) => name.includes(search.toLowerCase()))
    ).toBe(true);

    const pictureTitles = body.data
      .filter(
        (product: { product_image?: { title: string } }) =>
          product.product_image
      ) // Filtrăm produsele care au imagine
      .map((product) => product.product_image!.title.toLowerCase());

    console.log(body.data);

    console.log(pictureTitles);
  });
});
