import { useEffect, useState } from 'react'
import './App.css'


const popularcities = [
  "Abidjan", "Abu Dhabi", "Abuja", "Accra", "Addis Ababa",
  "Ahmedabad", "Alexandria", "Algiers", "Allahabad", "Amman",
  "Amritsar", "Amsterdam", "Ankara", "Auckland", "Austin",
  "Baku", "Bamako", "Bandung", "Bangalore", "Bangkok",
  "Barcelona", "Barranquilla", "Basra", "Beijing", "Beirut",
  "Bekasi", "Belgrade", "Belo Horizonte", "Berlin", "Bogotá",
  "Brasília", "Brazzaville", "Brisbane", "Brussels", "Bucharest",
  "Budapest", "Buenos Aires", "Busan", "Cairo", "Calgary",
  "Cali", "Caloocan", "Campinas", "Cape Town", "Caracas",
  "Casablanca", "Changchun", "Changsha", "Chaozhou", "Chengdu",
  "Chennai", "Chicago", "Chittagong", "Chongqing", "Cologne",
  "Conakry", "Copenhagen", "Curitiba", "Daegu", "Daejeon",
  "Dakar", "Dalian", "Dallas", "Dar es Salaam", "Delhi",
  "Dhaka", "Dongguan", "Douala", "Dubai", "Durban",
  "Ecatepec", "Faisalabad", "Fortaleza", "Foshan", "Fukuoka",
  "Fuzhou", "Giza", "Guadalajara", "Guangzhou", "Guatemala City",
  "Guayaquil", "Gujranwala", "Gwangju", "Hamburg", "Hangzhou",
  "Hanoi", "Harare", "Harbin", "Havana", "Hefei",
  "Hiroshima", "Ho Chi Minh City", "Hong Kong", "Houston", "Hyderabad",
  "Hyderabad", "Ibadan", "Incheon", "Isfahan", "Islamabad",
  "Istanbul", "İzmir", "Jaipur", "Jakarta", "Jeddah",
  "Jinan", "Johannesburg", "Kabul", "Kaduna", "Kampala",
  "Kano", "Kanpur", "Kaohsiung", "Karachi", "Karaj",
  "Kathmandu", "Kawasaki", "Kharkiv", "Khartoum", "Kinshasa",
  "Kobe", "Kolkata", "Kuala Lumpur", "Kuwait City", "Kyiv",
  "Lagos", "Lahore", "Lanzhou", "Lima", "London",
  "Los Angeles", "Luanda", "Lucknow", "Lusaka", "Madrid",
  "Makassar", "Managua", "Manaus", "Manila", "Maputo",
  "Maracaibo", "Mashhad", "Medan", "Medellín", "Melbourne",
  "Mexico City", "Miami", "Milan", "Minsk", "Montevideo",
  "Montréal", "Moscow", "Mumbai", "Munich", "Nagoya",
  "Nagpur", "Nairobi", "Nanjing", "New York City", "Ningbo",
  "Nizhny Novgorod", "Novosibirsk", "Omsk", "Osaka", "Ouagadougou",
  "Palembang", "Paris", "Patna", "Peshawar", "Philadelphia",
  "Phnom Penh", "Phoenix", "Porto Alegre", "Prague", "Pretoria",
  "Pune", "Pyongyang", "Qingdao", "Qom", "Quanzhou",
  "Quezon City", "Quito", "Rawalpindi", "Recife", "Rio de Janeiro",
  "Riyadh", "Rome", "Rosario", "Rostov-on-Don", "Saint Petersburg",
  "Saitama", "Salvador", "San Antonio", "San Diego", "San Francisco",
  "Sana'a", "Santiago", "São Paulo", "Sapporo", "Semarang",
  "Seoul", "Shanghai", "Shantou", "Shenyang", "Shenzhen",
  "Shijiazhuang", "Singapore", "Sofia", "Surabaya", "Surat",
  "Suwon", "Sydney", "Tabriz", "Taipei", "Tallinn",
  "Tangerang", "Tashkent", "Tbilisi", "Tehran", "Tel Aviv",
  "Tianjin", "Tijuana", "Tokyo", "Toronto", "Tunis",
  "Ulsan", "Vienna", "Vijayawada", "Vladivostok", "Warsaw",
  "Wenzhou", "Wuhan", "Xi'an", "Xiamen", "Yangon",
  "Yaoundé", "Yekaterinburg", "Yokohama", "Zhengzhou", "Zhongshan"
]
function App() {
  const [choosen, setChoosen] = useState("")
  const [weatherData, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleCityChange = (e) => {
    const city = e.target.value
    setChoosen(city)    
  }

useEffect(()=>{
  if (!choosen) return;
  setLoading(true)
 fetch(`https://api.openweathermap.org/data/2.5/weather?q=${choosen}&appid=2927b0875c0517f4fabc5a8c1df7bc46&units=metric`)
.then((res)=>res.json())
.then((res)=>{
  setWeather(res)
  setLoading(false)
})
},[choosen])

console.log(weatherData)

const type = weatherData?.weather[0].description
const temp = Math.round(weatherData?.main.temp) 
const feelslike = Math.round(weatherData?.main.feels_like) 

  return (
    <div>
      <div className='flex justify-center items-center flex-col'>
        <h1 className='mb-4 text-5xl font-bold'>🌤️ Weather App</h1>
        <select
          className='border border-1px px-3 py-4 text-2xl mb-10'
          onChange={handleCityChange}
          value={choosen}
        >
          <option value="">Select a City</option>
          {
            popularcities.map((city, ind) => (
              <option value={city} key={ind}>{city}</option>

            ))

          }

        </select>

          <div className='h-80  p-10 bg-gray-200 flex flex-col justifu-center items-center'>
            {
              loading?(
              <div><h1 className=''>Loading...</h1></div> 
            )
            
              :
              (
               <img 
            src={`https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png
`}
             />)
            }

            <p className='text-5xl text-black font-bold mb-3'>{type}</p>
            <p className='text-2xl '>{temp}°C (feels like: {feelslike}°C)</p>
            <div>
              <p></p>
            </div>
           
          </div>

      </div>
    </div>
  )
}

export default App

// import { useState } from 'react'
// import './App.css'

// const popularcities = [
//    "Abidjan", "Abu Dhabi", "Abuja", "Accra", "Addis Ababa", 
//     "Ahmedabad", "Alexandria", "Algiers", "Allahabad", "Amman", 
//     "Amritsar", "Amsterdam", "Ankara", "Auckland", "Austin", 
//     "Baku", "Bamako", "Bandung", "Bangalore", "Bangkok", 
//     "Barcelona", "Barranquilla", "Basra", "Beijing", "Beirut", 
//     "Bekasi", "Belgrade", "Belo Horizonte", "Berlin", "Bogotá", 
//     "Brasília", "Brazzaville", "Brisbane", "Brussels", "Bucharest", 
//     "Budapest", "Buenos Aires", "Busan", "Cairo", "Calgary", 
//     "Cali", "Caloocan", "Campinas", "Cape Town", "Caracas", 
//     "Casablanca", "Changchun", "Changsha", "Chaozhou", "Chengdu", 
//     "Chennai", "Chicago", "Chittagong", "Chongqing", "Cologne", 
//     "Conakry", "Copenhagen", "Curitiba", "Daegu", "Daejeon", 
//     "Dakar", "Dalian", "Dallas", "Dar es Salaam", "Delhi", 
//     "Dhaka", "Dongguan", "Douala", "Dubai", "Durban", 
//     "Ecatepec", "Faisalabad", "Fortaleza", "Foshan", "Fukuoka", 
//     "Fuzhou", "Giza", "Guadalajara", "Guangzhou", "Guatemala City", 
//     "Guayaquil", "Gujranwala", "Gwangju", "Hamburg", "Hangzhou", 
//     "Hanoi", "Harare", "Harbin", "Havana", "Hefei", 
//     "Hiroshima", "Ho Chi Minh City", "Hong Kong", "Houston", "Hyderabad", 
//     "Hyderabad", "Ibadan", "Incheon", "Isfahan", "Islamabad", 
//     "Istanbul", "İzmir", "Jaipur", "Jakarta", "Jeddah", 
//     "Jinan", "Johannesburg", "Kabul", "Kaduna", "Kampala", 
//     "Kano", "Kanpur", "Kaohsiung", "Karachi", "Karaj", 
//     "Kathmandu", "Kawasaki", "Kharkiv", "Khartoum", "Kinshasa", 
//     "Kobe", "Kolkata", "Kuala Lumpur", "Kuwait City", "Kyiv", 
//     "Lagos", "Lahore", "Lanzhou", "Lima", "London", 
//     "Los Angeles", "Luanda", "Lucknow", "Lusaka", "Madrid", 
//     "Makassar", "Managua", "Manaus", "Manila", "Maputo", 
//     "Maracaibo", "Mashhad", "Medan", "Medellín", "Melbourne", 
//     "Mexico City", "Miami", "Milan", "Minsk", "Montevideo", 
//     "Montréal", "Moscow", "Mumbai", "Munich", "Nagoya", 
//     "Nagpur", "Nairobi", "Nanjing", "New York City", "Ningbo", 
//     "Nizhny Novgorod", "Novosibirsk", "Omsk", "Osaka", "Ouagadougou", 
//     "Palembang", "Paris", "Patna", "Peshawar", "Philadelphia", 
//     "Phnom Penh", "Phoenix", "Porto Alegre", "Prague", "Pretoria", 
//     "Pune", "Pyongyang", "Qingdao", "Qom", "Quanzhou", 
//     "Quezon City", "Quito", "Rawalpindi", "Recife", "Rio de Janeiro", 
//     "Riyadh", "Rome", "Rosario", "Rostov-on-Don", "Saint Petersburg", 
//     "Saitama", "Salvador", "San Antonio", "San Diego", "San Francisco", 
//     "Sana'a", "Santiago", "São Paulo", "Sapporo", "Semarang", 
//     "Seoul", "Shanghai", "Shantou", "Shenyang", "Shenzhen", 
//     "Shijiazhuang", "Singapore", "Sofia", "Surabaya", "Surat", 
//     "Suwon", "Sydney", "Tabriz", "Taipei", "Tallinn", 
//     "Tangerang", "Tashkent", "Tbilisi", "Tehran", "Tel Aviv", 
//     "Tianjin", "Tijuana", "Tokyo", "Toronto", "Tunis", 
//     "Ulsan", "Vienna", "Vijayawada", "Vladivostok", "Warsaw", 
//     "Wenzhou", "Wuhan", "Xi'an", "Xiamen", "Yangon", 
//     "Yaoundé", "Yekaterinburg", "Yokohama", "Zhengzhou", "Zhongshan"
// ]

// function App() {
//   const [choosen, setChoosen] = useState("") // default as empty string or a city name

//   const handleCityChange = (e) => {
//     setChoosen(e.target.value)
//   }

//   return (
//     <div>
//       <div className='flex justify-center items-center'>
//         <h1>Weather App</h1>
//         <select onChange={handleCityChange} value={choosen}>
//           <option value="">Select a City</option>
//           {
//             popularcities.map((data, ind) => (
//               <option key={ind} value={data}>
//                 {data}
//               </option>
//             ))
//           }
//         </select>
//       </div>
//     </div>
//   )
// }

// export default App



// --------------------------------------------------------

// import { useEffect, useState } from 'react'
// import './App.css'

// const popularcities = [
//   "Abidjan", "Abu Dhabi", "Accra", "Addis Ababa", "Ahmedabad",
//   "Alexandria", "Algiers", "Amman", "Amsterdam", "Ankara",
//   "Auckland", "Austin", "Baku", "Bangkok", "Barcelona",
//   "Beijing", "Beirut", "Belgrade", "Berlin", "Bogotá",
//   "Brisbane", "Brussels", "Bucharest", "Budapest", "Buenos Aires",
//   "Cairo", "Cape Town", "Caracas", "Casablanca", "Chennai",
//   "Chicago", "Cologne", "Copenhagen", "Delhi", "Dhaka",
//   "Dubai", "Durban", "Faisalabad", "Guangzhou", "Hong Kong",
//   "Houston", "Istanbul", "Jakarta", "Jeddah", "Johannesburg",
//   "Karachi", "Kathmandu", "Kolkata", "Kuala Lumpur", "Lahore",
//   "London", "Los Angeles", "Madrid", "Manila", "Melbourne",
//   "Mexico City", "Miami", "Milan", "Montreal", "Moscow",
//   "Mumbai", "Munich", "Nairobi", "New York City", "Osaka",
//   "Paris", "Peshawar", "Prague", "Quezon City", "Rio de Janeiro",
//   "Rome", "San Francisco", "Santiago", "São Paulo", "Seoul",
//   "Shanghai", "Singapore", "Sydney", "Tehran", "Tokyo",
//   "Toronto", "Vienna", "Warsaw", "Washington", "Zürich"
// ]

// function App() {
//   const [choosen, setChoosen] = useState("")
//   const [weatherData, setWeather] = useState(null)

//   const handleCityChange = (e) => {
//     const city = e.target.value
//     setChoosen(city)
//   }

//   useEffect(() => {
//     if (choosen) {
//       fetch(`https://api.openweathermap.org/data/2.5/weather?q=${choosen}&appid=2927b0875c0517f4fabc5a8c1df7bc46&units=metric`)
//         .then((res) => res.json())
//         .then((res) => {
//           if (res.cod === 200) {
//             setWeather(res)
//           } else {
//             setWeather(null)
//             console.warn("API Error:", res.message)
//           }
//         })
//         .catch((err) => console.error("Fetch error:", err))
//     }
//   }, [choosen])

//   return (
//     <div className='flex justify-center items-center flex-col p-4'>
//       <h1 className='mb-4 text-4xl font-bold'>🌤️ Weather App</h1>

//       <select
//         className='border px-4 py-2 mb-6 text-xl'
//         onChange={handleCityChange}
//         value={choosen}
//       >
//         <option value="">Select a City</option>
//         {popularcities.map((city, index) => (
//           <option key={index} value={city}>
//             {city}
//           </option>
//         ))}
//       </select>

//       {weatherData && (
//         <div className='w-80 h-auto bg-blue-100 p-4 rounded shadow text-center'>
//           <h2 className='text-2xl font-semibold mb-2'>{weatherData.name}</h2>
//           <img
//             src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
//             alt={weatherData.weather[0].description}
//             className='mx-auto'
//           />
//           <p className='text-lg mt-2'>🌡️ Temp: {weatherData.main.temp}°C</p>
//           <p className='text-lg'>🌥️ Condition: {weatherData.weather[0].description}</p>
//           <p className='text-lg'>💧 Humidity: {weatherData.main.humidity}%</p>
//         </div>
//       )}
//     </div>
//   )
// }

// export default App


