import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";

const MusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio("/music/wedding-song.mp3");
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;

    // On first click/tap anywhere, start playing
    const handleFirstInteraction = () => {
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {});
      }
    };

    document.addEventListener("click", handleFirstInteraction, { once: true });
    document.addEventListener("touchstart", handleFirstInteraction, { once: true });

    return () => {
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
      audioRef.current?.pause();
    };
  }, []);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <motion.button
      onClick={togglePlay}
      className="fixed bottom-4 right-4 z-40 w-12 h-12 rounded-full bg-foreground/80 text-background backdrop-blur-sm flex items-center justify-center shadow-lg"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 }}
    >
      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
    </motion.button>
  );
};

export default MusicPlayer;
