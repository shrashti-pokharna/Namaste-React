import React from "react";

class Offers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      count1: 0,
    };
  }

  render() {
    return (
      <div>
        <h1>{this.props.name}</h1>
        <h2>Count : {this.state.count}</h2>
        <h2>Count 1: {this.state.count1}</h2>
        <button
          onClick={() => {
            this.setState({ count: this.state.count + 1 });
          }}
        >
          Increase Count
        </button>
        <button
          onClick={() => {
            this.setState({ count1: this.state.count1 + 1 });
          }}
        >
          Increase Count1
        </button>
      </div>
    );
  }
}

export default Offers;
