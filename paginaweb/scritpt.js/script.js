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
