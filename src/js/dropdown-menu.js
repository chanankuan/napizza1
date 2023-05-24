const optionsArea = document.getElementById("js-options");
const wrapper = document.querySelector(".dropdown-wrapper");
const droplist = wrapper.querySelector(".options");
const selectBtn = wrapper.querySelector(".select-btn");
const input = wrapper.querySelector('input[type="text"]');

// Фетчим данные адресов ресторана
async function fetchRestaurants() {
  const response = await fetch("./data/restaurant_data.json");
  return await response.json();
}

// Рендерим выпадающий список
async function renderOptionsList() {
  const list = await fetchRestaurants();

  list.forEach(address => {
    const li = document.createElement("li");
    li.innerHTML = `<li onclick="updateName(this)">${address}</li>`;
    optionsArea.insertAdjacentElement("beforeend", li);
  });
}

renderOptionsList();

// Активируем выпадающий список при клике на поле инпута
selectBtn.addEventListener("click", () => {
  droplist.classList.toggle("active");
});

// При клике вне полня инпута закрываем выпадающий список
window.addEventListener("click", () => {
  let isFocused = document.activeElement === selectBtn;
  if (!isFocused) {
    droplist.classList.remove("active");
  }
});

// Фильтрация списка, когда пользователь вводит буквы
input.addEventListener("keyup", () => {
  let arr = []; // создаем пустой массив
  let searchedVal = input.value.toLowerCase();
  getRestaurants();

  async function getRestaurants() {
    const list = await fetchRestaurants();
    arr = list
      .filter(data => {
        return data.toLowerCase().includes(searchedVal);
      })
      .map(data => `<li onclick="updateName(this)">${data}</li>`)
      .join("");

    optionsArea.innerHTML = arr ? arr : "<p>Oops! Restaurant not found</p>";
  }
});

// Ф-я вывода выбранного пользователем адреса
function updateName(selectedOption) {
  input.value = "";
  input.placeholder = selectedOption.innerHTML;
  input.classList.add("black");
}
