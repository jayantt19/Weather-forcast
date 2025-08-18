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
    showDisplaySection(weatherInfoSection)
}
function showDisplaySection(section){
   [weatherInfoSection,searchCitySection,notFoundSection]
       .forEach(section => section.style.display='none')
   
       section.style.display='flex'
}