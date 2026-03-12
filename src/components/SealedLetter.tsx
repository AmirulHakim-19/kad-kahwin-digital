import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import waxSeal from "@/assets/wax-seal.png";
import floralBg from "@/assets/floral-bg.jpg";

interface SealedLetterProps {
  onOpen: () => void;
}

const SealedLetter = ({ onOpen }: SealedLetterProps) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    setTimeout(onOpen, 800);
  };

  return (
    <AnimatePresence>
      {!isOpening && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Background */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${floralBg})` }}
          >
            <div className="absolute inset-0 bg-foreground/60 backdrop-blur-sm" />
          </div>

          {/* Letter */}
          <motion.button
            onClick={handleOpen}
            className="relative z-10 flex flex-col items-center gap-8 p-12 cursor-pointer focus:outline-none"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Envelope shape */}
            <div className="relative bg-muted/90 backdrop-blur-md rounded-lg px-12 py-16 shadow-2xl border border-border/50 max-w-[340px]">
              <div className="flex flex-col items-center gap-6 text-center">
                <p className="font-display text-xs tracking-[0.2em] text-muted-foreground">
                  You Are Invited
                </p>
                <p className="font-serif-body text-sm text-muted-foreground italic">
                  To The Wedding Of
                </p>
                <h1 className="font-display text-2xl sm:text-3xl text-primary text-balance leading-tight">
                  Nadhirah
                  <span className="block text-lg text-muted-foreground my-2">&</span>
                  Amirul
                </h1>
              </div>

              {/* Seal */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                <motion.img
                  src={waxSeal}
                  alt="Wax Seal"
                  className="w-20 h-20 animate-seal-pulse drop-shadow-lg"
                  animate={isOpening ? { scale: 1.5, opacity: 0, rotate: 15 } : {}}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>

            <p className="text-primary-foreground/70 text-sm font-ui mt-6 animate-pulse">
              Ketuk untuk membuka
            </p>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SealedLetter;
