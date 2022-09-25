//Selectores
let palabras = ["ALURA", "ORACLE", "ONE", "JAVASCRIPT", "HTML", "CSS"];
let tablero = document.getElementById("forca").getContext("2d");
let palabraSecreta = "";
let palabraEncontrada = "";
let letras = [];
let numeroDeErrores = 8;
let errores = 0;
let reiniciar = false;

function dibujarCanvas() {
    tablero.lineWidth = 8;
    tablero.lineCap = "round";
    tablero.lineJoin = "round";
    tablero.fillStyle = "#F3F5F6";
    tablero.strokeStyle = "#0A3871";

    tablero.fillRect(0, 0, 1200, 860);
}

function dibujarLinea() {
    tablero.lineWidth = 6;
    tablero.lineCap = "round";
    tablero.lineJoin = "round";
    tablero.fillStyle = "#F3F5F6";
    tablero.strokeStyle = "#0A3871";

    let anchura = 600 / palabraSecreta.length;
    for (let i = 0; i < palabraSecreta.length; i++) {
        tablero.moveTo(500 + (anchura * i), 640);
        tablero.lineTo(550 + (anchura * i), 640);
    }

    tablero.stroke();
    tablero.closePath();
}

function escribirLetraCorrecta(index) {
    tablero.font = 'bold 52px Inter';
    tablero.lineWidth = 6;
    tablero.lineCap = 'round';
    tablero.lineJoin = 'round';
    // tablero.fillStyle = '#F3F5F6';
    tablero.fillStyle = 'black';

    let anchura = 600 / palabraSecreta.length;
    tablero.fillText(palabraSecreta[index], 505 + (anchura * index), 600);
    tablero.stroke();

    if (palabraEncontrada.length == palabraSecreta.length) {
        tablero.font = ' bold 50px Inter';
        tablero.lineWidth = 6
        tablero.lineCap = "round"
        tablero.lineJoin = "round"
        tablero.fillStyle = "green"
        tablero.fillText("¡ Ganaste, Felicidades !", 20, 420)
        reiniciar = true;
    }
}

function escribirLetraIncorrecta(letra, errorsLeft) {
    tablero.font = 'bold 70px Inter';
    tablero.lineWidth = 6;
    tablero.lineCap = 'round';
    tablero.lineJoin = 'round';
    // tablero.fillStyle = '#F3F5F6';
    tablero.fillStyle = 'black';

    tablero.fillText(letra, 235 + (70 * (10 - errorsLeft)), 720, 70);

    tablero.fillStyle = "#F3F5F6";
    tablero.strokeStyle = "#0A3871";
    tablero.lineWidth = 6;
    tablero.beginPath();
    // haz horizontal inferior
    tablero.moveTo(540, 500);
    tablero.lineTo(900, 500);
    errores += 1;
    //Horca
    if (errores === 1) {
        //haz vertical 
        tablero.moveTo(560, 500);
        tablero.lineTo(560, 100);
        //haz horizontal superior
        tablero.moveTo(750, 100);
        tablero.lineTo(560, 100);
        //cuerda
        tablero.moveTo(750, 100)
        tablero.lineTo(751, 171);
        tablero.fillStyle = "#000000"
        tablero.stroke();
    }
    //Cabeza
    else if (errores === 2) {
        tablero.strokeStyle = "#0A3871";
        tablero.lineWidth = 3;
        tablero.beginPath();
        tablero.arc(750, 230, 50, 0, Math.PI * 2);
        tablero.stroke();
    }
    /* Tronco */
    else if (errores === 3) {
        tablero.strokeStyle = "#0A3871";
        tablero.lineWidth = 3;
        tablero.beginPath();
        tablero.moveTo(750, 389);
        tablero.lineTo(750, 289);
        tablero.stroke();
    }
    //Pierna derecha
    else if (errores === 4) {
        tablero.strokeStyle = "#0A3871";
        tablero.lineWidth = 3;
        tablero.beginPath();
        tablero.moveTo(750, 389);
        tablero.lineTo(690, 450);
        tablero.stroke();
    }

    // Pierna Izquierda
    else if (errores === 5) {
        tablero.strokeStyle = "#0A3871";
        tablero.lineWidth = 3;
        tablero.beginPath();
        tablero.moveTo(750, 389);
        tablero.lineTo(800, 450);
        tablero.stroke();
    }

    //brazo derecho
    else if (errores === 6) {
        tablero.strokeStyle = "#0A3871";
        tablero.lineWidth = 3;
        tablero.beginPath();
        tablero.moveTo(750, 330);
        tablero.lineTo(790, 389);
        tablero.stroke();
    }
    //Brazo Izquierdo
    else if (errores === 7) {
        tablero.strokeStyle = "#0A3871";
        tablero.lineWidth = 3;
        tablero.beginPath();
        tablero.moveTo(750, 330);
        tablero.lineTo(700, 389);
        tablero.stroke();
        tablero.font = ' bold 50px Inter';
        tablero.lineWidth = 6
        tablero.lineCap = "round"
        tablero.lineJoin = "round"
        tablero.fillStyle = "red"
        tablero.fillText("¡ Fin de juego !", 890, 420)
        reiniciar = true;
    }
}

//PalabraSecreta
function escojerPalabraSecreta() {
    let palabra = palabras[Math.floor(Math.random() * palabras.length)];
    palabraSecreta = palabra;
    console.log(palabraSecreta);
}

function comprobarLetra(key) {
    if (key >= 65 && letras.indexOf(key) || key <= 90 && letras.indexOf(key)) {
        letras.push(key);
        console.log(key);
        return true;
    } else {
        console.log(key);
        return false;
    }
}

//Iniciar juego
function iniciarJuego() {
    document.getElementById("iniciar-juego").style.display = "none";
    escojerPalabraSecreta();
    dibujarCanvas();
    dibujarLinea();
    document.onkeydown = (e) => {
        // Verifica si termino el juego
        if (reiniciar) {
            location.reload();
        }

        let letra = e.key.toUpperCase();

        // comprobarLetra(letra);
        // if (comprobarLetra(letra) && palabraSecreta.includes(letra)) {
        if (letra.charCodeAt(0) >= 65 && letra.charCodeAt(0) <= 90) {
            // Son letras de la A a la Z
            if (palabraSecreta.includes(letra)) {
                // Acerto la letra
                for (let i = 0; i < palabraSecreta.length; i++) {
                    if (palabraSecreta[i] === letra) {
                        palabraEncontrada = palabraEncontrada + letra;
                        escribirLetraCorrecta(i);
                    }
                }
            } else {
                escribirLetraIncorrecta(letra, errores);
            }
        } else {
            // NO SON LETRAS
            if (!reiniciar) {
                alert("Digite solamente letras");
            }
        }
    }
}