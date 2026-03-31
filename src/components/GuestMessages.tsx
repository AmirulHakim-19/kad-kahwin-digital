import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

interface GuestMessagesProps {
  onOpenRSVP: () => void;
}

const GuestMessages = ({ onOpenRSVP }: GuestMessagesProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [messageText, setMessageText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      const [{ data: guestMessageRows }, { data: rsvpRows }] = await Promise.all([
        supabase
        .from("guest_messages")
        .select("id, name, message, created_at")
        .order("created_at", { ascending: false }),
        supabase
          .from("rsvps")
          .select("id, name, message, created_at")
          .not("message", "is", null)
          .order("created_at", { ascending: false }),
      ]);

      const mergedMessages = [...(guestMessageRows ?? []), ...(rsvpRows ?? [])]
        .filter((item): item is Message => Boolean(item?.message?.trim()))
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

      setMessages(mergedMessages);
    };

    const handleRsvpMessageSubmitted = (event: Event) => {
      const customEvent = event as CustomEvent<Message>;
      const newMessage = customEvent.detail;

      if (!newMessage?.message?.trim()) return;

      setMessages((prev) => {
        const nextMessages = [newMessage, ...prev];
        return nextMessages.sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        );
      });
    };

    fetchMessages();

    window.addEventListener("rsvp-message-submitted", handleRsvpMessageSubmitted);

    return () => {
      window.removeEventListener("rsvp-message-submitted", handleRsvpMessageSubmitted);
    };
  }, []);

  const handleSubmitMessage = async () => {
    if (!name.trim() || !messageText.trim()) return;
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase
        .from("guest_messages")
        .insert({ name: name.trim(), message: messageText.trim() })
        .select("id, name, message, created_at")
        .single();

      if (error) throw error;
      if (data) setMessages((prev) => [data, ...prev]);

      setName("");
      setMessageText("");
      setShowModal(false);
    } catch (err) {
      console.error("Message submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section
      className="py-24 px-6"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <div className="max-w-invitation mx-auto space-y-10">
        <h2 className="font-display text-xl text-primary text-center">Ucapan</h2>

        {/* Messages */}
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
          {messages.length === 0 && (
            <p className="text-center font-serif-body text-muted-foreground italic">
              Jadilah orang pertama untuk meninggalkan ucapan ✦
            </p>
          )}
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              className="bg-muted/50 p-6 rounded-xl shadow-message-card"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <p className="font-serif-body text-foreground text-base">{msg.message}</p>
              <p className="text-sm text-muted-foreground mt-2 font-ui">— {msg.name}</p>
            </motion.div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            onClick={onOpenRSVP}
            className="font-ui px-8 py-4 rounded-lg bg-primary text-primary-foreground shadow-button-primary min-h-[44px] transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Sahkan Kehadiran
          </motion.button>
          <motion.button
            onClick={() => setShowModal(true)}
            className="font-ui px-8 py-4 rounded-lg bg-transparent text-accent shadow-button-secondary min-h-[44px] transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Tulis Ucapan
          </motion.button>
        </div>
      </div>

      {/* Message Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-foreground/40 backdrop-blur-md" onClick={() => setShowModal(false)} />
            <motion.div
              className="relative bg-background rounded-xl p-8 w-full max-w-md shadow-2xl"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <button
                onClick={() => setShowModal(false)}
                type="button"
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-display text-lg text-primary mb-6">Tulis Ucapan</h3>

              <div className="space-y-4">
                <div>
                  <label className="font-ui text-sm text-muted-foreground block mb-1">Nama</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-muted border border-input focus:ring-2 focus:ring-ring focus:outline-none font-serif-body text-foreground"
                    placeholder="Nama anda"
                    maxLength={100}
                  />
                </div>
                <div>
                  <label className="font-ui text-sm text-muted-foreground block mb-1">Ucapan</label>
                  <textarea
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-muted border border-input focus:ring-2 focus:ring-ring focus:outline-none font-serif-body text-foreground resize-none"
                    rows={4}
                    placeholder="Tulis ucapan anda..."
                    maxLength={500}
                  />
                </div>
                <motion.button
                  onClick={handleSubmitMessage}
                  disabled={isSubmitting}
                  className="w-full font-ui px-8 py-4 rounded-lg bg-primary text-primary-foreground shadow-button-primary min-h-[44px] disabled:opacity-50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? "Menghantar..." : "Hantar Ucapan"}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default GuestMessages;
