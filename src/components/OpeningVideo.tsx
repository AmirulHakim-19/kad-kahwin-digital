import { motion } from "framer-motion";
import floralBg from "@/assets/floral-bg.jpg";

const OpeningVideo = () => {
  return (
    <motion.section
      className="relative h-screen flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
    >
      {/* Background image (placeholder for video) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${floralBg})` }}
      >
        <div className="absolute inset-0 bg-foreground/50" />
      </div>

      {/* Overlay text */}
      <div className="relative z-10 text-center space-y-6">
        <motion.p
          className="font-display text-sm tracking-[0.3em] text-primary-foreground/80"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Walimatul Urus
        </motion.p>
        <motion.h1
          className="font-display text-4xl sm:text-5xl text-primary-foreground text-balance leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          Nadhirah
          <span className="block text-2xl my-3 text-primary-foreground/60">&</span>
          Amirul
        </motion.h1>
        <motion.p
          className="font-serif-body text-sm text-primary-foreground/70 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          19 September 2026
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-1.5"
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <div className="w-1 h-2 rounded-full bg-primary-foreground/50" />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default OpeningVideo;
