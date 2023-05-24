const accordionContent = document.querySelectorAll(".accordion-content");

accordionContent.forEach((item, index) => {
  let header = item.querySelector(".accordion-title");
  header.addEventListener("click", () => {
    item.classList.toggle("open");

    let list = item.querySelector(".accordion-list");
    if (item.classList.contains("open")) {
      list.style.height = `${list.scrollHeight}px`;
    } else {
      list.style.height = "0px";
    }

    removeOpen(index);
  });
});

function removeOpen(index1) {
  accordionContent.forEach((item2, index2) => {
    if (index1 != index2) {
      item2.classList.remove("open");

      let list = item2.querySelector(".accordion-list");
      list.style.height = "0px";
    }
  });
}