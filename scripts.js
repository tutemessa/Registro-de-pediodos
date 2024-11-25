// Función para seleccionar una empresa y redirigir a la página de pedidos
function selectEmpresa(empresa) {
    localStorage.setItem("empresaSeleccionada", empresa); // Guarda el nombre de la empresa seleccionada
    window.location.href = "pedidos.html"; // Redirige a pedidos.html
}

// Función principal para la página de pedidos
document.addEventListener("DOMContentLoaded", () => {
    const empresaSeleccionada = localStorage.getItem("empresaSeleccionada");

    // Si no hay empresa seleccionada, redirigir de vuelta a index.html
    if (!empresaSeleccionada) {
        window.location.href = "index.html";
        return;
    }

    // Actualizar el título de la página con la empresa seleccionada
    const titulo = document.getElementById("empresaSeleccionada");
    titulo.textContent = `Registrando pedidos para: ${empresaSeleccionada}`;

    // Función para actualizar la lista de pedidos
    const actualizarLista = () => {
        const pedidosGuardados = JSON.parse(localStorage.getItem(`pedidos_${empresaSeleccionada}`)) || [];
        const listaPedidos = document.getElementById("listaPedidos");
        listaPedidos.innerHTML = ""; // Limpiar la lista

        pedidosGuardados.forEach((pedido, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                Producto: ${pedido.producto}, Cantidad: ${pedido.cantidad}
                ${pedido.nombre ? `, Cliente: ${pedido.nombre}` : ""}
                ${pedido.telefono ? `, Teléfono: ${pedido.telefono}` : ""}
                <button onclick="eliminarPedido(${index})">Finalizar</button>
            `;
            listaPedidos.appendChild(li);
        });
    };

    // Inicializar la lista de pedidos
    actualizarLista();

    // Manejar el envío del formulario de nuevo pedido
    const formPedido = document.getElementById("formPedido");
    formPedido.addEventListener("submit", (e) => {
        e.preventDefault();

        const producto = document.getElementById("producto").value;
        const cantidad = document.getElementById("cantidad").value;
        const nombre = document.getElementById("nombre").value || null;
        const telefono = document.getElementById("telefono").value || null;

        const pedido = { producto, cantidad, nombre, telefono };
        const pedidosGuardados = JSON.parse(localStorage.getItem(`pedidos_${empresaSeleccionada}`)) || [];
        pedidosGuardados.push(pedido);
        localStorage.setItem(`pedidos_${empresaSeleccionada}`, JSON.stringify(pedidosGuardados));

        actualizarLista();
        formPedido.reset();
    });

    // Función para eliminar un pedido por su índice
    window.eliminarPedido = (index) => {
        const pedidosGuardados = JSON.parse(localStorage.getItem(`pedidos_${empresaSeleccionada}`)) || [];
        pedidosGuardados.splice(index, 1); // Eliminar el pedido en la posición index
        localStorage.setItem(`pedidos_${empresaSeleccionada}`, JSON.stringify(pedidosGuardados));
        actualizarLista();
    };
});

// Función para salir y regresar a la página de inicio
function salir() {
    localStorage.removeItem("empresaSeleccionada"); // Elimina la empresa seleccionada
    window.location.href = "index.html"; // Redirige a la página de bienvenida
}
