"use strict";

//* Variables
const cart = document.querySelector(".cart");

const subtotal = document.querySelector(".subtotal-price");
const tax = document.querySelector(".tax-price");
const shipping = document.querySelector(".shipping-price");
const total = document.querySelector(".total-price");

const emptyCart = document.querySelector(".empty");

const emptyControl = function () {
  Object.keys(localStorage).length > 1
    ? emptyCart.classList.add("d-none")
    : emptyCart.classList.remove("d-none");
};

const addTotalInıt = function (productTotalPrice) {
  subtotal.textContent = (+subtotal.textContent + +productTotalPrice).toFixed(
    2
  );
  tax.textContent = (+tax.textContent + +productTotalPrice * 0.18).toFixed(2);
  total.textContent = (+subtotal.textContent + +tax.textContent).toFixed(2);
};

const allProduct = Object.keys(localStorage);
allProduct.splice(allProduct.indexOf("counter"), 1);
allProduct.forEach((key) => {
  const product = localStorage.getItem(key);
  const arr = product.split(",");
  const newDiv = document.createElement("section");
  newDiv.classList.add(`${key}`, "row", "justify-content-center");

  newDiv.innerHTML = `<div class="card my-3 p-3 col-8">
  <div class="row g-0 flex-sm-column flex-md-row">
    <div class="col-12 col-md-4 d-flex justify-content-center">
      <img
        src="${arr[1]}"
        class="img-fluid rounded-3 m-sm-4 m-md-0"
        alt="vintage-backbag"
      />
    </div>
    <div class="col-12 col-md-8">
      <div class="card-body">
        <h5 class="card-title text-center text-md-start product-name">
          ${arr[0]}
        </h5>
        <p class="card-title text-center text-md-start">
          <b>$</b><strong class="product-price">${arr[2]}</strong>
          <small><del class="product-oldprice">$${arr[3]}</del></small>
        </p>
        <div class="row">
          <div class="btn-group me-2 col-6 offset-2 offset-md-0">
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
              ${arr[4]}
            </button>
            <button
              type="button"
              class="btn btn-secondary rounded-2 product-increment"
            >
              +
            </button>
            <button
              type="button"
              class="btn btn-danger ms-4 rounded-2 product-remove"
            >
              Remove
            </button>
          </div>
          <div class="row">
            <p class="card-text text-center text-md-start mt-4">
              Product Total: <b>$</b
              ><strong class="product-total-price">${arr[5]}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`;
  cart.append(newDiv);
  addTotalInıt(arr[5]);
  emptyControl();
});

const addItem = function (productAmount, productTotalPrice, productPrice) {
  productAmount.textContent = +productAmount.textContent + 1;
  productTotalPrice.textContent = (
    +productAmount.textContent * +productPrice.textContent
  ).toFixed(2);
  subtotal.textContent = (
    +subtotal.textContent + +productPrice.textContent
  ).toFixed(2);
  tax.textContent = (
    +tax.textContent +
    +productPrice.textContent * 0.18
  ).toFixed(2);
  total.textContent = (+subtotal.textContent + +tax.textContent).toFixed(2);
};
const removeItem = function (productAmount, productTotalPrice, productPrice) {
  productAmount.textContent = +productAmount.textContent - 1;
  productTotalPrice.textContent = (
    +productTotalPrice.textContent - +productPrice.textContent
  ).toFixed(2);
  subtotal.textContent = (
    +subtotal.textContent - +productPrice.textContent
  ).toFixed(2);
  tax.textContent = (
    +tax.textContent -
    +productPrice.textContent * 0.18
  ).toFixed(2);
  total.textContent = (+subtotal.textContent + +tax.textContent).toFixed(2);
};

const addShipping = function () {
  +total.textContent === 0
    ? (shipping.textContent = 0)
    : +total.textContent < 100
    ? (shipping.textContent = 10)
    : (shipping.textContent = 0);

  total.textContent = +total.textContent + +shipping.textContent;
};
const removeCart = function (product, productTotalPrice) {
  subtotal.textContent = (
    +subtotal.textContent - +productTotalPrice.textContent
  ).toFixed(2);
  tax.textContent = (
    +tax.textContent -
    +productTotalPrice.textContent * 0.18
  ).toFixed(2);
  total.textContent = (
    +total.textContent -
    +productTotalPrice.textContent * 0.18 -
    +productTotalPrice.textContent
  ).toFixed(2);
  total.textContent = +total.textContent - shipping.textContent;
  shipping.textContent = (0).toFixed(2);
  {
    +total.textContent < 0.1 ? (total.textContent = (0).toFixed(2)) : null;
    +tax.textContent < 0.1 ? (tax.textContent = (0).toFixed(2)) : null;
  }
  product.innerHTML = "";
};

let productLS;
let counter = localStorage.getItem("counter");
const deleteItem = function (product) {
  localStorage.removeItem(product);
  localStorage.setItem("counter", localStorage.getItem("counter") - 1);
};

const temp = document.querySelectorAll("section");
cart.addEventListener("click", (e) => {
  for (let i = 1; i <= counter; i++) {
    const p = e.target.closest("section");
    const productAmount = p.querySelector(".product-amount");
    const productPrice = p.querySelector(".product-price");
    const productTotalPrice = p.querySelector(".product-total-price");
    productLS = `product${i}`;
    if (e.target.closest("section").classList.contains(`product${i}`)) {
      if (e.target === p.querySelector(".product-decrement")) {
        if (productAmount.textContent > 1) {
          removeItem(productAmount, productTotalPrice, productPrice);
          addShipping();
        } else {
          removeCart(p, productTotalPrice);
          deleteItem(productLS);
          emptyControl();
        }
      } else if (e.target === p.querySelector(".product-increment")) {
        addItem(productAmount, productTotalPrice, productPrice);
        addShipping();
      } else if (e.target === p.querySelector(".product-remove")) {
        removeCart(p, productTotalPrice);
        deleteItem(productLS);
        emptyControl();
      }
    }
  }
});
