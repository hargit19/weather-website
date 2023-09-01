// for 3-hour-step prediction
const apiurl = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q="
const apikey = "10e36a1c385b35dcae44634cc96ffe10"
// for current temp
const apiurl2 = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="
const apikey2 = "ed8d90977d61926de72d854addbb0f1b"
//for getting latitude and longitude coordinates
const apiurl3 = "http://api.openweathermap.org/geo/1.0/direct?q="
const apikey3 = "10e36a1c385b35dcae44634cc96ffe10"
//for getting value of air quality index
const apiurl4 = "http://api.openweathermap.org/data/2.5/air_pollution?"
const apikey4 = "10e36a1c385b35dcae44634cc96ffe10"
async function three_hour_prediction(city){
    const response = await fetch(apiurl + city +`&appid=${apikey}`);
    if(response.status == 404){
        document.querySelector(".error").style.display = "block"
    }
    else{
        document.querySelector(".error").style.display = "none"
        var data = await response.json();
        console.log(data)
    
    
        for(i = 1; i<13; i++){
            document.getElementById("time-stamp-temp"+`${i}`).innerHTML = Math.round(data.list[i].main.temp) + "°C";
        }
    
        for(i = 1;i<13;i++){
            document.getElementById("time-stamp"+`${i}`).innerHTML = String(data.list[i].dt_txt).slice(11,16)
        }
        
        for(i=1;i<13;i++){
            if(data.list[i].weather[0].main == "Rain"){
                document.getElementById("time-stamp-img"+`${i}`).src = "rainy-small.png"
            }
            if(data.list[i].weather[0].main == "Clear"){
                document.getElementById("time-stamp-img"+`${i}`).src = "clear-small.png"
            }
            if(data.list[i].weather[0].main == "Drizzle"){
                document.getElementById("time-stamp-img"+`${i}`).src = "drizzle-small.png"
            }
            if(data.list[i].weather[0].main == "Mist"){
                document.getElementById("time-stamp-img"+`${i}`).src = "mist-small.png"
            }
            if(data.list[i].weather[0].main == "Clouds"){
                document.getElementById("time-stamp-img"+`${i}`).src = "cloudy-small.png"
            }
            if(data.list[i].weather[0].main == "Thunderstorm"){
                document.getElementById("time-stamp-img"+`${i}`).src = "thunderstorm-small.png"
            }
            if(data.list[i].weather[0].main == "Haze"){
                document.getElementById("time-stamp-img"+`${i}`).src = "haze-small.png"
            }
        
        }
    }
   

}


