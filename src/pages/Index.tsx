import { useState, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import SealedLetter from "@/components/SealedLetter";
import OpeningVideo from "@/components/OpeningVideo";
import WeddingDetails from "@/components/WeddingDetails";
import EventDetails from "@/components/EventDetails";
import SaveTheDate from "@/components/SaveTheDate";
import Timeline from "@/components/Timeline";
import Doa from "@/components/Doa";
import GuestMessages from "@/components/GuestMessages";
import RSVPForm from "@/components/RSVPForm";
import FooterActions from "@/components/FooterActions";
import MusicPlayer from "@/components/MusicPlayer";
import floralBg from "@/assets/floral-bg.jpg";

const Index = () => {
  const [isLetterOpened, setIsLetterOpened] = useState(false);
  const [isRSVPOpen, setIsRSVPOpen] = useState(false);
  const musicRef = useRef<{ play: () => void }>(null);

  const handleOpenLetter = () => {
    setIsLetterOpened(true);
    musicRef.current?.play();
  };

  return (
    <div className="min-h-screen bg-background bg-songket">
      {/* Sealed Letter */}
      <AnimatePresence>
        {!isLetterOpened && (
          <SealedLetter onOpen={handleOpenLetter} />
        )}
      </AnimatePresence>

      {/* Main Content with floral background */}
      {isLetterOpened && (
        <main
          className="relative"
          style={{
            backgroundImage: `url(${floralBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="absolute inset-0 bg-background/85 pointer-events-none" style={{ position: "fixed" }} />
          <div className="relative z-10">
            <OpeningVideo />
            <WeddingDetails />
            <EventDetails />
            <SaveTheDate />
            <Timeline />
            <Doa />
            <GuestMessages onOpenRSVP={() => setIsRSVPOpen(true)} />
            <FooterActions onOpenRSVP={() => setIsRSVPOpen(true)} />
          </div>
        </main>
      )}

      {/* RSVP Modal */}
      <RSVPForm isOpen={isRSVPOpen} onClose={() => setIsRSVPOpen(false)} />

      {/* Music Player */}
      {isLetterOpened && <MusicPlayer ref={musicRef} />}
    </div>
  );
};

export default Index;
