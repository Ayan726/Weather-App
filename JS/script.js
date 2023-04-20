let loc = document.querySelector('.loc');
const searchform = document.querySelector('.search-form');
const inp = document.querySelector('.inp');
let temp = document.getElementById('temp');
let dt = document.getElementById('dt');
let tm = document.getElementById('tm');
let wkday = document.getElementById('wkday');
let weathericon = document.querySelector('.weather-icon');
let cond = document.querySelector('.cond');
let cloudyness = document.getElementById('cloudyness');
let humidity = document.getElementById('humidity');
let windspeed = document.getElementById('windspeed');
let extralocations = document.querySelector('.extra-locations').children;
extralocations = [...extralocations];
const weekDays = [
    "Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"
];
const app = document.querySelector('.app');
let bgurl = "";




extralocations.forEach(el => {
    el.addEventListener('click', (e) => {
        const val = e.target.innerText;
        // console.log(val);
        fetchWeather(val);
    })
});



searchform.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = inp.value;
    inp.value = "";
    fetchWeather(val);
    // console.log(val);
})



const fetchWeather = async (txt) => {
    try{
        const res = await fetch(`http://api.weatherapi.com/v1/current.json?key=<YOUR_API_KEY>&q=${txt}&aqi=no`);
        if(!res.ok){
            alert("City doesn't exist");
            return;
        }
        const data = await res.json();
        console.log(data);

        temp.innerText = Math.ceil(data.current.temp_c);
        loc.innerText = data.location.name;
        let time = data.location.localtime;
        let dttm = time.split(" ");
        dt.innerText = dttm[0];
        tm.innerText = dttm[1];
        let day = new Date(time).getDay();
        wkday.innerText = weekDays[day];
        cond.innerText = data.current.condition.text;
        weathericon.innerHTML = `<img id="ic" src="${data.current.condition.icon}"/>`;
        if(window.innerWidth<768){
            const img = document.getElementById('ic');
            img.style.width = "40px";
        }
        cloudyness.innerText = data.current.cloud;
        humidity.innerText = data.current.humidity;
        windspeed.innerText = data.current.wind_kph;
        // background conditions
        const x = data.current.condition.code;
        const y = data.current.is_day;
        const cloudy = [1003,1006,1009,1030,10871135,1147];
        const rainy = [1063,1069,1072,1117,1150,1153,1168,1171,1180,1183,1186,1189,1192,1195,1198,1201,1204,1207,1240,1243,1246,1249,1252,1273,1276];
    
        if(x == 1000){
            if(y)bgurl = "/assets/day/clear.jpg";
            else bgurl = "/assets/night/clear.jpg";
        }
        else if(cloudy.includes(x)){
            if(y)bgurl = "/assets/day/cloudy.jpg";
            else bgurl = "/assets/night/cloudy.jpg";
        }
        else if(rainy.includes(x)){
            if(y)bgurl = "/assets/day/rainy.jpg";
            else bgurl = "/assets/night/rainy.jpg";
        }

        else{
            if(y)bgurl = "/assets/day/snowy.jpg";
            else bgurl = "/assets/night/snowy.jpg";
        }

        app.style.backgroundImage = `url(${bgurl})`;
        


    }
    catch(err){
        console.log(err);
    }
}



fetchWeather(loc.innerText);




