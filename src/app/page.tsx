'use client';

import  SplitText  from "@/components/SplitText";
import StarBorder from "@/components/StarBorder";
import CountUp from "@/components/CountUp";
import { motion } from 'framer-motion';
import { useEffect, useState } from "react";


export default function Home() {
  const [tradeCount, setTradeCount] = useState(0);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SCANDI_BACKEND_URL}api/stats/trade-count`)
      .then((res) => res.json())
      .then((data) => {
        setTradeCount(data || 0);
      })
      .catch(() => setTradeCount(0));
  }, []);

  return (
    <motion.div
                initial={{ opacity: 0 }}
                animate={{opacity:1}}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.3 }}
            >
      <div className="flex flex-col items-center pt-12 min-h-screen px-4 text-center gap-6">
        <div className="bubble bubble-fade-edges">
          <SplitText
            text="Welcome to the beta!"
            className="text-2xl font-semibold text-center"
            delay={10}
            duration={2}
            ease="elastic.out(1, 0.3)"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
          />
          <p className="text-base sm:text-lg text-black mt-4">
            This is an early look at our platform for sharing the stories behind your kandi trades. 
            Scan a charm’s QR code to see its journey, and add your own memory to the history.

            Kickstarter launching August 7th!
          </p>
        </div>
        <StarBorder
          as="button"
          className="custom-class"
          color="white"
          thickness={7}
          speed="5s"
        >
          <a
            href="https://www.kickstarter.com/projects/charmski/charmski"
            target="_blank"
          >
            Visit our Kickstarter!!
          </a>
        </StarBorder>

        <div className="bubble bubble-fade-edges">
          <p className="text-base sm:text-lg text-black mb-2">
            Trades completed and memories shared:
          </p>
          <CountUp
            from={0}
            to={tradeCount}
            separator=","
            direction="up"
            duration={1}
            className="count-up-text text-2xl font-bold text-black"
          />
        </div>

        {/* TODO: Add a graphic here between the two sections */}

        <div className="bubble bubble-fade-edges mt-8">
          <p className="text-base sm:text-lg text-black mb-4">
            Help us improve! We’d love to hear what you think about the beta. Please :)
          </p>
          <StarBorder
            as="button"
            className="custom-class"
            color="magenta"
            thickness={3}
            speed="7s"
          >
            <a
              href="https://surveymonkey.com" // TODO: Replace with actual feedback form link
              target="_blank"
            >
              Provide Feedback
            </a>
          </StarBorder>
        </div>
      </div>
    </motion.div>
  );
}
