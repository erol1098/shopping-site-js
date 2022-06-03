"use strict";
//* Variables
const container = document.querySelector(".container .row");
const product = document.querySelector(".product");
const productURL = document.querySelector(".product-URL");
const productName = document.querySelector(".product-name");
const productPrice = document.querySelector(".product-price");
const productOldprice = document.querySelector(".product-oldprice");
const btnDecrement = document.querySelector(".product-decrement");
const productAmount = document.querySelector(".product-amount");
const btnIncrement = document.querySelector(".product-increment");
const btnAdd = document.querySelector(".product-add");
const productTotalPrice = document.querySelector(".product-total-price");

//*Fixing for old version
localStorage.removeItem("counter");

//* Product Content
// ? const productContent = [productURL, productName, productPrice, productOldprice, productAmount, productTotalPrice, id]
const product1 = [
  "./IMG/small/leatherhandbag.jpg",
  "Leather Hand Bag",
  229.99,
  259.99,
  0,
  0,
  100,
];
const product2 = [
  "./IMG/small/nikesneakers.jpg",
  "Nike Sneakers",
  45.99,
  54.99,
  0,
  0,
  200,
];
const product3 = [
  "./IMG/small/pocketwatch.jpg",
  "Antique Pocket Watch",
  74.99,
  94.99,
  0,
  0,
  300,
];

const product4 = [
  "./IMG/small/sunglasses.jpg",
  "Ray-Ban Wayfarer Sunglasses",
  53.99,
  75.99,
  0,
  0,
  400,
];
const product5 = [
  "./IMG/small/gameboy.jpg",
  "Nintendo GameBoy",
  20.99,
  39.99,
  0,
  0,
  500,
];
const product6 = [
  "./IMG/small/lens.jpg",
  "Camera Lens",
  119.99,
  129.99,
  0,
  0,
  600,
];
const product7 = [
  "./IMG/small/longboard.jpg",
  "Long Board",
  99.99,
  119.99,
  0,
  0,
  700,
];
const product8 = ["./IMG/small/lemon.jpg", "Lemon", 0.99, 1.99, 0, 0, 800];
const product9 = [
  "./IMG/small/waterbottle.jpg",
  "Water Bottle",
  14.99,
  19.99,
  0,
  0,
  900,
];

//* Add product card to the browser
const addCarts = function (product) {
  const contentHTML = `
  <div class="card my-3 p-3 col-12" style="max-width: 990px">
    <div class="row g-0 flex-sm-column flex-md-row">
      <div class="col-12 col-md-4 d-flex justify-content-center">
        <img
          src= ${product[0]}
          class="img-fluid rounded-3 m-sm-4 m-md-0 product-URL"
          alt=""
        />
      </div>
      <div class="col-12 col-md-8">
        <div class="card-body">
          <h5
            class="card-title text-center text-md-start product-name"
          >
            ${product[1]}
          </h5>
          <p class="card-title text-center text-md-start mt-3">
            <b>$</b><strong class="product-price">${product[2]}</strong>
            <small><del class="product-oldprice">${product[3]}</del></small>
          </p>
          <div class="row justify-content-center justify-content-md-start mt-3">
            <div class="btn-group col-6 d-flex justify-content-center d-md-block">
              <button
                type="button"
                class="btn btn-secondary rounded-2 product-decrement"
              >
                -
              </button>
              <button
                type="button"
                class="btn btn-secondary disabled bg-body text-black border-0 product-amount"
              >
              ${product[4]}
              </button>
              <button
                type="button"
                class="btn btn-secondary rounded-2 product-increment"
              >
                +
              </button>
              <button
                type="button"
                id="liveToastBtn"
                class="btn btn-success ms-4 rounded-2 product-add"
              >
                Add
              </button>
            </div>
            <div class="row">
              <p class="card-text text-center text-md-start mt-4">
                Product Total: <b>$</b
                ><strong class="product-total-price">${product[5]}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
  const newProduct = document.createElement("section");
  newProduct.setAttribute("data-id", product[6]);
  newProduct.innerHTML = contentHTML;
  container.append(newProduct);
};

//* Adding products
addCarts(product1);
addCarts(product2);
addCarts(product3);
addCarts(product4);
addCarts(product5);
addCarts(product6);
addCarts(product7);
addCarts(product8);
addCarts(product9);

//* Decrement Amount
const removeItemMain = function (
  productAmount,
  productTotalPrice,
  productPrice
) {
  productAmount.textContent = +productAmount.textContent - 1;
  productTotalPrice.textContent = (
    +productTotalPrice.textContent - +productPrice.textContent
  ).toFixed(2);
};

//* Increment Amount
const addItemMain = function (productAmount, productTotalPrice, productPrice) {
  productAmount.textContent = +productAmount.textContent + 1;
  productTotalPrice.textContent = (
    +productAmount.textContent * +productPrice.textContent
  ).toFixed(2);
};

//* Adding Product To Local Storage
const addCart = function (
  productName,
  productURL,
  productPrice,
  productOldPrice,
  productAmount,
  productTotalPrice,
  id
) {
  console.log(id);
  const allProduct = Object.keys(localStorage);
  let isTrue = false;

  //* Update only numbers if the product exist in Local Storage
  allProduct.forEach((key) => {
    const product = localStorage.getItem(key).split(",");

    if (key === id) {
      product[4] = +product[4] + +productAmount.textContent;
      product[5] = (+product[5] + +productTotalPrice.textContent).toFixed(2);
      localStorage.setItem(key, product);
      isTrue = true;
    }
  });
  //* Add product to Local Storage
  !isTrue
    ? localStorage.setItem(id, [
        productName.textContent,
        productURL.src,
        productPrice.textContent,
        productOldPrice.textContent,
        productAmount.textContent,
        productTotalPrice.textContent,
        id,
      ])
    : null;
};
//* Increment - Decrement - Add Button
const productsList = document.querySelectorAll("section");
productsList.forEach((product) => {
  product.addEventListener("click", (e) => {
    const productAmount = product.querySelector(".product-amount");
    const productPrice = product.querySelector(".product-price");
    const productTotalPrice = product.querySelector(".product-total-price");
    const productURL = product.querySelector(".product-URL");
    const productName = product.querySelector(".product-name");
    const productOldprice = product.querySelector(".product-oldprice");
    const productId = product.getAttribute("data-id");
    if (e.target.classList.contains("product-decrement")) {
      if (productAmount.textContent > 0) {
        removeItemMain(productAmount, productTotalPrice, productPrice);
      }
    } else if (e.target.classList.contains("product-increment")) {
      addItemMain(productAmount, productTotalPrice, productPrice);
    } else if (e.target.classList.contains("product-add")) {
      if (productAmount.textContent > 0) {
        addCart(
          productName,
          productURL,
          productPrice,
          productOldprice,
          productAmount,
          productTotalPrice,
          productId
        );
      }
      productAmount.textContent = productTotalPrice.textContent = 0;
    }
    //* Show toast message
    const toastTrigger = product.querySelector("#liveToastBtn");
    const liveToast = document.getElementById("liveToast");
    toastTrigger.addEventListener("click", () => {
      const toast = new bootstrap.Toast(liveToast);
      productAmount.textContent > 0 && toast.show();
    });
  });
});
