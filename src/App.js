import { useState,useEffect } from 'react';
import axios from 'axios';
import './App.css';

//Api call for selecting countries and cities
function App(){
  
  const [countries,setCountries] = useState([]);
  const [singleCountry,setSingleCountry] = useState("");
  const [cities,setCities] = useState(null);
  const [singleCity, setSingleCity] = useState("");
  const [submit, setSubmit] = useState(false)

  const fetchCountries = async () => {
    try{
      const country = await axios.get('https://countriesnow.space/api/v0.1/countries');
      setCountries(country.data.data);
    }
    catch(error){
      console.log(error)
    }
  }

  const fetchCities = (country) => {
    setSubmit(false);
    setSingleCity(null);
    setSingleCountry(country);
    const findCities = countries.find((c) => c.country === country)
    setCities(findCities.cities);

  }

  const submitHandler = () => {
    if (singleCountry && singleCity)
      {setSubmit(true)}
  }

  useEffect(() => {
    fetchCountries();
  },[])
  
  return(
    <div className='App'>
      
      <div className='container'>
      <h3>Countries and Cities</h3>
      {countries && (
      
        <select onChange={(e) => fetchCities(e.target.value)} value={singleCountry}>
          <option selected disabled hidden>Select Country</option>
        
        {
          countries.map((country) => (
            <option key={`${country.country}-${Date.now()}`} value={country.country}>{country.country}</option>
          )
        )
        }

        </select>
      )}

      { cities && 
        <select onChange={(e) => setSingleCity(e.target.value)} value={singleCity} >
          <option selected disabled hidden>Select City</option>
          {cities.map((city) => (
            <option value={city} key={city}>{city}</option>
          )
          )}
        </select>
      }
        <button onClick={submitHandler}>Go</button>

        {submit && 
        <h3>Your country is {singleCountry} and your city is {singleCity}</h3>
        }
      </div>
    </div>
  )
}

//Simple Api call using axios
// function App() {

//   const [userDetail,setUserDetail] = useState()

//   const user = async () => {
//     try {
//       const details = await axios.get("https://randomuser.me/api");
//       console.log(details.data.results[0]);
//       setUserDetail(details.data.results[0]);
      
//     }
//     catch(error){
//       console.log(error);
//     }
//   }
  
//   useEffect(() => {
//     user();
//   },[])

//   return (
//     <div className="App">
//     {userDetail && <img src={userDetail.picture.medium} alt="Error" />}
//     </div>
//   );
// }

export default App;
