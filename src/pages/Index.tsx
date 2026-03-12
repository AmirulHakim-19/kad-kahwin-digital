import { useState } from "react";
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

const Index = () => {
  const [isLetterOpened, setIsLetterOpened] = useState(false);
  const [isRSVPOpen, setIsRSVPOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background bg-songket">
      {/* Sealed Letter */}
      <AnimatePresence>
        {!isLetterOpened && (
          <SealedLetter onOpen={() => setIsLetterOpened(true)} />
        )}
      </AnimatePresence>

      {/* Main Content */}
      {isLetterOpened && (
        <main>
          <OpeningVideo />
          <WeddingDetails />
          <EventDetails />
          <SaveTheDate />
          <Timeline />
          <Doa />
          <GuestMessages onOpenRSVP={() => setIsRSVPOpen(true)} />
          <FooterActions onOpenRSVP={() => setIsRSVPOpen(true)} />
        </main>
      )}

      {/* RSVP Modal */}
      <RSVPForm isOpen={isRSVPOpen} onClose={() => setIsRSVPOpen(false)} />

      {/* Music Player */}
      {isLetterOpened && <MusicPlayer />}
    </div>
  );
};

export default Index;
