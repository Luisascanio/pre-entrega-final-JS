// constructor
let containerCarrito = document.querySelector(".containerCarrito")
let boton;
let carrito = [];
const carritoGuardado = JSON.parse(localStorage.getItem("carrito"));
if (carritoGuardado) {
  carrito = carritoGuardado;
}
function formatCurrency(amount) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  }).format(amount);
}

class juego {
  constructor(nombre, precio, plataforma) {
    this.nombre = nombre;
    this.precio = precio;
    this.plataforma = plataforma;
    this.img = `./img/${nombre.toLowerCase()}.jpg`;
  }
}

let juegos = [
  new juego("BATTLEFIELD 1 REVOLUTION", 25000, "ps4"),
  new juego("BATTLEFIELD V", 10000, "ps4"),
  new juego("BURNOUT PARADISE REMASTERED", 30000, "ps4"),
  new juego("DOOM", 50000, "ps4"),
  new juego("FORZA MOTOSPORT 5", 70000, "xbox"),
  new juego("HALO 5", 35000, "xbox"),
  new juego("RED DEAD REDEMPTION 2", 20000, "ps4"),
  new juego("WOLFENSTEIN 2", 50000, "ps4"),
  new juego("MORTAL KOMBAT X", 55000, "xbox"),
];

let container = document.querySelector("#container");

juegos.forEach((juegos) => {
  let copia = document.querySelector("template").content.cloneNode(true);

  copia.querySelector("h5").textContent = juegos.nombre;
  copia.querySelector("p").textContent = formatCurrency(juegos.precio);
  copia.querySelector("img").src = juegos.img;

  let boton = copia.querySelector("button");

  let mensaje = `Agregaste : ${juegos.nombre} al carrito`;

  boton.addEventListener("click", () => {
    carrito.push({
      nombre: juegos.nombre,
      precio: juegos.precio,
    });

    Toastify({
      text: mensaje,

      duration: 3000,
    }).showToast();

    actualizarcarrito();
  });
  container.append(copia);
});

function actualizarcarrito() {
  let carritoPa = document.getElementById("mostrarPrecio");
  let carritoUL = document.getElementById("carritop");
  carritoUL.innerHTML = "";

  if (carrito.length === 0) {
    containerCarrito.classList.remove("containerCarrito")
  } else {
    containerCarrito.classList.add("containerCarrito")
  }



  let total = 0;
  carrito.forEach((juegos) => {
    let mostrarPrecio = document.createElement("p");
    let button2 = document.createElement("button");
    let li = document.createElement("li");
    button2.textContent = "X";
    button2.classList.add("botonStyle");

    li.textContent = `${juegos.nombre} - ${formatCurrency(juegos.precio)}`;
    button2.addEventListener("click", function () {
      eliminarCosasDelCarro();

      li.remove();
    });

    carritoUL.appendChild(li);
    li.appendChild(button2);
    carritoPa.appendChild(mostrarPrecio);
  });

  carrito.forEach((precio) => {
    let carritoPrecio = precio.precio;

    total += carritoPrecio;
  });

  if (carrito.length === 0) {
    carritoPa.innerHTML = "";
  } else {
    mostrarPrecio.textContent = "total:" + formatCurrency(total);
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));

  function eliminarCosasDelCarro(index) {
    carrito.splice(index, 1);
    actualizarcarrito();
  }

  console.log(total);
}
document.addEventListener("DOMContentLoaded", () => {
  actualizarcarrito();
});