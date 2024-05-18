import React from "react";
import ReactDOM from "react-dom/client";

//element
const Heading = () => <h1 id="head">React element</h1>;

//functional component

const HeadingComponent = () => {
  return (
    <div id="container">
      <Heading />
      <h1 id="heading">React Functional Component</h1>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<HeadingComponent />);
