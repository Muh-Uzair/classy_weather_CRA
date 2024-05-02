import React from "react";

class App extends React.Component {


  constructor(props) {
    super(props) ;

    this.state = { count : 5} ;

    this.handle_btn_decrement_click = this.handle_btn_decrement_click.bind(this) ;
    this.handle_btn_increment_click = this.handle_btn_increment_click.bind(this) ;

  }

  handle_btn_decrement_click() {
    this.setState( (curr_state) => {
      return{ count : curr_state.count-1} ;
    })
  }

  handle_btn_increment_click() {
    this.setState( (curr_state) => {
      return{ count : curr_state.count+1} ;
    })
    
  }


  render() {

    const date = new Date("june 10 2024") ;
    date.setDate(date.getDate() + this.state.count) ;

    return(

      <div className="div_containing_everything">
        <button className="btn_decrement" onClick={this.handle_btn_decrement_click}>-</button>
            <p> {date.toDateString()} [{this.state.count}]</p>
        <button className="btn_increment" onClick={this.handle_btn_increment_click}>+</button>
      </div>
    )
  }


}

export default App ;