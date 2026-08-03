"use strict";

/*====================================================
        TECHNOLOGIC STORE
        SCRIPT PRINCIPAL
====================================================*/

//=========================================
// PARTE 1: BASE DE DATOS DE PRODUCTOS
//=========================================

const PRODUCTOS = [
  { nombre: "iPhone 16", precio: 800 },
  { nombre: "iPhone 15 Pro", precio: 800 },
  { nombre: "iPhone 14 Pro", precio: 635 },
  { nombre: "iPhone 13 Pro", precio: 380 },
  { nombre: "iPhone 14 Plus", precio: 800 },
  { nombre: "iPhone 12 Pro", precio: 250 },
  { nombre: "Samsung Galaxy S24 Ultra", precio: 1000 },
  { nombre: "Samsung Galaxy S23 Ultra", precio: 850 },
  { nombre: "Samsung Galaxy S22 Ultra", precio: 650 },
  { nombre: "Samsung Galaxy S21 Ultra", precio: 450 },
  { nombre: "Infinix GT 20 Pro", precio: 375 },
  { nombre: "Infinix Hot 50 Pro", precio: 195 },
  { nombre: "Huawei MateBook D16", precio: 700 },
  { nombre: "ASUS Zenbook A14", precio: 1000 },
  { nombre: "Lenovo IdeaPad Slim 3", precio: 1339 },
  { nombre: "Dell Inspiron 14", precio: 1200 },
  { nombre: "HP Pavilion 14", precio: 1370 },
  { nombre: "Lenovo IdeaPad Flex 3", precio: 320 },
  { nombre: "ASUS Vivobook Go 15", precio: 585 },
  { nombre: "Acer Nitro V", precio: 1500 },
  { nombre: "Lenovo Legion LOQ", precio: 900 },
  { nombre: "ASUS TUF Gaming A15", precio: 1400 },
  { nombre: "HP Victus 16", precio: 859 },
  { nombre: "Acer Swift Go 14", precio: 700 },
  { nombre: "JBL Inalámbricos", precio: 40 },
  { nombre: "JBL Tune 525BT", precio: 39 },
  { nombre: "Audífonos Inalámbricos Pro", precio: 79 },
  { nombre: "Logitech", precio: 44.99 },
  { nombre: "Audífonos RGB", precio: 41.5 },
  { nombre: "Xtech", precio: 54.99 },
  { nombre: "EDIFIER", precio: 66.99 },
  { nombre: "Knowledge Zenith", precio: 59 },
  { nombre: "Festa Pro", precio: 42 },
  { nombre: "Audio-Technica", precio: 49.99 },
  { nombre: "Logitech G", precio: 39 },
  { nombre: "EIM", precio: 64.99 },
];

//=========================================
// CARGAR CARRITO Y PEDIDO
//=========================================

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let pedidoActual = JSON.parse(localStorage.getItem("pedido")) || null;

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function guardarPedido() {
  localStorage.setItem("pedido", JSON.stringify(pedidoActual));
}

function obtenerProducto(nombre) {
  return PRODUCTOS.find((producto) => producto.nombre === nombre);
}

function actualizarContador() {
  const contador = document.getElementById("contador-carrito");
  if (!contador) return;
  contador.textContent = carrito.length;
}

document.addEventListener("DOMContentLoaded", () => {
  actualizarContador();
});

/*====================================================
            PARTE 2: AGREGAR Y QUITAR PRODUCTOS
====================================================*/

function productoExiste(nombre) {
  return carrito.some((producto) => producto.nombre === nombre);
}

function agregarAlCarrito(nombre, precio) {
  const producto = obtenerProducto(nombre);

  if (!producto) {
    alert("Producto no encontrado.");
    return;
  }

  // Si ya existe se elimina (toggle)
  if (productoExiste(nombre)) {
    quitarDelCarrito(nombre);
    return;
  }

  carrito.push({
    nombre: producto.nombre,
    precio: producto.precio,
    cantidad: 1,
  });

  guardarCarrito();
  actualizarContador();
  actualizarBotones();
  animarContador();
}

