"use client";

import React from "react";
import { Wand2 } from "lucide-react";
import { motion } from "framer-motion";

const AnimatedWand = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <motion.div
        animate={{
          rotate: [0, 20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <Wand2 size={14} className="text-yellow-600" />
      </motion.div>
    </motion.div>
  );
};

export default function AnimatedWandIcon() {
  return <AnimatedWand />;
}
