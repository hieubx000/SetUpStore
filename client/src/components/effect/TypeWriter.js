import React from "react";
import Typewriter from "typewriter-effect";

function TypeWriter({ text }) {
  return (
    <Typewriter
      options={{
        strings: text,
        autoStart: true,
        loop: true,
      }}
    />
  );
}

export default TypeWriter;
