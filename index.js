// taking latitude and longitude input from user
  let lat=document.querySelector("#lat");
  let long=document.querySelector("#long");

//   getting current location latitude and longitude ,calling two funtion onPositionGathered :- passing pos object , onPositionGatherError if some error occur during position fetching
const getUserLocation =()=>{
    if(navigator.geolocation){
   navigator.geolocation.getCurrentPosition(onPositionGathered,onPositionGatherError);
    }else{
onPositionGatherError({message:"can't access location . enter you cordinate"});
    }
}


const onPositionGathered=pos=>{
  let lat=pos.coords.latitude.toFixed(4);
  let lon=pos.coords.longitude.toFixed(4);

 
  getAirquality(lat,lon);


}
const onPositionGatherError=(e)=>{
    console.log(e.message);
}
// scrollToTop when we click on btn
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
// variable co,no2,pm
let co=document.querySelector('#co');
let no2=document.querySelector('#no2');
let o3=document.querySelector('#o3');
let pm10=document.querySelector('#pm10');
let pm25=document.querySelector('#pm25');
let so2=document.querySelector('#so2');


// all think required:- declaring all variable which we required
let city=document.querySelector('#cityName');
let aqi=document.querySelector(".aqiValue");
console.log(city,aqi);
let current=document.querySelector("#current");
let use=document.querySelector("#user")
console.log(use,current);

// modal variable declaration
let box=document.querySelector(".show_model");
let overlap=document.querySelector("#overlap");
let close=document.querySelector(".close");


// fetching API using Fetch method with passing lat and lon
const getAirquality=async (lat,lon)=>{
    
    const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': 'd62612ab98mshc86f8737967bb88p1b8586jsn84ec788e3c27',
                    'X-RapidAPI-Host': 'air-quality.p.rapidapi.com'
                }
            };
            
            fetch(`https://air-quality.p.rapidapi.com/history/airquality?lon=${lon}&lat=${lat}`, options)
                .then(response => response.json())
                .then(information => {
                    scrollToTop();
                    city.innerHTML=`${information.city_name}`;
                    aqi.innerHTML=`${information.data[0].aqi}`;
                    overlap.classList.remove("hidden");
                    box.classList.remove("hidden");
                    co.innerHTML=`${information.data[0].co}`;
                    no2.innerHTML=`${information.data[0].no2}`;
                    o3.innerHTML=`${information.data[0].o3}`;
                    pm10.innerHTML=`${information.data[0].pm10}`;
                    pm25.innerHTML=`${information.data[0].pm25}`;
                    so2.innerHTML=`${information.data[0].so2}`
                    
                    
                })
                .catch(err => console.log(err));
   
}



// modal closing button 
close.addEventListener('click',function(){
    overlap.classList.add("hidden");
      box.classList.add("hidden");
})



// AQI at current index
current.addEventListener("click",function(){
    getUserLocation();
})

// AQI for given input from user
use.addEventListener("click",function(){
getAirquality(lat.value,long.value);
setTimeout(() => {
    lat.value="";
long.value="";
}, 300);

})

// move the check to given box layout
let eleme=document.querySelector(".air-index");
function scrollToDown() {
    var divPosition = eleme.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top: divPosition, behavior: 'smooth' });
  }
let checkNow=document.querySelector("#checkNOW");
console.log(checkNow);
checkNow.addEventListener('click',function(){
    scrollToDown();
})