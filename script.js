const botonesAgregar = document.querySelectorAll('.agregar');
const listaCarrito = document.getElementById('lista-carrito');
const botonVaciar = document.getElementById('vaciar');
const botonComprar = document.getElementById('comprar');
const contador = document.getElementById('contador');
const totalTexto = document.getElementById('total');

let carrito = [];

botonesAgregar.forEach(boton => {
  boton.addEventListener('click', (e) => {
    const productoElem = e.target.parentElement;
    const nombre = productoElem.querySelector('h3').textContent;
    const precioTexto = productoElem.querySelector('.precio').textContent.replace('$', '').replace('.', '').trim();
    const precio = parseFloat(precioTexto);
    agregarAlCarrito(nombre, precio);
  });
});

function agregarAlCarrito(nombre, precio) {
  const item = carrito.find(p => p.nombre === nombre);
  if (item) {
    item.cantidad++;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }
  actualizarCarrito();
}

function actualizarCarrito() {
  listaCarrito.innerHTML = '';
  carrito.forEach(p => {
    const li = document.createElement('li');
    li.textContent = `${p.nombre} x${p.cantidad} — $${(p.precio * p.cantidad).toLocaleString()}`;
    listaCarrito.appendChild(li);
  });

  const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  contador.textContent = `Productos en carrito: ${carrito.reduce((acc, p) => acc + p.cantidad, 0)}`;
  totalTexto.textContent = `Total: $${total.toLocaleString()}`;
}

botonVaciar.addEventListener('click', () => {
  if (carrito.length === 0) {
    alert('El carrito ya está vacío.');
    return;
  }
  if (confirm('¿Seguro que deseas vaciar el carrito?')) {
    carrito = [];
    actualizarCarrito();
  }
});

botonComprar.addEventListener('click', () => {
  if (carrito.length === 0) {
    alert('No hay productos en el carrito.');
  } else {
    alert('🎉 ¡Gracias por tu compra en La Ficha Perdida! 🧩');
    carrito = [];
    actualizarCarrito();
  }
});
