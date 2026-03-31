import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface RSVPFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const RSVPForm = ({ isOpen, onClose }: RSVPFormProps) => {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<"hadir" | "tidak" | "">("");
  const [guests, setGuests] = useState("1");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState("");

  const handleSubmit = async () => {
    const trimmedName = name.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !attendance) {
      setValidationError("Sila isi nama dan pilih kehadiran dahulu.");
      return;
    }

    setValidationError("");
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.from("rsvps").insert({
        name: trimmedName,
        attendance,
        guests: parseInt(guests, 10),
        message: trimmedMessage || null,
      }).select("name, message, created_at").single();

      if (error) throw error;

      if (trimmedMessage && data?.message) {
        window.dispatchEvent(
          new CustomEvent("rsvp-message-submitted", {
            detail: data,
          }),
        );
      }

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setName("");
        setAttendance("");
        setGuests("1");
        setMessage("");
        setValidationError("");
        onClose();
      }, 2000);
    } catch (err) {
      console.error("RSVP submission error:", err);
      setValidationError("RSVP tidak berjaya dihantar. Sila cuba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-md" onClick={onClose} />
          <motion.div
            className="relative bg-background rounded-xl p-8 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
          >
            <button
              onClick={onClose}
                type="button"
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <p className="text-4xl">✦</p>
                <p className="font-display text-lg text-primary">Terima Kasih!</p>
                <p className="font-serif-body text-muted-foreground">
                  RSVP anda telah direkodkan.
                </p>
              </div>
            ) : (
              <>
                <h3 className="font-display text-lg text-primary mb-6">Sahkan Kehadiran</h3>

                <div className="space-y-5">
                  <div>
                    <label className="font-ui text-sm text-muted-foreground block mb-1">Nama</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (validationError) setValidationError("");
                      }}
                      className="w-full px-4 py-3 rounded-lg bg-muted border border-input focus:ring-2 focus:ring-ring focus:outline-none font-serif-body text-foreground"
                      placeholder="Nama penuh"
                      maxLength={100}
                    />
                  </div>

                  <div>
                    <label className="font-ui text-sm text-muted-foreground block mb-2">Kehadiran</label>
                    <div className="flex gap-3">
                      <motion.button
                        onClick={() => setAttendance("hadir")}
                        type="button"
                        className={`flex-1 font-ui px-4 py-3 rounded-lg min-h-[44px] transition-all duration-200 ${
                          attendance === "hadir"
                            ? "bg-primary text-primary-foreground shadow-button-primary"
                            : "bg-muted text-muted-foreground border border-input"
                        }`}
                        whileTap={{ scale: 0.98 }}
                      >
                        Hadir
                      </motion.button>
                      <motion.button
                        onClick={() => setAttendance("tidak")}
                        type="button"
                        className={`flex-1 font-ui px-4 py-3 rounded-lg min-h-[44px] transition-all duration-200 ${
                          attendance === "tidak"
                            ? "bg-secondary text-secondary-foreground"
                            : "bg-muted text-muted-foreground border border-input"
                        }`}
                        whileTap={{ scale: 0.98 }}
                      >
                        Tidak Hadir
                      </motion.button>
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                  >
                    <label className="font-ui text-sm text-muted-foreground block mb-1">
                      Bilangan Tetamu (Pax)
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-muted border border-input focus:ring-2 focus:ring-ring focus:outline-none font-serif-body text-foreground"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                        <option key={n} value={n}>{n} orang</option>
                      ))}
                    </select>
                  </motion.div>

                  <div>
                    <label className="font-ui text-sm text-muted-foreground block mb-1">
                      Ucapan (pilihan)
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-muted border border-input focus:ring-2 focus:ring-ring focus:outline-none font-serif-body text-foreground resize-none"
                      rows={3}
                      placeholder="Tulis ucapan anda..."
                      maxLength={500}
                    />
                  </div>

                  {validationError && (
                    <p className="font-ui text-sm text-destructive">{validationError}</p>
                  )}

                  <motion.button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    type="button"
                    className="w-full font-ui px-8 py-4 rounded-lg bg-primary text-primary-foreground shadow-button-primary min-h-[44px] disabled:opacity-50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? "Menghantar..." : "Hantar RSVP"}
                  </motion.button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RSVPForm;
