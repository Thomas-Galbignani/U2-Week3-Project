// anno dinamico
const annoDinamico = function () {
  const annoCorrente = document.getElementById(`year`);
  annoCorrente.innerText = new Date().getFullYear();
};

// la mia endpoint
const endpoint = "https://striveschool-api.herokuapp.com/api/product/";

const getCd = function () {
  fetch(endpoint, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODcwYmI4NTc4Y2RkZjAwMTU1ZDY3YTEiLCJpYXQiOjE3NTIyMTg5OTYsImV4cCI6MTc1MzQyODU5Nn0.eDwiWz9b5990RF9GOgB58ZNEVbenh17_vb7uG2spoXI",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Ops, errore! `);
      }
    })
    .then((arrayOfProducts) => {
      console.log(`array di prodotti`, arrayOfProducts);
      document.getElementById(`spinner-container`).classList.add(`d-none`);

      let cards = ``; // mi creo un contenitore vuoto che andrò a riempire dopo che riempirò ad ogni ciclo
      // utilizzo i ${template literals} per recuperarmi i valori precisi
      for (let i = 0; i < arrayOfProducts.length; i++) {
        cards += ` <div class="col col-12 col-md-6 col-lg-4">
        <div class="card h-100 d-flex flex-column">
          <img
            src="${arrayOfProducts[i].imageUrl}"
            class="card-img-top"
            alt="..."
          />
          <div class="card-body d-flex flex-column align-content-center">
            <h4 class="card-title text-center fs-2 mb-4">${arrayOfProducts[i].name}</h4>
            <p class="card-text flex-grow-1 text-center">
             ${arrayOfProducts[i].description}
            </p>
            <p class="card-text text-center fs-4 ">
             ${arrayOfProducts[i].price}€
            </p>
            <div class="d-flex justify-content-center">
              <p><a class="btn btn-primary p-2" href="./detail.html?cdId=${arrayOfProducts[i]._id}">More info</a></p>
            </div>
          </div>
        </div>
       </div>`;
      }
      document.getElementById(`cdRow`).innerHTML = cards;
    })
    .catch((err) => {
      console.log(`Errore!`, err);
    });
};
annoDinamico();
getCd();
