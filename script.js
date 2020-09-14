const contenedor = document.querySelector('#contenedor');
const seccionBuscador = document.querySelector('#buscador');
const buscador = document.querySelector('#buscador-principal');
const opcionesDeBusquedaMostradas = document.querySelector('#busqueda__opciones');
const botonDeOpcionesDeBusqueda = document.querySelector('#opcion-resultado');
const formularioDeBusqueda = document.querySelector('#formulario-busqueda');
const botonBuscar = document.querySelector('#btn-buscar');
const seccionVolver = document.querySelectorAll('.volver');
const botonVolver = document.querySelector('#btn-volver');
const busquedaCiudad = document.querySelector('#busqueda-ciudad');
const sugerencia = document.querySelector('#sugerencia');
const mapid = document.querySelector('#mapid');
const resultados = document.querySelector('#resultados');
const botonProvincia = document.querySelectorAll('.btn-provincia');

const ciudades = [];
const partesDescripcion = [
	'alor',
	'aluros',
	'ubierto',
	'ieve',
	'evad',
	'lovizna',
	'luvi',
	'orment',
	'recipitaci',
	'ublad',
	'arcialmente nublad',
	'espejado',
	'iebla',
	'eblin',
];
const colorDescripcion = [
	'linear-gradient(45deg,rgb(255, 0, 0), rgb(245,245,245)',
	'linear-gradient(45deg,rgb(255, 0, 0), rgb(245,245,245)',
	'linear-gradient(45deg,rgb(47, 79, 79), rgb(245,245,245)',
	'linear-gradient(45deg,rgb(207, 207, 235), rgb(245,245,245)',
	'linear-gradient(45deg,rgb(207, 207, 235), rgb(245,245,245)',
	'linear-gradient(45deg,rgb(0, 0, 139), rgb(245,245,245)',
	'linear-gradient(45deg,rgb(0, 0, 139), rgb(245,245,245)',
	'linear-gradient(45deg,rgb(0, 0, 139), rgb(245,245,245)',
	'linear-gradient(45deg,rgb(0, 0, 139), rgb(245,245,245)',
	'linear-gradient(45deg,rgb(47, 79, 79), rgb(245,245,245)',
	'linear-gradient(45deg,rgb(173, 216, 230), rgb(197, 194, 194)',
	'linear-gradient(160deg, rgb(173, 216, 230), rgb(245,245,100)',
	'linear-gradient(45deg,rgb(169, 169, 169), rgb(245,245,245)',
	'linear-gradient(45deg,rgb(169, 169, 169), rgb(245,245,245)',
];
const iconoDescripcion = [
	'sun',
	'sun',
	'cloud',
	'snowflake',
	'snowflake',
	'cloud-showers-heavy',
	'cloud-showers-heavy',
	'cloud-showers-heavy',
	'cloud-showers-heavy',
	'cloud',
	'cloud-sun',
	'sun',
	'smog',
	'smog',
];

async function indicarClima() {
	let response = await fetch('https://ws.smn.gob.ar/map_items/weather');
	let climasDeLugares = response.json();
	return climasDeLugares;
}

indicarClima().then((resultado) => {
	console.log(resultado);
	ciudades.push(...resultado);
	// for (let i = 0; i < resultado.length; i++) {
	// 	const element = resultado[i];

	// 	let ciudad = document.createElement('div');
	// 	ciudad.setAttribute('class', 'contenedor-ciudad');

	// 	let descripcion = element.weather.description;
	// 	let icono;

	// 	for (let i = 0; i < partesDescripcion.length; i++) {
	// 		if (descripcion.includes(partesDescripcion[i])) {
	// 			ciudad.style.backgroundImage = colorDescripcion[i];
	// 			icono = `<i class="fas fa-${iconoDescripcion[i]} fa-3x"></i>`;
	// 		}
	// 	}

	// 	ciudad.innerHTML = `<h1 class="nombre-lugar">${element.name}</h1>
	// 	<h2 class="nombre-lugar">${element.province}</h2>
	// 	<h6 class="fecha">${moment().format('lll')}</h6>
	// 	<span class="icono">${icono}</span>
	// 	<h2 class="clima">${element.weather.description}</h2>
	// 	<p class="temperatura">${element.weather.temp}°</p>
	// 	<p class="humedad">${element.weather.humidity}% de humedad</p>
	// 	<p class="viento">Viento: ${element.weather.wind_speed} km/h</p>
	// 	<p class="presion">Presión: ${element.weather.pressure} hPa</p>`;

	// 	contenedor.appendChild(ciudad);
	// }
});

botonProvincia.forEach((result) => {
	result.addEventListener('click', function () {
		contenedor.innerHTML = '';
		for (let i = 0; i < ciudades.length; i++) {
			const element = ciudades[i];
			if (result.textContent == element.province) {
				let ciudad = document.createElement('div');
				ciudad.setAttribute('class', 'contenedor-ciudad');

				let descripcion = element.weather.description;
				let icono;

				for (let i = 0; i < partesDescripcion.length; i++) {
					if (descripcion.includes(partesDescripcion[i])) {
						ciudad.style.backgroundImage = colorDescripcion[i];
						icono = `<i class="fas fa-${iconoDescripcion[i]} fa-3x"></i>`;
					}
				}

				ciudad.innerHTML = `<h1 class="nombre-lugar">${element.name}</h1>
			<h2 class="nombre-lugar">${element.province}</h2>
			<h6 class="fecha">${moment().format('lll')}</h6>
			<span class="icono">${icono}</span>
			<h2 class="clima">${element.weather.description}</h2>
			<p class="temperatura">${element.weather.temp}°</p>
			<p class="humedad">${element.weather.humidity}% de humedad</p>
			<p class="viento">Viento: ${element.weather.wind_speed} km/h</p>
			<p class="presion">Presión: ${element.weather.pressure} hPa</p>`;

				contenedor.appendChild(ciudad);
			}
		}
	});
});

