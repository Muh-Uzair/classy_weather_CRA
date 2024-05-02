import React from "react";

class App extends React.Component {

  constructor(props) {
    super(props) ;

    this.state = { input_place : "Pakistan"}

    this.handle_form_submit = this.handle_form_submit.bind(this) ;

  }

  handle_form_submit(e) { 
    e.preventDefault() ;

   

    const {input_place} = this.state ;

    console.log(input_place) ;
    
  }


p
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
                    

          <p className="text_weather_for">WEATHER FOR LISBON</p>

          <section className="section_weather_result">section</section>

        </main>
            




      </div>
    )
  }


}

export default App ;