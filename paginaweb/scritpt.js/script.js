"use strict";

/*====================================================
        TECHNOLOGIC STORE
        SCRIPT PRINCIPAL
====================================================*/

//=========================================
// BASE DE DATOS DE PRODUCTOS
//=========================================

const PRODUCTOS = [
  {
    nombre: "iPhone 16",
    precio: 800,
  },

  {
    nombre: "iPhone 15 Pro",
    precio: 800,
  },

  {
    nombre: "iPhone 14 Pro",
    precio: 635,
  },

  {
    nombre: "iPhone 13 Pro",
    precio: 380,
  },

  {
    nombre: "iPhone 14 Plus",
    precio: 800,
  },

  {
    nombre: "iPhone 12 Pro",
    precio: 250,
  },

  {
    nombre: "Samsung Galaxy S24 Ultra",
    precio: 1000,
  },

  {
    nombre: "Samsung Galaxy S23 Ultra",
    precio: 850,
  },

  {
    nombre: "Samsung Galaxy S22 Ultra",
    precio: 650,
  },

  {
    nombre: "Samsung Galaxy S21 Ultra",
    precio: 450,
  },

  {
    nombre: "Infinix GT 20 Pro",
    precio: 375,
  },

  {
    nombre: "Infinix Hot 50 Pro",
    precio: 195,
  },

  {
    nombre: "Huawei MateBook D16",
    precio: 700,
  },

  {
    nombre: "ASUS Zenbook A14",
    precio: 1000,
  },

  {
    nombre: "Lenovo IdeaPad Slim 3",
    precio: 1339,
  },

  {
    nombre: "Dell Inspiron 14",
    precio: 1200,
  },

  {
    nombre: "HP Pavilion 14",
    precio: 1370,
  },

  {
    nombre: "Lenovo IdeaPad Flex 3",
    precio: 320,
  },

  {
    nombre: "ASUS Vivobook Go 15",
    precio: 585,
  },

  {
    nombre: "Acer Nitro V",
    precio: 1500,
  },

  {
    nombre: "Lenovo Legion LOQ",
    precio: 900,
  },

  {
    nombre: "ASUS TUF Gaming A15",
    precio: 1400,
  },

  {
    nombre: "HP Victus 16",
    precio: 859,
  },

  {
    nombre: "Acer Swift Go 14",
    precio: 700,
  },

  {
    nombre: "JBL Inalámbricos",
    precio: 40,
  },

  {
    nombre: "JBL Tune 525BT",
    precio: 39,
  },

  {
    nombre: "Audífonos Inalámbricos Pro",
    precio: 79,
  },

  {
    nombre: "Logitech",
    precio: 44.99,
  },

  {
    nombre: "Audífonos RGB",
    precio: 41.5,
  },

  {
    nombre: "Xtech",
    precio: 54.99,
  },

  {
    nombre: "EDIFIER",
    precio: 66.99,
  },

  {
    nombre: "Knowledge Zenith",
    precio: 59,
  },

  {
    nombre: "Festa Pro",
    precio: 42,
  },

  {
    nombre: "Audio-Technica",
    precio: 49.99,
  },

  {
    nombre: "Logitech G",
    precio: 39,
  },

  {
    nombre: "EIM",
    precio: 64.99,
  },
];

//=========================================
// CARGAR CARRITO
//=========================================

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

//=========================================
// PEDIDO ACTUAL
//=========================================

let pedidoActual = JSON.parse(localStorage.getItem("pedido")) || null;

//=========================================
// GUARDAR CARRITO
//=========================================

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

//=========================================
// GUARDAR PEDIDO
//=========================================

function guardarPedido() {
  localStorage.setItem("pedido", JSON.stringify(pedidoActual));
}

//=========================================
// BUSCAR PRODUCTO
//=========================================

function obtenerProducto(nombre) {
  return PRODUCTOS.find((producto) => producto.nombre === nombre);
}

//=========================================
// CONTADOR DEL CARRITO
//=========================================

function actualizarContador() {
  const contador = document.getElementById("contador-carrito");

  if (!contador) return;

  contador.textContent = carrito.length;
}

//=========================================
// ACTUALIZAR AL CARGAR
//=========================================

document.addEventListener("DOMContentLoaded", () => {
  actualizarContador();
});
/*====================================================
            PARTE 2
AGREGAR Y QUITAR PRODUCTOS DEL CARRITO
====================================================*/

