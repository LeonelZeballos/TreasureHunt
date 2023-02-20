const mapa = document.getElementById("mapa")
const tesoro = document.getElementById("tesoro")
const cercania = document.getElementById("cercania")
const clicks = document.getElementById("clicks")
const body = document.querySelector("body")
const resetGameButton = document.getElementById("reset_game_button")
const anchoTesoro = tesoro.clientWidth
const altoTesoro = tesoro.clientHeight
const localizador = document.getElementById("localizador")
const tituloGanar = document.getElementById("win_container")
const blackScreen = document.getElementById("black_screen")
const winContainer = document.getElementById("win_container")
const winTittle = document.getElementById("win_tittle")
const HTMLbetterNumberClicks = document.getElementById("better_clicks_button")

let nClicks = 0
let win = false
let xCoord
let yCoord
let betterNumberClicks
let primeraPartida = true
let nuevoRecord = false

tesoro.ondragstart = function() {return false}

/*     ----- FUNCIONES -----      */

const generarTesoro = () => {
   let xRand = Math.floor(Math.random() * 381) // Coordenada x del tesoro
   let yRand = Math.floor(Math.random() * 381) // Coordenada y del tesoro

   tesoro.style.top = `${yRand}px` // Asignamos en el css la posicion del tesoro en el mapa
   tesoro.style.left = `${xRand}px`

   localizador.style.top = `${yRand + (altoTesoro / 2) + 2}px` // Asignamos en el css la posicion del localizador en el mapa SUMAMOS 2 por el border 
   localizador.style.left = `${xRand + (anchoTesoro / 2) + 2}px`
}

generarTesoro() // Primera generacion al cargar la página

const comprobarCercania = (x, y) => { // Comprobamos que tan cerca estamos del tesoro
   let tesoroCoord = localizador.getBoundingClientRect() // Obtemos todos los atributos del objeto incluyendo sus coordenadas en pantalla

   let difX = x - (tesoroCoord.x)
   let difY = y - (tesoroCoord.y)

   let distancia = Math.sqrt((difX ** 2) + (difY ** 2))

   if (distancia >= 155) {
      cercania.innerHTML = "CONGELADO"
      body.style.backgroundColor = "#2eb8ac"
   }

   else if (distancia < 170 && distancia >= 110) {
      cercania.innerHTML = "FRÍO"
      body.style.backgroundColor = "#79d6ce"
   }

   else if (distancia < 110 && distancia >= 50) {
      cercania.innerHTML = "TIBIO"
      body.style.backgroundColor = "#e6d839"
   }

   else if (distancia < 50) {
      cercania.innerHTML = "CALIENTE"
      body.style.backgroundColor = "#e84b2c"
   }

}

const sumarClicks = () => {
   nClicks++ // Solo sumar los clicks si no ha ganado
   clicks.innerHTML = `Clicks: ${nClicks}` // Actualizamos el HTML de los clicks
}

const resetearClicks = () => {
   nClicks = 0
   clicks.innerHTML = `Clicks: ${nClicks}` // Actualizamos el HTML de los clicks
}

const ocultarTituloGanar = () => {
   tituloGanar.style.display = "none"
}

const mostrarTituloGanar = () => {
   tituloGanar.style.display = "flex"
   if (nuevoRecord && primeraPartida === false) {
      winTittle.innerHTML = `¡GANASTE, ENCONTRASTE EL TESORO! <br> ¡NUEVO RECORD! Clicks: ${nClicks}`
   }
   else {
      winTittle.innerHTML = `¡GANASTE, ENCONTRASTE EL TESORO! <br> Clicks: ${nClicks}`
   }
   cercania.style.opacity = "0"
   clicks.style.opacity = "0"

   nuevoRecord = false // Reseteamos el nuevo record
}

const ocultarVentanaGanar = () => {
   winContainer.style.display = "none"
   cercania.style.opacity = "1"
   clicks.style.opacity = "1"
}

const actualizarMejoresClicks = () => {
   if (nClicks < betterNumberClicks) {
      nuevoRecord = true
      HTMLbetterNumberClicks.innerHTML = `Mejor Nro de Clicks: ${nClicks}`
   }
}

/*     ----- EVENTOS -----      */

mapa.onclick = () => {
   if (win === false) {
      comprobarCercania(xCoord, yCoord)
      sumarClicks()
   }
}

mapa.onmousemove = (event) => { // Movimiento sobre la imagen
   xCoord = event.clientX
   yCoord = event.clientY
}

tesoro.onclick = () => { // Evento al encontrar el tesoro
   if (win === false) {
      sumarClicks()
      //alert("TESORO ENCONTRADO")

      if (primeraPartida) {
         HTMLbetterNumberClicks.innerHTML = `Mejor Nro de Clicks: ${nClicks}`
      }

      cercania.innerHTML = "¡GANASTE, ENCONTRASTE EL TESORO!"
      tesoro.style.opacity = "1"
      actualizarMejoresClicks()
      mostrarTituloGanar()

      setTimeout(() => {
         ocultarVentanaGanar()
      }, 4000);

      betterNumberClicks = nClicks // Salvamos el anterior valor de menor número de clicks

      win = true
      primeraPartida = false
   }
}

resetGameButton.onclick = () => { // Resetear todos los valores y volver a jugar
   win = false // Decimo que el jugador aún no ha ganado
   ocultarTituloGanar()
   resetearClicks()
   generarTesoro()
   
   cercania.innerHTML = "¿QUE TAN CERCA ESTÁS?"
   tesoro.style.opacity = "0"
   body.style.backgroundColor = "#7cd164"
}

blackScreen.onclick = () => {
   ocultarVentanaGanar()
}
