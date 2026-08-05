"use strict";

/*====================================================
        TECHNOLOGIC STORE - SCRIPT PRINCIPAL
====================================================*/

/*====================================================
  SECCIÓN 1: BASE DE DATOS DE PRODUCTOS
====================================================*/
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
  // PRODUCTOS EN OFERTA:
  { nombre: "Logitech (Oferta)", precio: 29.24 },
  { nombre: "Infinix GT 20 Pro (Oferta)", precio: 299.99 },
  { nombre: "Lenovo IdeaPad (Oferta)", precio: 250.0 },
  { nombre: "JBL Tune 525BT (Oferta)", precio: 25.0 },
];

/*====================================================
  SECCIÓN 2: ALMACENAMIENTO (LOCALSTORAGE) Y VARIABLES
====================================================*/
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

function productoExiste(nombre) {
  return carrito.some((producto) => producto.nombre === nombre);
}

/*====================================================
  SECCIÓN 3: GESTIÓN DEL CARRITO DE COMPRAS (MEJORADO)
====================================================*/
function actualizarContador() {
  const contador = document.getElementById("contador-carrito");
  if (!contador) return;
  const totalUnidades = carrito.reduce(
    (acc, prod) => acc + (prod.cantidad || 1),
    0,
  );
  contador.textContent = totalUnidades;
}

function animarContador() {
  const contador = document.getElementById("contador-carrito");
  if (!contador) return;

  contador.classList.remove("bump");
  void contador.offsetWidth;
  contador.classList.add("bump");
}

function agregarAlCarrito(nombre, precio) {
  let producto = obtenerProducto(nombre);

  if (!producto) {
    producto = { nombre: nombre, precio: Number(precio) || 0 };
  }

  const indiceExistente = carrito.findIndex((item) => item.nombre === nombre);

  if (indiceExistente !== -1) {
    carrito[indiceExistente].cantidad =
      (carrito[indiceExistente].cantidad || 1) + 1;
    mostrarNotificacion(`➕ Se sumó otra unidad de ${nombre}`, "info");
  } else {
    carrito.push({
      nombre: producto.nombre,
      precio: precio !== undefined ? Number(precio) : producto.precio,
      cantidad: 1,
    });
    mostrarNotificacion(`✅ ${nombre} agregado al carrito`, "success");
  }

  guardarCarrito();
  actualizarContador();
  actualizarBotones();
  mostrarCarrito();
  animarContador();
}

function cambiarCantidad(indice, cambio) {
  if (indice < 0 || indice >= carrito.length) return;

  const nuevaCantidad = (carrito[indice].cantidad || 1) + cambio;

  if (nuevaCantidad <= 0) {
    eliminarProducto(indice);
    return;
  }

  carrito[indice].cantidad = nuevaCantidad;
  guardarCarrito();
  actualizarContador();
  actualizarBotones();
  mostrarCarrito();
  animarContador();
}

function quitarDelCarrito(nombre) {
  carrito = carrito.filter((producto) => producto.nombre !== nombre);
  guardarCarrito();
  actualizarContador();
  actualizarBotones();
  mostrarCarrito();
  animarContador();
  mostrarNotificacion(`❌ ${nombre} quitado del carrito`, "warning");
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
      boton.innerHTML = "✔ En el carrito (Agregar +)";
      boton.classList.add("agregado");
    } else {
      boton.innerHTML = "🛒 Agregar al carrito";
      boton.classList.remove("agregado");
    }
  });
}

