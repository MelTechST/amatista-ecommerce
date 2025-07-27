
document.addEventListener("DOMContentLoaded", () => {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const listaCarrito = document.getElementById("lista-carrito");
    const total = document.getElementById("total");
    const asideCarrito = document.getElementById("carrito");
    const btnToggleCarrito = document.getElementById("toggle-carrito");

    if (btnToggleCarrito) {
        btnToggleCarrito.addEventListener("click", () => {
            asideCarrito.classList.toggle("mostrar");
        });
    }

    // Función para agregar productos
    window.agregarAlCarrito = function (nombre, precio) {
        const index = carrito.findIndex(p => p.nombre === nombre);
        if (index !== -1) {
            carrito[index].cantidad += 1;
        } else {
            carrito.push({ nombre, precio, cantidad: 1 });
        }
        actualizarCarrito();
    }

    // Función para actualizar el HTML del carrito
    function actualizarCarrito() {
        listaCarrito.innerHTML = "";
        let totalGeneral = 0;

        carrito.forEach((item, index) => {
            const subtotal = item.precio * item.cantidad;
            totalGeneral += subtotal;

            const li = document.createElement("li");
            li.innerHTML = `
                ${item.nombre} - $${item.precio} x ${item.cantidad} = $${subtotal}
                <button onclick="cambiarCantidad(${index}, 1)">➕</button>
                <button onclick="cambiarCantidad(${index}, -1)">➖</button>
                <button onclick="eliminarProducto(${index})">❌</button>
            `;
            listaCarrito.appendChild(li);
        });

        total.textContent = totalGeneral;
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    // Cambiar cantidad
    window.cambiarCantidad = function (index, cambio) {
        carrito[index].cantidad += cambio;
        if (carrito[index].cantidad <= 0) {
            carrito.splice(index, 1);
        }
        actualizarCarrito();
    }

    // ELIMINAR UN PRODUCTO (DE ANERA >INDIVIDUAL<)
    window.eliminarProducto = function (index) {
        carrito.splice(index, 1);
        actualizarCarrito();
    }

    // BOTONES DEL CARRITO
    const contenedorBotones = document.createElement("div");
    contenedorBotones.classList.add("botones-carrito");
    asideCarrito.querySelector(".conteinerBarLat").appendChild(contenedorBotones);

    // VACIAR EL CARRITO
    const btnVaciar = document.createElement("button");
    btnVaciar.innerHTML= `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32" style="vertical-align:middle; margin-right:6px">
    <path fill="#ffffff" d="M26 20h-6v-2h6zm4 8h-6v-2h6zm-2-4h-6v-2h6z"/>
    <path fill="#ffffff" d="M17.003 20a4.9 4.9 0 0 0-2.404-4.173L22 3l-1.73-1l-7.577 13.126a5.7 5.7 0 0 0-5.243 1.503C3.706 20.24 3.996 28.682 4.01 29.04a1 1 0 0 0 1 .96h14.991a1 1 0 0 0 .6-1.8c-3.54-2.656-3.598-8.146-3.598-8.2m-5.073-3.003A3.11 3.11 0 0 1 15.004 20c0 .038.002.208.017.469l-5.9-2.624a3.8 3.8 0 0 1 2.809-.848M15.45 28A5.2 5.2 0 0 1 14 25h-2a6.5 6.5 0 0 0 .968 3h-2.223A16.6 16.6 0 0 1 10 24H8a17.3 17.3 0 0 0 .665 4H6c.031-1.836.29-5.892 1.803-8.553l7.533 3.35A13 13 0 0 0 17.596 28Z"/></svg> Vaciar`;
    btnVaciar.style.backgroundColor= "#6c2b92";
    btnVaciar.style.border = "none";
    btnVaciar.style.borderRadius = "12px";
    btnVaciar.style.cursor= "pointer";
    btnVaciar.style.color = "#fff";
    btnVaciar.style.padding = "10px 16px";
    btnVaciar.style.fontFamily = "Quicksand";
    btnVaciar.style.transition = "background-color 0.3s ease";
    btnVaciar.addEventListener("click", () => {
        carrito = [];
        actualizarCarrito();
    });
    contenedorBotones.appendChild(btnVaciar);

    //Prueba para que aparezca el cartelito si el usuario clickea fnalizar (prueba y error)
    function mostrarMensaje(texto) {
        const mensaje=document.createElement("div");
        mensaje.textContent= texto;
        mensaje.style.position="fixed";
        mensaje.style.top ="50%";
        mensaje.style.left= "50%";
        mensaje.style.transform = "translate(-50%, -50%)";
        mensaje.style.backgroundColor= "#5ebd32ff";
        mensaje.style.color = "white";
        mensaje.style.padding= "16px 28px";
        mensaje.style.borderRadius = "12px";
        mensaje.style.boxShadow="0 4px 20px rgba(0,0,0,0.3)";
        mensaje.style.zIndex="9999";
        mensaje.style.fontFamily= "Quicksand";
        mensaje.style.fontSize="1.1rem";
        mensaje.style.opacity = "1";
        mensaje.style.transition="opacity 0.3s ease";

        document.body.appendChild(mensaje);

        setTimeout(() => {
            mensaje.style.opacity = "0";
            setTimeout(() => {
                mensaje.remove();
            }, 300);
        }, 2000);
    }

    // Finalizar la compra del carrito
    const btnFinalizar = document.createElement("button");
    btnFinalizar.textContent = "Finalizar compra";
    btnFinalizar.style.backgroundColor = "rgba(221, 53, 47, 1)";
    btnFinalizar.style.border = "none";
    btnFinalizar.style.borderRadius = "12px";
    btnFinalizar.style.cursor = "pointer";
    btnFinalizar.style.color = "#fff";
    btnFinalizar.style.padding = "10px 16px";
    btnFinalizar.style.fontFamily = "Quicksand";
    btnFinalizar.style.transition = "background-color 0.3s ease";
    btnFinalizar.addEventListener("click", () => {
    if (carrito.length === 0) {
        mostrarMensaje("El carrito está vacío 😅");
        return;
    }
        carrito = [];
        actualizarCarrito();
        mostrarMensaje("¡Compra realizada con éxito!");
    });
    contenedorBotones.appendChild(btnFinalizar);
    actualizarCarrito();
});

// FORMULARIO (MENSAJITOS DE ALERTA)
document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formulario");
    const nombre = document.getElementById("nombre");
    const correo = document.getElementById("correo");
    const mensaje = document.getElementById("mensaje");
    const error = document.getElementById("error");

    formulario.addEventListener("submit", function (e) {
        let errores = [];

        if (nombre.value.trim() === "") {
            errores.push("El nombre es obligatorio.");
        }

        // Validación de correo usando expresión regular más completa
        const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        if (!regexCorreo.test(correo.value.trim())) {
            errores.push("El correo no es válido.");
        }

        if (mensaje.value.trim() === "") {
            errores.push("El mensaje no puede estar vacío.");
        }

        if (errores.length > 0) {
            e.preventDefault(); // Evita que se envíe el formulario
            error.innerHTML = errores.join("<br>");
        } else {
            error.innerHTML = "";
            alert("Formulario enviado correctamente ✅");
        }
    });
});



