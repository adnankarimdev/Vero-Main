"use client";

import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Save } from "lucide-react";

export default function AnimatedSaveIcon() {
  const [key, setKey] = useState(0);
  const controls = useAnimation();

  const iconVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { type: "spring", duration: 1.5, bounce: 0 },
        opacity: { duration: 0.01 },
      },
    },
  };

  useEffect(() => {
    const animateIcon = async () => {
      await controls.start("visible");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await controls.start("hidden");
      setKey((prevKey) => prevKey + 1);
    };

    animateIcon();
  }, [controls, key]);

  return (
    <motion.svg
      key={key}
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="url(#gradient)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial="hidden"
      animate={controls}
    >
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4F46E5" />
          <stop offset="50%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#DB2777" />
        </linearGradient>
      </defs>
      <motion.path
        d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"
        variants={iconVariants}
      />
      <motion.polyline points="17 21 17 13 7 13 7 21" variants={iconVariants} />
      <motion.polyline points="7 3 7 8 15 8" variants={iconVariants} />
    </motion.svg>
  );
}
