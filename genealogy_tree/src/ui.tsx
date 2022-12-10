import * as React from "react";
import * as ReactDOM from "react-dom";
import "./ui.css";

declare function require(path: string): any;

function App() {
  const onDebug = () => {
    parent.postMessage({ pluginMessage: { type: "debug" } }, "*");
  };

  const onClean = () => {
    parent.postMessage({ pluginMessage: { type: "clean-family-tree" } }, "*");
  };

  const onGenerate = () => {
    parent.postMessage({ pluginMessage: { type: "generate-family-tree" } }, "*");
  };

  const onCancel = () => {
    parent.postMessage({ pluginMessage: { type: "cancel" } }, "*");
  };

  return (
    <main>
      <header>
        <img src={require("./logo.svg")} />
        <h2>FamilyTree Generator</h2>
      </header>
      <section>
        <button className="brand" onClick={onDebug}>
          Debug
        </button>
        <button className="brand" onClick={onClean}>
          Clean
        </button>
      </section>
      <footer>
        <button className="brand" onClick={onGenerate}>
          Generate
        </button>
        <button onClick={onCancel}>Cancel</button>
      </footer>
    </main>
  );
}

ReactDOM.render(<App />, document.getElementById("react-page"));
