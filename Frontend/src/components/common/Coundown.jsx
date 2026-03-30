import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import AnimatedText from "@/components/shared/AnimatedText";

const getRemainingTime = (targetDate) => {
  const distance = targetDate.getTime() - Date.now();

  if (distance <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, completed: true };
  }

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((distance / (1000 * 60)) % 60),
    seconds: Math.floor((distance / 1000) % 60),
    completed: false,
  };
};

function Coundown({
  title = "Countdown to Kantore Gajon Festival",
  subtitle = "Every second brings us closer to the celebration.",
  target = "2027-04-01T00:00:00+05:30",
}) {
  const targetDate = useMemo(() => new Date(target), [target]);
  const [timeLeft, setTimeLeft] = useState(() => getRemainingTime(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getRemainingTime(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section className="section-shell-tight relative overflow-hidden pt-5 sm:pt-6 md:pt-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.18),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(79,70,229,0.14),transparent_45%)]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.45 }}
        className="relative z-10 section-inner max-w-6xl rounded-2xl md:rounded-3xl border border-cyan-400/20 bg-slate-950/80 backdrop-blur-md p-4 sm:p-5 md:p-8"
      >
        <div className="text-center max-w-3xl mx-auto">
          <AnimatedText
            as="h2"
            text={title}
            className="section-title text-white"
            delay={0.06}
            wordDelay={0.03}
          />
          <AnimatedText
            text={subtitle}
            className="section-subtitle mt-2 text-cyan-100/75 px-1"
            delay={0.14}
            wordDelay={0.025}
            duration={0.34}
          />
        </div>

        {timeLeft.completed ? (
          <p className="text-center mt-7 text-cyan-300 font-semibold text-base sm:text-lg">
            The wait is over. Festival has started.
          </p>
        ) : (
          <div className="mt-6 sm:mt-8 grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 md:gap-5">
            {units.map((unit, index) => (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                className="rounded-xl sm:rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-900/25 to-indigo-900/25 p-2 sm:p-3 md:p-4 text-center min-h-[102px] sm:min-h-[120px]"
              >
                <p className="text-2xl sm:text-3xl md:text-5xl font-bold text-cyan-200 tabular-nums leading-none tracking-tight">
                  {String(unit.value).padStart(2, "0")}
                </p>
                <p className="mt-2 text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.18em] sm:tracking-widest text-cyan-100/70">
                  {unit.label}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}

export default Coundown;
