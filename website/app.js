/* Global Variables 
name: c.parrish
email: cecilialparrish@gmail.com
password: iSdXjL2FTsg6e2M

key: 5d62d7f64e42f7f14aa41a15935db066
base URL: https://api.openweathermap.org/data/2.5/weather?zip=
*/




const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const zip = document.getElementById('zip').value;
const apiKey = '5d62d7f64e42f7f14aa41a15935db066';




//Event listener for the generate button
document.getElementById('generate').addEventListener('click', onGenerate);


//function generated when "generate" is clicked
async function onGenerate(event){
    const newZip = document.getElementById("zip").value;
    const newFeelings = document.getElementById("feelings").value;

    const weatherData = await getWeatherData(baseUrl, newZip, apiKey)
    const postResponse = await postData('/addData', {
        temperature: weatherData.main.temp,
        date: newDate,
        userResponse: newFeelings,
    });

    if (postResponse.status === 200) {
        updateUI('/postData');
    }
}




//get data from api


const getWeatherData = async (baseUrl, zip, apiKey) => {
    const openWeatherApiUrl = baseUrl + zip + "&appid=" + apiKey + "&units=imperial";
    const response = await fetch(openWeatherApiUrl);
    return await response.json();
};




//post data

const postData = async (url = "", data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(data),
    });

    return await response.json();
}






//updateUI
const updateUI = async (url = "") => {
    const response = await fetch(url);
    const allData = await response.json();

    document.getElementById('temp').innerHTML = "Temperature: " + allData.temperature + "&deg;F";
    document.getElementById('date').innerHTML = "Date: " + allData.date;
    document.getElementById('content').innerHTML = "Feelings " + allData.userResponse;
};






// Create a new date instance dynamically with JS
let d = new Date();
let newDate = ( d.getMonth() + 1)+'.'+ d.getDate()+'.'+ d.getFullYear();