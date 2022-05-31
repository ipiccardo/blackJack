/**
 * 2c = two of clubs
 * 2d = two of diaminds
 * 2h = two of hearts
 * 2s = tho of Spades
 */


//FUNCIÓN ANONIMA AUTOINVOCADA

const miJuego = (() => {

    'use strict'

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
          especiales = ['J', 'Q', 'K', 'A'];
    
    let puntosJugadores = [];

    
    // REFERENCIAS HTML

    // SI PONGO UNA COMA LUEGO DE LA CONSTANTE; EN LAS LINEAS SIGUIENTES INMEDIATAS NO ES NECESARIO PONER LA PALABRA CONST
    const botonPedirCarta = document.querySelector('.botonPedirCarta'),
          botonJuegoNuevo = document.querySelector('.botonJuegoNuevo'),
          botonDetener = document.querySelector('.botonDetener');
      
    const divCartasJugador = document.querySelectorAll('.divCartas'),
          puntosHtml = document.querySelectorAll('small');

// ESTA FUNCIÖN INICIALIZA EL JUEGO

const inicializarJuego = ( numJugadores = 2) => {
    deck = crearDeck();

    puntosJugadores = [];


    for ( let i = 0; i< numJugadores; i++){
        puntosJugadores.push(0)
    }


    puntosHtml.forEach(elem => elem.innerText = 0);
    
    // puntosHtml[0].innerText = 0
    // puntosHtml[1].innerText = 0
    
    divCartasJugador.forEach(elem => elem.innerHTML = '')

    
    botonPedirCarta.disabled = false;
    botonDetener.disabled = false

}
// CREA UN NUEVO DECK
const crearDeck = () => {
    
    deck = [];
    
    for(let i = 2; i <= 10; i++) {
        for(let tipo of tipos) {
            deck.push(i + tipo);
        }
    }
    
    for (let especial of especiales) {
        for(let tipo of tipos) {
            deck.push(especial + tipo);
        }
    }
    // console.log(deck);
    return _.shuffle(deck);
    // console.log(deck);
}

// ESTA FUNCIÓN ME PERMITE TOMAR UNA CARTA y eliminarla de la baraja

const pedirCarta = () => {
    
    if (deck.length === 0 ) {
        throw 'No hay cartas en el deck'
    }
    
    // EL .POP ELIMINA EL ULTIMO ELEMENTO DEL ARRAY Y ADEMAS ME LO TRAE
    return deck.pop()
    // console.log(carta)
    
    // console.log(carta) // CARTA DEBE SER DE LA BARAJA
    // console.log(deck)
}

// pedirCarta();

// PARA RECORRER TODAS LAS CARTAS HASTA EL ERROR
// for (let i = 0; i <=100; i++){
    // pedirCarta()
    //
    
    const valorCarta = ( carta ) => {
        const valor = carta.substring(0, carta.length -1); 
        return ( isNaN( valor )) ?
               (valor === 'A') ? 10 : 11 
               : valor * 1;
    }
    
    
    // Turno: 0 = primer Jugador y el último será la computadora
    
    const acumularPuntos = ( carta, turno) => {
        
        puntosJugadores[turno] =  puntosJugadores[turno] + valorCarta(carta);
        puntosHtml[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }
    

    const crearCarta = (carta, turno) => {    
        const imgCarta = document.createElement('img');
        imgCarta.src =`assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugador[turno].append(imgCarta)     
}


    const determinarGanador = () => {

        const [ puntosMinimos, puntosComputadora] = puntosJugadores;


        setTimeout(() => {
            if ( puntosComputadora === puntosMinimos  ) {
                alert('Nadie Gana');
            } 
            else if (puntosMinimos > 21 )
            {
                alert('La computadora Gana')
            }
            else if (puntosComputadora > 21 ){
                alert('El jugador Gana')
            } else 
            {alert('La computadora Gana')
        }
    }, 100);

    }




const turnoComputadora = ( puntosMinimos ) => {
    
    let puntosComputadora = 0
    
    do {
        
        const carta = pedirCarta() 
        puntosComputadora = acumularPuntos(carta, puntosJugadores.length -1);
        crearCarta(carta, puntosJugadores.length - 1)
        
        // <img class="carta" src="assets/cartas/2C.png">
        // const imgCarta = document.createElement('img');
        // imgCarta.src = src=`assets/cartas/${carta}.png`;
        // imgCarta.classList.add('carta');
        
        // cartasHtmlComputadora.append(imgCarta);
        
        if (puntosMinimos > 21 ) {
            break;
        }
        
    } while ( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21))
    
     determinarGanador()
}

// ENVENTOS
botonPedirCarta.addEventListener('click', () => {
    const carta = pedirCarta()
    const puntosJugador =  acumularPuntos( carta, 0 );
    
    crearCarta(carta, 0)
    
    // puntosJugador = puntosJugador + valorCarta(carta);
    // puntosHtml[0].innerText = puntosJugador;
    
    // <img class="carta" src="assets/cartas/2C.png">
    // const imgCarta = document.createElement('img');
    // imgCarta.src = src=`assets/cartas/${carta}.png`;
    // imgCarta.classList.add('carta')
    
    // cartasHtmlJugador.append(imgCarta)
    
    if (puntosJugador > 21) {
        console.warn(puntosJugador + ' LO SIENTO, PERDISTE')
        botonPedirCarta.disabled = true;
        turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21 ) {
        console.warn(puntosJugador + ' FELICITACIONES, HAS llegado a 21!!')
        alert('Jugador 1 gana')
        botonPedirCarta.disabled = true;
        botonDetener.disabled = true;
    } else {
        puntosJugador
    }
    
})

botonDetener.addEventListener('click', () => {
    botonPedirCarta.disabled = true;
    botonDetener.disabled = true
    turnoComputadora(puntosJugadores[0])
})



botonJuegoNuevo.addEventListener('click', () => {
    
    console.clear()
    inicializarJuego()
    // deck = [];
    // deck = crearDeck();
    // console.log(deck)
    

});

 return {

   nuevoJuego: inicializarJuego
 };



})();