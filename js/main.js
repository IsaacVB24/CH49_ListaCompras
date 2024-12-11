const btnAgregar = get('btnAgregar');
const txtName = get('Name');
const txtNumber = get('Number');
const divAlertas = get('alertValidaciones');
const pAlertas = get('alertValidacionesTexto');
const tablaProductos = get('tablaProductos');
const cuerpoTabla = tablaProductos.getElementsByTagName('tbody').item(0);
// const cuerpoTabla = tablaProductos.querySelector('tbody');   // Trae lo mismo que la línea de arriba

let contador = 0;

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
        cuerpoTabla.insertAdjacentHTML('beforeend', row);
        txtName.value = '';
        txtNumber.value = '';
        txtName.focus();
    }
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