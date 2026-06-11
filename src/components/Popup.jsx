import React from "react";
import { motion } from "framer-motion";
import { Button, Logo } from "./index";

function Popup({ para, onConfirm, onCancel, isLoading = false }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.27 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
    >
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
          y: -20,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          scale: 0.95,
          y: -10,
        }}
        transition={{
          type: "spring",
          stiffness: 450,
          damping: 30,
        }}
        className="w-full max-w-sm bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl"
      >
        {/* Logo */}
        <div className="mb-4 flex justify-center">
          <span className="inline-flex items-center justify-center h-12">
            <Logo width="100%" />
          </span>
        </div>

        <p className="text-center text-gray-700 dark:text-gray-200 font-medium">
          {para}
        </p>

        <div className="flex justify-center gap-4 mt-6">
          <Button
            onClick={onCancel}
            disabled={isLoading}
            className="hover:bg-indigo-700 cursor-pointer"
          >
            No
          </Button>

          <Button
            onClick={onConfirm}
            isLoading={isLoading}
            className="hover:bg-indigo-700 cursor-pointer"
          >
            Yes
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Popup;