function quitarDelCarrito(nombre) {
  carrito = carrito.filter((producto) => producto.nombre !== nombre);
  guardarCarrito();
  actualizarContador();
  actualizarBotones();
  animarContador();
}

function actualizarBotones() {
  const botones = document.querySelectorAll(".btn-carrito");

  botones.forEach((boton) => {
    const onclick = boton.getAttribute("onclick");
    if (!onclick) return;

    const coincidencia = onclick.match(/'([^']+)'/);
    if (!coincidencia) return;

    const nombre = coincidencia[1];

    if (productoExiste(nombre)) {
      boton.innerHTML = "❌ Quitar del carrito";
      boton.classList.add("agregado");
    } else {
      boton.innerHTML = "🛒 Agregar al carrito";
      boton.classList.remove("agregado");
    }
  });
}

function animarContador() {
  const contador = document.getElementById("contador-carrito");
  if (!contador) return;

  contador.classList.remove("bump");
  void contador.offsetWidth;
  contador.classList.add("bump");
}

document.addEventListener("DOMContentLoaded", () => {
  actualizarBotones();
});

/*====================================================
                PARTE 3: CARRITO DE COMPRAS
====================================================*/

function mostrarCarrito() {
  const lista = document.getElementById("lista-carrito-detallada");
  const total = document.getElementById("total-pagar");

  if (!lista || !total) return;

  lista.innerHTML = "";
  let totalCompra = 0;

  if (carrito.length === 0) {
    lista.innerHTML = `
      <li style="list-style:none; padding:25px; text-align:center; font-size:18px; font-weight:bold; color:#666;">
        Tu carrito está vacío.
      </li>
    `;
    total.textContent = "0.00";
    return;
  }

  carrito.forEach((producto, index) => {
    totalCompra += producto.precio;

    const li = document.createElement("li");
    li.style.listStyle = "none";
    li.style.marginBottom = "15px";
    li.style.padding = "15px";
    li.style.border = "1px solid #ddd";
    li.style.borderRadius = "10px";
    li.style.display = "flex";
    li.style.justifyContent = "space-between";
    li.style.alignItems = "center";

    li.innerHTML = `
      <div>
        <h3 style="margin-bottom:8px;">${producto.nombre}</h3>
        <p>Precio: <strong>$${producto.precio.toFixed(2)}</strong></p>
      </div>
      <button class="btn-carrito" onclick="eliminarProducto(${index})">❌ Eliminar</button>
    `;

    lista.appendChild(li);
  });

  total.textContent = totalCompra.toFixed(2);
}

function eliminarProducto(indice) {
  if (indice < 0) return;
  if (indice >= carrito.length) return;

  carrito.splice(indice, 1);
  guardarCarrito();
  actualizarContador();
  actualizarBotones();
  mostrarCarrito();
  animarContador();
}

function vaciarCarrito() {
  if (carrito.length === 0) {
    return;
  }

  if (confirm("¿Deseas vaciar el carrito?")) {
    carrito = [];
    guardarCarrito();
    actualizarContador();
    actualizarBotones();
    mostrarCarrito();
  }
}

function calcularTotal() {
  let total = 0;
  carrito.forEach((producto) => {
    total += producto.precio;
  });
  return total;
}

document.addEventListener("DOMContentLoaded", () => {
  mostrarCarrito();
});

/*====================================================
                PARTE 4: VALIDACIÓN DEL FORMULARIO
====================================================*/

let pagoEnProceso = false;

document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("form-pago");
  if (!formulario) return;

  const inputs = formulario.querySelectorAll("input");

  const nombre = inputs[0];
  const tarjeta = inputs[1];
  const fecha = inputs[2];
  const cvv = inputs[3];

  tarjeta.addEventListener("input", () => {
    let valor = tarjeta.value.replace(/\D/g, "");
    valor = valor.substring(0, 16);
    valor = valor.replace(/(.{4})/g, "$1 ").trim();
    tarjeta.value = valor;
  });

  fecha.addEventListener("input", () => {
    let valor = fecha.value.replace(/\D/g, "");
    valor = valor.substring(0, 4);
    if (valor.length > 2) {
      valor = valor.substring(0, 2) + "/" + valor.substring(2);
    }
    fecha.value = valor;
  });

  cvv.addEventListener("input", () => {
    cvv.value = cvv.value.replace(/\D/g, "");
  });
});