function mostrarCarrito() {
  const lista = document.getElementById("lista-carrito-detallada");
  const total = document.getElementById("total-pagar");

  if (!lista || !total) return;

  lista.innerHTML = "";

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
    const cantidad = producto.cantidad || 1;
    const subtotal = producto.precio * cantidad;

    const li = document.createElement("li");
    li.style.cssText =
      "list-style:none; margin-bottom:15px; padding:15px; border:1px solid #ddd; border-radius:10px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;";

    li.innerHTML = `
      <div style="flex:1; min-width:180px;">
        <h3 style="margin-bottom:5px; font-size:16px;">${producto.nombre}</h3>
        <p style="margin:0; font-size:14px; color:#555;">
          Precio unitario: <strong>$${producto.precio.toFixed(2)}</strong>
        </p>
        <p style="margin:5px 0 0 0; font-size:14px; color:#111;">
          Subtotal: <strong style="color:#2E7D32;">$${subtotal.toFixed(2)}</strong>
        </p>
      </div>

      <div style="display:flex; align-items:center; gap:8px;">
        <button onclick="cambiarCantidad(${index}, -1)" style="padding:4px 10px; font-weight:bold; cursor:pointer; border-radius:5px; border:1px solid #ccc;">−</button>
        <span style="font-weight:bold; min-width:24px; text-align:center;">${cantidad}</span>
        <button onclick="cambiarCantidad(${index}, 1)" style="padding:4px 10px; font-weight:bold; cursor:pointer; border-radius:5px; border:1px solid #ccc;">+</button>
      </div>

      <button class="btn-carrito" onclick="eliminarProducto(${index})" style="background:#C62828; color:#fff; border:none; padding:8px 12px; border-radius:6px; cursor:pointer;">
        ❌ Eliminar
      </button>
    `;

    lista.appendChild(li);
  });

  total.textContent = calcularTotal().toFixed(2);
}

function eliminarProducto(indice) {
  if (indice < 0 || indice >= carrito.length) return;

  const eliminado = carrito.splice(indice, 1)[0];
  guardarCarrito();
  actualizarContador();
  actualizarBotones();
  mostrarCarrito();
  animarContador();

  if (eliminado) {
    mostrarNotificacion(`❌ ${eliminado.nombre} eliminado`, "warning");
  }
}

function vaciarCarrito() {
  if (carrito.length === 0) return;

  if (confirm("¿Deseas vaciar el carrito?")) {
    carrito = [];
    guardarCarrito();
    actualizarContador();
    actualizarBotones();
    mostrarCarrito();
    mostrarNotificacion("🗑️ Carrito vaciado", "info");
  }
}

function calcularTotal() {
  return carrito.reduce(
    (suma, producto) => suma + producto.precio * (producto.cantidad || 1),
    0,
  );
}

/*====================================================
  SECCIÓN 4: VALIDACIÓN DEL FORMULARIO DE PAGO
====================================================*/
let pagoEnProceso = false;

function bloquearPago() {
  if (pagoEnProceso) return false;
  pagoEnProceso = true;
  return true;
}

function desbloquearPago() {
  pagoEnProceso = false;
}

function validarTarjeta(numero) {
  numero = numero.replace(/\s/g, "");
  if (numero.length !== 16) return false;

  let suma = 0;
  let alternar = false;

  for (let i = numero.length - 1; i >= 0; i--) {
    let n = parseInt(numero.charAt(i), 10);

    if (alternar) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    suma += n;
    alternar = !alternar;
  }

  return suma % 10 === 0;
}

function validarFecha(fecha) {
  const partes = fecha.split("/");
  if (partes.length !== 2) return false;

  const mes = parseInt(partes[0], 10);
  const anio = parseInt("20" + partes[1], 10);

  if (mes < 1 || mes > 12) return false;

  const hoy = new Date();
  const actualMes = hoy.getMonth() + 1;
  const actualAnio = hoy.getFullYear();

  if (anio < actualAnio) return false;
  if (anio === actualAnio && mes < actualMes) return false;

  return true;
}

