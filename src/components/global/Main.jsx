import { Route, Routes, useLocation } from "react-router-dom";
import Discover from "../../pages/Discover";
import Calendar from "../../pages/Calendar";
import Games from "../../pages/Games";
import Platforms from "../../pages/Platforms";
import Stores from "../../pages/Stores";
import Developers from "../../pages/Developers";
import Game from "../shared/Game";
import NotFound from "../../pages/NotFound";
import GameAchievements from "../../pages/GameAchievements";
import GameScreenshots from "../../pages/GameScreenshots";

const Main = () => {
  return (
    <div className="hide-scrollbar w-full h-auto lg:h-[60rem] px-4 py-8 md:px-9 lg:w-[calc(100%_-_15rem)] overflow-y-scroll">
      <Routes>
        <Route path="/" element={<Discover />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/discover/:id" element={<Discover />} />
        <Route path="/release-calendar" element={<Calendar />} />
        <Route path="/games" element={<Games />} />
        <Route path="/games/:filter/:id" element={<Games />} />
        <Route path="/games/:id/achievements" element={<GameAchievements />} />
        <Route path="/games/:id/screenshots" element={<GameScreenshots />} />
        <Route path="/platforms" element={<Platforms />} />
        <Route path="/stores" element={<Stores />} />
        <Route path="/developers" element={<Developers />} />
        <Route path="/game/:id" element={<Game />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default Main;