function validarTarjeta(numero) {
  numero = numero.replace(/\s/g, "");
  if (numero.length != 16) {
    return false;
  }

  let suma = 0;
  let alternar = false;

  for (let i = numero.length - 1; i >= 0; i--) {
    let n = parseInt(numero.charAt(i));

    if (alternar) {
      n *= 2;
      if (n > 9) {
        n -= 9;
      }
    }
    suma += n;
    alternar = !alternar;
  }

  return suma % 10 === 0;
}

function validarFecha(fecha) {
  const partes = fecha.split("/");
  if (partes.length != 2) {
    return false;
  }

  const mes = parseInt(partes[0]);
  const anio = parseInt("20" + partes[1]);

  if (mes < 1 || mes > 12) {
    return false;
  }

  const hoy = new Date();
  const actualMes = hoy.getMonth() + 1;
  const actualAnio = hoy.getFullYear();

  if (anio < actualAnio) {
    return false;
  }

  if (anio === actualAnio && mes < actualMes) {
    return false;
  }

  return true;
}

function validarFormulario() {
  const formulario = document.getElementById("form-pago");
  const inputs = formulario.querySelectorAll("input");

  const nombre = inputs[0].value.trim();
  const tarjeta = inputs[1].value.trim();
  const fecha = inputs[2].value.trim();
  const cvv = inputs[3].value.trim();
  const direccion = inputs[4].value.trim();

  if (nombre.length < 5) {
    alert("Ingrese un nombre válido.");
    return false;
  }

  if (!validarTarjeta(tarjeta)) {
    alert("La tarjeta no es válida.");
    return false;
  }

  if (!validarFecha(fecha)) {
    alert("La tarjeta está vencida.");
    return false;
  }

  if (!/^[0-9]{3,4}$/.test(cvv)) {
    alert("CVV incorrecto.");
    return false;
  }

  if (direccion.length < 10) {
    alert("Ingrese una dirección válida.");
    return false;
  }

  return true;
}

function bloquearPago() {
  if (pagoEnProceso) {
    return false;
  }
  pagoEnProceso = true;
  return true;
}

function desbloquearPago() {
  pagoEnProceso = false;
}

/*====================================================
                PARTE 5: PROCESAR EL PAGO
====================================================*/

function generarCodigoRastreo() {
  const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numeros = "0123456789";
  let codigo = "TECH-2026-";

  for (let i = 0; i < 3; i++) {
    codigo += letras.charAt(Math.floor(Math.random() * letras.length));
  }
  for (let i = 0; i < 4; i++) {
    codigo += numeros.charAt(Math.floor(Math.random() * numeros.length));
  }
  return codigo;
}

function obtenerFecha() {
  const hoy = new Date();
  return hoy.toLocaleDateString("es-SV");
}

function obtenerHora() {
  const hoy = new Date();
  return hoy.toLocaleTimeString("es-SV");
}

function procesarPagoYGenerarCodigo() {
  if (!bloquearPago()) {
    return;
  }

  if (carrito.length === 0) {
    alert("No hay productos en el carrito.");
    desbloquearPago();
    return;
  }

  if (!validarFormulario()) {
    desbloquearPago();
    return;
  }

  const codigo = generarCodigoRastreo();

  pedidoActual = {
    codigo: codigo,
    productos: [...carrito],
    total: calcularTotal(),
    estado: "Pedido recibido",
    paso: 1,
    fecha: obtenerFecha(),
    hora: obtenerHora(),
  };

  guardarPedido();
  carrito = [];
  guardarCarrito();
  actualizarContador();
  actualizarBotones();
  mostrarCarrito();
  mostrarPantallaExito(codigo);
  desbloquearPago();
}

