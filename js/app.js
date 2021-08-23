// Variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

const resultado = document.querySelector('#resultado');

const maxYear = new Date().getFullYear();
const minYear = maxYear - 10;

// Objeto de datos buscados
const datosBusqueda = {
    marca:'',
    year:'',
    minimo:'',
    maximo:'',
    puertas:'',
    transmision:'',
    color:''
}

// Evento de arranque
document.addEventListener('DOMContentLoaded',mostrarAuto(autos)); // aca utilizo el arreglo autos del archivo db.js para que cargue todos los autos, y tmbn es necesario, un parametro porque la funcion mostrarAuto lleva un parametro del resultado de los filtros
// eventos de los select
marca.addEventListener('change',optionsMarca);
year.addEventListener('change',optionsYear);
minimo.addEventListener('change',optionsMinimo);
maximo.addEventListener('change',optionsMaximo);
puertas.addEventListener('change',optionsPuertas);
transmision.addEventListener('change',optionsTransmision);
color.addEventListener('change',optionsColor);
// Funciones

function mostrarAuto(arregloFiltrarAuto){ 
    limpiarHTML();
    arregloFiltrarAuto.forEach(auto =>{
        const {marca,modelo,year,precio,puertas,transmision,color} = auto;
        const parrafo = document.createElement('p');
        parrafo.innerHTML = `
        ${marca} ${modelo} - ${year} - PRECIO: $${precio} - PUERTAS: ${puertas} - TRANSMICION: ${transmision} - COLOR: ${color} 
        `
        resultado.appendChild(parrafo);
    })
    for(i = maxYear; i >= minYear; i--){
        const option = document.createElement('option');
        option.textContent = i;
        option.value = i;
        year.appendChild(option);

    }
}
function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
}

function optionsMarca(e){
    const valorOption = e.target.value;
    datosBusqueda.marca = valorOption;
    filtrarAuto();
}
function optionsYear(e){
    const valorOption = e.target.value;
    datosBusqueda.year = valorOption;
    filtrarAuto();
}
function optionsMinimo(e){
    const valorOption = e.target.value;
    datosBusqueda.minimo = valorOption;
    filtrarAuto();
}
function optionsMaximo(e){
    const valorOption = e.target.value;
    datosBusqueda.maximo = valorOption;
    filtrarAuto();
}
function optionsPuertas(e){
    const valorOption = e.target.value;
    datosBusqueda.puertas = valorOption;
    filtrarAuto();
}
function optionsTransmision(e){
    const valorOption = e.target.value;
    datosBusqueda.transmision = valorOption;
    filtrarAuto();
}
function optionsColor(e){
    const valorOption = e.target.value;
    datosBusqueda.color = valorOption;
    filtrarAuto();
    // console.log(datosBusqueda)
}
 function filtrarAuto(){
     const resultado =autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);
     if(resultado.length){ // esto sirve para saber si es o no un arreglo vacio
        mostrarAuto(resultado);

     } else{
        noHayResultados();
    }         
}
function noHayResultados(){
    limpiarHTML();
    const noHayResultados = document.createElement('div');
    noHayResultados.classList.add('error','alerta');
    noHayResultados.textContent = 'No Hay Resultados';
    resultado.appendChild(noHayResultados);
}
 function filtrarMarca(auto){
      const {marca} = datosBusqueda;
      if(marca){ // ASI CAPTURAS LOS UNDEFINED
          return auto.marca === marca;
      }
      return auto;
}
function filtrarYear(auto){
    const {year} = datosBusqueda;
    if(year){
        return auto.year === Number(year); // o parseInt(year)
    }
    return auto;
    
}
function filtrarMinimo(auto){
    const {minimo} = datosBusqueda;
    if(minimo){  
         return auto.precio >= Number(minimo);
    }
    return auto;
}
function filtrarMaximo(auto){
    const {maximo} = datosBusqueda;
    if(maximo){
        return auto.precio <= maximo;
    }
    return auto;
}
function filtrarPuertas(auto){
    const {puertas} = datosBusqueda;
    if(puertas){
        return auto.puertas === parseInt(puertas);
    }
    return auto;
}
function filtrarTransmision(auto){
    const {transmision} = datosBusqueda;
    if(transmision){
        return auto.transmision === transmision;
    }
    return auto;
}
function filtrarColor(auto){
    const {color} = datosBusqueda;
    if(color){
        return auto.color === color;
    }
    return auto;
}
console.log(datosBusqueda)