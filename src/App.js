import React from "react";



////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
function getWeatherIcon(wmoCode) {
  const icons = new Map([
    [[0], "☀️"],
    [[1], "🌤"],
    [[2], "⛅️"],
    [[3], "☁️"],
    [[45, 48], "🌫"],
    [[51, 56, 61, 66, 80], "🌦"],
    [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
    [[71, 73, 75, 77, 85, 86], "🌨"],
    [[95], "🌩"],
    [[96, 99], "⛈"],
  ]);
  const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
  if (!arr) return "NOT FOUND";
  return icons.get(arr);
}
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
function convertToFlag(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
function formatDay(dateStr) {
  return new Intl.DateTimeFormat("en", {
    weekday: "short",
  }).format(new Date(dateStr));
}
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
class App extends React.Component {

  constructor(props) {
    super(props) ;

    this.state = { 
      input_place : "" ,
      is_loading : false ,
      weather:{} ,
      weather_place : "" ,
    }

    this.handle_form_submit = this.handle_form_submit.bind(this) ;

  }

  async handle_form_submit(e) { 
    e.preventDefault() ;

    const {input_place} = this.state ;


    try {
          // 1) Getting location (geocoding) / get response // getting location of the place we passed because 
          // we need that to fetch data for weather 
          this.setState({ is_loading : true} ) ;
          const geoRes = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${input_place}`
          );

          // 2: get data for that response
          const geoData = await geoRes.json();
          // console.log(geoData);

          
          
          // 3: if there is no data then throe error 
          if (!geoData.results) throw new Error("Location not found");
      
          // 4: if there is data then get lat lng etc for that place 
          const { latitude, longitude, timezone, name, country_code } =
            geoData.results.at(0);
          console.log();

          this.setState({ weather_place : `${name} ${convertToFlag(country_code)}`}) ;
      


          // 2) Getting actual weather // getting weather data for the location we passed
          const weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
          );
          const weatherData = await weatherRes.json();
          this.setState({ weather : weatherData.daily} )


    } 
    catch (err) {
      console.log(err);
    }
    finally{
      this.setState({ is_loading : false} ) ;
    }
  


    
  }



  render() {

    return(

      <div className="div_containing_everything">



        <main className="main_box">

          <h4 className="heading_classy_weather">
            CLASSY WEATHER
          </h4>

          <form className="form_input" onSubmit={this.handle_form_submit}>

            <input className="input_place_for_search" type="text" 
            placeholder="Enter place"
            value={this.state.input_place}
            onChange={(e) => this.setState({ input_place : e.target.value})}

            ></input>  
          </form>
                    

          <p className="text_weather_for"> 
          
           
          {this.state.is_loading && `LOADING...` }
          {!this.state.input_place &&  `ENTER A PLACE FOR WEATHER` }
          {this.state.input_place && !this.state.is_loading && `WEATHER FOR ${(this.state.input_place).toUpperCase() }`}

          
          </p>

          <section className="section_weather_result">
            {this.state.weather.weathercode && <Weather weather={ this.state.weather  }/> }
            
          </section>

        </main>
            
      </div>
    )
  }

}



class Weather extends React.Component {

  


  render() {

    

    const {
      temperature_2m_max : max_temp ,
      temperature_2m_min : min_temp ,
      time : dates , 
      weathercode ,
    } = this.props.weather ;


    

    // console.log(max_temp) ;
    // console.log(min_temp) ;
    // console.log(dates) ;
    // console.log(weathercode)
    

    return(
      <div className="div_ul_weather">
        <ul className="weather">{dates.map( (val , i) => (

          <li className="day" key={dates[i]}> 
             <span>{weathercode[i]}</span>
             <p>{dates[i]}</p>
             <p>{Math.floor(min_temp[i])}&deg; &mdash; <strong>{Math.ceil(max_temp[i])}&deg;</strong></p>
          </li>
        ) )
        }

        </ul>
                
      </div>
    )
  }
}





















export default App ;