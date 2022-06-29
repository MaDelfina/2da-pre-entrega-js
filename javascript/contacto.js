let boton = document.getElementById("btnPrincipal")
boton.addEventListener("click", captura)
function captura() {
  let nombre = document.getElementById("nombre").value;
  let email = document.getElementById("email").value;
  let tel = document.getElementById("tel").value;
  let mensaje = document.getElementById("mensaje").value;
  console.log(nombre + " " + email + " " + tel + " " + mensaje)
}