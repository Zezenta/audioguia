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

//we get all the audio objects and we turn them from a node list into an array
const audios = Array.from(document.querySelectorAll('.classAudio')); 
let currentplayed = null;   //use to save the audio currently playing
let playing = false;    //To identify if some audio is playing at the moment

//To active the play audio function only when we press a key
document.addEventListener("keydown", (event) => {
    playaudio(event.key);
});

//Use it to pause or resume the audio currently playing
const pauseAudio = () => {
    if (playing) {
        currentplayed.pause();
        playing = false;
    } else{
        currentplayed.play();
        playing = true;
    }
}

//Play the audio main function
function playaudio(id) {
    //we find the audio case that matches with the parameter of the function
    let audio = audios.find(a => a.id === id);  

    //In case it matches, it will reproduce the audio, otherwise it will pause or resume
    if(audio) {
        //use it to identify if there's any audio playing, in that case, we stop it, set its time in 0, and play the new one
        if (playing) {
            currentplayed.pause();
            currentplayed.currentTime = 0;
        }
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