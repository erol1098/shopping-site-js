"use strict";
//* Variables
const cart = document.querySelector(".cart");
const subtotal = document.querySelector(".subtotal-price");
const tax = document.querySelector(".tax-price");
const shipping = document.querySelector(".shipping-price");
const total = document.querySelector(".total-price");
const buyBtn = document.querySelector(".buy");
const emptyCart = document.querySelector(".empty");

//* Showing Empty Card
const emptyControl = function () {
  if (Object.keys(localStorage).length > 0) {
    emptyCart.classList.add("d-none");
    buyBtn.classList.remove("disabled");
  } else {
    emptyCart.classList.remove("d-none");
    buyBtn.classList.add("disabled");
  }
};

//* Setting subtotal, tax, shipping for first time
const addTotalInıt = function (productTotalPrice) {
  subtotal.textContent = (+subtotal.textContent + +productTotalPrice).toFixed(
    2
  );
  tax.textContent = (+tax.textContent + +productTotalPrice * 0.18).toFixed(2);
  total.textContent = (+subtotal.textContent + +tax.textContent).toFixed(2);

  if (total.textContent < 100) {
    shipping.textContent = 10;
    total.textContent = (+total.textContent + 10).toFixed(2);
  }
};

//* Get products from Local Storage and Add Products to Cart
const allProduct = Object.keys(localStorage);
// allProduct.splice(allProduct.indexOf("counter"), 1);
allProduct.forEach((key) => {
  const product = localStorage.getItem(key);
  const arr = product.split(",");
  const newDiv = document.createElement("section");
  newDiv.setAttribute("data-id", key);
  newDiv.classList.add("row", "justify-content-center");

  newDiv.innerHTML = `<div class="card my-3 p-3 col-10 border-0 shadow">
  <div class="row g-0 flex-sm-column flex-md-row">
    <div class="col-12 col-md-4 d-flex justify-content-center">
      <img
        src="${arr[1]}"
        style="width:250px"
        class="img-fluid rounded-3 m-sm-4 m-md-0"
        alt=""
      />
    </div>
    <div class="col-12 col-md-8 d-flex align-items-center">
      <div class="card-body">
        <h5 class="card-title text-center text-md-start product-name">
          ${arr[0]}
        </h5>
        <p class="card-title text-center text-md-start">
          <b>$</b><strong class="product-price">${arr[2]}</strong>
          <small><del class="product-oldprice">$${arr[3]}</del></small>
        </p>
        <div class="row justify-content-center justify-content-md-start mt-3">
          <div class="btn-group col-6 col-md-12 d-flex justify-content-center d-md-block">
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

//* Increment Amount
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

//* Decrement Amount
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

//* Add Shipping
const addShipping = function () {
  +total.textContent === 0
    ? (shipping.textContent = 0)
    : +total.textContent < 100
    ? (shipping.textContent = 10)
    : (shipping.textContent = 0);

  total.textContent = (+total.textContent + +shipping.textContent).toFixed(2);
};

//* Remove Product from Cart and Update Subtotal, Tax, Shipping, Total
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
  total.textContent = (+total.textContent - shipping.textContent).toFixed(2);
  shipping.textContent = (0).toFixed(2);
  {
    +total.textContent < 0.1 ? (total.textContent = (0).toFixed(2)) : null;
    +tax.textContent < 0.1 ? (tax.textContent = (0).toFixed(2)) : null;
  }
  product.remove();
};

const updateProduct = function (key, productAmount, productTotalPrice) {
  const product = localStorage.getItem(key).split(",");
  product[4] = +productAmount.textContent;
  product[5] = +productTotalPrice.textContent;
  localStorage.setItem(key, product);
};

//* Delete product from local storage
//* Decrement counter -1 for every deleting product

let counter = localStorage.getItem("counter");
const deleteItem = function (product) {
  localStorage.removeItem(product);
  // localStorage.setItem("counter", localStorage.getItem("counter") - 1);
};

//* Increment - Decrement - Remove Button
const productsList = document.querySelectorAll("section");
productsList.forEach((product) => {
  product.addEventListener("click", (e) => {
    const productAmount = product.querySelector(".product-amount");
    const productPrice = product.querySelector(".product-price");
    const productTotalPrice = product.querySelector(".product-total-price");
    if (e.target.classList.contains("product-decrement")) {
      if (productAmount.textContent > 1) {
        removeItem(productAmount, productTotalPrice, productPrice);
        addShipping();
        updateProduct(
          product.getAttribute("data-id"),
          productAmount,
          productTotalPrice
        );
      } else {
        removeCart(product, productTotalPrice);
        deleteItem(product.getAttribute("data-id"));
        emptyControl();
      }
    } else if (e.target.classList.contains("product-increment")) {
      addItem(productAmount, productTotalPrice, productPrice);
      addShipping();
      updateProduct(
        product.getAttribute("data-id"),
        productAmount,
        productTotalPrice
      );
    } else if (e.target.classList.contains("product-remove")) {
      removeCart(product, productTotalPrice);
      deleteItem(product.getAttribute("data-id"));
      emptyControl();
    }
    //* Show toast message
    // const toastTrigger = product.querySelector("#liveToastBtn");
    // const liveToast = document.getElementById("liveToast");
    // toastTrigger.addEventListener("click", () => {
    //   const toast = new bootstrap.Toast(liveToast);
    //   productAmount.textContent > 0 && toast.show();
    // });
  });
});
