# RefugioMascotas

Proyecto generado con [Angular CLI](https://github.com/angular/angular-cli) version 8.3.17, usando el framework Clarity para la parte visual. 

## Proyecto subido a GitHub Pages:

https://francomercado93.github.io/refugio-mascotas-itr/inicio

## Resumen:

Se trata de una aplicacion CRUD de mascotas. 
Algunos de los conceptos que usamos de Angular son:
*Routing
*Services
*Directivas de angular (*ngFor, *ngIF)
*Reutilizacion de componentes
*Observables
*Formularios reactivos

## Componentes:

### MascotasListarComponent

Se muestran todos las mascotas que existen en la base de datos (H2) presentando los datos con un datagrid de Clarity, el cual permite entre otras cosas ordenar las filas mediante algun criterio. Dentro de esta pantalla hay botones para crear, editar o eliminar una mascota.

### MascotasEditarComponent

Se utiliza el mismo componente para la creacion o modificacion de una mascota. Este componente siempre recibe un id de una mascota entonces se diferencian las acciones de alta o modificacion dependiendo si el id recibido es "new" o un id valido de alguna mascota. 
Este componente consta de un formulario reactivo con validaciones para cada campo y para todo el formulario en general.

### MascotasAdoptarComponent

En esta pantalla se muestran las mascotas que estan disponibles para adopcion. Se agrupan de acuerdo al tipo de animal.
Reutilizamos el componente MascotasCardComponent que es el componente que muestra los datos de la mascotas y tiene un boton para adoptar (el cual no funciona, solo nos redirige a una pagina que no existe).
El componente "padre" itera sobre la lista de animales con la  directiva *ngFor y el componente MascotasCardComponent lo recibe a usando el decorator @Input.

### MascotasNotFoundComponent

Es el componente que tiene la pagina de error que se redirige si no matchea el path ingresado manualmente con las rutas definidas en la constante routes.
