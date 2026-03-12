import { motion } from "framer-motion";

const Doa = () => {
  return (
    <motion.section
      className="py-24 px-6 text-center"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <div className="max-w-invitation mx-auto space-y-10">
        <h2 className="font-display text-xl text-primary">Doa</h2>

        <div className="font-arabic text-foreground leading-loose space-y-6 italic">
          <p>
            Ya Allah,
            <br />
            berkatilah majlis perkahwinan ini,
            <br />
            limpahkanlah baraqah dan rahmat
            <br />
            kepada kedua mempelai ini.
          </p>
          <p>
            Kurniakanlah mereka zuriat yang soleh
            <br />
            dan solehah.
          </p>
          <p>
            Kekalkanlah jodoh mereka di dunia
            <br />
            dan di akhirat.
          </p>
          <p>
            Sempurnakanlah agama mereka
            <br />
            dengan berkat ikatan ini.
          </p>
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

export default Doa;