function mostrarPantallaExito(codigo) {
  const compra = document.getElementById("seccion-carrito-vista");
  const exito = document.getElementById("seccion-exito");
  const codigoHTML = document.getElementById("codigo-generado");

  if (compra) {
    compra.style.display = "none";
  }

  if (exito) {
    exito.style.display = "block";
  }

  if (codigoHTML) {
    codigoHTML.textContent = codigo;
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (!pedidoActual) {
    return;
  }

  const codigo = document.getElementById("codigo-generado");
  if (codigo) {
    codigo.textContent = pedidoActual.codigo;
  }
});

/*====================================================
                PARTE 6: SEGUIMIENTO DEL PEDIDO
====================================================*/

function buscarPedido() {
  const caja = document.getElementById("numeroPedido");
  if (!caja) return;

  const codigo = caja.value.trim().toUpperCase();

  if (!pedidoActual) {
    alert("No existe ningún pedido.");
    return;
  }

  if (codigo !== pedidoActual.codigo) {
    alert("Código incorrecto.");
    return;
  }

  mostrarSeguimiento();
}

function mostrarSeguimiento() {
  const estado = document.querySelector(".panel-estado");
  if (!estado) return;

  estado.innerHTML = `
    <h3 class="titulo-prod" style="text-align:center;">Estado del pedido</h3>
    <div style="margin-top:20px;line-height:2;">
      <p><strong>Código:</strong> ${pedidoActual.codigo}</p>
      <p><strong>Estado:</strong> ${pedidoActual.estado}</p>
      <p><strong>Fecha:</strong> ${pedidoActual.fecha}</p>
      <p><strong>Hora:</strong> ${pedidoActual.hora}</p>
      <p><strong>Total:</strong> $${pedidoActual.total.toFixed(2)}</p>
    </div>
    <hr style="margin:25px 0;">
    <h3>Productos</h3>
    <ul id="listaSeguimiento"></ul>
  `;

  const lista = document.getElementById("listaSeguimiento");

  pedidoActual.productos.forEach((producto) => {
    const li = document.createElement("li");
    li.style.marginBottom = "10px";
    li.innerHTML = `${producto.nombre} - <strong>$${producto.precio}</strong>`;
    lista.appendChild(li);
  });

  actualizarLineaTiempo();
}

function actualizarLineaTiempo() {
  const pasos = document.querySelectorAll(".paso-tech");
  if (!pasos.length) return;

  pasos.forEach((paso, index) => {
    paso.classList.remove("completado");
    paso.classList.remove("activo");

    if (index < pedidoActual.paso) {
      paso.classList.add("completado");
    } else if (index === pedidoActual.paso) {
      paso.classList.add("activo");
    }
  });
}

function avanzarEstado() {
  if (!pedidoActual) {
    return;
  }

  if (pedidoActual.paso >= 3) {
    return;
  }

  pedidoActual.paso++;

  switch (pedidoActual.paso) {
    case 1:
      pedidoActual.estado = "Preparando producto";
      break;
    case 2:
      pedidoActual.estado = "En camino";
      break;
    case 3:
      pedidoActual.estado = "Entregado";
      break;
  }

  guardarPedido();
}

document.addEventListener("DOMContentLoaded", () => {
  if (!pedidoActual) {
    return;
  }

  setInterval(() => {
    avanzarEstado();
  }, 60000);
});

/*====================================================
                PARTE 7: SISTEMA DE NOTIFICACIONES
====================================================*/

function crearContenedorNotificaciones() {
  let contenedor = document.getElementById("contenedorNotificaciones");
  if (contenedor) return;

  contenedor = document.createElement("div");
  contenedor.id = "contenedorNotificaciones";
  contenedor.style.position = "fixed";
  contenedor.style.top = "20px";
  contenedor.style.right = "20px";
  contenedor.style.zIndex = "99999";
  contenedor.style.display = "flex";
  contenedor.style.flexDirection = "column";
  contenedor.style.gap = "15px";

  document.body.appendChild(contenedor);
}

document.addEventListener("DOMContentLoaded", crearContenedorNotificaciones);

