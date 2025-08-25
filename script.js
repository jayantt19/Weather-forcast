const cityInput=document.querySelector('.city-input')
const searchBtn=document.querySelector('.search-btn')
const apikey='2581de31fbee39b044dcb79b59565dd8'

const weatherInfoSection=document.querySelector('.weather-info')
const notFoundSection = document.querySelector('.not-found')
const searchCitySection= document.querySelector('.search-city')


const countryTxt=document.querySelector('.country-txt')
const tempTxt=document.querySelector('.temp-txt')
const conditionTxt=document.querySelector('.condition-txt')
const humidityValueTxt=document.querySelector('.humidity-value-txt')
const windValueTxt=document.querySelector('.wind-value-txt')
const weatherSummarImg=document.querySelector('.weather-summary-img')
const currentDateTxt=document.querySelector('.current-date-txt')

searchBtn.addEventListener('click',()=>{
    if(cityInput.value.trim()!=''){
       updateWeatherInfo(cityInput.value)
        cityInput.value=''
        cityInput.blur()
    }
})
cityInput.addEventListener('keydown',(event)=>{
    if(event.key=='Enter' &&
        cityInput.value.trim()!=''
    ){
        updateWeatherInfo(cityInput.value)
        cityInput.value=''
        cityInput.blur()
    }
})
async function getFetchData(endPoint, city){
 const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apikey}&units=metric`
 const response = await fetch(apiUrl)
 return response.json()
}
function getWeatherIcon(id){
 if(id<=232) return 'thunderstorm.svg'
  if(id<=321) return 'drizzle.svg'
  if(id<=531) return 'rain.svg'
  if(id<=622) return 'snow.svg'
  if(id<=781) return 'atmosphere.svg'
  if(id<=800) return 'clear.svg'
  else  return 'clouds.svg'
}

function getCurrentDate(){
    const currentDate= new Date()
    const option = {
     weekday: 'short',
     day:'2-digit',
     month:'short'
    }
    return currentDate.toLocaleDateString('en-GB', option)
}


async function updateWeatherInfo(city){
    const WeatherData=await getFetchData('weather',city)
    if(WeatherData.cod!=200){
        showDisplaySection(notFoundSection)
        return
    }
    console.log(WeatherData)

    const {
        name:country,
        main:{ temp,humidity},
        weather:[{ id ,main }],
        wind:{speed}
    }= WeatherData

  countryTxt.textContent = country
  tempTxt.textContent = Math.round(temp) + ' °C'
  conditionTxt.textContent=main
  humidityValueTxt.textContent=humidity + ' %'
  windValueTxt.textContent=speed + ' M/s'
   currentDateTxt.textContent=getCurrentDate()
  weatherSummarImg.src=`assets/weather/${getWeatherIcon(id)}`

  await updateForecastInfo()
    showDisplaySection(weatherInfoSection)
}
  async function updateForecastInfo(city){
    const forecastsData= await getFetchData('forecast',city)
    const timeTaken='12:00:00'
    const todayDate=new Date().toISOString().split('T')[0]
    forecastsData.list.forEach(forecastWeather => {
        console.log(forecastWeather)
    })
  }

function showDisplaySection(section){
   [weatherInfoSection,searchCitySection,notFoundSection]
       .forEach(section => section.style.display='none')
       section.style.display='flex'
}