const endpoint = "https://striveschool-api.herokuapp.com/api/product/";
// anno dinamico
const annoDinamico = function () {
  const annoCorrente = document.getElementById(`year`);
  annoCorrente.innerText = new Date().getFullYear();
};
annoDinamico();

class Product {
  constructor(_name, _description, _brand, _imageUrl, _price) {
    this.name = _name;
    this.description = _description;
    this.brand = _brand;
    this.imageUrl = _imageUrl;
    this.price = _price;
  }
}
const parametri = new URLSearchParams(location.search); // mi creo un oggetto
const productId = parametri.get(`cdId`); // gli recupero solo l'id

fetch(endpoint + `/` + productId, {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODcwYmI4NTc4Y2RkZjAwMTU1ZDY3YTEiLCJpYXQiOjE3NTIyMTg5OTYsImV4cCI6MTc1MzQyODU5Nn0.eDwiWz9b5990RF9GOgB58ZNEVbenh17_vb7uG2spoXI",
  },
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`Opss, è andato storto qualcosa `);
    }
  })
  .then((dettaglioCd) => {
    console.log(`dettaglio dell' cd id `, dettaglioCd);
    document.getElementById(`name`).value = dettaglioCd.name;
    document.getElementById(`description`).value = dettaglioCd.description;
    document.getElementById(`img`).value = dettaglioCd.imageUrl;
    document.getElementById(`price`).value = dettaglioCd.price;
    document.getElementById(`brand`).value = dettaglioCd.brand;
  })
  .catch((err) => {
    console.log(`errore`, err);
  });

const productsForm = document.getElementById("products-form");
document.getElementById(`resetta`).addEventListener(`clicl`, () => {
  productsForm.reset();
});
productsForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const nameInput = document.getElementById("name");
  const descriptionInput = document.getElementById("description");
  const priceInput = document.getElementById("price");
  const brandInput = document.getElementById("brand");
  const imageUrlInput = document.getElementById("img");
  if (productId) {
    const prodotto = {
      name: nameInput.value,
      description: descriptionInput.value,
      brand: brandInput.value,
      imageUrl: imageUrlInput.value,
      price: priceInput.value,
      _id: productId,
    };
    fetch(endpoint + `/` + productId, {
      method: `PUT`,
      body: JSON.stringify(prodotto),
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODcwYmI4NTc4Y2RkZjAwMTU1ZDY3YTEiLCJpYXQiOjE3NTIyMTg5OTYsImV4cCI6MTc1MzQyODU5Nn0.eDwiWz9b5990RF9GOgB58ZNEVbenh17_vb7uG2spoXI",

        // sto dicendo alle API che allego un oggetto in formato JSON
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Fatto!");
        } else {
          throw new Error("Errore", response.status);
        }
      })
      .catch((err) => {
        alert("ERRORE");
        console.log("ERRORE", err);
      });
  } else {
    const productToSave = new Product(
      nameInput.value,
      descriptionInput.value,
      brandInput.value,
      imageUrlInput.value,
      priceInput.value
    );
    console.log(JSON.stringify(productToSave));

    fetch("https://striveschool-api.herokuapp.com/api/product/", {
      method: `POST`,
      body: JSON.stringify(productToSave), // il body dev'essere una stringa JSON
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODcwYmI4NTc4Y2RkZjAwMTU1ZDY3YTEiLCJpYXQiOjE3NTIyMTg5OTYsImV4cCI6MTc1MzQyODU5Nn0.eDwiWz9b5990RF9GOgB58ZNEVbenh17_vb7uG2spoXI",

        // sto dicendo alle API che allego un oggetto in formato JSON
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Fatto!");
          productsForm.reset(); // svuota il form
        } else {
          throw new Error("Errore", response.status);
        }
      })
      .catch((err) => {
        alert("ERRORE");
        console.log("ERRORE", err);
      });
  }
});