function mostrarNotificacion(mensaje, tipo = "info") {
  crearContenedorNotificaciones();

  const aviso = document.createElement("div");
  let color = "#2196F3";

  switch (tipo) {
    case "success":
      color = "#2E7D32";
      break;
    case "error":
      color = "#C62828";
      break;
    case "warning":
      color = "#F9A825";
      break;
  }

  aviso.style.background = color;
  aviso.style.color = "#fff";
  aviso.style.padding = "15px 20px";
  aviso.style.borderRadius = "10px";
  aviso.style.fontWeight = "600";
  aviso.style.boxShadow = "0 8px 18px rgba(0,0,0,.25)";
  aviso.style.opacity = "0";
  aviso.style.transform = "translateX(100px)";
  aviso.style.transition = ".4s";

  aviso.textContent = mensaje;

  document.getElementById("contenedorNotificaciones").appendChild(aviso);

  setTimeout(() => {
    aviso.style.opacity = "1";
    aviso.style.transform = "translateX(0)";
  }, 50);

  setTimeout(() => {
    aviso.style.opacity = "0";
    aviso.style.transform = "translateX(100px)";

    setTimeout(() => {
      aviso.remove();
    }, 400);
  }, 3500);
}

/*====================================================
                PARTE 8: SEGURIDAD Y OPTIMIZACIÓN
====================================================*/

function limpiarCarritoCorrupto() {
  if (!Array.isArray(carrito)) {
    carrito = [];
    guardarCarrito();
    return;
  }

  carrito = carrito.filter((producto) => {
    return producto && producto.nombre && typeof producto.precio === "number";
  });
  guardarCarrito();
}

function eliminarDuplicados() {
  const nombres = new Set();
  carrito = carrito.filter((producto) => {
    if (nombres.has(producto.nombre)) {
      return false;
    }
    nombres.add(producto.nombre);
    return true;
  });
  guardarCarrito();
}

function formatoPrecio(precio) {
  return "$" + precio.toFixed(2);
}

function obtenerTotal() {
  return carrito.reduce((total, producto) => {
    return total + producto.precio;
  }, 0);
}

function restaurarCarrito() {
  limpiarCarritoCorrupto();
  eliminarDuplicados();
  actualizarContador();

  if (typeof mostrarCarrito === "function") {
    mostrarCarrito();
  }
}

function verificarPedido() {
  if (!pedidoActual) {
    return;
  }

  if (!pedidoActual.codigo) {
    localStorage.removeItem("pedido");
    pedidoActual = null;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  restaurarCarrito();
  verificarPedido();
});

/*====================================================
                PARTE 9: BUSCADORES ORIGINALES
====================================================*/

// BUSCADOR SOLO CELULARES
document.addEventListener("DOMContentLoaded", () => {
  const buscador = document.querySelector(".buscador");
  const input = document.querySelector(".buscador input");
  const productos = document.querySelectorAll(".tarjeta-prod");

  if (!buscador || !input || productos.length === 0) {
    return;
  }

  buscador.addEventListener("submit", (e) => {
    e.preventDefault();

    const texto = input.value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    productos.forEach((producto) => {
      const nombre = producto
        .querySelector(".titulo-prod")
        .textContent.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      if (nombre.includes(texto)) {
        producto.style.display = "";
      } else {
        producto.style.display = "none";
      }
    });
  });
});

// BUSCADOR SOLO COMPUTADORAS
document.addEventListener("DOMContentLoaded", () => {
  const buscador = document.querySelector(".buscador");
  const input = document.querySelector(".buscador input");
  const productos = document.querySelectorAll(".tarjeta-prod");

  if (!buscador || !input || productos.length === 0) {
    return;
  }

  buscador.addEventListener("submit", (e) => {
    e.preventDefault();

    let texto = input.value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    productos.forEach((producto) => {
      let nombre = producto
        .querySelector(".titulo-prod")
        .textContent.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      if (nombre.includes(texto)) {
        producto.style.display = "";
      } else {
        producto.style.display = "none";
      }
    });
  });
});

