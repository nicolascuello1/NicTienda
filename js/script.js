//SALUDO DE BIENVENIDA

var edad = parseInt(prompt("Queremos conocerte un poquito... ¿Cuantos años tenés?"));
if (edad < 18) {
    alert("Bienvenido niño gamer! :)");
}else if (edad < 41) {
    alert("Soltero vs Gamers? ;)");
}else {
    alert("Para viciar no hay edad! Una alegría tenerte en nuestra web! :D");
}


const listaProductos = document.querySelector('#lista-productos');
const tableCarrito = document.querySelector("#lista-carrito tbody");
const btnVaciarCarrito = document.querySelector('#vaciar-carrito');
let carrito = [];


listaProductos.addEventListener('click', agregarProducto);
tableCarrito.addEventListener('click', borrarProducto);
btnVaciarCarrito.addEventListener('click', vaciarCarrito);
document.addEventListener('DOMContentLoaded', () => {

	if (JSON.parse(localStorage.getItem('carrito'))) {
		carrito = JSON.parse(localStorage.getItem('carrito'));
		insertarCarritoHTML();
	}
});

function vaciarCarrito() {
	carrito = [];
	insertarCarritoHTML();
}


function borrarProducto(e) {
	e.preventDefault();

	if (e.target.classList.contains("borrar-producto")) {
		const productoSeleccionado = e.target.parentElement.parentElement;
		const productoId = e.target.getAttribute('data-id');

		productoSeleccionado.remove();

		
		carrito = carrito.filter(producto => producto.id !== productoId);

		
		guardarCarritoStorage();

	}
}

function agregarProducto(e) {
	e.preventDefault();

	if (e.target.classList.contains("agregar-carrito")) {
		const cardProducto = e.target.parentElement.parentElement;

		obtenerDatosProducto(cardProducto);
	}
}

function obtenerDatosProducto(cardProducto) {

	const productoAgregado = {
		imagen: cardProducto.querySelector('img').src,
		nombre: cardProducto.querySelector('h4').textContent,
		precio: cardProducto.querySelector('.precio').textContent,
		cantidad: 1,
		id: cardProducto.querySelector('a').getAttribute('data-id')
	};

	const existe = carrito.some(producto => producto.id === productoAgregado.id);

	if (existe) {
		const productos = carrito.map(producto => {
			if (producto.id === productoAgregado.id) {
				producto.cantidad++;
				producto.precio = `$${Number(productoAgregado.precio.slice(1)) * producto.cantidad}`
				// return producto;
			} else {
				// return producto;
			}
			return producto;
		});
		
		carrito = [...productos];
	} else {
		
		carrito = [...carrito, productoAgregado];
	}


	insertarCarritoHTML();
}

function insertarCarritoHTML() {

	borrarCarritoHTML();

	carrito.forEach(producto => {
		/* Destructuring de objetos */
		const { imagen, nombre, precio, cantidad, id } = producto;

		const row = document.createElement('tr');
		row.innerHTML = `
		<td>
			<img src="${imagen}" width='100%'>
		</td>
		<td>${nombre}</td>
		<td>${precio}</td>
		<td>${cantidad}</td>
		<td>
			<a href="#" class="borrar-producto" data-id="${id}">X</a>
		</td>
		`
		tableCarrito.appendChild(row);
	});
	guardarCarritoStorage();
}

function borrarCarritoHTML() {

	while (tableCarrito.firstChild) {
		tableCarrito.removeChild(tableCarrito.firstChild);
	}
}

function guardarCarritoStorage() {
	localStorage.setItem('carrito', JSON.stringify(carrito));
}

//TABLA DE DESCUENTOS

const productos = [{ id: 1, nombre: "FIFA 21", codigodescuento: "05AQRE56" },
    { id: 2, nombre: "NBA 2k21", codigodescuento: "78QUI6OL" },
    { id: 3, nombre: "Resident Evil VILLAGE", codigodescuento: "005AQF79" },
    { id: 4, nombre: "Call Of Duty WarZone", codigodescuento: "569QER5Q" },
    { id: 5, nombre: "Joystick PS5", codigodescuento: "5698ADFQ" }
];

let mi_tabla = document.createElement("table");
mi_tabla.setAttribute("class", "table table-dark");
let mi_tabla_body = document.createElement("tbody");

for (const producto of productos) {
    let mi_fila = document.createElement("tr");
    let mi_celda = document.createElement("td");
    mi_celda.innerText = producto.id;
    mi_fila.appendChild(mi_celda);
    let mi_celda2 = document.createElement("td");
    mi_celda2.innerText = producto.nombre;
    mi_fila.appendChild(mi_celda2);
    let mi_celda3 = document.createElement("td");
    mi_celda3.innerHTML = `<b> ${producto.codigodescuento}</b>`;
    mi_fila.appendChild(mi_celda3);
    mi_tabla_body.appendChild(mi_fila);
}

mi_tabla.appendChild(mi_tabla_body);
document.getElementById("tablaJuegos").appendChild(mi_tabla);

//Formulario de Contacto

const $form = document.querySelector('#form')
const $buttonMailto = document.querySelector('#almail')

$form.addEventListener('submit', handleSubmit)

function handleSubmit(event) {
	event.preventDefault()
	const form = new FormData(this)
	$buttonMailto.setAttribute('href', `mailto:nicolasgcuello@gmail.com?subject=${form.get('name')}${form.get('email')}&body=${form.get('message')}`)
	$buttonMailto.click()
}

