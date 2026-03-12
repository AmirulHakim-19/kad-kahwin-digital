import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface Message {
  name: string;
  message: string;
  timestamp: number;
}

const defaultMessages: Message[] = [
  { name: "Farah", message: "Tahniah! Semoga kekal bahagia ❤️", timestamp: Date.now() - 100000 },
  { name: "Ahmad", message: "Selamat Pengantin Baru!", timestamp: Date.now() - 50000 },
];

interface GuestMessagesProps {
  onOpenRSVP: () => void;
}

const GuestMessages = ({ onOpenRSVP }: GuestMessagesProps) => {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem("wedding-messages");
    return saved ? [...defaultMessages, ...JSON.parse(saved)] : defaultMessages;
  });
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [messageText, setMessageText] = useState("");

  const handleSubmitMessage = () => {
    if (!name.trim() || !messageText.trim()) return;
    const newMsg: Message = { name: name.trim(), message: messageText.trim(), timestamp: Date.now() };
    const saved = localStorage.getItem("wedding-messages");
    const existing: Message[] = saved ? JSON.parse(saved) : [];
    existing.push(newMsg);
    localStorage.setItem("wedding-messages", JSON.stringify(existing));
    setMessages([...defaultMessages, ...existing]);
    setName("");
    setMessageText("");
    setShowModal(false);
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
                  className="w-full font-ui px-8 py-4 rounded-lg bg-primary text-primary-foreground shadow-button-primary min-h-[44px]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Hantar Ucapan
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
