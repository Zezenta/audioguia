const popup = document.getElementById('popup');
const popup2 = document.getElementById('popup2');

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
let paused = false; //To identify if the audio is paused

//variables para el cambio de display entre no haber audio, y existir un audio en reproduccion
const mensajeAudioInicio = document.getElementById('mensaje-audio-inicio');
const container__elementosDeAudio = document.getElementById('container__elementosDeAudio');
const audioProgressContainerBar = document.getElementById('audio-progress-container');   //Contenedor de la barra de progreso
const imageDeAudio = document.getElementById('imagen-de-audio');    //imagen dinamica de los audios que se reproducen

//variables para el cambio de display de las imagenes de los botones de pausa y resume
const botonPausa = document.getElementById('botonPausa');
const botonResume = document.getElementById('botonResume');

//To active the play audio function only when we press a key
document.addEventListener("keydown", (event) => {
    if(parseInt(event.key) >= 1 || parseInt(event.key) <= 9)
    {
        playaudio(event.key);
    }
});

//Use it to pause or resume the audio currently playing
const pauseAudio = () => {
    if (playing) {
        botonPausa.style.display = 'none';
        botonResume.style.display = 'flex';
        
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
    
    //we find the audio case that matches with the parameter of the function
    let audio = audios.find(a => a.id === id);  
    
    //In case it matches, it will reproduce the audio, otherwise it will pause or resume
    if(audio){ 
        //ponemos el display correcto cuando se reproduce y quitamos el mensaje 
        mensajeAudioInicio.style.display = 'none';
        container__elementosDeAudio.style.display = 'flex';
        audioProgressContainerBar.style.display = 'flex';
        imageDeAudio.style.display = 'flex';
        imageDeAudio.src = `images/${audio.id}.png`;

        //En caso de que se reproduzca el audio con el boton en pausa, este cambia el display al boton que le corresponde
        if (paused) {
            botonResume.style.display = 'none';
            botonPausa.style.display = 'flex';
        }
        
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

function previous(){
    var currentIndex = parseInt(currentplayed.id);
    playaudio((currentIndex-1).toString());
}

function next(){
    var currentIndex = parseInt(currentplayed.id);
    playaudio((currentIndex+1).toString());
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

//CHAT
async function askIA(pregunta) {
    const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: pregunta }),
    });
    const data = await response.json();
    return data.choices[0].message.content;
}
var shown = false;
function toggleChat() {
    console.log("togglecaht");
    const chatWindow = document.getElementById('chat-window');
    if(!shown){ //si está oculto, muéstrelo
        chatWindow.style.display = "flex";
        shown = true;
    }else{
        chatWindow.style.display = "none";
        shown = false;
    }

}
document.addEventListener('keyup', (event) => {
    if (event.key == 'Enter') {
        sendMessage()
    }
});
function scrollToBottom() {
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function sendMessage() {
    const chatMessages = document.getElementById('chat-messages');
    const chatText = document.getElementById('chat-text');

    if (chatText.value.trim() === '') return;

    // User message
    const userMessage = document.createElement('div');
    userMessage.textContent = chatText.value;
    userMessage.classList.add('user-message');
    chatMessages.appendChild(userMessage);
    chatText.value = '';
    scrollToBottom();

    // Response message
    const botMessage = document.createElement('div');
    botMessage.textContent = await askIA(userMessage.textContent);
    botMessage.classList.add('bot-message');
    chatMessages.appendChild(botMessage);

    chatMessages.scrollTop = chatMessages.scrollHeight;
    scrollToBottom();

}