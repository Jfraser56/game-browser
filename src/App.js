import React from "react";
import Header from "./components/Header";
import Main from "./components/Main";

function App() {
  return (
    <div className="w-screen h-screen flex flex-col py-5">
      <Header />
      <Main />
    </div>
  );
}

export default App;
