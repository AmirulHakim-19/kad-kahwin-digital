import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

const MusicPlayer = forwardRef<{ play: () => void }>((_props, ref) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useImperativeHandle(ref, () => ({
    play: () => {
      // Create and unlock audio synchronously within user gesture
      const audio = new Audio("/music/wedding-song.mp3");
      audio.loop = true;
      audio.volume = 0.3;
      // Attempt play immediately to unlock in browser gesture context
      audio.play().then(() => {
        setIsPlaying(true);
        setIsUnlocked(true);
      }).catch(() => {
        // Fallback: set src and try again
        setIsUnlocked(true);
      });
      audioRef.current = audio;
    },
  }));

  useEffect(() => {
    return () => {
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
      {isPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
    </motion.button>
  );
});

MusicPlayer.displayName = "MusicPlayer";

export default MusicPlayer;
