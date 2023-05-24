function showModalError(message) {
  Swal.fire({
    icon: "error",
    confirmButtonColor: "#ff8c42",
    title: message,
  });
}

function orderConfirmedModal(message) {
  Swal.fire({
    title: message,
    width: 600,
    padding: "3em",
    color: "#716add",
    background: "#fff url(../src/img/trees.png)",
    backdrop: `
      rgba(0,0,123,0.4)
      url("../src/img/nyan-cat.gif")
      left top
      no-repeat
    `,
  }).then(function () {
    window.location.href = "../index.html";
  });
}

function itemIsAlreadyInCart() {
  Swal.fire({
    confirmButtonColor: "#ff8c42",
    title: "Item is already in cart",
  });
}
