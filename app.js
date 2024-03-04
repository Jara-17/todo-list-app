//* Variables y Constantes
const formContainer = document.querySelector("#form-container");
const inputBox = document.querySelector("#input-box");
const btnAdd = document.querySelector("#btn-add");
const listTasks = document.querySelector("#list-tasks");

//? Cramos un array de estilos para el li
let liStyles = [
  "flex",
  "justify-between",
  "items-center",
  "pr-2",
  "py-3",
  "pl-[50px]",
  "rounded-md",
  "shadow-lg",
  "border",
  "border-orange-400",
  "hover:-translate-y-2",
  "transition",
  "cursor-pointer",
  "text-sm",
  "select-none",
  "relative",
  "before:content-['']",
  "before:absolute",
  "before:h-7",
  "before:w-7",
  "before:rounded-[50%]",
  "before:bg-[url('/images/unchecked.png')]",
  "before:bg-cover",
  "before:bg-center",
  "before:top-3",
  "before:left-2",
];

//? Cramos un array de estilos para el botón
let btnStyles = [
  "border",
  "border-red-700",
  "bg-red-100",
  "text-red-700",
  "rounded-md",
  "px-2",
  "py-1",
  "font-semibold",
  "text-center",
  "hover:bg-red-400",
  "hover:text-white",
  "transition",
];

//* Eventos
document.addEventListener("DOMContentLoaded", eventsLoaded);

//* Funciones
function eventsLoaded() {
  //? Mostramos la información
  showTask();

  //? Mostramos mensaje en caso de que la lista este vacia
  updateEmptyState();

  //? Añadir las tareas
  btnAdd.addEventListener("click", addTask);

  //? Tachar tarea
  listTasks.addEventListener("click", checkTask, false);
}

/**
 ** Función para actualizar el estado de visualización del mensaje de lista vacía
 */
function updateEmptyState() {
  if (listTasks.children.length <= 0) {
    //? Si no hay elementos en la lista
    listTasks.innerHTML =
      '<p class="text-center py-4 text-gray-600">No hay tareas de momento</p>';
  } else {
    //? Si hay elementos en la lista, eliminar el mensaje
    let p = listTasks.querySelector("P");
    if (p) {
      p.remove();
    }
  }
}

/**
 ** Función para añadir una tarea
 */
function addTask() {
  //? Válidamos que el campo no este vacio
  if (inputBox.value === "") {
    preintAlert("Debe ingresar una tarea", "error");
    return;
  }

  //? Creamos el un li para la tarea
  let li = document.createElement("li");
  li.classList.add(...liStyles);

  //? Creamos un h3 para el texto de la tarea
  let h3 = document.createElement("h3");
  h3.classList.add("text-base", "font-semibold", "text-gray-600");
  h3.textContent = inputBox.value;

  //? Creamos un button para eliminar la tarea
  let button = document.createElement("button");
  button.textContent = "Eliminar";
  button.classList.add(...btnStyles);

  //? Añadimos el h3 al elemnto li
  li.appendChild(h3);

  //? Añadimos el botón al li
  li.appendChild(button);

  //? Añadimos el li a la lista de tareas
  listTasks.appendChild(li);

  //? Mostramos una alerta éxito
  preintAlert("La tarea se ha agregado correctamente!", "success");

  //? Limpiar el campo de entrada
  inputBox.value = "";

  //? borrar el mensaje
  updateEmptyState();

  //? Gruardar los datos
  saveData();
}

/**
 ** Función para imprimir alertas
 @param {*} msg El mensaje de la alerta
 @param {*} type El tipo de alerta
 */
function preintAlert(msg = "", type = "") {
  //? Crear el div
  const alert = document.createElement("p");
  alert.classList.add("text-center", "py-2", "border", "rounded-md", "my-2");

  //? Válidamos cual es el tipo
  type === "error"
    ? alert.classList.add("bg-red-200", "border-red-700", "text-red-700")
    : alert.classList.add("bg-green-200", "border-green-700", "text-green-700");

  //? Mensaje
  alert.textContent = msg;

  //? Insertar en el HTML
  document.querySelector("#container").insertBefore(alert, formContainer);

  //? Quitar la alerta del HTML
  setTimeout(() => {
    alert.remove();
  }, 3000);
}

/**
 ** Función para marcar la tarea
 */
function checkTask(e) {
  let li = e.target;
  let h3 = e.target.querySelector("h3");

  if (e.target.tagName === "LI") {
    //? Válidamos que el elemnto li tenga la imagen checked
    if (li.classList.contains("before:bg-[url('/images/checked.png')]")) {
      //? Removemos la imagen checked
      li.classList.remove("before:bg-[url('/images/checked.png')]");
      //? Añadimos la imagen unchecked
      li.classList.add("before:bg-[url('/images/unchecked.png')]");
    } else {
      //? Añdimos la imagen checked
      li.classList.add("before:bg-[url('/images/checked.png')]");
      //? Removemos la imagen unchecked
      li.classList.remove("before:bg-[url('/images/unchecked.png')]");
    }

    //? Tachamos el texto
    h3.classList.toggle("line-through");

    //? Guardamos los datos
    saveData();
  } else if (e.target.tagName === "BUTTON") {
    li.parentElement.remove();

    //? Guardamos los datos
    saveData();

    //? Agregamos el mensaje
    updateEmptyState();
  }
}

/**
 ** Función para guardar los datos
 */
function saveData() {
  localStorage.setItem("task", listTasks.innerHTML);
}

/**
 ** Función para mostrar los datos
 */
function showTask() {
  listTasks.innerHTML = localStorage.getItem("task");
}
