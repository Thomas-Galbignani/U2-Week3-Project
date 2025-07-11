const endpoint = "https://striveschool-api.herokuapp.com/api/product/";

// anno dinamico
const annoDinamico = function () {
  const annoCorrente = document.getElementById(`year`);
  annoCorrente.innerText = new Date().getFullYear();
};

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
    document.getElementById(`spinner-container`).classList.add(`d-none`);
    document.querySelector(`.card-img-top`).src = dettaglioCd.imageUrl;
    document.querySelector(`.card .card-title`).innerText = dettaglioCd.name;
    document.getElementById(`descrizione`).innerText = dettaglioCd.description;
    document.getElementById(`prezzo`).innerText = `${dettaglioCd.price}€`;
  })
  .catch((err) => {
    console.log(`errore`, err);
  });

const modificaTutto = document.getElementById(`modifica`);
const cancellaTutto = document.getElementById(`cancella`);

const btnDelete = function () {
  if (productId) {
    fetch(endpoint + `/` + productId, {
      method: `DELETE`,
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODcwYmI4NTc4Y2RkZjAwMTU1ZDY3YTEiLCJpYXQiOjE3NTIyMTg5OTYsImV4cCI6MTc1MzQyODU5Nn0.eDwiWz9b5990RF9GOgB58ZNEVbenh17_vb7uG2spoXI",
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log(`Prodotto eliminato con successo!`);
          alert("Prodotto eliminato con successo!");
          location.assign("./index.html");
        } else {
          throw new Error(
            `Opss è successo qualcossa durante l'eliminazione del prodotto. Stato: ${response.status}`
          );
        }
      })
      .catch((err) => {
        console.log(
          `Opss è successo qualcossa durante l'eliminazione del prodotto:`,
          err
        );
        alert(`Errore: ${err.message}`);
      });
  } else {
    throw new Error(`Opss qualcosa è andato storto!`);
  }
};
const btnModifica = function () {
  location.assign("/backoffice.html?cdId=" + productId);
};
modificaTutto.addEventListener(`click`, btnModifica);
cancellaTutto.addEventListener(`click`, btnDelete);
annoDinamico();
