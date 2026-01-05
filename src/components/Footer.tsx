import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer
      className="pt-16 pb-8"
      style={{ backgroundColor: "var(--cafe-brown-darkest)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 mb-12">
            {/* Contact Info */}
            <div className="text-center md:text-left">
              <h3
                className="text-2xl mb-6"
                style={{ color: "var(--cafe-cream)" }}
              >
                {t("footer.contact")}
              </h3>
              <ul className="space-y-4 inline-block text-left">
                <li className="flex items-start space-x-3">
                  <MapPin
                    className="w-5 h-5 mt-0.5 flex-shrink-0"
                    style={{ color: "var(--cafe-gold)" }}
                  />
                  <span
                    className="text-sm whitespace-pre-line"
                    style={{ color: "var(--cafe-sand)" }}
                  >
                    {t("contact.info.addressText")}
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <Phone
                    className="w-5 h-5 flex-shrink-0"
                    style={{ color: "var(--cafe-gold)" }}
                  />
                  <span
                    className="text-sm"
                    style={{ color: "var(--cafe-sand)" }}
                  >
                    {t("contact.info.phoneText")}
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <Mail
                    className="w-5 h-5 flex-shrink-0"
                    style={{ color: "var(--cafe-gold)" }}
                  />
                  <span
                    className="text-sm"
                    style={{ color: "var(--cafe-sand)" }}
                  >
                    {t("contact.info.emailText")}
                  </span>
                </li>
              </ul>
            </div>

            {/* Opening Hours & Social Media */}
            <div className="text-center md:text-left">
              <h3
                className="text-2xl mb-6"
                style={{ color: "var(--cafe-cream)" }}
              >
                {t("contact.info.hours")}
              </h3>
              <div className="space-y-2 mb-8 inline-block text-left">
                <div className="flex items-start space-x-3">
                  <Clock
                    className="w-5 h-5 mt-0.5 flex-shrink-0"
                    style={{ color: "var(--cafe-gold)" }}
                  />
                  <div
                    className="text-sm"
                    style={{ color: "var(--cafe-sand)" }}
                  >
                    <div className="mb-1">
                      {t("contact.info.hoursText").split("\n")[0]}
                    </div>
                    <div>{t("contact.info.hoursText").split("\n")[1]}</div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h4
                  className="mb-4 text-lg"
                  style={{ color: "var(--cafe-cream)" }}
                >
                  {t("footer.followUs")}
                </h4>
                <div className="flex space-x-4 justify-center md:justify-start">
                  {[Facebook, Instagram, Twitter].map((Icon, index) => (
                    <motion.a
                      key={index}
                      href="#"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300"
                      style={{
                        backgroundColor: "var(--cafe-brown-medium)",
                        color: "var(--cafe-gold)",
                      }}
                    >
                      <Icon className="w-6 h-6" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="pt-8 border-t flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0"
          style={{ borderColor: "var(--cafe-brown-medium)" }}
        >
          <p className="text-sm" style={{ color: "var(--cafe-sand)" }}>
            {t("footer.copyright").replace(
              "{year}",
              new Date().getFullYear().toString()
            )}
          </p>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-sm hover:text-[var(--cafe-cream)] transition-colors duration-300"
              style={{ color: "var(--cafe-sand)" }}
            >
              {t("footer.privacy")}
            </a>
            <a
              href="#"
              className="text-sm hover:text-[var(--cafe-cream)] transition-colors duration-300"
              style={{ color: "var(--cafe-sand)" }}
            >
              {t("footer.imprint")}
            </a>
            <a
              href="#"
              className="text-sm hover:text-[var(--cafe-cream)] transition-colors duration-300"
              style={{ color: "var(--cafe-sand)" }}
            >
              {t("footer.terms")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
