document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. EFECTO EN EL MENÚ DE NAVEGACIÓN (APROBADO)
  // ==========================================
  const navLinks = document.querySelectorAll("nav ul li a");

  navLinks.forEach((link) => {
    link.style.display = "inline-block";
    link.style.position = "relative";
    link.style.transition = "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)";

    const linea = document.createElement("span");
    linea.style.position = "absolute";
    linea.style.bottom = "-2px";
    linea.style.left = "0";
    linea.style.width = "0%";
    linea.style.height = "2px";
    linea.style.backgroundColor = "currentColor";
    linea.style.transition = "width 0.3s cubic-bezier(0.25, 1, 0.5, 1)";
    link.appendChild(linea);

    link.addEventListener("mouseenter", () => {
      link.style.transform = "translateY(-5px) scale(1.05)";
      linea.style.width = "100%";
    });

    link.addEventListener("mouseleave", () => {
      link.style.transform = "translateY(0px) scale(1)";
      linea.style.width = "0%";
    });
  });

  // ==========================================
  // 2. EFECTO DE ELEVACIÓN EN EL ICONO DEL CARRITO
  // ==========================================
  const carritoIcon = document.querySelector(".carrito a img");

  if (carritoIcon) {
    carritoIcon.style.transition =
      "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)";

    carritoIcon.addEventListener("mouseenter", () => {
      carritoIcon.style.transform = "translateY(-4px) scale(1.1)";
    });

    carritoIcon.addEventListener("mouseleave", () => {
      carritoIcon.style.transform = "translateY(0px) scale(1)";
    });
  }

  // ==========================================
  // 3. EFECTO DE ELEVACIÓN EN LOS BOTONES "ENTRAR"
  // ==========================================
  const btnsCategoria = document.querySelectorAll(".btn-categoria");

  btnsCategoria.forEach((btn) => {
    btn.style.transition = "transform 0.25s ease";
    btn.style.cursor = "pointer";

    btn.addEventListener("mouseenter", () => {
      btn.style.transform = "translateY(-4px) scale(1.05)";
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translateY(0px) scale(1)";
    });

    btn.addEventListener("mousedown", () => {
      btn.style.transform = "translateY(-1px) scale(1.02)";
    });

    btn.addEventListener("mouseup", () => {
      btn.style.transform = "translateY(-4px) scale(1.05)";
    });
  });

  // ==========================================
  // 4. IMÁGENES SIN EFECTOS (QUIETAS EN SU SITIO)
  // ==========================================
  // Se ha removido cualquier modificación para que las imágenes
  // se queden estáticas y naturales tal como las tienes en tu diseño base.
});



document.addEventListener('DOMContentLoaded', () => {
  const contadorElemento = document.getElementById('contador-carrito');
  const botonesAgregar = document.querySelectorAll('.btn-carrito');

  // Cargar lista de IDs guardados en el carrito desde localStorage
  let carrito = JSON.parse(localStorage.getItem('carritoProductos')) || [];

  // Función para actualizar la vista global
  function actualizarVista() {
    // 1. Actualizar el número total del contador
    contadorElemento.textContent = carrito.length;

    // 2. Actualizar el estado de cada botón en la página
    botonesAgregar.forEach(boton => {
      const productoId = boton.getAttribute('data-id');

      if (carrito.includes(productoId)) {
        // Si el producto ya está en el carrito
        boton.classList.add('agregado');
        boton.innerHTML = '<span class="icono-cart">❌</span> Quitar del carrito';
      } else {
        // Si el producto NO está en el carrito
        boton.classList.remove('agregado');
        boton.innerHTML = '<span class="icono-cart">🛒</span> Agregar al carrito';
      }
    });
  }

  // Escuchar eventos de clic en los botones
  botonesAgregar.forEach(boton => {
    boton.addEventListener('click', () => {
      const productoId = boton.getAttribute('data-id');

      if (!productoId) {
        console.error("Falta añadir el atributo data-id al botón HTML");
        return;
      }

      if (carrito.includes(productoId)) {
        // CANCELAR / QUITAR: Si ya estaba, lo eliminamos de la lista
        carrito = carrito.filter(id => id !== productoId);
      } else {
        // AGREGAR: Si no estaba, lo sumamos a la lista
        carrito.push(productoId);
      }

      // Guardar lista en localStorage y refrescar la pantalla
      localStorage.setItem('carritoProductos', JSON.stringify(carrito));
      actualizarVista();

      // Animación rápida al contador
      contadorElemento.classList.add('bump');
      setTimeout(() => contadorElemento.classList.remove('bump'), 200);
    });
  });

  // Inicializar al cargar la página
  actualizarVista();
});