// BUSCADOR form-busqueda #1
document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("form-busqueda");
  const input = document.getElementById("input-busqueda");

  if (formulario) {
    formulario.addEventListener("submit", (e) => {
      e.preventDefault();

      let busqueda = input.value.toLowerCase().trim();
      let productos = document.querySelectorAll(".tarjeta-prod");

      productos.forEach((producto) => {
        let nombre = producto
          .querySelector(".titulo-prod")
          .textContent.toLowerCase();

        if (nombre.includes(busqueda)) {
          producto.style.display = "block";
        } else {
          producto.style.display = "none";
        }
      });
    });
  }
});

// BUSCADOR DE PRODUCTOS #1
document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("form-busqueda");
  const input = document.getElementById("input-busqueda");
  const productos = document.querySelectorAll(".tarjeta-prod");

  if (formulario && input) {
    formulario.addEventListener("submit", (e) => {
      e.preventDefault();
      buscarProducto();
    });

    input.addEventListener("input", () => {
      buscarProducto();
    });
  }

  function buscarProducto() {
    let texto = input.value.toLowerCase().trim();
    let encontrados = 0;

    productos.forEach((producto) => {
      let nombre = producto
        .querySelector(".titulo-prod")
        .textContent.toLowerCase();
      let descripcion = producto
        .querySelector(".specs-prod")
        .textContent.toLowerCase();

      if (nombre.includes(texto) || descripcion.includes(texto)) {
        producto.style.display = "flex";
        encontrados++;
      } else {
        producto.style.display = "none";
      }
    });

    let mensaje = document.getElementById("mensajeBusqueda");
    if (!mensaje) {
      mensaje = document.createElement("p");
      mensaje.id = "mensajeBusqueda";
      document.querySelector("main").prepend(mensaje);
    }

    if (texto === "") {
      mensaje.textContent = "";
    } else if (encontrados === 0) {
      mensaje.textContent = "❌ No se encontraron productos";
    } else {
      mensaje.textContent = "✅ Productos encontrados: " + encontrados;
    }
  }
});

// BUSCADOR DE PRODUCTOS #2
const formularioBusqueda = document.getElementById("form-busqueda");
const inputBusqueda = document.getElementById("input-busqueda");

if (formularioBusqueda) {
  formularioBusqueda.addEventListener("submit", function (e) {
    e.preventDefault();
    buscarProductos();
  });
}

if (inputBusqueda) {
  inputBusqueda.addEventListener("input", buscarProductos);
}

function buscarProductos() {
  const texto = inputBusqueda.value.toLowerCase().trim();
  const productos = document.querySelectorAll(".tarjeta-prod");
  let encontrados = 0;

  productos.forEach((producto) => {
    const nombre = producto
      .querySelector(".titulo-prod")
      .textContent.toLowerCase();
    const descripcion = producto
      .querySelector(".specs-prod")
      .textContent.toLowerCase();

    if (nombre.includes(texto) || descripcion.includes(texto)) {
      producto.style.display = "flex";
      encontrados++;
    } else {
      producto.style.display = "none";
    }
  });

  let mensaje = document.getElementById("mensajeBusqueda");
  if (!mensaje) {
    mensaje = document.createElement("p");
    mensaje.id = "mensajeBusqueda";
    // Si .catalogo-main existe
    const catalogo = document.querySelector(".catalogo-main");
    if (catalogo) {
      catalogo.prepend(mensaje);
    }
  }

  if (texto !== "" && encontrados === 0) {
    if (mensaje) mensaje.textContent = "❌ No se encontraron productos";
  } else {
    if (mensaje) mensaje.textContent = "";
  }
}

