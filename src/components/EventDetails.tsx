import { motion } from "framer-motion";
import { MapPin, Calendar, Clock } from "lucide-react";

const sectionVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const EventDetails = () => {
  return (
    <motion.section
      className="py-24 px-6 text-center"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <div className="max-w-invitation mx-auto space-y-12">
        <h2 className="font-display text-xl text-primary">Butiran Majlis</h2>

        <div className="grid gap-10 sm:grid-cols-3">
          {/* Location */}
          <div className="space-y-3">
            <MapPin className="w-6 h-6 text-primary mx-auto" />
            <h3 className="font-display text-sm text-foreground">Lokasi</h3>
            <div className="font-serif-body text-base text-muted-foreground space-y-0.5">
              <p>Akad Hall</p>
              <p>Kota Masai</p>
              <p>Pasir Gudang</p>
              <p>Johor</p>
            </div>
          </div>

          {/* Date */}
          <div className="space-y-3">
            <Calendar className="w-6 h-6 text-primary mx-auto" />
            <h3 className="font-display text-sm text-foreground">Tarikh</h3>
            <div className="font-serif-body text-base text-muted-foreground space-y-1">
              <p>Sabtu</p>
              <p className="text-lg text-foreground font-medium">19 September 2026</p>
              <p className="text-sm italic">6 Rabiulakhir 1448H</p>
            </div>
          </div>

          {/* Time */}
          <div className="space-y-3">
            <Clock className="w-6 h-6 text-primary mx-auto" />
            <h3 className="font-display text-sm text-foreground">Masa</h3>
            <div className="font-serif-body text-base text-muted-foreground">
              <p className="text-lg text-foreground font-medium">7.45 malam</p>
              <p>–</p>
              <p className="text-lg text-foreground font-medium">12.00 malam</p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default EventDetails;
