import { motion } from "framer-motion";

const sectionVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const WeddingDetails = () => {
  return (
    <motion.section
      className="py-24 px-6 text-center"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <div className="max-w-invitation mx-auto space-y-10">
        <p className="font-display text-xs tracking-[0.2em] text-muted-foreground">
          Bismillahirrahmanirrahim
        </p>

        <div className="font-serif-body text-lg leading-relaxed space-y-8 text-foreground">
          <p className="text-muted-foreground italic">Assalamualaikum wbt</p>

          <div className="space-y-1">
            <p className="font-medium">Ahmad Noorzen bin Diran</p>
            <p className="text-primary">&</p>
            <p className="font-medium">Anisatul Azizah Hudlori</p>
          </div>

          <p className="text-muted-foreground text-base">bersama</p>

          <div className="space-y-1">
            <p className="font-medium">Mohd Bahauddin Ithnin bin Abu</p>
            <p className="text-primary">&</p>
            <p className="font-medium">Rosnita binti Rajikan</p>
          </div>

          <div className="pt-4 space-y-3">
            <p className="text-muted-foreground text-base">
              Dengan penuh kesyukuran, kami mempersilakan
            </p>
            <p className="text-sm text-muted-foreground italic">
              Dato' | Datin | Tuan | Puan | Encik | Cik
            </p>
            <p className="text-muted-foreground text-base">
              hadir ke majlis perkahwinan anakanda kami
            </p>
          </div>

          <div className="pt-4 space-y-2">
            <p className="font-display text-xl sm:text-2xl text-primary">
              Nadhirah binti Ahmad Noorzen
            </p>
            <p className="text-primary text-2xl">&</p>
            <p className="font-display text-xl sm:text-2xl text-primary">
              Amirul Hakim bin Mohd Bahauddin Ithnin
            </p>
          </div>
        </div>

        {/* Ornamental divider */}
        <div className="flex items-center justify-center gap-4 pt-4">
          <span className="block w-16 h-px bg-border" />
          <span className="text-primary text-xl">✦</span>
          <span className="block w-16 h-px bg-border" />
        </div>
      </div>
    </motion.section>
  );
};

export default WeddingDetails;
