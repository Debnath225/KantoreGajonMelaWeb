import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Mail, MapPin, Phone } from "lucide-react";
import FacebookImg from "@/assets/images/facebook.png";
import InstagramImg from "@/assets/images/instagram.png";
import TwitterImg from "@/assets/images/twitter.png";
import { Link } from "react-router-dom";

export default function Footer() {
  const date = new Date();
  const [openSection, setOpenSection] = useState("quick");
  const quickLinks = [
    { field: "Home", to: "/", type: "route" },
    { field: "About Us", to: "/about", type: "route" },
    { field: "FAQ", to: "#faqSection", type: "anchor" },
    { field: "Contact", to: "#contactMe", type: "anchor" },
  ];

  const exploreLinks = [
    { field: "Gallery", to: "/gallery" },
    { field: "Testimonials", to: "/testimonials" },
    { field: "Events", to: "/events" },
  ];

  const socialLinks = [
    { icon: FacebookImg, label: "Facebook", href: "https://www.facebook.com/" },
    { icon: InstagramImg, label: "Instagram", href: "https://www.instagram.com/" },
    { icon: TwitterImg, label: "X (Twitter)", href: "https://x.com/" },
  ];

  const toggleSection = (section) => {
    setOpenSection((current) => (current === section ? "" : section));
  };

  return (
    <footer
      className="section-shell relative overflow-hidden bg-stone-950 border-t border-amber-900/30"
      aria-labelledby="footer-title"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_12%,rgba(250,204,21,0.12),transparent_45%),radial-gradient(circle_at_90%_15%,rgba(34,211,238,0.09),transparent_45%)] pointer-events-none" />
      <h2 id="footer-title" className="sr-only">
        Footer Section
      </h2>
      <div className="section-inner relative z-10 max-w-7xl">
        <div className="rounded-3xl border border-amber-100/10 bg-black/35 backdrop-blur-md p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-7 border-b border-amber-100/10">
            <div>
              <h3 className="typo-h2 md:!text-4xl text-amber-50">
                Gajon Mala
              </h3>
              <p className="typo-body text-amber-100/70 mt-3 max-w-xl">
                Sacred Rudraksha and spiritual stories from Kantore. Walk the
                path of devotion, culture, and celebration.
              </p>
            </div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-500/10 text-cyan-200 px-4 py-2.5 text-sm hover:bg-cyan-500/20 transition-colors"
            >
              Back to Top
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="md:hidden mt-8 space-y-3">
            {[
              { key: "quick", title: "Quick Links" },
              { key: "explore", title: "Explore" },
              { key: "contact", title: "Contact" },
              { key: "social", title: "Follow Us" },
            ].map((section) => (
              <div
                key={section.key}
                className="rounded-2xl border border-amber-100/10 bg-white/[0.03] overflow-hidden"
              >
                <button
                  className="w-full px-4 py-3 flex items-center justify-between text-amber-100"
                  onClick={() => toggleSection(section.key)}
                >
                  <span className="font-medium">{section.title}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      openSection === section.key ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openSection === section.key && (
                  <div className="px-4 pb-4">
                    {section.key === "quick" && (
                      <ul className="space-y-2">
                        {quickLinks.map((elem) => (
                          <li key={elem.to}>
                            {elem.type === "route" ? (
                              <Link
                                to={elem.to}
                                className="text-amber-200/75 hover:text-amber-300"
                              >
                                {elem.field}
                              </Link>
                            ) : (
                              <a
                                href={elem.to}
                                className="text-amber-200/75 hover:text-amber-300"
                              >
                                {elem.field}
                              </a>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                    {section.key === "explore" && (
                      <ul className="space-y-2">
                        {exploreLinks.map((elem) => (
                          <li key={elem.field}>
                            <Link
                              to={elem.to}
                              className="text-amber-200/75 hover:text-amber-300"
                            >
                              {elem.field}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                    {section.key === "contact" && (
                      <ul className="space-y-2 text-amber-200/75 text-sm">
                        <li className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-amber-400" />
                          <a href="mailto:info@mahadeumala.com">
                            info@mahadeumala.com
                          </a>
                        </li>
                        <li className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-amber-400" />
                          <a href="tel:1234567890">+91 1234567890</a>
                        </li>
                        <li className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-amber-400" />
                          <span>Kantore, India (WB)</span>
                        </li>
                      </ul>
                    )}
                    {section.key === "social" && (
                      <div className="flex gap-3 pt-1">
                        {socialLinks.map((social, index) => (
                          <a
                            key={index}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.label}
                            className="w-9 h-9 rounded-full bg-amber-600/20 hover:bg-amber-600 flex items-center justify-center transition-colors duration-300"
                          >
                            <img src={social.icon} alt={social.label} className="w-4 h-4" />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mt-8 md:mt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg text-amber-50 mb-4">Follow Us</h4>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ scale: 1.2, rotateZ: 10 }}
                  className="w-10 h-10 rounded-full bg-amber-600/20 hover:bg-amber-600 flex items-center justify-center transition-colors duration-300"
                >
                  <img src={social.icon} alt={social.label} className="w-5 h-5" />
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
                  {elem.type === "route" ? (
                    <Link
                      to={elem.to}
                      className="text-amber-200/70 hover:text-amber-400 transition-colors duration-300"
                    >
                      {elem.field}
                    </Link>
                  ) : (
                    <a
                      href={elem.to}
                      className="text-amber-200/70 hover:text-amber-400 transition-colors duration-300"
                    >
                      {elem.field}
                    </a>
                  )}
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
            <h4 className="text-xl text-amber-50 mb-4">Explore</h4>
            <ul className="space-y-3">
              {exploreLinks.map((elem) => (
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
        </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-7 text-center text-amber-200/60 text-sm"
        >
          <p>
            &copy; {date.getFullYear()} <span className="text-amber-100">Gajon Mala</span>. All
            rights reserved. Made with devotion.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
