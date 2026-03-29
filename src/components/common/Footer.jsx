import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import FacebookImg from "@/assets/images/facebook.png";
import InstagramImg from "@/assets/images/instagram.png";
import TwitterImg from "@/assets/images/twitter.png";
import Link from "react-router-dom";

export default function Footer() {
  const date = new Date();
  const quickLinks = [
    { field: "Home", to: "/" },
    { field: "About Us", to: "/about" },
    { field: "FAQ", to: "#faqSection" },
    { field: "Contact", to: "#contactMe" },
  ];

  const supportLinks = [
    { field: "Privacy Policy", to: "/privacy-policy" },
    { field: "Terms of Service", to: "/terms-of-service" },
    { field: "Support", to: "/support" },
    { field: "Care Guide", to: "/care-guide" },
  ];

  return (
    <footer className="bg-stone-950 border-t border-amber-900/20 py-16 px-6">
      <div className="mb-15">
        <hr />
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl text-amber-50 mb-4">Gajon Mala</h3>
            <p className="text-amber-200/70 mb-6">
              Sacred Rudraksha prayer beads for your spiritual journey.
            </p>
            <div className="flex gap-4">
              {[FacebookImg, InstagramImg, TwitterImg].map((icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.2, rotateZ: 10 }}
                  className="w-10 h-10 rounded-full bg-amber-600/20 hover:bg-amber-600 flex items-center justify-center text-amber-400 hover:text-white transition-colors duration-300"
                >
                  <img src={icon} alt="Social Icon" className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-xl text-amber-50 mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((elem) => (
                <li key={elem.to}>
                  <Link
                    to={elem.to}
                    className="text-amber-200/70 hover:text-amber-400 transition-colors duration-300"
                  >
                    {elem.field}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-xl text-amber-50 mb-4">Support</h4>
            <ul className="space-y-3">
              {supportLinks.map((elem) => (
                <li key={elem.field}>
                  <Link
                    to={elem.to}
                    className="text-amber-200/70 hover:text-amber-400 transition-colors duration-300"
                  >
                    {elem.field}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-xl text-amber-50 mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-amber-200/70">
                <Mail className="w-5 h-5 text-amber-500" />
                <span>
                  <a href="mailto:info@mahadeumala.com">info@mahadeumala.com</a>
                </span>
              </li>
              <li className="flex items-center gap-3 text-amber-200/70">
                <Phone className="w-5 h-5 text-amber-500" />
                <span>
                  <a href="tel:1234567890">+91 1234567890</a>
                </span>
              </li>
              <li className="flex items-center gap-3 text-amber-200/70">
                <MapPin className="w-5 h-5 text-amber-500" />
                <span>Kantore, India (WB)</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <h4 className="text-xl text-amber-50 mb-4">Explore More</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/gallery"
                  className="text-amber-200/70 hover:text-amber-400 transition-colors duration-300"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  to="/testimonials"
                  className="text-amber-200/70 hover:text-amber-400 transition-colors duration-300"
                >
                  Testimonials
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  className="text-amber-200/70 hover:text-amber-400 transition-colors duration-300"
                >
                  Events
                </Link>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-amber-900/20 text-center text-amber-200/60"
        >
          <p>
            &copy; {date.getFullYear()}
            <b>
              <i className="text-green-600"> Gajon Mala</i>
            </b>{" "}
            All rights reserved. Made with love and devotion.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
