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

const productsForm = document.getElementById("products-form");
productsForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //  mi recupero i 4 input
  const nameInput = document.getElementById("name");
  const descriptionInput = document.getElementById("description");
  const priceInput = document.getElementById("price");
  const brandInput = document.getElementById("brand");
  const imageUrlInput = document.getElementById("img");

  const productToSave = new Product(
    nameInput.value, // valore dell'input name
    descriptionInput.value, // valore dell'input description
    brandInput.value, // valore dell'imput brand
    imageUrlInput.value, // valore dell'input immagine
    priceInput.value // valore dell'input price
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
});
