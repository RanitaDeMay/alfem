var formulario = document.getElementById('formulario-buscar');//formulario para get
var formularioPost = document.getElementById('formulario-insertar');//formulario para post
var divActualizar = document.querySelector('#actualizar-div');//DIV CONTENEDOR DEL FORMULARIO PUT
var divInsertar = document.querySelector('#insertar-div');//DIV CONTENEDOR DEL FORMULARIO PUT
var inputPost = document.querySelector('.postInput');

//BLOQUE PARA OBTENER TODO LOS DATOS
formulario.addEventListener('submit', function(e){
    e.preventDefault();
    //var valor = document.getElementById('valor-buscar').value;
    //console.log('valor:', valor);
    var url = 'http://localhost:3000/api/get';

    fetch(url)
    .then(response => response.json())
    .then(data => {
        // Obtener la referencia a la tabla
        var table = document.getElementById('tabla');
        var headerRow = table.rows[0];
        // Limpiar el contenido existente en la tabla
        while (table.rows.length > 1) {
          table.deleteRow(1);
        }

        // Recorrer los datos recibidos y generar las filas de la tabla
        data.forEach((item, index) => {
            // Crear una nueva fila en la tabla
            var row = table.insertRow();
          
            // Insertar las celdas con los datos correspondientes
            var cell1 = row.insertCell();
            cell1.textContent = index;
          
            var cell2 = row.insertCell();
            cell2.textContent = item.idarticulos;
          
            var cell3 = row.insertCell();
            cell3.textContent = item.nombreProveedor;
          
            var cell4 = row.insertCell();
            cell4.textContent = item.nombreProducto;
          
            var cell5 = row.insertCell();
            cell5.textContent = item.cantidad;
          
            var cell6 = row.insertCell();
            cell6.textContent = item.costo;
          
            var cell7 = row.insertCell(); // Celda para el botón "Actualizar"
            var updateButton = document.createElement('button');
            updateButton.textContent = 'Actualizar';
            updateButton.className = "boton-actualizar";
            updateButton.addEventListener('click', function() {
                inputPost.disabled = false;
                ///BLOQUE DE CÓDIGO PARA LA FUNCIONALIDAD DEL ACTUALIZAR
                //OBTENEMOS TODOS LOS ELEMENTOS DEL FORMULARIO PARA ACTUALIZAR
                var formularioPut = document.getElementById('formulario-actualizar');
                //OBTENEMOS TODOS LOS INPUT
                var proveedorInput = document.getElementById('proveedorActualizar');
                var productoInput = document.getElementById('productoActualizar');
                var cantidadInput = document.getElementById('cantidadActualizar');
                var precioInput = document.getElementById('precioActualizar');
                //OBTENER LOS VALORES DE LA FILA PARA PASARLOS EN VARIABLES
                var padre = updateButton.parentNode;
                var id = padre.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.innerHTML;
                var valorProveedor = padre.previousSibling.previousSibling.previousSibling.previousSibling.innerHTML;
                var valorProducto = padre.previousSibling.previousSibling.previousSibling.innerHTML;
                var valorCantidad = padre.previousSibling.previousSibling.innerHTML;
                var valorPrecio = padre.previousSibling.innerHTML;
                //MOSTRAMOS LOS VALORES
                console.log('Provedor:', valorProveedor);
                console.log('Producto:', valorProducto);
                console.log('Cantidad:', valorCantidad);
                console.log('Precio:', valorPrecio);
                //ASIGNAMOS LOS VALORES A LOS INPUTS
                proveedorInput.value = valorProveedor;
                productoInput.value = valorProducto;
                cantidadInput.value = valorCantidad;
                precioInput.value = valorPrecio;
                //BLOQUE PARA ACTUALIZAR

                formularioPut.addEventListener('submit', function(event){
                    event.preventDefault();

                    var proveedorInput = document.getElementById('proveedorActualizar');
                    var productoInput = document.getElementById('productoActualizar');
                    var cantidadInput = document.getElementById('cantidadActualizar');
                    var precioInput = document.getElementById('precioActualizar');

                    var proveedor = proveedorInput.value;
                    var producto = productoInput.value;
                    var cantidad = parseInt(cantidadInput.value);
                    var precio = parseFloat(precioInput.value);

                    var data = {
                        nombreProveedor: proveedor,
                        nombreProducto: producto,
                        cantidad: cantidad,
                        costo: precio
                    }
    
                    var url = 'http://localhost:3000/api/put/' + id;
      
                    fetch(url, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    })
                    .then(response => response.json())
                    .then(result => {
                        // Manejar la respuesta del backend, si es necesario
                        console.log('Resultado de la actualización:', result);
                        proveedorInput.value = "";
                        productoInput.value = "";
                        cantidadInput.value = "";
                        precioInput.value = "";
                        alert('Elemento actualizado con éxito');
                        formulario.dispatchEvent(new Event('submit'));
                        inputPost.disabled = false;
                    })
                    .catch(error => {
                        // Manejo de errores
                        console.error('Error:', error);
                    });
                })

            });

            cell7.appendChild(updateButton);
          
            var cell8 = row.insertCell(); // Celda para el botón "Eliminar"
            var deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.className = "boton-eliminar"
            deleteButton.addEventListener('click', function() {
                //PRIMERO DEBEMOS OBTENER EL ID PARA PASARLO A LA URL
                var padre = deleteButton.parentNode;
                var id = padre.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.innerHTML;
                
                // Construir la URL para la petición DELETE
                var url = 'http://localhost:3000/api/delete/' + id;

                // Realizar la petición DELETE
                fetch(url, {
                    method: 'DELETE'
                })
                .then(response => response.json())
                .then(result => {
                    // Manejar la respuesta del backend, si es necesario
                    console.log('Resultado de la eliminación:', result);
                    formulario.dispatchEvent(new Event('submit'));
                })
                .catch(error => {
                    // Manejo de errores
                    console.error('Error:', error);
                });

            });
            cell8.appendChild(deleteButton);
          });
    })
    .catch(error => {
        // Manejo de errores
        console.error('Error:', error);
  });
  table.insertRow(0).appendChild(headerRow);

});

