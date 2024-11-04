"use client";

import React from "react";
import { BadgePlus } from "lucide-react";
import { motion } from "framer-motion";

const AnimatedBadgePlus = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 0, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <BadgePlus size={14} className="text-blue-600" />
      </motion.div>
    </motion.div>
  );
};

const PlusAnimation = () => {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        repeatType: "loop",
        times: [0, 0.2, 1],
      }}
    >
      <div className="w-6 h-0.5 bg-blue-600 absolute"></div>
      <div className="w-0.5 h-6 bg-blue-600 absolute"></div>
    </motion.div>
  );
};

export default function AnimatedBadgePlusIcon() {
  return (
    <div>
      <AnimatedBadgePlus />
    </div>
  );
}
