import { motion } from "framer-motion";
import "./SplashScreen.css";

const text = "VOGUECART";

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.8 },
  },
};

const letter = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const SplashScreen = ({ exit }) => {
  return (
    <motion.div
      className="splash"
      variants={container}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{
        opacity: exit ? 0 : 1,
        transition: "opacity 0.8s ease",
      }}
    >
      <motion.div className="logo">
        {text.split("").map((char, index) => (
          <motion.span key={index} variants={letter}>
            {char}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;