//=========================================
// BUSCAR SI EL PRODUCTO YA EXISTE
//=========================================

function productoExiste(nombre) {
  return carrito.some((producto) => producto.nombre === nombre);
}

//=========================================
// AGREGAR AL CARRITO
//=========================================

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

//=========================================
// QUITAR PRODUCTO
//=========================================

function quitarDelCarrito(nombre) {
  carrito = carrito.filter((producto) => producto.nombre !== nombre);

  guardarCarrito();

  actualizarContador();

  actualizarBotones();

  animarContador();
}

//=========================================
// ACTUALIZAR BOTONES
//=========================================

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

//=========================================
// ANIMACIÓN CONTADOR
//=========================================

function animarContador() {
  const contador = document.getElementById("contador-carrito");

  if (!contador) return;

  contador.classList.remove("bump");

  void contador.offsetWidth;

  contador.classList.add("bump");
}

//=========================================
// AL CARGAR LA PÁGINA
//=========================================

document.addEventListener("DOMContentLoaded", () => {
  actualizarBotones();
});
/*====================================================
                PARTE 3
        CARRITO DE COMPRAS
====================================================*/

//=========================================
// MOSTRAR CARRITO
//=========================================

function mostrarCarrito() {
  const lista = document.getElementById("lista-carrito-detallada");

  const total = document.getElementById("total-pagar");

  if (!lista || !total) return;

  lista.innerHTML = "";

  let totalCompra = 0;

  //-----------------------------------------
  // CARRITO VACÍO
  //-----------------------------------------

  if (carrito.length === 0) {
    lista.innerHTML = `

<li style="
list-style:none;
padding:25px;
text-align:center;
font-size:18px;
font-weight:bold;
color:#666;
">

Tu carrito está vacío.

</li>

`;

    total.textContent = "0.00";

    return;
  }

  //-----------------------------------------
  // RECORRER PRODUCTOS
  //-----------------------------------------

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

<h3 style="margin-bottom:8px;">

${producto.nombre}

</h3>

<p>

Precio:
<strong>

$${producto.precio.toFixed(2)}

</strong>

</p>

</div>

<button
class="btn-carrito"
onclick="eliminarProducto(${index})">

❌ Eliminar

</button>

`;

    lista.appendChild(li);
  });

  //-----------------------------------------
  // TOTAL
  //-----------------------------------------

  total.textContent = totalCompra.toFixed(2);
}

//=========================================
// ELIMINAR PRODUCTO
//=========================================

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

//=========================================
// VACIAR CARRITO
//=========================================

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

//=========================================
// CALCULAR TOTAL
//=========================================

function calcularTotal() {
  let total = 0;

  carrito.forEach((producto) => {
    total += producto.precio;
  });

  return total;
}

//=========================================
// AL CARGAR LA PÁGINA
//=========================================

document.addEventListener("DOMContentLoaded", () => {
  mostrarCarrito();
});
/*====================================================
                PARTE 4
        VALIDACIÓN DEL FORMULARIO
====================================================*/

let pagoEnProceso = false;

//=========================================
// INICIALIZAR FORMULARIO
//=========================================

document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("form-pago");

  if (!formulario) return;

  const inputs = formulario.querySelectorAll("input");

  const nombre = inputs[0];
  const tarjeta = inputs[1];
  const fecha = inputs[2];
  const cvv = inputs[3];

  //-------------------------------
  // TARJETA
  //-------------------------------

  tarjeta.addEventListener("input", () => {
    let valor = tarjeta.value.replace(/\D/g, "");

    valor = valor.substring(0, 16);

    valor = valor.replace(/(.{4})/g, "$1 ").trim();

    tarjeta.value = valor;
  });

  //-------------------------------
  // FECHA
  //-------------------------------

  fecha.addEventListener("input", () => {
    let valor = fecha.value.replace(/\D/g, "");

    valor = valor.substring(0, 4);

    if (valor.length > 2) {
      valor = valor.substring(0, 2) + "/" + valor.substring(2);
    }

    fecha.value = valor;
  });

  //-------------------------------
  // CVV
  //-------------------------------

  cvv.addEventListener("input", () => {
    cvv.value = cvv.value.replace(/\D/g, "");
  });
});
//=========================================
// VALIDAR TARJETA
//=========================================

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
//=========================================
// VALIDAR FECHA
//=========================================

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
//=========================================
// VALIDAR FORMULARIO
//=========================================

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
//=========================================
// EVITAR DOBLE CLIC
//=========================================

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
                PARTE 5
        PROCESAR EL PAGO
====================================================*/

//=========================================
// GENERAR CÓDIGO ÚNICO
//=========================================

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

//=========================================
// FECHA ACTUAL
//=========================================

function obtenerFecha() {
  const hoy = new Date();

  return hoy.toLocaleDateString("es-SV");
}

//=========================================
// HORA ACTUAL
//=========================================

function obtenerHora() {
  const hoy = new Date();

  return hoy.toLocaleTimeString("es-SV");
}

//=========================================
// PROCESAR PAGO
//=========================================

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
//=========================================
// MOSTRAR PANTALLA DE ÉXITO
//=========================================

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
//=========================================
// RECUPERAR COMPRA EXITOSA
//=========================================

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
                PARTE 6
        SEGUIMIENTO DEL PEDIDO
====================================================*/

//=========================================
// BUSCAR PEDIDO
//=========================================

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

//=========================================
// MOSTRAR INFORMACIÓN
//=========================================

function mostrarSeguimiento() {
  const estado = document.querySelector(".panel-estado");

  if (!estado) return;

  estado.innerHTML = `

<h3 class="titulo-prod" style="text-align:center;">

Estado del pedido

</h3>

<div style="margin-top:20px;line-height:2;">

<p>

<strong>Código:</strong>

${pedidoActual.codigo}

</p>

<p>

<strong>Estado:</strong>

${pedidoActual.estado}

</p>

<p>

<strong>Fecha:</strong>

${pedidoActual.fecha}

</p>

<p>

<strong>Hora:</strong>

${pedidoActual.hora}

</p>

<p>

<strong>Total:</strong>

$${pedidoActual.total.toFixed(2)}

</p>

</div>

<hr style="margin:25px 0;">


<h3>

Productos

</h3>

<ul id="listaSeguimiento">

</ul>

`;

  const lista = document.getElementById("listaSeguimiento");

  pedidoActual.productos.forEach((producto) => {
    const li = document.createElement("li");

    li.style.marginBottom = "10px";

    li.innerHTML = `
${producto.nombre}
-
<strong>$${producto.precio}</strong>
`;

    lista.appendChild(li);
  });

  actualizarLineaTiempo();
}
//=========================================
// ACTUALIZAR LÍNEA DEL TIEMPO
//=========================================

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
//=========================================
// AVANZAR ESTADO
//=========================================

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
//=========================================
// ACTUALIZAR CADA MINUTO
//=========================================

document.addEventListener("DOMContentLoaded", () => {
  if (!pedidoActual) {
    return;
  }

  setInterval(() => {
    avanzEstado();
  }, 60000);
});
/*====================================================
                PARTE 7
        SISTEMA DE NOTIFICACIONES
====================================================*/

//=========================================
// CREAR CONTENEDOR
//=========================================

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

//=========================================
// MOSTRAR NOTIFICACIÓN
//=========================================

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
                PARTE 8
        BUSCADOR INTELIGENTE
====================================================*/

//=========================================
// INICIALIZAR BUSCADOR
//=========================================

document.addEventListener("DOMContentLoaded", () => {
  const buscador = document.querySelector(".buscador input");

  if (!buscador) return;

  buscador.addEventListener("input", buscarProductos);
});

//=========================================
// BUSCAR PRODUCTOS
//=========================================

function buscarProductos() {
  const buscador = document.querySelector(".buscador input");

  if (!buscador) return;

  const texto = buscador.value.toLowerCase().trim();

  const tarjetas = document.querySelectorAll(".tarjeta-prod");

  let encontrados = 0;

  tarjetas.forEach((tarjeta) => {
    const titulo = tarjeta.querySelector(".titulo-prod");

    if (!titulo) return;

    const nombre = titulo.textContent.toLowerCase();

    if (nombre.includes(texto)) {
      tarjeta.style.display = "flex";

      encontrados++;
    } else {
      tarjeta.style.display = "none";
    }
  });

  mostrarMensajeBusqueda(encontrados, texto);
}

//=========================================
// MENSAJE DE BÚSQUEDA
//=========================================

function mostrarMensajeBusqueda(total, texto) {
  let mensaje = document.getElementById("mensajeBusqueda");

  if (!mensaje) {
    mensaje = document.createElement("h3");

    mensaje.id = "mensajeBusqueda";

    mensaje.style.textAlign = "center";

    mensaje.style.margin = "25px";

    mensaje.style.color = "#444";

    const contenedor = document.querySelector("main");

    if (contenedor) {
      contenedor.prepend(mensaje);
    }
  }

  if (texto === "") {
    mensaje.textContent = "";

    return;
  }

  if (total === 0) {
    mensaje.textContent = "No se encontraron productos.";
  } else {
    mensaje.textContent = `${total} producto(s) encontrado(s).`;
  }
}
/*====================================================
                PARTE 9
      SEGURIDAD Y OPTIMIZACIÓN
====================================================*/

//=========================================
// LIMPIAR CARRITO CORRUPTO
//=========================================

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

//=========================================
// ELIMINAR DUPLICADOS
//=========================================

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

//=========================================
// FORMATO PRECIO
//=========================================

function formatoPrecio(precio) {
  return "$" + precio.toFixed(2);
}

//=========================================
// OBTENER TOTAL
//=========================================

function obtenerTotal() {
  return carrito.reduce((total, producto) => {
    return total + producto.precio;
  }, 0);
}

//=========================================
// RESTAURAR CARRITO
//=========================================

function restaurarCarrito() {
  limpiarCarritoCorrupto();

  eliminarDuplicados();

  actualizarContador();

  if (typeof mostrarCarrito === "function") {
    mostrarCarrito();
  }
}

//=========================================
// VERIFICAR PEDIDO
//=========================================

function verificarPedido() {
  if (!pedidoActual) {
    return;
  }

  if (!pedidoActual.codigo) {
    localStorage.removeItem("pedido");

    pedidoActual = null;
  }
}

//=========================================
// INICIAR SISTEMA
//=========================================

document.addEventListener("DOMContentLoaded", () => {
  restaurarCarrito();

  verificarPedido();
});
// ========================================================
// TECHNOLOGIC STORE - BÚSQUEDA Y REDIRECCIÓN COMPLETA
// ========================================================

document.addEventListener("DOMContentLoaded", () => {
  // Listas de palabras clave por categoría
  const palabrasOfertas = [
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

  const palabrasCelulares = [
    "celular",
    "celulares",
    "telefono",
    "telefonos",
    "movil",
    "moviles",
    "iphone",
    "apple",
    "13",
    "14",
    "15",
    "16",
    "pro",
    "max",
    "plus",
    "samsung",
    "galaxy",
    "s22",
    "s23",
    "s24",
    "ultra",
    "z",
    "fold",
    "flip",
    "infinix",
    "note",
    "gt",
    "xiaomi",
    "redmi",
    "poco",
    "huawei",
    "motorola",
    "oppo",
    "realme",
    "zte",
    "nubia",
  ];

  const palabrasComputadoras = [
    "computadora",
    "computadoras",
    "laptop",
    "laptops",
    "pc",
    "ordenador",
    "hp",
    "pavilion",
    "victus",
    "dell",
    "inspiron",
    "lenovo",
    "ideapad",
    "flex",
    "loq",
    "legion",
    "asus",
    "vivobook",
    "tuf",
    "gaming",
    "go",
    "zenbook",
    "acer",
    "nitro",
    "aspire",
    "macbook",
    "msi",
  ];

  const palabrasAudifonos = [
    "audifono",
    "audifonos",
    "auricular",
    "auriculares",
    "headset",
    "diadema",
    "inalambrico",
    "bluetooth",
    "airpods",
    "jbl",
    "tune",
    "flex",
    "wave",
    "logitech",
    "edifier",
    "xtech",
    "audio-technica",
    "festa",
    "culturefly",
    "pococat",
  ];

  const palabrasGenerales = [
    "celular",
    "celulares",
    "telefono",
    "telefonos",
    "movil",
    "moviles",
    "computadora",
    "computadoras",
    "laptop",
    "laptops",
    "pc",
    "audifono",
    "audifonos",
    "auricular",
    "auriculares",
    "headset",
    "oferta",
    "ofertas",
    "descuento",
    "descuentos",
    "promocion",
    "promociones",
  ];

  // Normalizar texto (minúsculas y sin acentos)
  function normalizarTexto(texto) {
    if (!texto) return "";
    return texto
      .toString()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  }

  // Determinar la página de destino basada en la búsqueda
  function obtenerPaginaDestino(terminoLimpio) {
    if (palabrasOfertas.some((p) => terminoLimpio.includes(p))) {
      return "ofertas.html";
    } else if (palabrasCelulares.some((p) => terminoLimpio.includes(p))) {
      return "celular.html";
    } else if (palabrasComputadoras.some((p) => terminoLimpio.includes(p))) {
      return "computadora.html";
    } else if (palabrasAudifonos.some((p) => terminoLimpio.includes(p))) {
      return "audifono.html";
    }
    return "ofertas.html"; // Si no coincide con ninguna lista específica, va a ofertas
  }

  // ------------------------------------------------------
  // 1. FUNCIÓN DE FILTRADO EN LA PÁGINA ACTUAL
  // ------------------------------------------------------
  function filtrarProductosPagina(termino) {
    const productos = document.querySelectorAll(".tarjeta-prod");
    const contenedorCatalogo = document.querySelector(".catalogo-main");
    let mensajeError = document.getElementById("sin-resultados");

    if (productos.length === 0) return 0;

    const terminoLimpio = normalizarTexto(termino);
    let encontrados = 0;

    if (palabrasGenerales.includes(terminoLimpio)) {
      productos.forEach((prod) => (prod.style.display = ""));
      encontrados = productos.length;
    } else {
      const palabrasBusqueda = terminoLimpio.split(/\s+/);

      productos.forEach((producto) => {
        const textoTarjeta = normalizarTexto(
          producto.innerText || producto.textContent,
        );
        const coincide = palabrasBusqueda.every((palabra) =>
          textoTarjeta.includes(palabra),
        );

        if (coincide) {
          producto.style.display = "";
          encontrados++;
        } else {
          producto.style.display = "none";
        }
      });
    }

    // Mostrar mensaje si no hay resultados
    if (encontrados === 0) {
      if (!mensajeError && contenedorCatalogo) {
        mensajeError = document.createElement("div");
        mensajeError.id = "sin-resultados";
        mensajeError.style.gridColumn = "1 / -1";
        mensajeError.style.textAlign = "center";
        mensajeError.style.padding = "40px 20px";
        mensajeError.style.fontSize = "1.2rem";
        mensajeError.style.fontWeight = "bold";
        mensajeError.style.color = "#555";
        mensajeError.innerHTML =
          "<p>Este producto no se encuentra disponible</p>";
        contenedorCatalogo.appendChild(mensajeError);
      } else if (mensajeError) {
        mensajeError.style.display = "block";
      }
    } else {
      if (mensajeError) {
        mensajeError.style.display = "none";
      }
    }

    return encontrados;
  }

  // ------------------------------------------------------
  // 2. EVENTO DEL FORMULARIO DE BÚSQUEDA
  // ------------------------------------------------------
  const formularioBusqueda = document.querySelector(".buscador");
  const inputBusqueda = formularioBusqueda
    ? formularioBusqueda.querySelector("input")
    : null;

  if (formularioBusqueda && inputBusqueda) {
    formularioBusqueda.addEventListener("submit", (e) => {
      e.preventDefault();

      const termino = inputBusqueda.value.trim();
      if (!termino) return;

      const terminoLimpio = normalizarTexto(termino);
      const paginaActual = window.location.pathname;

      const esInicio =
        paginaActual.endsWith("index.html") ||
        paginaActual.endsWith("/") ||
        paginaActual === "";

      if (esInicio) {
        const destino = obtenerPaginaDestino(terminoLimpio);
        window.location.href = `${destino}?buscar=${encodeURIComponent(termino)}`;
      } else {
        const encontradosAqui = filtrarProductosPagina(termino);

        // Si no está en la página actual y NO estamos en ofertas, intentamos ir a ofertas.html
        if (encontradosAqui === 0) {
          if (!paginaActual.includes("ofertas.html")) {
            window.location.href = `ofertas.html?buscar=${encodeURIComponent(termino)}`;
          }
        }
      }
    });
  }

  // ------------------------------------------------------
  // 3. APLICAR FILTRO AL CARGAR SI VIENE DE URL
  // ------------------------------------------------------
  const urlParams = new URLSearchParams(window.location.search);
  const terminoURL = urlParams.get("buscar");

  if (terminoURL) {
    if (inputBusqueda) {
      inputBusqueda.value = terminoURL;
    }
    filtrarProductosPagina(terminoURL);
  }
});