// BUSCADOR PARA LA PÁGINA DE INICIO
document.addEventListener("DOMContentLoaded", () => {
  const formularioBusquedaInicio = document.getElementById("form-busqueda");
  const entradaBusquedaInicio = document.getElementById("entrada-busqueda");

  if (formularioBusquedaInicio && entradaBusquedaInicio) {
    formularioBusquedaInicio.addEventListener("submit", function (e) {
      e.preventDefault();

      let busqueda = entradaBusquedaInicio.value.toLowerCase().trim();

      if (busqueda === "") {
        alert("Por favor escribe una categoría para buscar.");
        return;
      }

      const celulares = [
        "celular",
        "celulares",
        "telefono",
        "telefonos",
        "iphone",
        "samsung",
        "android",
        "smartphone",
      ];
      if (celulares.some((palabra) => busqueda.includes(palabra))) {
        window.location.href = "celular.html";
        return;
      }

      const computadoras = [
        "computadora",
        "computadoras",
        "pc",
        "laptop",
        "laptops",
        "notebook",
        "asus",
        "lenovo",
        "hp",
        "dell",
        "acer",
      ];
      if (computadoras.some((palabra) => busqueda.includes(palabra))) {
        window.location.href = "computadora.html";
        return;
      }

      const audifonos = [
        "audifono",
        "audifonos",
        "auricular",
        "auriculares",
        "headset",
        "jbl",
        "logitech",
      ];
      if (audifonos.some((palabra) => busqueda.includes(palabra))) {
        window.location.href = "audifono.html";
        return;
      }

      const ofertas = [
        "oferta",
        "ofertas",
        "descuento",
        "promocion",
        "promociones",
        "rebaja",
      ];
      if (ofertas.some((palabra) => busqueda.includes(palabra))) {
        window.location.href = "ofertas.html";
        return;
      }

      alert(
        "No encontramos esa categoría. Puedes buscar:\n\n📱 Celulares\n💻 Computadoras\n🎧 Audífonos\n🔥 Ofertas",
      );
    });
  }
});
document.addEventListener("DOMContentLoaded", () => {
  // Seleccionamos el formulario y el input del buscador
  const formBusqueda = document.getElementById("form-busqueda");
  const inputBusqueda = document.getElementById("input-busqueda");

  // Verificamos que existan en la página actual para evitar errores
  if (formBusqueda && inputBusqueda) {
    formBusqueda.addEventListener("submit", (e) => {
      e.preventDefault(); // Evita que la página se recargue de golpe

      // Obtenemos lo que escribió el usuario, en minúsculas y sin espacios extra
      const termino = inputBusqueda.value.toLowerCase().trim();

      // Lógica para redirigir según la palabra clave
      if (
        termino.includes("celular") ||
        termino.includes("iphone") ||
        termino.includes("samsung")
      ) {
        window.location.href = "celulares.html"; // Cambia esto si tu archivo HTML se llama distinto
      } else if (
        termino.includes("laptop") ||
        termino.includes("computadora") ||
        termino.includes("pc")
      ) {
        window.location.href = "laptops.html"; // Cambia esto si tu archivo HTML se llama distinto
      } else if (
        termino.includes("audifono") ||
        termino.includes("auricular") ||
        termino.includes("diadema")
      ) {
        window.location.href = "audifonos.html"; // Cambia esto si tu archivo HTML se llama distinto
      } else if (
        termino.includes("oferta") ||
        termino.includes("descuento") ||
        termino.includes("barato")
      ) {
        window.location.href = "ofertas.html";
      } else {
        // Si escribe algo que no coincide con nada
        alert(
          'No encontramos una categoría exacta para: "' +
            termino +
            '". Intenta con celulares, laptops, audífonos u ofertas.',
        );
      }
    });
  }
});

function procesarPago() {
  // 1. Obtener los productos del carrito desde el localStorage (o la variable que uses)
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // 2. Validar si el carrito está vacío
  if (carrito.length === 0) {
    alert(
      "⚠️ Tu carrito está vacío. Agrega productos antes de realizar una compra.",
    );
    return; // Detiene la ejecución aquí para que NO procese el pago
  }

  // 3. Si SÍ hay productos, ocultar la vista de carrito/pago
  const seccionCarrito = document.getElementById("seccion-carrito-vista");
  if (seccionCarrito) {
    seccionCarrito.style.display = "none";
  }

  // 4. Mostrar la sección de confirmación exitosa
  const seccionExito = document.getElementById("seccion-exito");
  if (seccionExito) {
    seccionExito.style.display = "block";
  }

  // 5. Vaciar el carrito y reiniciar el contador
  localStorage.removeItem("carrito");
  const contadorCarrito = document.getElementById("contador-carrito");
  if (contadorCarrito) {
    contadorCarrito.textContent = "0";
  }
}