function sugerirResultados(busqueda) {
	let ciudad = ciudades.filter((lugar) => {
		const regex = new RegExp(busqueda, 'gi');
		let resultado = lugar.name.match(regex);
		return resultado;
	});
	return ciudad;
}

function mostrarResultados(e) {
	e.preventDefault();
	try {
		let resultado = sugerirResultados(buscador.value);
		if (resultado) {
			sugerencia.innerText = `${resultado[0].name}, ${resultado[0].province}`;
		}
		if (buscador.value != '') {
			opcionesDeBusquedaMostradas.classList.remove('oculto');
			botonBuscar.classList.remove('input-inactivo');
			botonBuscar.classList.add('input-activo');
		} else {
			opcionesDeBusquedaMostradas.classList.add('oculto');
			botonBuscar.classList.add('input-inactivo');
			botonBuscar.classList.remove('input-activo');
		}
	} catch (error) {
		console.log(error);
	}
}

buscador.addEventListener('input', mostrarResultados);

function buscarPorSugerencia(lugar) {
	let ciudad = ciudades.find((element) => element.name == lugar);
	console.log(ciudad);
	contenedor.classList.add('oculto');
	resultados.classList.remove('oculto');
	seccionVolver[0].classList.remove('oculto');
	opcionesDeBusquedaMostradas.classList.add('oculto');
	busquedaCiudad.innerHTML = '';

	let nuevaCiudad = document.createElement('div');
	nuevaCiudad.setAttribute('class', 'contenedor-ciudad-seleccionada');
	let descripcion = ciudad.weather.description;
	let icono;
	for (let i = 0; i < partesDescripcion.length; i++) {
		if (descripcion.includes(partesDescripcion[i])) {
			nuevaCiudad.style.backgroundImage = colorDescripcion[i];
			icono = `<i class="fas fa-${iconoDescripcion[i]} fa-3x"></i>`;
		}
	}
	nuevaCiudad.innerHTML = `<h1 class="nombre-lugar">${ciudad.name}</h1>
		<h2 class="nombre-lugar">${ciudad.province}</h2>
		<h6 class="fecha">${moment().format('lll')}</h6>
		<span class="icono">${icono}</span>
		<h2 class="clima">${ciudad.weather.description}</h2>
		<p class="temperatura">${ciudad.weather.temp}°</p>
		<p class="humedad">${ciudad.weather.humidity}% de humedad</p>
		<p class="viento">Viento: ${ciudad.weather.wind_speed} km/h</p>
		<p class="presion">Presión: ${ciudad.weather.pressure} hPa</p>`;

	busquedaCiudad.appendChild(nuevaCiudad);

	var mymap = L.map('mapid').setView([Number(ciudad.lat), Number(ciudad.lon)], 11);
	console.log(mymap);
	L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution:
			'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		maxZoom: 18,
	}).addTo(mymap);
}

function clickEnResultadoDeBusqueda(e) {
	e.preventDefault();
	buscador.value = sugerencia.textContent;
	buscarPorSugerencia(buscador.value.split(',')[0]);
}

sugerencia.addEventListener('click', clickEnResultadoDeBusqueda);

function clickEnBuscar(e) {
	e.preventDefault();
	if (buscador.value) {
		let [resultado] = sugerirResultados(buscador.value);
		console.log(resultado);
		contenedor.classList.add('oculto');
		resultados.classList.remove('oculto');
		seccionVolver[0].classList.remove('oculto');
		opcionesDeBusquedaMostradas.classList.add('oculto');

		let ciudad = document.createElement('div');
		ciudad.setAttribute('class', 'contenedor-ciudad-seleccionada');
		let descripcion = resultado.weather.description;
		let icono;
		for (let i = 0; i < partesDescripcion.length; i++) {
			if (descripcion.includes(partesDescripcion[i])) {
				ciudad.style.backgroundImage = colorDescripcion[i];
				icono = `<i class="fas fa-${iconoDescripcion[i]} fa-3x"></i>`;
			}
		}
		ciudad.innerHTML = `<h1 class="nombre-lugar">${resultado.name}</h1>
		<h2 class="nombre-lugar">${resultado.province}</h2>
		<h6 class="fecha">${moment().format('lll')}</h6>
		<span class="icono">${icono}</span>
		<h2 class="clima">${resultado.weather.description}</h2>
		<p class="temperatura">${resultado.weather.temp}°</p>
		<p class="humedad">${resultado.weather.humidity}% de humedad</p>
		<p class="viento">Viento: ${resultado.weather.wind_speed} km/h</p>
		<p class="presion">Presión: ${resultado.weather.pressure} hPa</p>`;

		var mymap = L.map('mapid').setView([Number(resultado.lat), Number(resultado.lon)], 13);
		console.log(mymap);
		L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution:
				'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
			maxZoom: 18,
		}).addTo(mymap);

		busquedaCiudad.appendChild(ciudad);
	}
}

botonBuscar.addEventListener('click', clickEnBuscar);

function volverAPaginaPrincipal() {
	location.reload();
}
botonVolver.addEventListener('click', volverAPaginaPrincipal);
