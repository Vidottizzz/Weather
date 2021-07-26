document.querySelector(".busca").addEventListener("submit",async (event)=>{
    //previnir comportamento padrão
    event.preventDefault();
    //pegar o valor que for digitado no input
    let input = document.querySelector("#searchInput").value;

    if (input !== ''){
        showWarning('Carregando...');
        //encodeURI para ficar no formato certo
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=51a5f0fa188b890457fb261ab22baa67&units=metric&lang=pt_br`;  

        let results = await fetch(url);
        let json = await results.json();

        console.log(json);
    }           
});


function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}