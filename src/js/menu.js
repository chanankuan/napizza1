async function fetchData(url) {
  const response = await fetch(url);
  return await response.json();
}

// Render main menu
async function renderMenu() {
  const products = await fetchData("./data/pizza_assort.json");
  let path = "./src/img/";

  products.forEach(item => {
    const menuBox = document.querySelector(".menu__box-container");
    const newDiv = document.createElement("div");
    const { id, name, price, image, ingredients } = item;

    let standardSize = price.standard;
    let largeSize = price.large;
    let currentPrice = standardSize;
    let currentID = id + currentPrice;
    console.log();

    newDiv.classList.add("col-12", "col-sm-6", "col-lg-4", "pb-3", "pt-3");
    newDiv.innerHTML = `
      <div class="menu__box box">
        <div class="price"><span>${currentPrice}</span> UAH</div>
        <img src="${path + image}" alt="${name}">
        <h4 class="menu__box-heading">${name}</h4>
        <p class="menu__box-ingredients">${ingredients.join(", ")}</p>
        <div class="btn-group btn-group-${id}" role="group" aria-label="Basic example">
          <button type="button" class="size-btn btn-secondary active" value="standard" onclick="chooseSize('standard', ${id}, ${standardSize}, ${largeSize})" id="${id}-${standardSize}">Standard size</button>
          <button type="button" class="size-btn btn-secondary" value="large" onclick="chooseSize('large', ${id}, ${standardSize}, ${largeSize})" id="${id}-${largeSize}">Large</button>
        </div>
        <input type="button" onclick="addToCart(${id})" value="add to cart" name="add_to_cart" class="add-to-cart-btn">
      </div>
    `;
    menuBox.appendChild(newDiv);
  });
}

function chooseSize(action, id, standardSize, largeSize) {
  const chooseSizeBtns = document.querySelectorAll(".btn-group");
  const priceElements = document.querySelectorAll(".price span");

  if (action === "standard" || action === "") {
    currentPrice = standardSize;
    chooseSizeBtns[id - 1].firstElementChild.classList.add("active");
    chooseSizeBtns[id - 1].lastElementChild.classList.remove("active");
    priceElements[id - 1].innerHTML = currentPrice;

    return currentPrice;
  }
  if (action === "large") {
    currentPrice = largeSize;
    chooseSizeBtns[id - 1].lastElementChild.classList.add("active");
    chooseSizeBtns[id - 1].firstElementChild.classList.remove("active");
    priceElements[id - 1].innerHTML = currentPrice;

    return currentPrice;
  }

  renderMenu();
}

renderMenu();
