import React from "react";
import Header from "./components/global/Header";
import Main from "./components/global/Main";
import AsideNav from "./components/global/AsideNav";

function App() {
  return (
    <div className="flex flex-col bg-primary-content">
      <Header />
      <section className="h-full w-full flex">
        <AsideNav />
        <Main />
      </section>
    </div>
  );
}

export default App;
