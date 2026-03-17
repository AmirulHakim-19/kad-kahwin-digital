import { motion } from "framer-motion";
import { Phone, MapPin, Gift } from "lucide-react";
import qrDuitNow from "@/assets/qr-duitnow.png";

interface FooterActionsProps {
  onOpenRSVP: () => void;
}

const FooterActions = ({ onOpenRSVP }: FooterActionsProps) => {
  return (
    <motion.footer
      className="py-24 px-6"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <div className="max-w-invitation mx-auto space-y-12">
        {/* Contact */}
        <div className="text-center space-y-4">
          <Phone className="w-6 h-6 text-primary mx-auto" />
          <h3 className="font-display text-sm text-foreground">Hubungi</h3>
          <a
            href="tel:+6012XXXXXXX"
            className="font-ui text-base text-accent underline decoration-accent/30 underline-offset-4"
          >
            +6017-764 XXXX
          </a>
        </div>

        {/* Location */}
        <div className="text-center space-y-4">
          <MapPin className="w-6 h-6 text-primary mx-auto" />
          <h3 className="font-display text-sm text-foreground">Lokasi</h3>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <motion.a
              href="https://maps.google.com/?q=Akad+Hall+43+Jalan+Ekoperniagaan+3+Taman+Kota+Masai+81700+Pasir+Gudang+Johor"
              target="_blank"
              rel="noopener noreferrer"
              className="font-ui px-6 py-3 rounded-lg bg-transparent text-accent shadow-button-secondary min-h-[44px] inline-flex items-center justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Google Maps
            </motion.a>
            <motion.a
              href="https://waze.com/ul?q=Akad+Hall+Kota+Masai+Pasir+Gudang+Johor"
              target="_blank"
              rel="noopener noreferrer"
              className="font-ui px-6 py-3 rounded-lg bg-transparent text-accent shadow-button-secondary min-h-[44px] inline-flex items-center justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Waze
            </motion.a>
          </div>
        </div>

        {/* Wedding Gift - QR Code */}
        <div className="text-center space-y-4">
          <Gift className="w-6 h-6 text-primary mx-auto" />
          <h3 className="font-display text-sm text-foreground">Tanda Kasih</h3>
          <div className="bg-muted/50 rounded-xl p-6 shadow-message-card max-w-xs mx-auto space-y-4">
            <img
              src={qrDuitNow}
              alt="DuitNow QR Code"
              className="w-48 h-48 mx-auto object-contain"
            />
            <p className="font-serif-body text-sm text-muted-foreground">
              Imbas kod QR untuk membuat pembayaran
            </p>
            <p className="font-serif-body text-sm text-foreground font-medium">
              Nadhirah binti Ahmad Noorzen
            </p>
          </div>
        </div>

        {/* RSVP Button */}
        <div className="text-center pt-8">
          <motion.button
            onClick={onOpenRSVP}
            className="font-ui px-10 py-4 rounded-lg bg-primary text-primary-foreground shadow-button-primary min-h-[44px] transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Sahkan Kehadiran
          </motion.button>
        </div>

        {/* Footer text */}
        <div className="text-center pt-8 border-t border-border">
          <p className="font-serif-body text-sm text-muted-foreground italic">
            Dengan penuh kasih,
          </p>
          <p className="font-display text-base text-primary mt-2">
            Nadhirah & Amirul
          </p>
          <p className="font-serif-body text-xs text-muted-foreground mt-4">
            19 September 2026
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default FooterActions;
