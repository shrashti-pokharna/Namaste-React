//create ELement will create an element  using basic React Library createElement(tagName, attributes, content)
const heading = React.createElement(
  "h1",
  { id: "heading", className: "heading1" },
  "Hello world from React"
);
console.log(heading); // it will gives us not an html tag rather than it gives us a react javascript object

/*
 * for nested element
 */

const parent = React.createElement(
  "div",
  { id: "parent" },
  React.createElement("div", { id: "child" }, [
    React.createElement("h1", {}, "I'm a h1 tag"),
    React.createElement("h2", {}, "I'm a h2 tag"),
  ])
);

//REactDOM will create a main root for our code to put the elements into the browser
const root = ReactDOM.createRoot(document.getElementById("root"));
//render() it will render our element that we have created
root.render(parent);
