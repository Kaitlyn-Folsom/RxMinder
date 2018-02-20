import React from 'react';
import "./Clock.css"

class Clock extends React.Component {
  constructor(props) {

    let day;
    switch (new Date().getDay()) {
        case 0:
            day = "Sunday";
            break;
        case 1:
            day = "Monday";
            break;
        case 2:
            day = "Tuesday";
            break;
        case 3:
            day = "Wednesday";
            break;
        case 4:
            day = "Thursday";
            break;
        case 5:
            day = "Friday";
            break;
        case 6:
            day = "Saturday";
            break;
        default:
    }

    super(props);
    this.state = {
      time: new Date().toLocaleString(),
      day: day
    };

  }
  componentDidMount() {
    this.intervalID = setInterval(
      () => this.tick(),
      1000
    );
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  tick() {
    this.setState({
      time: new Date().toLocaleString()
    });
  }
  render() {
    return (
      <h2 className="App-clock">
        Today is {this.state.day} {this.state.time}.
      </h2>
    );
  }
} 

export default Clock;
