import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import FacebookImg from "@/assets/images/facebook.png";
import InstagramImg from "@/assets/images/instagram.png";
import TwitterImg from "@/assets/images/twitter.png";

export default function Footer() {
  return (
    <footer className="bg-stone-950 border-t border-amber-900/20 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
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
              {[FacebookImg, InstagramImg, TwitterImg].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.2, rotateZ: 10 }}
                  className="w-10 h-10 rounded-full bg-amber-600/20 hover:bg-amber-600 flex items-center justify-center text-amber-400 hover:text-white transition-colors duration-300"
                >
                  <img src={Icon} alt="Social Icon" className="w-5 h-5" />
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
              {["Shop", "About Us", "Blog", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-amber-200/70 hover:text-amber-400 transition-colors duration-300"
                  >
                    {link}
                  </a>
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
              {["FAQ", "Shipping", "Returns", "Care Guide"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-amber-200/70 hover:text-amber-400 transition-colors duration-300"
                  >
                    {link}
                  </a>
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
                <span>info@mahadeumala.com</span>
              </li>
              <li className="flex items-center gap-3 text-amber-200/70">
                <Phone className="w-5 h-5 text-amber-500" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-amber-200/70">
                <MapPin className="w-5 h-5 text-amber-500" />
                <span>Rishikesh, India</span>
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
            © 2026{" "}
            <b>
              <i className="text-green-600">Gajon Mala</i>
            </b>{" "}
            All rights reserved. Made with devotion 🙏
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
