const showTotalItems = document.querySelector(".quantity");
const showSubtotal = document.querySelector(".show-subtotal");

async function fetchProducts() {
  const response = await fetch("./data/pizza_assort.json");
  return await response.json();
}

// Add item to shopping cart
let data = localStorage.getItem("data");
let cart = data ? JSON.parse(data) : [];

async function addToCart(id) {
  const products = await fetchProducts();
  const item = products.find(product => product.id === id);
  console.log(products);
  console.log(item);
  let qty = 1;

  if (cart.some(item => item.id === id)) {
    itemIsAlreadyInCart();
  } else if (item === undefined) {
    const item = {};

    item.ingredients = [];
    item.id = cart.length + 1000;
    item.name = "Customized pizza " + cart.length;
    item.image = "custom_pizza.png";
    for (let i = 1; i < userOrder.length; i++) {
      item.ingredients.push(userOrder[i].name);
    }
    item.price = currentPizzaPrice.innerHTML;

    let pizza = JSON.parse(JSON.stringify(userOrder));

    userInfo.orders.push(pizza);
    cart.push({
      ...item,
      pizzaSize: userOrder[0].pizzaSize,
      numberOfUnits: 1,
    });

    setDataToLocalStorage(cart);
    clearUserPizza();
    updateCart();
  } else {
    let currentPrice =
      document.querySelectorAll(".price span")[id - 1].innerHTML;

    item.price = currentPrice;
    let size = document.getElementById(`${item.id}-${item.price}`).value;
    console.log(document.getElementById(`${item.id}-${item.price}`));

    cart.push({
      ...item,
      pizzaSize: size,
      numberOfUnits: qty,
    });

    setDataToLocalStorage(cart);
    updateCart();
  }
}

// Set data to localStorage
function setDataToLocalStorage(cart) {
  localStorage.setItem("data", JSON.stringify(cart));
}

// onclick callback fn in shopping cart
function changeNumberOfItems(action, id) {
  cart = cart.flatMap(item => {
    let numberOfUnits = item.numberOfUnits;

    if (item.id === id) {
      if (action === "increment" && numberOfUnits <= 100) {
        numberOfUnits++;
      }
      if (action === "decrement" && numberOfUnits > 0) {
        numberOfUnits--;
      }
      if (numberOfUnits === 0) {
        return [];
      }
    }

    return {
      ...item,
      numberOfUnits,
    };
  });

  setDataToLocalStorage(cart);
  updateCart();
}

// Remove item from shopping cart
function removeItemFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  setDataToLocalStorage(cart);
  updateCart();
}

// Update shopping cart
function updateCart() {
  if (cart.length === 0) {
    document.querySelector(".cart-is-empty").innerHTML = "You cart is empty";
    document.getElementById("order-now-btn").style.display = "none";
    showSubtotal.parentElement.style.display = "none";
  } else {
    document.querySelector(".cart-is-empty").innerHTML = "";
    document.getElementById("order-now-btn").style.display = "block";
    showSubtotal.parentElement.style.display = "flex";
  }

  renderSubtotal();
  renderCartItems();
  renderOrderList();
}

// Render shopping cart
function renderCartItems() {
  const cartBox = document.querySelector(".cart-list");
  let path = "./src/img/";
  cartBox.innerHTML = "";

  cart.forEach(item => {
    const { id, name, price, image, numberOfUnits, pizzaSize, ingredients } =
      item;

    cartBox.innerHTML += `
      <div class="cart-item">
        <button class="delete-item-btn" onclick="removeItemFromCart(${id})">
          <img src="./src/img/trash-can.svg">
        </button>
        <div class="cart-item__image">
          <img src="${path + image}" alt="${name}">
        </div>
        <div class="cart-item__content">
          <p class="cart-item__name">${name}</p>
          <p class="cart-item__size">${pizzaSize}</p>
          <p class="cart-item__ingredients">${ingredients.join(", ")}</p>
          <div class="wrapper">
            <div class="custom-input">
              <i class="fa-solid fa-minus" id="decrement" onclick="changeNumberOfItems('decrement', ${id})"></i>
              <p class="qty">${numberOfUnits}</p>
              <i class="fa-solid fa-plus" id="increment" onclick="changeNumberOfItems('increment', ${id})"></i>
            </div>
            <p class="cart-item__price">${price * numberOfUnits} UAH</p>
          </div>
        </div>
      </div>
    `;
  });
}

// Render total price and total number of items
function renderSubtotal() {
  let totalPrice = 0;
  let totalItems = 0;

  if (cart.length === 0) {
    totalItems = "";
  } else {
    cart.forEach(item => {
      totalPrice += item.price * item.numberOfUnits;
      totalItems += item.numberOfUnits;
    });
  }

  showTotalItems.innerHTML = totalItems;
  showSubtotal.innerHTML = totalPrice + " UAH";
  // showTotalSum.innerHTML = totalPrice + ' UAH';
}

function clearAll() {
  localStorage.clear();
  updateCart();
}

updateCart();
