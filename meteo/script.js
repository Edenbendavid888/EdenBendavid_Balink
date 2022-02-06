const api = {
  api1:"https://www.metaweather.com/api/location/",
  images: "https://www.metaweather.com/static/img/weather/ico"
}



let searchbox = document.querySelector('.country');


getTemps('2459115');
document.querySelector('.country').onchange = function(){
  getTemps(searchbox.value);
}


function getTemps(query) {
  fetch(`${api.api1}${query}`)
  .then(weather => {
      return weather.json();
  }).then(displaytemps);
}



function displaytemps(weather) {
  let tableContainingDays = document.getElementById('display');
  tableContainingDays.innerHTML = "";
  let Day = 0;
  let numberOfday = info ? 5:1;    
  
  while (Day < numberOfday){
      weatherData = weather.consolidated_weather[Day];
      let dayName = getDayName(Day,info,weather);
      let maxTemp = Math.floor(weatherData.max_temp);
      let windSpeed = Math.floor(weatherData.wind_speed);
      let minTemp =  Math.floor(weatherData.min_temp);
      let airPressure = Math.floor(weatherData.air_pressure);
      let images = weatherData.weather_state_abbr;
      

      const weatherHTML = `<div class="weatherTab"> \
                  <div> <h3>${dayName} </h3></div>\
                  <div><div id ="prec"><img  id="imgs" class="images" src="${api.images}/${images}.ico"></div>\
                  <div id ="propert">${weatherData.weather_state_name}</div></div>\
                  <div> \
                  <div id="maxval" >Max:</div><div id = "maxval"> ${maxTemp}°C</div></div>\
                  <div> <div id="maxval">Min:</div><div id = "maxval"> ${minTemp} °C</div></div>\
                  <div class="precip" id="prec"> ${windSpeed} mph</div>\
                  <div ><b>Humidity</b></div>\
                  <div id ="prec"> ${weatherData.humidity}%</div>\
                  <div ><b>Visibility</b></div>\
                  <div> ${parseFloat(weatherData.visibility).toFixed(1)} miles</div>\
                  <div><div ><b>Pressure</b></div>\
                  <div>  ${airPressure} mb</div>\
                  <div><b>Confidence</b></div>\
                  <div> ${weatherData.predictability}%</div>\
      </div>`;
      
      tableContainingDays.innerHTML += weatherHTML;
      Day++;    
  }

  setTime(weather);

}

function setTime(weather) {
  let city = document.querySelectorAll('.city');
  city.forEach(i => i.innerText = `${weather.title}`);
  let time = document.querySelector('.time');
  time.innerText = getTime(`${weather.time}`);
  let sunrise = document.querySelector('.sunrise');
  sunrise.innerText = getTime(`${weather.sun_rise}`);
  let sunset = document.querySelector('.sunset');
  sunset.innerText = getTime(`${weather.sun_set}`);
}

function getTime(hour) {
  let hourValue = hour.split("T")[1].split(".")[0].slice(0,5);
  return hourValue.split(":")[0] > 12 ?  hourValue + " p.m." : hourValue + " a.m."; 
}

function getDayName(Day,info,weather){
  if(info){
      if(Day == 0){dayName = 'Today'};
      if(Day == 1){dayName = 'Tomorrow'};
      if(Day >= 2){
          dayMonth = new Date(`${weatherData.applicable_date}`).toString().split(" ");
          dayName = dayMonth[0]+" "+dayMonth[2]+" "+dayMonth[1];
      }
  }
  else{
      dayName='';
  }
return dayName;
}
function getspecificDay (){
  let dateControl = document.querySelector('input[type="date"]');
  let date = new Date(dateControl.value);
  console.log(date);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  console.log(year);
  console.log(month);
  console.log(day);
  let select = document.getElementById("selectcountry")
  let choice = select.selectedIndex;
  let cityforaday = select.options[choice].value;
    console.log(cityforaday);
    
    fetch(
      `https://www.metaweather.com/api/location/search/?query=${cityforaday}`
    )
    .then(resdata => resdata.json())
    
    .then(getTempsforday)
  
    .catch(function(error){
  console.log('Please enter a valid city')
    });
}
function getTempsforday(resdata){
  let myquery = resdata[0].query;
  console.log(myquery);
  console.log(`https://www.metaweather.com/api/location/${myquery}/${year}/${month}/${day}/`);

  fetch(
    `https://www.metaweather.com/api/location/${myquery}/${year}/${month}/${day}/`
    )
    .then(response => response.json())

    .then(displaytempsforday)
  
    .catch(function(error){
  console.log('Error')
    });

  }

function displaytempsforday(weather) {
 
    let tableContainingDays = document.getElementById('display2');

  
        const weatherHTML = `<div class="weatherTab"> \
                    <div> <h3>${dayName} </h3></div>\
                    <div><div id ="prec"><img  id="imgs" class="images" src="${api.images}/${images}.ico"></div>\
                    <div id ="propert">${weatherData.weather_state_name}</div></div>\
                    <div> \
                    <div id="maxval" >Max:</div><div id = "maxval"> ${maxTemp}°C</div></div>\
                    <div> <div id="maxval">Min:</div><div id = "maxval"> ${minTemp} °C</div></div>\
                    <div class="precip" id="prec"> ${windSpeed} mph</div>\
                    <div ><b>Humidity</b></div>\
                    <div id ="prec"> ${weatherData.humidity}%</div>\
                    <div ><b>Visibility</b></div>\
                    <div> ${parseFloat(weatherData.visibility).toFixed(1)} miles</div>\
                    <div><div ><b>Pressure</b></div>\
                    <div>  ${airPressure} mb</div>\
                    <div><b>Confidence</b></div>\
                    <div> ${weatherData.predictability}%</div>\
        </div>`;
        
        tableContainingDays.innerHTML += weatherHTML;
    
  
    setTime(weather);
  
  }

  
