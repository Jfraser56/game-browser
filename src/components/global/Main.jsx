import React from "react";
import { Route, Routes } from "react-router-dom";
import Discover from "../../pages/Discover";
import Calendar from "../../pages/Calendar";
import Games from "../../pages/Games";
import Platforms from "../../pages/Platforms";
import Stores from "../../pages/Stores";
import Developers from "../../pages/Developers";

const Main = () => {
  return (
    <div className="w-full h-screen px-9 lg:w-[calc(100%_-_15rem)]">
      <Routes>
        <Route path="/" element={<Discover />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/discover/:id" element={<Discover />} />
        <Route path="/release-calendar" element={<Calendar />} />
        <Route path="/games" element={<Games />} />
        <Route path="/games/:id" element={<Games />} />
        <Route path="/platforms" element={<Platforms />} />
        <Route path="/stores" element={<Stores />} />
        <Route path="/developers" element={<Developers />} />
      </Routes>
    </div>
  );
};

export default Main;
