"use client";
import * as React from "react";
import { motion } from "framer-motion";

export default function MouseCursor() {
  return (
    <span className="relative ">
      <motion.span
        role="none"
        className="absolute right-0 bottom-0  leading-1  w-0.6em h-0.6em c-cyan12 drop-shadow-2xl drop-shadow-color-black"
        animate={["initial"]}
        variants={{
          initial: {
            y: [3, 15, 12, 3],
            x: [0, 15, 1, 12],
            // rotate: [0 , 10 , 15],
            transition: {
              delay: 0.3,
              duration: 5,
              repeat: Infinity,
              // repeatDelay: 0.2,
              repeatType: "mirror",
            },
          },
        }}
      >
        <span className="grid">
          <span className='blur-20 opacity-40' style={{ gridArea: "1/1/-1/-1" }}>
            <PointerSVG />
          </span>
          <span style={{ gridArea: "1/1/-1/-1" }}>
            <PointerSVG />
          </span>
        </span>
      </motion.span>
    </span>
  );
}

function PointerSVG() {
  return (
    <svg className=" " viewBox="0 0 715 727" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M480.109 419.221L541.97 390.586C658.516 336.636 716.79 309.662 714.93 268.172C713.07 226.682 652.617 205.03 531.71 161.726L198.792 42.4868C94.354 5.08088 42.1349 -13.6221 14.4457 13.5169C-13.2435 40.6558 4.40758 93.2398 39.7098 198.408L39.7099 198.408L154.548 540.52C195.612 662.853 216.144 724.019 257.68 726.637C299.215 729.255 327.265 671.151 383.365 554.943L420.635 477.738L420.635 477.737C430.17 457.986 434.937 448.111 442.596 440.576C450.254 433.041 460.205 428.434 480.109 419.221Z"
        fill="currentColor"
      />
    </svg>
  );
}

const sleep = async (ms) => await new Promise((resolve) => setTimeout(resolve, ms));

function FloatingDiv({ delay }) {
  return (
    <motion.div
      style={{
        width: 150,
        height: 150,
        borderRadius: 8,
        margin: 10,
        backgroundColor: "#fff",
        // cursor: "pointer"
      }}
      animate={["initial"]}
      whileHover={["grow"]}
      variants={{
        grow: {
          scale: 1.1,
        },
        rotate: {
          rotate: [null, -5, 5, 0],
          transition: {
            // delay,
            duration: 10,
            // repeat: Infinity,
            // repeatDelay: 0.2,
            // repeatType: "reverse"
          },
        },
        initial: {
          y: [-20, 20],
          rotate: 0,
          transition: {
            delay,
            duration: 2,
            repeat: Infinity,
            // repeatDelay: 0.2,
            repeatType: "reverse",
          },
        },
      }}
    >
      <PointerSVG />
    </motion.div>
  );
}

function Example() {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <FloatingDiv delay={0.3} />
        <FloatingDiv delay={0.6} />
      </div>
    </div>
  );
}
