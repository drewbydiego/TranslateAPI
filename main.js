//CREAR ELEMENTOS DEL DOM
let translateFrom = document.querySelector('#translateFrom');
let TranslateTo = document.querySelector('#TranslateTo');
let outputTranslate = document.querySelector('#outputTranslate');
let source_language = 'es';
let target_language = 'en';

//CONSEGUIR LA LISTA DE LENGUAJES DESDE EL SERVIDOR
const GET_URL = 'https://text-translator2.p.rapidapi.com/getLanguages';

const OPTIONS = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'a7d20026a0mshf36a4874a0e9e50p1560a4jsne2ec2f7a6f34',
        'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
    }
};

fetch(GET_URL, OPTIONS)
    .then(res => res.json())
    .then(objecto => {
    console.log()
    let lenguages = objecto.data.languages;
    //Codigo necesario para cargar el select
    lenguages.forEach(element => {
        translateFrom.innerHTML += `<option value="${element.code}">${element.name}</option>`;
        TranslateTo.innerHTML += `<option value="${element.code}">${element.name}</option>`;
    });
    translateFrom.addEventListener('click', ()=>{
        source_language = translateFrom.value;
        //console.log(source_language)
    })
    TranslateTo.addEventListener('click', ()=>{
        target_language = TranslateTo.value;
        //console.log(target_language)

    })

})
    .catch(error => console.log(error));

//RECOGER LOS DATOS DEL TEXTAREA PARA ENVIARLOS AL SERVIDOR
let translatebtn = document.querySelector('#translatebtn');
let inputTranslateFrom = document.querySelector('#inputTranslateFrom');

translatebtn.addEventListener('click', ()=>{
    let textToTranslate = inputTranslateFrom.value;

    const encodedParams = new URLSearchParams();
    encodedParams.append("source_language", source_language);
    encodedParams.append("target_language", target_language);
    encodedParams.append("text", textToTranslate);

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': 'a7d20026a0mshf36a4874a0e9e50p1560a4jsne2ec2f7a6f34',
            'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
        },
        body: encodedParams
    };

    fetch('https://text-translator2.p.rapidapi.com/translate', options)
        .then(response => response.json())
        .then(response => outputTranslate.value = response.data.translatedText)
        .catch(err => console.error(err));
})

