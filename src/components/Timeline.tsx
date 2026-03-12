import { motion } from "framer-motion";

const agenda = [
  { time: "7.45 PM", event: "Ketibaan Para Tetamu" },
  { time: "8.15 PM", event: "Ketibaan Pengantin" },
  { time: "8.30 PM", event: "Jamuan Makan Bermula" },
  { time: "10.00 PM", event: "Sesi Bergambar" },
  { time: "11.00 PM", event: "Bersurai" },
];

const Timeline = () => {
  return (
    <motion.section
      className="py-24 px-6"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <div className="max-w-invitation mx-auto">
        <h2 className="font-display text-xl text-primary text-center mb-16">
          Atur Cara Majlis
        </h2>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-border">
            <motion.div
              className="w-full bg-primary origin-top"
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>

          <div className="space-y-12">
            {agenda.map((item, index) => (
              <motion.div
                key={index}
                className="relative flex items-center"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Left side - time */}
                <div className="w-1/2 pr-8 text-right">
                  <span className="font-display text-sm text-primary">{item.time}</span>
                </div>

                {/* Center dot */}
                <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background z-10" />

                {/* Right side - event */}
                <div className="w-1/2 pl-8">
                  <span className="font-serif-body text-base text-foreground">{item.event}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Timeline;