function validarFormulario() {
  const formulario = document.getElementById("form-pago");
  if (!formulario) return false;

  const inputs = formulario.querySelectorAll("input");

  const nombre = inputs[0]?.value.trim() || "";
  const tarjeta = inputs[1]?.value.trim() || "";
  const fecha = inputs[2]?.value.trim() || "";
  const cvv = inputs[3]?.value.trim() || "";
  const direccion = inputs[4]?.value.trim() || "";

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

/*====================================================
  SECCIÓN 5: PROCESAR PAGO Y GENERACIÓN DE PEDIDO
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
  return new Date().toLocaleDateString("es-SV");
}

function obtenerHora() {
  return new Date().toLocaleTimeString("es-SV");
}

function procesarPagoYGenerarCodigo() {
  if (!bloquearPago()) return;

  if (carrito.length === 0) {
    alert(
      "⚠️ Tu carrito está vacío. Agrega productos antes de realizar una compra.",
    );
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
    paso: 0,
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
  mostrarNotificacion("📦 Pedido recibido con éxito", "success");
  desbloquearPago();
}

function mostrarPantallaExito(codigo) {
  const compra = document.getElementById("seccion-carrito-vista");
  const exito = document.getElementById("seccion-exito");
  const codigoHTML = document.getElementById("codigo-generado");

  if (compra) compra.style.display = "none";
  if (exito) exito.style.display = "block";
  if (codigoHTML) codigoHTML.textContent = codigo;

  window.scrollTo({ top: 0, behavior: "smooth" });
}

/*====================================================
  SECCIÓN 6: SEGUIMIENTO DEL PEDIDO (CON NOTIFICACIONES)
====================================================*/
function buscarPedido() {
  const caja = document.getElementById("numeroPedido");
  if (!caja) return;

  const codigo = caja.value.trim().toUpperCase();

  if (!pedidoActual) {
    alert("No existe ningún pedido en el sistema.");
    return;
  }

  if (codigo !== pedidoActual.codigo) {
    alert("Código de rastreo incorrecto.");
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
      <p><strong>Estado actual:</strong> <span style="color:#2196F3; font-weight:bold;">${pedidoActual.estado}</span></p>
      <p><strong>Fecha:</strong> ${pedidoActual.fecha}</p>
      <p><strong>Hora:</strong> ${pedidoActual.hora}</p>
      <p><strong>Total pagado:</strong> $${pedidoActual.total.toFixed(2)}</p>
    </div>
    <hr style="margin:25px 0;">
    <h3>Productos comprados</h3>
    <ul id="listaSeguimiento"></ul>
  `;

  const lista = document.getElementById("listaSeguimiento");

  pedidoActual.productos.forEach((producto) => {
    const cantidad = producto.cantidad || 1;
    const subtotal = producto.precio * cantidad;
    const li = document.createElement("li");
    li.style.marginBottom = "10px";
    li.innerHTML = `${producto.nombre} (x${cantidad}) - <strong>$${subtotal.toFixed(2)}</strong>`;
    lista.appendChild(li);
  });

  actualizarLineaTiempo();
}

function actualizarLineaTiempo() {
  const pasos = document.querySelectorAll(".paso-tech");
  if (!pasos.length || !pedidoActual) return;

  pasos.forEach((paso, index) => {
    paso.classList.remove("completado", "activo");

    if (index < pedidoActual.paso) {
      paso.classList.add("completado");
    } else if (index === pedidoActual.paso) {
      paso.classList.add("activo");
    }
  });
}

function meAvanzarEstado() {
  if (!pedidoActual || pedidoActual.paso >= 3) return;

  pedidoActual.paso++;
  let mensajeNotificacion = "";

  switch (pedidoActual.paso) {
    case 1:
      pedidoActual.estado = "Preparando pedido";
      mensajeNotificacion = "🔧 Preparando pedido";
      break;
    case 2:
      pedidoActual.estado = "En camino";
      mensajeNotificacion = "🚚 En camino";
      break;
    case 3:
      pedidoActual.estado = "Entregado";
      mensajeNotificacion = "✅ Entregado";
      break;
  }

  guardarPedido();
  actualizarLineaTiempo();

  if (document.querySelector(".panel-estado")) {
    mostrarSeguimiento();
  }

  if (mensajeNotificacion) {
    mostrarNotificacion(mensajeNotificacion, "info");
  }
}

/*====================================================
  SECCIÓN 7: SISTEMA DE NOTIFICACIONES FLOTANTES
====================================================*/
function crearContenedorNotificaciones() {
  let contenedor = document.getElementById("contenedorNotificaciones");
  if (contenedor) return contenedor;

  contenedor = document.createElement("div");
  contenedor.id = "contenedorNotificaciones";
  contenedor.style.cssText =
    "position:fixed; top:20px; right:20px; z-index:99999; display:flex; flex-direction:column; gap:12px; pointer-events:none;";

  document.body.appendChild(contenedor);
  return contenedor;
}

function mostrarNotificacion(mensaje, tipo = "info") {
  const contenedor = crearContenedorNotificaciones();
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

  aviso.style.cssText = `background:${color}; color:#fff; padding:14px 20px; border-radius:10px; font-weight:600; box-shadow:0 8px 18px rgba(0,0,0,.25); opacity:0; transform:translateX(100px); transition:.4s; pointer-events:auto; font-family:sans-serif;`;
  aviso.textContent = mensaje;

  contenedor.appendChild(aviso);

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
  SECCIÓN 8: SEGURIDAD Y LIMPIEZA DE DATOS
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
  const mapaNombres = new Map();

  carrito.forEach((prod) => {
    if (mapaNombres.has(prod.nombre)) {
      const existente = mapaNombres.get(prod.nombre);
      existente.cantidad = (existente.cantidad || 1) + (prod.cantidad || 1);
    } else {
      mapaNombres.set(prod.nombre, { ...prod, cantidad: prod.cantidad || 1 });
    }
  });

  carrito = Array.from(mapaNombres.values());
  guardarCarrito();
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
  if (!pedidoActual) return;

  if (!pedidoActual.codigo) {
    localStorage.removeItem("pedido");
    pedidoActual = null;
  }
}

/*====================================================
  SECCIÓN 9: SISTEMA DE BÚSQUEDA AVANZADO Y REDIRECCIÓN
====================================================*/
function normalizarTexto(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function inicializarBuscador() {
  const formBusqueda =
    document.getElementById("form-busqueda") ||
    document.querySelector(".buscador");
  const inputBusqueda =
    document.getElementById("input-busqueda") ||
    document.getElementById("entrada-busqueda") ||
    document.querySelector(".buscador input");

  if (!formBusqueda || !inputBusqueda) return;

  const productosPagina = document.querySelectorAll(".tarjeta-prod");

  // CASO A: Filtro en tiempo real para catálogos
  if (productosPagina.length > 0) {
    const realizarBusqueda = () => {
      const texto = normalizarTexto(inputBusqueda.value);
      let encontrados = 0;

      productosPagina.forEach((producto) => {
        const nombre = normalizarTexto(
          producto.querySelector(".titulo-prod")?.textContent || "",
        );
        const specs = normalizarTexto(
          producto.querySelector(".specs-prod")?.textContent || "",
        );

        if (texto === "" || nombre.includes(texto) || specs.includes(texto)) {
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
        mensaje.style.cssText =
          "font-weight:bold; margin:15px 0; text-align:center; font-size:16px;";
        const contenedorPadre =
          document.querySelector(".catalogo-main") ||
          document.querySelector("main");
        if (contenedorPadre) contenedorPadre.prepend(mensaje);
      }

      if (texto === "") {
        mensaje.textContent = "";
      } else if (encontrados === 0) {
        mensaje.textContent = `❌ No se encontraron productos para "${inputBusqueda.value}"`;
        mensaje.style.color = "#C62828";
      } else {
        mensaje.textContent = `✅ Productos encontrados: ${encontrados}`;
        mensaje.style.color = "#2E7D32";
      }
    };

    inputBusqueda.addEventListener("input", realizarBusqueda);
    formBusqueda.addEventListener("submit", (e) => {
      e.preventDefault();
      realizarBusqueda();
    });
  }
  // CASO B: Redirección inteligente para la página de inicio
  else {
    formBusqueda.addEventListener("submit", (e) => {
      e.preventDefault();
      const busqueda = normalizarTexto(inputBusqueda.value);

      if (busqueda === "") {
        alert("Por favor escribe un producto, marca o categoría para buscar.");
        return;
      }

      const CELULARES = [
        "celular",
        "celulares",
        "telefono",
        "telefonos",
        "iphone",
        "samsung",
        "infinix",
        "android",
        "smartphone",
      ];
      const LAPTOPS = [
        "laptop",
        "laptops",
        "computadora",
        "computadoras",
        "pc",
        "notebook",
        "asus",
        "lenovo",
        "hp",
        "dell",
        "acer",
        "huawei",
        "matebook",
        "zenbook",
        "ideapad",
        "inspiron",
        "pavilion",
        "vivobook",
        "nitro",
        "legion",
        "loq",
        "tuf",
        "victus",
        "swift",
      ];
      const AUDIFONOS = [
        "audifono",
        "audifonos",
        "auricular",
        "auriculares",
        "headset",
        "diadema",
        "jbl",
        "logitech",
        "edifier",
        "xtech",
        "audio-technica",
        "audiotechnica",
        "knowledge zenith",
        "kz",
        "festa",
      ];
      const OFERTAS = [
        "oferta",
        "ofertas",
        "descuento",
        "descuentos",
        "promocion",
        "promociones",
        "rebaja",
        "rebajas",
        "barato",
      ];

      if (CELULARES.some((kw) => busqueda.includes(kw))) {
        window.location.href = "celular.html";
      } else if (LAPTOPS.some((kw) => busqueda.includes(kw))) {
        window.location.href = "computadora.html";
      } else if (AUDIFONOS.some((kw) => busqueda.includes(kw))) {
        window.location.href = "audifono.html";
      } else if (OFERTAS.some((kw) => busqueda.includes(kw))) {
        window.location.href = "ofertas.html";
      } else {
        alert(
          `No encontramos una categoría exacta para "${inputBusqueda.value}".\n\nPuedes intentar buscar:\n📱 Celulares (iPhone, Samsung, Infinix)\n💻 Laptops (ASUS, Lenovo, HP, Dell, Acer, Huawei)\n🎧 Audífonos (JBL, Logitech, EDIFIER, Audio-Technica)\n🔥 Ofertas`,
        );
      }
    });
  }
}

/*====================================================
  SECCIÓN 10: INICIALIZACIÓN DE EVENTOS (DOM)
====================================================*/
document.addEventListener("DOMContentLoaded", () => {
  restaurarCarrito();
  verificarPedido();

  actualizarContador();
  actualizarBotones();
  mostrarCarrito();
  crearContenedorNotificaciones();

  inicializarBuscador();

  const formulario = document.getElementById("form-pago");
  if (formulario) {
    const inputs = formulario.querySelectorAll("input");
    const tarjeta = inputs[1];
    const fecha = inputs[2];
    const cvv = inputs[3];

    if (tarjeta) {
      tarjeta.addEventListener("input", () => {
        let valor = tarjeta.value.replace(/\D/g, "").substring(0, 16);
        tarjeta.value = valor.replace(/(.{4})/g, "$1 ").trim();
      });
    }

    if (fecha) {
      fecha.addEventListener("input", () => {
        let valor = fecha.value.replace(/\D/g, "").substring(0, 4);
        if (valor.length > 2) {
          valor = valor.substring(0, 2) + "/" + valor.substring(2);
        }
        fecha.value = valor;
      });
    }

    if (cvv) {
      cvv.addEventListener("input", () => {
        cvv.value = cvv.value.replace(/\D/g, "").substring(0, 4);
      });
    }
  }

  if (pedidoActual) {
    const codigoHTML = document.getElementById("codigo-generado");
    if (codigoHTML) {
      codigoHTML.textContent = pedidoActual.codigo;
    }

    setInterval(() => {
      meAvanzarEstado();
    }, 60000);
  }
});
