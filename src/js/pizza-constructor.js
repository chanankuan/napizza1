const currentPizzaWrapper = document.querySelector(".current-pizza"),
  ingredientsBlock = document.querySelector(".ingredients-block"),
  sauceBlock = document.querySelector(".sauce-block"),
  currentPizzaPrice = document.querySelector(".constructor-total-price span"),
  chooseSizeBtns = document.querySelectorAll(".cake"),
  imgPath = "./src/img/toppings/";

let totalPrice = 0;
let userOrder = [];

// const userPizza = {
//   id: 0,
//   name: "",
//   price: 0,
//   image: "",
//   ingredients: [],
// }

const userInfo = {
  fname: "",
  email: "",
  tel: "",
  adress: "",
  orders: [],
};

renderSauce();
renderIngredients();

chooseSizeBtns.forEach((btn) => {
  btn.addEventListener("click", addSize);
});

// Render choose sauce block
function renderSauce() {
  sauceList.forEach((item) => {
    let { previewName, name, price, icon, image } = item;

    currentPizzaWrapper.innerHTML += `
      <div class="current-pizza-item current-sauce">
        <img src="${imgPath + image}" alt="${previewName}">
      </div>
    `;

    sauceBlock.innerHTML += `
      <div class="label" onclick="addSauce(event)" data-name="${name}">
        <img src="./src/img/${icon}" alt="Sauce icon">
        <span class="ingredient-name">${previewName}</span>
        <span class="ingredient-price">${price} UAH</span>
      </div>
    `;
  });
}

// Render choose ingredients block
function renderIngredients() {
  // currentPizzaWrapper.innerHTML = '';
  ingredientsBlock.innerHTML = "";

  ingredientsList.forEach((item) => {
    let { id, name, price, icon, image, qty } = item;

    currentPizzaWrapper.innerHTML += `
      <div class="current-pizza-item current-ingredient">
        <img src="${imgPath + image}" alt="${name}">
      </div>
    `;

    ingredientsBlock.innerHTML += `
      <div class="ingredient-item">
        <label for="${name}">
          <img src="./src/img/${icon}" alt="${name}" data-name="${name}">
          <span>${price} UAH</span>
        </label>
        <input type="checkbox" id="${name}">
        <div class="custom-input">
          <i class="fa-solid fa-minus" id="decrement2" onclick="changeNumberOfIngredients('decrement', ${id})"></i>
          <p class="qty">${qty}</p>
          <i class="fa-solid fa-plus" id="increment2" onclick="changeNumberOfIngredients('increment', ${id})"></i>
        </div>
      </div>
    `;
  });
}

// Choose size of custom pizza Fn
function addSize(e) {
  sizesList.forEach((size) => {
    if (
      e.target.getAttribute("data-name") === size.pizzaSize ||
      e.target.parentElement.getAttribute("data-name") === size.pizzaSize
    ) {
      if (userOrder.length === 0) {
        userOrder.push({ ...size, qty: 1 });
        chooseSizeBtns[size.id].classList.add("active");
      } else if (userOrder.length !== 0) {
        const item = userOrder.find((obj) => obj.pizzaSize === size.pizzaSize);

        if (!item) {
          userOrder.splice(0, 1, { ...size, qty: 1 });
          chooseSizeBtns.forEach((el) => el.classList.remove("active"));
          chooseSizeBtns[size.id].classList.add("active");
        } else {
          return;
        }
      }
    }
  });
  updatePrice();
}

// Add sauce to custom pizza Fn
function addSauce(e) {
  const allSauceLayers = document.querySelectorAll(".current-sauce");
  const allSauces = document.querySelectorAll(".sauce-block .label");

  sauceList.forEach((sauce) => {
    if (
      e.target.getAttribute("data-name") === sauce.name ||
      e.target.parentElement.getAttribute("data-name") === sauce.name
    ) {
      if (userOrder.length === 0) {
        showModalError("First choose the size:)");
        return;
      }

      const item = userOrder.find((obj) => obj === sauce.name);
      if (!item) {
        userOrder.splice(1, 1, { ...sauce, qty: 1 });

        const index = sauce.id;
        allSauceLayers.forEach((sauce, id) => {
          if (index === id) {
            sauce.classList.add("active");
            allSauces[id].classList.add("active");
          } else {
            sauce.classList.remove("active");
            allSauces[id].classList.remove("active");
          }
        });
      } else {
        return;
      }
    }
  });
  updatePrice();
}

// Change quantity of chosen ingredients pizza Fn
function changeNumberOfIngredients(action, id) {
  const pizzaLayers = document.querySelectorAll(".current-ingredient");

  ingredientsList.forEach((ingredient) => {
    if (ingredient.id === id) {
      const i = userOrder.findIndex((obj) => obj.name === ingredient.name);

      if (userOrder.length === 0) {
        showModalError("First choose the size:)");
        return;
      }

      if (i !== -1) {
        if (action === "increment" && ingredient.qty <= 100) {
          userOrder[i].qty++;
          ingredient.qty++;
          userOrder[i].data = new Date();
        } else if (action === "decrement" && ingredient.qty > 0) {
          userOrder[i].qty--;
          ingredient.qty--;
          userOrder[i].data = new Date();
          if (ingredient.qty === 0) {
            userOrder.splice(i, 1);
            pizzaLayers[ingredient.id].classList.remove("active");
          }
        }
      } else {
        if (action === "decrement") {
          return;
        }

        userOrder.push({ ...ingredient, qty: 1, data: new Date() });
        pizzaLayers[ingredient.id].classList.add("active");
        ingredient.qty = 1;
      }
    }
  });
  renderIngredients();
  updatePrice();
}

// Pizza base and tomato sause are set as default
function setDefaultToppings() {
  document.querySelectorAll(".current-sauce")[0].classList.add("active");
  document.getElementById("sauce1").checked = true;
}

function updatePrice() {
  let totalSum = 0;

  userOrder.forEach((el) => {
    totalSum += el.qty * el.price;
  });
  currentPizzaPrice.innerHTML = totalSum;
}

function clearUserPizza() {
  const pizzaLayers = document.querySelectorAll(".current-ingredient");
  const allSauces = document.querySelectorAll(".sauce-block .label");
  const allSauceLayers = document.querySelectorAll(".current-sauce");

  userOrder = [];
  chooseSizeBtns.forEach((el) => el.classList.remove("active"));
  allSauceLayers.forEach((el) => el.classList.remove("active"));
  allSauces.forEach((el) => el.classList.remove("active"));
  ingredientsList.forEach((ingredient) => {
    pizzaLayers[ingredient.id].classList.remove("active");
    ingredient.qty = 0;
  });

  renderIngredients();
  updatePrice();
}
