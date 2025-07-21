"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="px-6 py-12 max-w-3xl mx-auto text-white bg-black/60"
    >
      <h1 className="text-4xl font-bold mb-6">About Charmski</h1>
      <p className="mb-6 text-lg">
        Charmski is a project built to bring digital life to physical charm trades. Each charm comes with a scannable QR code that links to a shared digital memory, allowing you to upload photos, leave messages, and track a charm&apos;s journey through the hands of different owners. Whether you&apos;re trading charms at music festivals, conventions, or anywhere else, Charmski helps preserve and celebrate those connections.
      </p>

      <div className="mb-12 bg-gray-800 h-64 rounded-lg flex items-center justify-center text-gray-400">
        [ Placeholder for image or graphic 1 ]
      </div>

      <p className="mb-6 text-lg">
        This project was created with community, creativity, and memory-sharing in mind. Stay tuned for future updates that will introduce more interactive features, customization options, and ways to connect with fellow charmers! This current version was slapped together relatively quickly with Elements being the deadline in mind. Please share any feedback by participating in this survey or shooting us a message on Instagram!
      </p>

      <div className="mb-12 bg-gray-800 h-64 rounded-lg flex items-center justify-center text-gray-400">
        [ Placeholder for image or graphic 2 ]
      </div>
    </motion.div>
  );
}
