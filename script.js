document.querySelector(".busca").addEventListener("submit",async (event)=>{
    //previnir comportamento padrão
    event.preventDefault();
    //pegar o valor que for digitado no input
    let input = document.querySelector("#searchInput").value;

    if (input !== ''){
        clearInfo();
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
            });
        } else {
            //limpar quando nao tiver nada
            clearInfo();
            showWarning('Não encontramos esta localização.');
        }
        //limpar tudo caso nao procurar nada e der search
    } else {
        clearInfo();
    }
            
});

function showInfo(json) {
    showWarning('');

    document.querySelector('.resultado').style.display = 'block';

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;
    //procurar a imagem do icone
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle - 90}deg)`
}
function clearInfo(){
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}


function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}