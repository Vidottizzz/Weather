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
              
        if(json.cod === 200) {
            //montando o objeto para mandar para função showinfo
            showInfo({
                name : json.name,
                country : json.sys.country,
                temp: json.main.temp,
                tempIcon : json.weather[0].icon,
                windSpeed : json.wind.speed,
                windAngle: json.wind.deg
            })
        } else {
            showWarning('Não encontramos esta localização.');
        }
    }           
});

function showInfo(json) {
    showWarning('');

    document.querySelector('.resultado').style.display = 'block';

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;

}


function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}