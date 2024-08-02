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

//Tratamos de obtener todos los elementos de audio
const audios = document.querySelectorAll('.classAudio');
// console.log(audios);


// document.addEventListener("keydown", (event) => {
//     let key = event.key;
//     playaudio(key)            
// })


function playaudio() {    
    let currentplayed;      //will save the audio that is playing at the moment, and we manipulate it later
    
    //we iterate all the HTMLElementObjects
    audios.forEach(audio => {
        document.addEventListener("keydown", (event) => {
            //Verificate if the key we press match with the audios we have
            if (event.key == audio.id) {
                if (playing) {
                    currentplayed.pause()
                    currentplayed.currentTime = 0;
                    audio.play();
                    currentplayed = audio;
                } else {    //It executes in case there's an audio playing at the moment
                    playing = true; 
                    currentplayed = audio;  
                    audio.play();  
                }
            } else{
                pauseAudio(audio, paused)
            }
        })        
    })
}

playaudio()
let playing = false;    //see if an audio is playing
let paused = false;     //To verify if the audio is paused

const pauseAudio = (audio, paused) => {
    if (paused) {
        playing = true
        paused = false;
        audio.play();
    }else {
        playing = false
        paused = true;
        audio.pause();
    }
}




//Obtener el elemento de audio
// const dynamicVars = {
//     "1": document.getElementById("1"),
//     "2": document.getElementById("2"),
//     "3": document.getElementById("3"),
//     "4": document.getElementById("4"),
//     "5": document.getElementById("5"),
//     "6": document.getElementById("6"),
//     "7": document.getElementById("7"),
//     "8": document.getElementById("8"),
//     "9": document.getElementById("9"),
//     "d": document.getElementById("d"),
//     "o": document.getElementById("o"),
//     "z": document.getElementById("z")
// };

// const keys = Object.keys(dynamicVars);
// console.log(keys);

// document.addEventListener("keydown", function(event){
//     playaudio(event.key)            
// })

// function playaudio(keypressed){
//     if(keypressed != "p"){
//         // console.log(Object.keys(dynamicVars).length);
//         for(i = 0; i < Object.keys(dynamicVars).length; i++){
//             if(keypressed != dynamicVars[keys[i]]){
//                 //dynamicVars[keys[i]] son todas las teclas que hay
//                 // console.log(dynamicVars[keys[i]]);
//                 dynamicVars[keys[i]].pause();
//             }
//         }
//         //si la tecla no es una de las de dynamic vars, sale undefined
//         console.log(dynamicVars[keypressed]);
//         try{
//             dynamicVars[keypressed].play();
//         }
//         catch{}
//     }else{
//         console.log('here');
//         for(i = 0; i < Object.keys(dynamicVars).length; i++){
//             dynamicVars[keys[i]].play();
//             // console.log(dynamicVars[keys[i]]);
//         }
//     }
// }

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