//BLOQUE PARA INSERTAR UN DATO
formularioPost.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada
  
    var proveedorInput = document.getElementById('proveedor');
    var productoInput = document.getElementById('producto');
    var cantidadInput = document.getElementById('cantidad');
    var precioInput = document.getElementById('precio');
  
    var proveedor = proveedorInput.value;
    var producto = productoInput.value;
    var cantidad = parseInt(cantidadInput.value);
    var precio = parseFloat(precioInput.value);
  
    var data = {
      nombreProveedor: proveedor,
      nombreProducto: producto,
      cantidad: cantidad,
      costo: precio
    };
  
    var url = 'http://localhost:3000/api/post';
  
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        // Manejar la respuesta del backend, si es necesario
        console.log('Resultado de la inserción:', result);
        formulario.dispatchEvent(new Event('submit'));
      })
      .catch(error => {
        // Manejo de errores
        console.error('Error:', error);
      });
  });

///BLOQUE PARA EL DISEÑO O FRONT-END
const divInferior = document.querySelector('.seccion-inferior');
const divTabla = document.querySelector('#tabla-div');
const botonConsultarTodo = document.querySelector('.consult');
var formularioInsertar = document.querySelector('.insertar-div');
var formularioActualizar = document.querySelector('.actualizar-div');
var condicion = true;

botonConsultarTodo.addEventListener('click', () => {
    if(condicion){
    divInferior.style.backgroundColor = '#46685b'; // Cambiar el color de fondo a rojo
  
    // Obtener el tamaño del contenedor
    const containerWidth = divInferior.offsetWidth;
    const containerHeight = divInferior.offsetHeight;
  
    // Crear un elemento para la animación de barrido
    const animationElement = document.createElement('div');
    animationElement.style.position = 'absolute';
    animationElement.style.top = '30vh';
    animationElement.style.left = '0';
    animationElement.style.width = '0';
    animationElement.style.height = '70vh';
    animationElement.style.backgroundColor = '#46685b';
    animationElement.style.zIndex = '2';
    animationElement.style.transition = 'width 1s';
  
    // Agregar el elemento de animación al contenedor
    divInferior.appendChild(animationElement);
  
    // Animar el barrido horizontal
    setTimeout(() => {
      animationElement.style.width = `${containerWidth}px`;
      
    }, 100);

    setTimeout(()=>{
        formularioInsertar.style.visibility = 'visible';
        formularioActualizar.style.visibility = 'visible';
        divTabla.style.visibility = 'visible';
        
    }, 350)
  
    // Mostrar el alert después de que termine la animación

    // Restaurar el color de fondo original después de la animación
    setTimeout(() => {
        divInferior.removeChild(animationElement);
        condicion = !condicion;
    }, 1000);
}//SI LA CONDICIÓN ES VERDADERA HACE ESTO, SINO NO
  });