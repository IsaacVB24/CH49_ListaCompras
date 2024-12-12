const btnAgregar = get('btnAgregar');
const txtName = get('Name');
const txtNumber = get('Number');
const divAlertas = get('alertValidaciones');
const pAlertas = get('alertValidacionesTexto');
const tablaProductos = get('tablaProductos');
const cuerpoTabla = tablaProductos.getElementsByTagName('tbody').item(0);
// const cuerpoTabla = tablaProductos.querySelector('tbody');   // Trae lo mismo que la línea de arriba
const btnClear = get('btnClear');
const contadorProductos = get('contadorProductos');
const productosTotal = get('productosTotal');
const precioTotal = get('precioTotal');

let contador = 0;
let costoTotal = 0;
let totalEnProductos = 0;
let productos = [];

oreja(btnAgregar, 'click', (event) => {
    event.preventDefault();

    // Bandera para validar que los campos estén llenados correctamente
    let isValid = true;

    let valorName = txtName.value.trim();
    let valorNumber = txtNumber.value.trim();
    txtName.value = valorName;
    txtNumber.value = valorNumber;

    txtName.style.border = '';
    txtNumber.style.border = '';
    pAlertas.innerHTML = '';
    divAlertas.style.display = 'none';

    if(valorName.length < 3) {
        txtName.style.border = 'medium solid red';
        pAlertas.innerHTML = '<strong>Nombre del producto incorrecto.</strong>';
        divAlertas.style.display = 'block';
        isValid = false;
    }
    // alert(Number(valorNumber));
    if(!validarCantidad(valorNumber)) {
        txtNumber.style.border = 'medium solid red';
        pAlertas.insertAdjacentHTML('beforeend', '<br><br><strong>Cantidad de producto incorrecto.</strong>');
        divAlertas.style.display = 'block';
        isValid = false;
    }

    if(isValid) {
        contador++;
        const precio = getPrecio();
        const row = `
            <tr>
                <td>${contador}</td>
                <td>${valorName}</td>
                <td>${valorNumber}</td>
                <td>${precio}</td>
            </tr>
        `;
        let producto = {
            "contador": contador,
            'nombre': valorName,
            'cantidad': valorNumber,
            'precio': precio
        };
        productos.push(producto);
        localStorage.setItem('productos', JSON.stringify(productos));

        cuerpoTabla.insertAdjacentHTML('beforeend', row);

        costoTotal += precio * Number(txtNumber.value);
        precioTotal.innerText = `$ ${costoTotal.toFixed(2)}`;
        contadorProductos.innerText = contador;
        totalEnProductos += Number(txtNumber.value);
        productosTotal.innerText = totalEnProductos;

        localStorage.setItem('contador', contador);
        localStorage.setItem('totalEnProductos', totalEnProductos);
        localStorage.setItem('costoTotal', costoTotal.toFixed(2));

        txtName.value = '';
        txtNumber.value = '';
        txtName.focus();
    }
});

oreja(btnClear, 'click', (event) => {
    event.preventDefault();
    txtName.value = '';
    txtNumber.value = '';

    txtName.style.border = '';
    txtNumber.style.border = '';
    pAlertas.innerHTML = '';
    divAlertas.style.display = 'none';
    cuerpoTabla.innerHTML = '';
    contador = 0;
    totalEnProductos = 0;
    costoTotal = 0;
    precioTotal.innerText = `$ ${costoTotal}`;
    contadorProductos.innerText = contador;
    totalEnProductos += Number(txtNumber.value);
    productosTotal.innerText = totalEnProductos;

    localStorage.clear();
    txtName.focus();
});

window.addEventListener('load', (event) => {
    if(this.localStorage.getItem('costoTotal') != null) {
        costoTotal = Number(this.localStorage.getItem('costoTotal'));
    }
    if(this.localStorage.getItem('totalEnProductos') != null) {
        totalEnProductos = Number(localStorage.getItem('totalEnProductos'));
    }
    if(localStorage.getItem('contador') != null) {
        contador = Number(localStorage.getItem('contador'));
    }
    if(this.localStorage.getItem('productos') != null) {
        datos = JSON.parse(this.localStorage.getItem('productos'));
        datos.forEach((producto, index) => {
            cuerpoTabla.insertAdjacentHTML('beforeend', `
                <tr>
                    <td>${index+1}</td>
                    <td>${producto.nombre}</td>
                    <td>${producto.cantidad}</td>
                    <td>${producto.precio}</td>
                </tr>
            `);
        });
    }
    precioTotal.innerText = `$ ${costoTotal.toFixed(2)}`;
    contadorProductos.innerText = contador;
    productosTotal.innerText = totalEnProductos;
    // this.localStorage.clear();
});

function validarCantidad(valorInput) {
    /**
     * 1. length > 0
     * 2. Número
     * 3. valor > 0
     */
    if(valorInput.length <= 0 || isNaN(valorInput) || !(Number(valorInput) > 0)) return false;
    return true;
}
function getPrecio(){
    return Math.round(Math.random() * 10000) / 100;
}

function get(id) {
    return document.getElementById(id);
}
function oreja(elemento, evento, funcion) {
    elemento.addEventListener(evento, funcion);
}