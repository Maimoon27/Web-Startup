const baseUrl = "http://api.openweathermap.org/data/2.5/weather?";
const key = "13c16fb318cfeeae7a3fb2a577a31d14";
//These are the form fields
const btn = document.getElementById("submit");
const InputField = document.getElementById("input");
let image = document.getElementById("image");
let formBody = document.getElementById("main-body");
let main=document.getElementById('main');
//formBody.style.visibility = "hidden";
//This function will get the weather data from the api
let GetWeather = async () => {
  let city = InputField.value; //Getting the value from the field
  let url = `${baseUrl}q=${city}&units=metric&appid=${key}`;
  let response = await fetch(url);
  if (response.ok) {
    const result = await response.json();
    return result;
  }
};

//This function will execute the search sequence
let excecuteSearch = function () {
     
    formBody.innerHTML = ''; 
    GetWeather().then((result) => {
    let ChildData = renderHtml(result);
    formBody.innerHTML += ChildData;
 //   formBody.style.visibility = "visible";
      if(result.main.temp<15)
      {
        main.style.background="url(./cold.jpg)";
      }
      else
      {
        main.style.background="url(./warm.jpg)";
      }
  });
};

//Convert the temprature
let renderHtml = function (response) {
  return `
    <div>
    <h2>${response.name}</h2>
    <h2>${response.main.temp}</h2>
    <img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">
    <h2>${response.weather[0].main}</h2>
  </div>
          <div class="info">
          <p>Humidity   : ${response.main.humidity}</p>
          <p>Feels-like : ${response.main.feels_like}</p>
          <p>Pressure   : ${response.main.pressure}</p>
          <p>Wind-speed : ${response.wind.speed}</p>
          <p>Max-Temp   : ${response.main.temp_max}</p>
          <p>Min-Temp   : ${response.main.temp_min}</p>
          <p>Visbility  : ${response.visibility}</p>
          </div>   
    `;
};

btn.onclick = excecuteSearch;
