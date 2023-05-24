renderOrderList();

function renderOrderList() {
  const orderList = document.querySelector(".basket-list");
  let path = "./src/img/";
  let totalSum = 0;

  orderList.innerHTML = "";

  cart.forEach(item => {
    const { id, name, price, image, numberOfUnits, pizzaSize, ingredients } =
      item;

    orderList.innerHTML += `
      <div class="basket-item">
        <div class="basket-item__image">
          <img src="${path + image}" alt="${name}">
        </div>
        <div class="basket-item__content">
          <p class="basket-item__name">${name}</p>
          <p class="basket-item__ingredients">${ingredients.join(", ")}</p>
          <p class="basket-item__size">${pizzaSize}</p>
          <div class="wrapper">
            <div class="custom-input">
              <i class="fa-solid fa-minus" id="decrement1" onclick="changeNumberOfItems('decrement', ${id})"></i>
              <p class="qty">${numberOfUnits}</p>
              <i class="fa-solid fa-plus" id="increment1" onclick="changeNumberOfItems('increment', ${id})"></i>
            </div>
            <p class="basket-item__price">${price * numberOfUnits} UAH</p>
            <button class="delete-item-btn" onclick="removeItemFromCart(${id})">
              <img src="./src/img/trash-can.svg">
            </button>
          </div>
        </div>
      </div>
    `;

    totalSum += price * numberOfUnits;
  });

  showCheckoutTotal(totalSum);
}

// Choose delivery type option (delivery or carry out)
const deliveryOption = document.getElementById("deliveryOption");
const carryoutOption = document.getElementById("carryoutOption");
const deliveryOptionBlock = document.querySelector(".deliveryOption__info");
const carryoutOptionBlock = document.querySelector(".carryoutOption__info");
const label1 = document.querySelector('label[for="deliveryOption"]');
const label2 = document.querySelector('label[for="carryoutOption"]');

chooseTypeOfDelivery();

deliveryOption.addEventListener("change", chooseTypeOfDelivery);
carryoutOption.addEventListener("change", chooseTypeOfDelivery);

function chooseTypeOfDelivery() {
  if (deliveryOption.checked && !carryoutOption.checked) {
    deliveryOptionBlock.style.display = "block";
    carryoutOptionBlock.style.display = "none";
    label1.classList.add("active");
    label2.classList.remove("active");
  }
  if (carryoutOption.checked && !deliveryOption.checked) {
    deliveryOptionBlock.style.display = "none";
    carryoutOptionBlock.style.display = "block";
    label2.classList.add("active");
    label1.classList.remove("active");
  }
}

// Display total sum at checkout
function showCheckoutTotal(totalSum) {
  const element = document.querySelector(".js-checkout-total");
  element.innerHTML = totalSum + " UAH";
}

// Click to return to main page
const returnToMenuBtn = document.getElementById("js-return-to-menu-btn");

returnToMenuBtn.addEventListener("click", () => {
  location.href = "/index.html";
});

//
const checkoutBtn = document.getElementById("js-checkout-btn");
const submitOrderBtn = document.getElementById("js-submit-order");
const paymentBlock = document.querySelector(".payment");
const returnToCheckoutBtn = document.getElementById(
  "js-return-to-checkout-btn"
);

returnToCheckoutBtn.addEventListener("click", () => {
  paymentBlock.classList.remove("active");
});

// Click Checkout button to proceed to checkout
checkoutBtn.addEventListener("click", goToCheckout);

function goToCheckout() {
  const requiredFields = document.querySelectorAll(
    ".basket-form input[required]"
  );

  requiredFields.forEach(input => {
    if (input.value === "") {
      input.nextElementSibling.innerHTML = "This field is required";
      return (ok = false);
    } else {
      input.nextElementSibling.innerHTML = "";
      return (ok = true);
    }
  });

  if (ok) {
    paymentBlock.classList.add("active");
  }
}

// Click Submit button to submit your order
submitOrderBtn.addEventListener("click", event => {
  const requiredFields = document.querySelectorAll(".payment input[required]");
  const email = document.getElementById("to");

  requiredFields.forEach(el => {
    if (el.value === "") {
      el.nextElementSibling.innerHTML = "This field is required";
      return (ok = false);
    } else {
      el.nextElementSibling.innerHTML = "";
      return (ok = true);
    }
  });

  if (ok) {
    sendEmail(event);
  }
});

// Validation block
// When user is typing tel number display if it's invalid
const tel = document.getElementById("tel");
tel.addEventListener("input", () => {
  validateTelNumber(tel);
});

// Mobile number validation
function validateTelNumber(tel) {
  const telRegexp = /^(\+38|38)?0(39|50|63|66|67|68|73|89|9[1-9])[0-9]{7}$/;

  if (tel.value === "") {
    return;
  }
  if (telRegexp.test(tel.value)) {
    tel.nextElementSibling.innerHTML = "";
    return true;
  } else {
    tel.nextElementSibling.innerHTML = "Please enter valid mobile number";
    return false;
  }
}

// Email validation
function validateEmail(email) {
  let emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (emailRegexp.test(email.value)) {
    return true;
  } else {
    return false;
  }
}
