import React from "react";
import Header from "./components/global/Header";
import Main from "./components/global/Main";
import AsideNav from "./components/global/AsideNav";
import Footer from "./components/global/Footer";
import { useSelector } from "react-redux";

function App() {
  const { backgroundImage, viewingScreenshot } = useSelector(
    (store) => store.gameDetails
  );

  return (
    <div
      style={{
        background:
          backgroundImage &&
          `linear-gradient(rgba(20,20,20,0.75), rgba(20,20,20,1) 40vw), url(${backgroundImage}) top/contain no-repeat`,
      }}
      className={`flex flex-col bg-primary-content overflow-x-hidden ${
        viewingScreenshot && "h-screen overflow-hidden"
      }`}
    >
      <Header />
      <section className="h-full w-full flex">
        <AsideNav />
        <Main />
      </section>
      <Footer />
    </div>
  );
}

export default App;
