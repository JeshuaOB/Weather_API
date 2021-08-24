let weather = {
    apiKey: "58e3a85501c667497773e8b0b85351b2",    // Define the api key as a variable
    fetchWeather: function(city){    // Create a function that receives the city as a parameter
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            +city
            +"&units=metric&appid="
            +this.apiKey
        ).then((response)=>response.json())    // Get the response from the promise and parse it from String to JSON
        .then((data)=>this.displayWeather(data));    // Get the data from the new promise returned by the previous line
    },
    displayWeather: function(data){    // Collect the necessary values ​​from the API and show them in the determined fields
        const {name} = data;
        const {icon, description} = data.weather[0];
        const {temp, humidity} = data.main;
        const {speed} = data.wind;
        document.querySelector(".city").innerText = name;
        document.querySelector(".temp").innerText = temp + " °C";
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/"+icon+".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".humidity").innerText = humidity+"%";
        document.querySelector(".wind").innerText = speed+"km/h";
        document.querySelector(".weather").classList.remove("loading");    // Remove the "loading" class once the corresponding data has been loaded
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?"+name+"')";    // Load a random image related to the city as background
    },
    search: function(){
        this.fetchWeather(document.querySelector(".search-bar").value);    // Get the value entered by the user and uses it as the parameter
    }
};

document.querySelector(".search button").addEventListener("click", function(){    // Execute the function when a mouse click is made
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event){    // Execute the function when the "Enter" key is pressed
    if(event.key == "Enter"){
        weather.search();
    }
});

weather.fetchWeather("Valencia");    // Execute the main function with "Valencia" as the default parameter
