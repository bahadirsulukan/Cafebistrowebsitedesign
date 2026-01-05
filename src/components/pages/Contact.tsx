import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "motion/react";
import { MapPin, Phone, Mail, Clock, Send, Calendar } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { useLanguage } from "../../contexts/LanguageContext";
import { useLocation } from "react-router-dom";

export function Contact() {
  const { t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#reservation") {
      const element = document.getElementById("reservation");
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [location]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(t("contact.form.successMessage"));
    setFormData({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      guests: "2",
      message: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--cafe-brown-darkest)] to-[var(--cafe-brown-dark)]" />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4 max-w-4xl"
        >
          <h1
            className="text-5xl md:text-7xl mb-6"
            style={{ color: "var(--cafe-cream)" }}
          >
            {t("contact.hero.title")}
          </h1>
          <p
            className="text-xl md:text-2xl"
            style={{ color: "var(--cafe-sand)" }}
          >
            {t("contact.hero.subtitle")}
          </p>
        </motion.div>
      </section>

      {/* Contact Info Cards */}
      <ContactInfoSection />

      {/* Contact Form & Map */}
      <div className="bg-white" id="reservation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Reservation Form */}
            <ReservationForm
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />

            {/* Map */}
            <MapSection />
          </div>
        </div>
      </div>

      {/* Opening Hours */}
      <OpeningHoursSection />
    </div>
  );
}

function ContactInfoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const contactInfo = [
    {
      icon: MapPin,
      title: t("contact.info.address"),
      content: t("contact.info.addressText"),
      color: "var(--cafe-cream)",
    },
    {
      icon: Phone,
      title: t("contact.info.phone"),
      content: t("contact.info.phoneText"),
      color: "var(--cafe-gold)",
    },
    {
      icon: Mail,
      title: t("contact.info.email"),
      content: t("contact.info.emailText"),
      color: "var(--cafe-sand)",
    },
    {
      icon: Clock,
      title: t("contact.info.hours"),
      content: t("contact.info.hoursText"),
      color: "var(--cafe-brown-light)",
    },
  ];

  return (
    <section
      ref={ref}
      className="py-24"
      style={{ backgroundColor: "var(--cafe-brown-dark)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="text-center p-8 rounded-2xl"
              style={{ backgroundColor: "var(--cafe-brown-medium)" }}
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
                style={{ backgroundColor: info.color }}
              >
                <info.icon
                  className="w-8 h-8"
                  style={{ color: "var(--cafe-brown-darkest)" }}
                />
              </motion.div>
              <h3 className="mb-3" style={{ color: "var(--cafe-cream)" }}>
                {info.title}
              </h3>
              <p
                className="text-sm whitespace-pre-line"
                style={{ color: "var(--cafe-sand)" }}
              >
                {info.content}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReservationForm({
  formData,
  handleChange,
  handleSubmit,
}: {
  formData: any;
  handleChange: any;
  handleSubmit: any;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      <h2
        className="text-4xl mb-4"
        style={{ color: "var(--cafe-brown-darkest)" }}
      >
        {t("contact.form.title")}
      </h2>
      <p className="mb-8" style={{ color: "var(--cafe-brown)" }}>
        {t("contact.form.subtitle")}
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="name"
              className="block mb-2"
              style={{ color: "var(--cafe-brown-darkest)" }}
            >
              {t("contact.form.name")} {t("contact.form.required")}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border-2 transition-colors duration-300 focus:outline-none"
              style={{
                borderColor: "var(--cafe-cream)",
                backgroundColor: "white",
              }}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-2"
              style={{ color: "var(--cafe-brown-darkest)" }}
            >
              {t("contact.form.email")} {t("contact.form.required")}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border-2 transition-colors duration-300 focus:outline-none"
              style={{
                borderColor: "var(--cafe-cream)",
                backgroundColor: "white",
              }}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block mb-2"
            style={{ color: "var(--cafe-brown-darkest)" }}
          >
            {t("contact.form.phone")} {t("contact.form.required")}
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border-2 transition-colors duration-300 focus:outline-none"
            style={{
              borderColor: "var(--cafe-cream)",
              backgroundColor: "white",
            }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label
              htmlFor="date"
              className="block mb-2"
              style={{ color: "var(--cafe-brown-darkest)" }}
            >
              {t("contact.form.date")} {t("contact.form.required")}
            </label>
            <div className="relative">
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border-2 transition-colors duration-300 focus:outline-none"
                style={{
                  borderColor: "var(--cafe-cream)",
                  backgroundColor: "white",
                }}
              />
              <Calendar
                className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none w-5 h-5"
                style={{ color: "var(--cafe-brown)" }}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="time"
              className="block mb-2"
              style={{ color: "var(--cafe-brown-darkest)" }}
            >
              {t("contact.form.time")} {t("contact.form.required")}
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border-2 transition-colors duration-300 focus:outline-none"
              style={{
                borderColor: "var(--cafe-cream)",
                backgroundColor: "white",
              }}
            />
          </div>

          <div>
            <label
              htmlFor="guests"
              className="block mb-2"
              style={{ color: "var(--cafe-brown-darkest)" }}
            >
              {t("contact.form.guests")} {t("contact.form.required")}
            </label>
            <select
              id="guests"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border-2 transition-colors duration-300 focus:outline-none"
              style={{
                borderColor: "var(--cafe-cream)",
                backgroundColor: "white",
              }}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, "9+"].map((num) => (
                <option key={num} value={num}>
                  {num}{" "}
                  {typeof num === "number" && num === 1
                    ? t("contact.form.person")
                    : t("contact.form.persons")}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="message"
            className="block mb-2"
            style={{ color: "var(--cafe-brown-darkest)" }}
          >
            {t("contact.form.message")}
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 rounded-lg border-2 transition-colors duration-300 focus:outline-none resize-none"
            style={{
              borderColor: "var(--cafe-cream)",
              backgroundColor: "white",
            }}
            placeholder={t("contact.form.messagePlaceholder")}
          />
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full px-8 py-4 rounded-full flex items-center justify-center gap-3 transition-all duration-300"
          style={{
            backgroundColor: "var(--cafe-gold)",
            color: "var(--cafe-brown-darkest)",
          }}
        >
          <Send className="w-5 h-5" />
          {t("contact.form.submit")}
        </motion.button>
      </form>
    </motion.div>
  );
}

function MapSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="h-full min-h-[600px]"
    >
      <h2
        className="text-4xl mb-4"
        style={{ color: "var(--cafe-brown-darkest)" }}
      >
        {t("contact.map.title")}
      </h2>
      <p className="mb-8" style={{ color: "var(--cafe-brown)" }}>
        {t("contact.map.subtitle")}
      </p>

      <div className="rounded-2xl overflow-hidden shadow-xl h-[500px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2561.5746857384635!2d8.5709!3d50.0379!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTDCsDAyJzE2LjQiTiA4wrAzNCcxNS4yIkU!5e0!3m2!1sen!2sde!4v1234567890"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <div
        className="mt-8 p-6 rounded-2xl"
        style={{ backgroundColor: "var(--cafe-cream)" }}
      >
        <h3 className="mb-4" style={{ color: "var(--cafe-brown-darkest)" }}>
          {t("contact.map.directions")}
        </h3>
        <div
          className="space-y-3 text-sm"
          style={{ color: "var(--cafe-brown)" }}
        >
          <p>
            <strong>{t("contact.map.byCar")}:</strong>{" "}
            {t("contact.map.byCarText")}
          </p>
          <p>
            <strong>{t("contact.map.byPublic")}:</strong>{" "}
            {t("contact.map.byPublicText")}
          </p>
          <p>
            <strong>{t("contact.map.parking")}:</strong>{" "}
            {t("contact.map.parkingText")}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function OpeningHoursSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const schedule = [
    { day: t("contact.schedule.monday"), hours: "06:00 - 22:00" },
    { day: t("contact.schedule.tuesday"), hours: "06:00 - 22:00" },
    { day: t("contact.schedule.wednesday"), hours: "06:00 - 22:00" },
    { day: t("contact.schedule.thursday"), hours: "06:00 - 22:00" },
    { day: t("contact.schedule.friday"), hours: "06:00 - 22:00" },
    {
      day: t("contact.schedule.saturday"),
      hours: "07:00 - 23:00",
      highlight: true,
    },
    {
      day: t("contact.schedule.sunday"),
      hours: "07:00 - 23:00",
      highlight: true,
    },
  ];

  return (
    <section
      ref={ref}
      className="py-24"
      style={{ backgroundColor: "var(--cafe-gold)" }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2
            className="text-4xl md:text-5xl mb-12"
            style={{ color: "var(--cafe-brown-darkest)" }}
          >
            {t("contact.schedule.title")}
          </h2>

          <div className="space-y-4">
            {schedule.map((item, index) => (
              <motion.div
                key={item.day}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex justify-between items-center p-4 rounded-xl"
                style={{
                  backgroundColor: item.highlight
                    ? "var(--cafe-brown-darkest)"
                    : "rgba(255, 255, 255, 0.3)",
                }}
              >
                <span
                  className="text-lg"
                  style={{
                    color: item.highlight
                      ? "var(--cafe-cream)"
                      : "var(--cafe-brown-darkest)",
                  }}
                >
                  {item.day}
                </span>
                <span
                  className="text-lg"
                  style={{
                    color: item.highlight
                      ? "var(--cafe-gold)"
                      : "var(--cafe-brown-darkest)",
                  }}
                >
                  {item.hours}
                </span>
              </motion.div>
            ))}
          </div>

          <p className="mt-8 text-lg" style={{ color: "var(--cafe-brown)" }}>
            {t("contact.schedule.note")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
