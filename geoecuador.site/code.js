const popup = document.getElementById('popup');
const popup2 = document.getElementById('popup2');
// JavaScript para hacer el encabezado pegajoso (sticky)
window.addEventListener('scroll', function() {
    const header = document.getElementById('main-header');
    if (window.scrollY) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});

//obtenemos los div del contenedor de la barra y la barra
const audioProgressContainer = document.getElementById('audio-progress-container');
const audioProgressBar = document.getElementById('audio-progress-bar');
let desliza = false;    //para definir si el usuario encuntra deslizando la barra

// Actualiza la barra de progreso y la posición del audio
const updateProgressBar = () => {
    if (currentplayed) {
        const progress = (currentplayed.currentTime / currentplayed.duration) * 100;
        audioProgressBar.style.width = `${progress}%`;
    }
};

// Cambia el tiempo del audio basado en la posición de la barra de progreso
const setAudioTime = (event) => {
    if (currentplayed) {
        const rect = audioProgressContainer.getBoundingClientRect();    //obtenemos las propiedades de este div
        const offsetX = event.clientX - rect.left;  //definimos la la posicion de donde esta el click en el div
        const totalWidth = rect.width;  //definimos el total del tamaño de la barra
        const percentage = offsetX / totalWidth;    //porcentaje en el que va la barra 
        const newTime = percentage * currentplayed.duration;    //definimos la nueva duracion 
        currentplayed.currentTime = newTime;  
    }
};

// Manejar el clic en la barra de progreso para cambiar el tiempo del audio
audioProgressContainer.addEventListener('click', setAudioTime);

// Manejar el arrastre de la barra de progreso
audioProgressContainer.addEventListener('mousedown', (event) => {
    desliza = true;
    setAudioTime(event);
});
//Se activa cuando el usuario mueve el mouse
document.addEventListener('mousemove', (event) => {
    if (desliza) {
        setAudioTime(event);
    }
});
//Se activa cuando el usuario suelta el click
document.addEventListener('mouseup', () => {
    desliza = false;
});

// Actualiza la barra de progreso cada 0.1 segundos para que se vea rapido la actualizacion de la barra
setInterval(updateProgressBar, 100);

//we get all the audio objects and we turn them from a node list into an array
const audios = Array.from(document.querySelectorAll('.classAudio')); 
let currentplayed = null;   //use to save the audio currently playing
let playing = false;    //To identify if some audio is playing at the moment
let paused = false;

//variables para el cambio de display entre no haber audio, y existir un audio en reproduccion
const mensajeAudioInicio = document.getElementById('mensaje-audio-inicio');
const elementosDeAudio = document.getElementById('elementos-de-audio');
//variables para el cambio de display de las imagenes de los botones de pausa y resume
const botonPausa = document.getElementById('botonPausa');
const botonResume = document.getElementById('botonResume');


//To active the play audio function only when we press a key
document.addEventListener("keydown", (event) => {
    playaudio(event.key);
});


//Use it to pause or resume the audio currently playing
const pauseAudio = () => {
    if (playing) {
        botonPausa.style.display = 'none';
        botonResume.style.display = 'flex';
        
        mensajeAudioInicio.style.display = 'none';
        paused = true;
        playing = false;
        currentplayed.pause();
    } else{
        botonResume.style.display = 'none';
        botonPausa.style.display = 'flex';

        paused = false;
        playing = true;
        currentplayed.play();
    }
}

//Play the audio main function
function playaudio(id) {
    //ponemos el display correcto cuando se reproduce y quitamos el mensaje
    mensajeAudioInicio.style.display = 'none';
    elementosDeAudio.style.display = 'flex';

    //we find the audio case that matches with the parameter of the function
    let audio = audios.find(a => a.id === id);  

    //In case it matches, it will reproduce the audio, otherwise it will pause or resume
    if(audio){ 
        //use it to identify if there's any audio playing, in that case, we stop it, set its time in 0, and play the new one
        if (playing) {
            currentplayed.pause();
            currentplayed.currentTime = 0;
        }

        console.log('playing');
        audio.play();
        currentplayed = audio;
        playing = true;

    } else {
        pauseAudio();
    }
}

//Imagenes que saltan en caso de apretar dichos botones
const botonimagen = document.getElementById("botono");
const botonimagen2 = document.getElementById("botonz");

botonimagen.addEventListener('click', function(){
    popup.style.display = 'flex';
});
botonimagen2.addEventListener('click', function(){
    popup2.style.display = 'flex';
});
// Escuchar eventos de teclado en todo el documento
setTimeout(function() {
    // Alert after 200 milliseconds
    alert("Para reproducir cada audio cliquee sobre el tema en el Menú de Índice")
}, 200);
// Get the modal

// Get the button that opens the modal
// Get the <span> element that closes the modal
const span = document.getElementById('closePopup');
const span2 = document.getElementById('closePopup2');

// When the user clicks the button, open the modal 

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    popup.style.display = 'none';
}
span2.onclick = function() {
    popup.style.display = 'none';
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == popup || event.target == popup2) {
        popup.style.display = 'none';
        popup2.style.display = 'none';
    }
}