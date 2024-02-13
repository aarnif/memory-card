import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";

export function Overlay() {
  const displayState = useSelector((state) => state.display);

  const { showOverlay } = displayState;

  const start = {
    opacity: 0,
    pointerEvents: "none",
  };

  const end = {
    opacity: 1,
    pointerEvents: "all",
  };

  const animationDuration = 0.7;

  return (
    <AnimatePresence mode={"wait"}>
      {showOverlay && (
        <motion.div
          className="inset-0 fixed bg-black bg-opacity-1 pointer-events-none"
          initial={start}
          animate={end}
          exit={start}
          transition={{ duration: animationDuration }}
        />
      )}
    </AnimatePresence>
  );
}
