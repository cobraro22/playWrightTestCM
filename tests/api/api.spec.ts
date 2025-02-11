import { test, expect } from "@playwright/test";

import { Utils } from "../../components/utils";

test.describe("API test", () => {
  let tokenLogin = "";
  let lastMessageId = "";
  // let name="";
  const urlAPI = "https://api.practicesoftwaretesting.com";

  test.beforeEach(async ({ request }) => {
    // const urlAPI = "/";
    const response = await request.post(urlAPI + "/users/login", {
      data: {
        email: "customer@practicesoftwaretesting.com",
        password: "welcome01",
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toBeTruthy();

    console.log(body.access_token);
    tokenLogin = body.access_token;
    expect(body.access_token).toBeTruthy();
  });

  test("GET API", async ({ request }) => {
    const urlAPI = "https://api.practicesoftwaretesting.com";
    const response = await request.get(urlAPI + "/products");
    expect(response.status()).toBe(200);
    expect(response.statusText()).toBe("OK");
    const body = await response.json();
    expect(body.data.length).toBe(9);
    expect(body.total).toBe(50);
    // console.log(body);
  });

  test("Login Post /users/login ", async ({ request }) => {
    const urlAPI = "https://api.practicesoftwaretesting.com";
    const response = await request.post(urlAPI + "/users/login", {
      data: {
        email: "customer@practicesoftwaretesting.com",
        password: "welcome01",
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toBeTruthy();

    console.log(body.access_token);
    const token = body.access_token;
    expect(body.access_token).toBeTruthy();

    // const response2 = await request.get(urlAPI + "/invoices", {
    //   headers: {
    //     Authorization: `Bearer ${token}`, // Setează token-ul Bearer în header
    //   },
    // });

    // // Verificăm statusul răspunsului
    expect(response.status()).toBe(200);

    const response2 = await request.get(urlAPI + "/invoices", {
      headers: {
        Authorization: `Bearer ${token}`, // Setează token-ul Bearer în header
      },
    });

    expect(response2.status()).toBe(200);

    const body2 = await response2.json();
    console.log(body2.data);

    const invoicesId = body2.data.map((obiect: { user_id; id }) => ({
      coloana222: obiect.user_id,
      id22: obiect.id,
    }));

    const invoicesId2 = body2.data.map((obiect: { user_id: string }) => ({
      coloana222: obiect.user_id,
      // id22: obiect.id,
    }));
    console.log(invoicesId2);

    const invoicesId3 = body2.data
      .map((obiect) => obiect.id)
      .filter((obiect) => obiect === "01jkfq1k3wb8atrbw4bpkzga3s");
    console.log(invoicesId3);

    // const invoicesId4 = body2.data.filter(
    //   (obiect) => obiect.id === "01jkfq1k3wb8atrbw4bpkzga3s"
    // );
    // console.log(invoicesId4);

    console.log(body2.current_page);
  });

  test("searchFilter", async ({ request }) => {
    const urlAPI = "https://api.practicesoftwaretesting.com";
    const search = "ham";
    const response = await request.get(urlAPI + "/products/search?q=" + search);
    expect(response.status()).toBe(200);

    const body = await response.json();
    console.log(body.data);
    expect(body.data.length).toBeGreaterThan(0);

    const productArray = body.data.map((product: { name: string }) =>
      product.name.toLowerCase()
    );

    // const productId=body.data.map((product:{id:string})=>product.id)
    // console.log(productId)

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

    const response2 = await request.get(urlAPI + "/products");
    expect(response2.status()).toBe(200);

    const body2 = await response2.json();
    // const productId = body2.data.map((product: { id: string }) => product.id);
    // // console.log(productId);
    // // console.log(productId[0]);

    // const response3 = await request.get(urlAPI + "/products/" + productId[0]);

    // console.log(urlAPI + "/products/" + productId[0]);

    // expect(response3.status()).toBe(200);
    // const body3 = await response.json();
    // console.log(body3.data);

    const productIds = body2.data.map((product: { id: string }) => product.id);

    // Verificăm dacă există produse pentru a evita erorile
    if (productIds.length > 0) {
      const firstProductId = productIds[0];
      const url = `${urlAPI}/products/${firstProductId}`;

      console.log(url); // Logăm URL-ul pentru cerere

      const response3 = await request.get(url);

      expect(response3.status()).toBe(200);

      const body3 = await response.json();
      console.log(body3.data);
    } else {
      console.log("Nicio valoare de produs disponibilă.");
    }

    // Extrage toate id-urile produselor din body2
    const productIds2 = body2.data.map((product: { id: string }) => product.id);

    // Verifică dacă avem cel puțin un ID
    if (productIds2.length === 0) {
      throw new Error("Nu s-au găsit ID-uri de produse în datele primite.");
    }

    // Folosește primul ID din listă
    const productId = productIds2[0];
    const productUrl = `${urlAPI}/products/${productId}`;

    console.log("Se face request la:", productUrl);

    // Efectuează cererea GET către URL-ul produsului
    const response3 = await request.get(productUrl);

    // Verifică codul de status al răspunsului
    expect(response3.status()).toBe(200);

    // Obține și afișează datele din răspuns
    const body3 = await response3.json();
    console.log(body3.name);
    expect(body3.in_stock).toBe(true);
    expect(body3.is_location_offer).toBe(false);
    expect(body3.product_image.source_name).toContain("Unsplash");
  });

  test("checkout", async ({ request }) => {
    // const urlAPI = "https://api.practicesoftwaretesting.com";
    const search = "ham";
    const response = await request.get(urlAPI + "/products/search?q=" + search);
    expect(response.status()).toBe(200);

    const body = await response.json();
    const token = body.access_token;
    console.log(body.data[0].id);
    expect(body.data.length).toBeGreaterThan(0);
    const cartAPI = await request.post(`${urlAPI}/carts`, {
      headers: {
        Authorization: `Bearer ${tokenLogin}`,
      }, // Setează token-ul Bearer în header
    });
    const bodyCart = await cartAPI.json();
    const addProduct2CartAPI = await request.post(
      `${urlAPI}/carts/${bodyCart.id}`,
      {
        headers: {
          Authorization: `Bearer ${tokenLogin}`,
        },
        data: { product_id: body.data[0].id, quantity: 1 }, // Setează token-ul Bearer în header
      }
    );
    const bodyCartContent = await addProduct2CartAPI.json();
    const cartDetailsAPI = await request.get(`${urlAPI}/carts/${bodyCart.id}`, {
      headers: {
        Authorization: `Bearer ${tokenLogin}`,
      },
    });

    const bodyCartDetails = await cartDetailsAPI.json();
    const registerInvoiceAPI = await request.post(`${urlAPI}/invoices`, {
      headers: {
        Authorization: `Bearer ${tokenLogin}`,
      },
      data: {
        billing_address: "Test street 98",
        billing_city: "Vienna",
        billing_country: "Austria",
        billing_postcode: "2",
        billing_state: "A",
        cart_id: `${bodyCart.id}`,
        payment_method: "cash-on-delivery",
      }, // Setează token-ul Bearer în header
    });

    expect(registerInvoiceAPI.status()).toBe(201);

    const bodyInvoiceContent = await registerInvoiceAPI.json();
    console.log(bodyInvoiceContent.invoice_number);

    const invoicesGet = await request.get(urlAPI + "/invoices?page=1", {
      headers: {
        Authorization: `Bearer ${tokenLogin}`, // Setează token-ul Bearer în header
      },
    });
    expect(invoicesGet.status()).toBe(200);

    const bodyInvoiceGet = await registerInvoiceAPI.json();
    console.log(bodyInvoiceGet);

    console.log(bodyCart);
  });

  test("view invoices", async ({ request }) => {
    const response = await request.get(urlAPI + "/invoices?page=1", {
      headers: {
        Authorization: `Bearer ${tokenLogin}`, // Setează token-ul Bearer în header
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    console.log(body.data);

    // const invoicesNo = body.data.map((obiect: { user_id; id }) => ({
    //   coloana222: obiect.user_id,
    //   id22: obiect.id,
    // }));

    const invoicesId2 = body.data.map(
      (obiect: { invoice_number: string }) => obiect.invoice_number
      // id22: obiect.id,
    );
    console.log(invoicesId2);
  });

  test("favorite", async ({ request }) => {
    const response = await request.get(urlAPI + "/favorites", {
      headers: {
        Authorization: `Bearer ${tokenLogin}`,
      },
    });
    expect(response.status()).toBe(200);

    const body = await response.json();

    const favorites = body.map((obiect) => obiect.product.price);
    console.log(favorites);
  });

  test("me page", async ({ request }) => {
    const response = await request.get(`${urlAPI}/users/me`, {
      headers: {
        Authorization: `Bearer${tokenLogin}`,
      },
    });

    expect(response.status()).toBe(200);
    // console.log(response.headers());

    const body = await response.json();

    console.log(body);

    console.log(body.id);

    // expect(body.phone).toBe("1111");

    // const arrayUser = body.map((obiect) => obiect.dob);

    // console.log(arrayUser);

    const responsePUT = await request.put(`${urlAPI}/users/${body.id}`, {
      headers: {
        Authorization: `Bearer${tokenLogin}`,
      },
      data: {
        first_name: "Jane",
        last_name: "Doe",
        email: "customer@practicesoftwaretesting.com",
        phone: "11112222",
        address: "Test street 98",
        state: "XXX",
        country: "Austria",
        postcode: "111111",
        city: "Vienna",
      },
    });

    expect(responsePUT.status()).toBe(200);

    const reponsePUTbody = await responsePUT.json();

    console.log(reponsePUTbody);

    const responsePATCH = await request.patch(`${urlAPI}/users/${body.id}`, {
      headers: {
        Authorization: `Bearer${tokenLogin}`,
      },
      data: {
        postcode: "333",
        city: "Vienn3",
      },
    });

    expect(responsePATCH.status()).toBe(200);

    const reponsePATCHbody = await responsePATCH.json();

    console.log(reponsePATCHbody);
  });

  test("message", async ({ request }) => {
    const response = await request.get(`${urlAPI}/users/me`, {
      headers: {
        Authorization: `Bearer ${tokenLogin}`,
      },
    });

    expect(response.status()).toBe(200);
    // console.log(response.headers());

    const body = await response.json();

    console.log(body);

    console.log(body.id);
    const name = body.first_name + " " + body.last_name;
    console.log(name);

    const requestPostMessage = await request.post(`${urlAPI}/messages`, {
      headers: {
        Authorization: `Bearer ${tokenLogin}`,
      },
      data: {
        subject: "customer-" + Utils.generateRandomNumber(10),
        name: name,
        message: Utils.generateRandomText(50),
      },
    });
    expect(requestPostMessage.status()).toBe(200);

    const bodyPostMessage = await requestPostMessage.json();

    console.log(bodyPostMessage);

    lastMessageId = bodyPostMessage.id;
  });

  test("checkMessageList", { tag: "@api" }, async ({ request }) => {
    const responseGetMessages = await request.get(`${urlAPI}/messages`, {
      headers: {
        Authorization: `Bearer ${tokenLogin}`,
      },
    });

    expect(responseGetMessages.status()).toBe(200);

    const bodyGetMessages = await responseGetMessages.json();

    console.log(bodyGetMessages);

    const arrayMessages2 = bodyGetMessages.data
      .filter((obiect: { status: string }) => obiect.status !== "NEW") // Filtrăm doar mesajele cu status "new"
      .map((obiect: { id: string; subject: string; status: string }) => [
        obiect.id,
        obiect.subject,
        obiect.status,
      ]); // Transformăm obiectele

    const arrayMessages = bodyGetMessages.data.map(
      (obiect: { id: string; subject: string; status: string }) => [
        obiect.id,
        obiect.subject,
        obiect.status,
      ]
    );

    console.log(arrayMessages);

    console.log(arrayMessages2);

    console.log(...arrayMessages.keys());

    let arrayTest = [2, [4, 5], [3, 5, 4]];
    console.log(arrayTest.flat());

    console.log(arrayTest.join());

    console.log(arrayTest.some((el) => el === 2));

    console.log(arrayTest.every((el) => el === 2));

    // console.log(arrayTest.reverse());

    console.log(arrayTest.filter((el) => el === 2));

    arrayTest.forEach((el) => console.log(el));
    // console.log(lastMessageId);
  });

  test("functie", () => {
    console.log(Utils.generateRandomNumber2(10));

    console.log(Utils.generateRandomText(20));
  });
});