async function current_temp(city){
    var live_resp = await fetch(apiurl2 + city + `&appid=${apikey2}`)
    

    var live_data = await live_resp.json()
    console.log(live_data)

    document.getElementById("city_name").innerHTML = live_data.name;
    document.getElementById("temp").innerHTML = Math.round(live_data.main.temp) + "°C";
    document.getElementsByClassName("heading")[0].innerHTML = live_data.weather[0].main;
    document.getElementById("feels_like").innerHTML = Math.round(live_data.main.feels_like) + "°C"
    document.getElementById("wind_speed").innerHTML = live_data.wind.speed + "Km/h"
    document.getElementById("visibility").innerHTML = Math.round((live_data.visibility)/1000) + " Km"
    document.getElementById("pressure").innerHTML = live_data.main.pressure + "Pa";
    document.getElementById("humidity").innerHTML = live_data.main.humidity + "%";

    if(live_data.weather[0].main == "Clear"){
        document.getElementById("statement").innerHTML = "Hey Friend, enjoy the clear skies and crisp air!.  It's a perfect day to seize the moment and bask in the beauty of nature. Have a fantastic time out there!";
        document.getElementById("gif_play").src  = "day-neww.svg"
        document.getElementById("background-video").src = "clear-back-new.mp4"
        
    }
    if(live_data.weather[0].main == "Clouds"){
        document.getElementById("statement").innerHTML = "Hey Friend, looks like it's a bit cloudy out there. Grab a light jacket just in case, and enjoy the unique mood that cloudy weather brings. Have a great time! "
        document.getElementById("gif_play").src  = "cloudy-neww.svg"
        document.getElementById("background-video").src = "cloudy-back.mp4"
    }
    if(live_data.weather[0].main == "Rain"){
        document.getElementById("statement").innerHTML = "Hey Friend, don't forget your umbrella and a cheerful spirit! Rainy days have their own charm, and I hope you enjoy the refreshing feeling and the sound of raindrops !"
        document.getElementById("gif_play").src  = "rainy-neww.svg";
        document.getElementById("background-video").src = "rain-back-new.mp4"
    }
    if(live_data.weather[0].main == "Drizzle"){
        document.getElementById("statement").innerHTML = "Hey Friend, it's a drizzly day out there! Don't forget your umbrella or a waterproof jacket.Embrace the subtle beauty of the rain and have a wonderful time wherever you're headed!"
        document.getElementById("gif_play").src  = "drizzle-neww.svg"
        document.getElementById("background-video").src = "drizzle-back-new.mp4"

    }
    if(live_data.weather[0].main == "Mist"){
        document.getElementById("statement").innerHTML = "Hey Friend, stepping into the misty unknown, how adventurous! Remember to take it slow and steady, and embrace the mysterious atmosphere."
        document.getElementById("gif_play").src  = "mist-static.svg"
        document.getElementById("background-video").src = "mist-compressed.mp4"
        
    }
    if(live_data.weather[0].main == "Thunderstorm"){
        document.getElementById("statement").innerHTML = "Make sure to stay indoors if possible, and if you absolutely must go out, remember to stay away from open fields, tall objects, and water bodies. Safety first!"
        document.getElementById("gif_play").src  = "thunder-neww.svg"
        document.getElementById("background-video").src = "thunder-back-new.mp4"
    }
    if(live_data.weather[0].main == "Haze"){
        document.getElementById("statement").innerHTML = "Hazy conditions can sometimes affect air quality, so, consider wearing a mask. Stay hydrated and enjoy the day while keeping comfort and safety in mind! "
        document.getElementById("gif_play").src  = "haze-gif2.png"
        document.getElementById("background-video").src = "smoke-compressed.mp4"
    }
    if(live_data.weather[0].main == "Smoke"){
        document.getElementById("statement").innerHTML = "Hey Friend, if there's smoky weather outside, it's essential to prioritize your health and safety. Your well-being comes first, so please take care and stay informed about the conditions"
        document.getElementById("background-video").src = "smoke-back-new.mp4"
        document.getElementById("gif_play").src  = "smoke-icon.jpg"
    }


}

async function getcoordinates(city){
    var lat_lon = await fetch (apiurl3  +city + `&appid=${apikey3}`)
    var data_lat_lon = await lat_lon.json()
    let lat = data_lat_lon[0].lat;
    let lon = data_lat_lon[0].lon;
    console.log(data_lat_lon);
   

    async function airquality(){
        var aqi = await fetch(apiurl4 + `lat=${lat}` + `&lon=${lon}` + `&appid=${apikey4}`) 
        var data_aqi = await aqi.json()
        console.log(data_aqi)
        document.getElementById("aqi").innerHTML = data_aqi.list[0].main.aqi;


        if(data_aqi.list[0].main.aqi == "1"){
            document.getElementById("comment").innerHTML = "Good"
        }
        if(data_aqi.list[0].main.aqi == "2"){
            document.getElementById("comment").innerHTML = "Fair"
        }
        if(data_aqi.list[0].main.aqi == "3"){
            document.getElementById("comment").innerHTML = "Moderate"
        }
        if(data_aqi.list[0].main.aqi == "4"){
            document.getElementById("comment").innerHTML = "Poor"
        }
        if(data_aqi.list[0].main.aqi == "5"){
            document.getElementById("comment").innerHTML = "Very Poor"
        }
    }
    airquality()
}

current_temp("gwalior")  // ****declaraing outside the function so that it runs as soon as the site loads
getcoordinates("gwalior")
three_hour_prediction("gwalior")

var input = document.getElementById("city_input") || "gwalior";
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("btnn").click();
  }
});
function tryfunc(){
    let user_value = document.getElementById("city_input").value;
    city = user_value || "gwalior" // setting default value as gwalior

    
    current_temp(city)
    getcoordinates(city)
    three_hour_prediction(city)
}
function hamdisplay(){
    if(document.getElementsByClassName("nvbarr")[0].style.top == "-100%"){
        document.getElementsByClassName("nvbarr")[0].style.top = "0"
    }
    else{
        document.getElementsByClassName("nvbarr")[0].style.top = "-100%"
    }
}









 

 


