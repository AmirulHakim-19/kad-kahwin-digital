import { motion } from "framer-motion";

const SaveTheDate = () => {
  const handleGoogleCalendar = () => {
    const url = new URL("https://calendar.google.com/calendar/render");
    url.searchParams.set("action", "TEMPLATE");
    url.searchParams.set("text", "Majlis Perkahwinan Nadhirah & Amirul");
    url.searchParams.set("dates", "20260919T194500/20260920T000000");
    url.searchParams.set("details", "Majlis Perkahwinan Nadhirah binti Ahmad Noorzen & Amirul Hakim bin Mohd Bahauddin Ithnin");
    url.searchParams.set("location", "Akad Hall, Kota Masai, Pasir Gudang, Johor");
    window.open(url.toString(), "_blank");
  };

  const handleICS = () => {
    const ics = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:20260919T194500
DTEND:20260920T000000
SUMMARY:Majlis Perkahwinan Nadhirah & Amirul
LOCATION:Akad Hall, Kota Masai, Pasir Gudang, Johor
DESCRIPTION:Majlis Perkahwinan Nadhirah binti Ahmad Noorzen & Amirul Hakim bin Mohd Bahauddin Ithnin
END:VEVENT
END:VCALENDAR`;
    const blob = new Blob([ics], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "perkahwinan-nadhirah-amirul.ics";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.section
      className="py-16 px-6 text-center"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <div className="max-w-invitation mx-auto space-y-6">
        <h2 className="font-display text-lg text-primary">Simpan Tarikh</h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            onClick={handleGoogleCalendar}
            className="font-ui px-8 py-4 rounded-lg bg-primary text-primary-foreground shadow-button-primary min-h-[44px] transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Google Calendar
          </motion.button>
          <motion.button
            onClick={handleICS}
            className="font-ui px-8 py-4 rounded-lg bg-transparent text-accent shadow-button-secondary min-h-[44px] transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Apple / Outlook
          </motion.button>
        </div>
      </div>
    </motion.section>
  );
};

export default SaveTheDate;
