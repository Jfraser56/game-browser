import React from "react";

const Footer = () => {
  return (
    <div className="flex flex-col justify-evenly items-center w-full h-20 border-t border-white/30">
      <div>
        <span className="font-bold tracking-wide">GAME.REV </span>
        &copy;2022
      </div>
      <div className="text-xs">
        A RAWG.io clone by{" "}
        <a
          className="underline"
          href="https://jfraser56.github.io/"
          target="_blank"
        >
          John Fraser
        </a>
      </div>
      <span className="text-xs text-white/30">
        All data sourced from the{" "}
        <a className="underline" href="https://rawg.io/apidocs" target="_blank">
          RAWG.io
        </a>{" "}
        API
      </span>
    </div>
  );
};

export default Footer;
