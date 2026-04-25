import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function TypewriterName({ text }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    setDisplayed("");

    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));

      if (i === text.length) {
        clearInterval(interval);
      }
    }, 120); // speed control

    return () => clearInterval(interval);
  }, [text]);

  return (
    <div
      style={{
        position: "relative",
        zIndex: 2,
        fontSize: "clamp(20px, 5vw, 44px)",
        color: "#78350f",
        fontFamily: "'Playfair Display', serif",
        fontWeight: 600,
        letterSpacing: "2px",
        textTransform: "uppercase",
        textAlign: "center",
        padding: "0 10px",
        minHeight: "1.5em",
        wordBreak: "break-word",
      }}
    >
      {displayed}
      <span
        style={{
          display: "inline-block",
          width: "2px",
          background: "#78350f",
          marginLeft: "4px",
          animation: "blink 0.8s infinite",
        }}
      />
    </div>
  );
}
/* -------- Rotating Text -------- */
function RotatingText({ en, te }) {
  const [showTelugu, setShowTelugu] = useState(false);


  useEffect(() => {
    const interval = setInterval(() => {
      setShowTelugu((prev) => !prev);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: "relative", minHeight: "1.4em" }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={showTelugu ? "te" : "en"}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          style={{ position: "absolute", width: "100%" }}
        >
          {showTelugu ? te : en}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* -------- Main Component -------- */
export default function WeddingWebsite() {
  const weddingDate = new Date("2026-05-10T22:19:00+05:30");

  const [timeLeft, setTimeLeft] = useState({});

  const invitedName = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("name")?.toUpperCase() || "DEAR GUEST";
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const distance = weddingDate.getTime() - now;

      if (distance <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, secs: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / (1000 * 60)) % 60),
        secs: Math.floor((distance / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  const stars = useMemo(() => {
    return Array.from({ length: 25 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 6 + Math.random() * 6,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 5,
    }));
  }, []);
  return (
    <>
      <div style={styles.page}>
        {stars.map((s, i) => (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              borderRadius: "50%",
              background: "#fff",

              boxShadow: `
        0 0 6px rgba(255,255,255,0.8),
        0 0 12px rgba(212,175,55,0.6),
        0 0 20px rgba(212,175,55,0.4)
      `,

              opacity: 0.7,
              pointerEvents: "none",
              zIndex: 1,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.4, 0.8],
            }}
            transition={{
              duration: s.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: s.delay,
            }}
          />
        ))}

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={styles.card}>

          <div
            style={{
              marginBottom: "50px",
              padding: "30px 22px",
              borderRadius: "22px",
              border: "1px solid rgba(212,175,55,0.35)",
              background: "#fffef9",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* ✨ soft glow background */}
            <div
              style={{
                position: "absolute",
                top: "-50px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "220px",
                height: "140px",
                background: "radial-gradient(circle, rgba(212,175,55,0.15), transparent)",
                filter: "blur(50px)",
              }}
            />

            {/* ✨ floating subtle shine */}
            <motion.div
              style={{
                position: "absolute",
                top: 0,
                left: "-60%",
                width: "40%",
                height: "100%",
                background:
                  "linear-gradient(120deg, transparent, rgba(255,255,255,0.5), transparent)",
                transform: "skewX(-20deg)",
              }}
              animate={{ left: ["-60%", "120%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            />

            {/* Invite text (English + Telugu rotating) */}
            <div
              style={{
                fontSize: "15px",
                color: "#7a5c2e",
                letterSpacing: "1px",
                marginBottom: "14px",
                minHeight: "1.5em",
              }}
            >
              <RotatingText
                en="Together with our families, we warmly invite"
                te="మా కుటుంబ సభ్యులతో కలిసి, మిమ్మల్ని సాదరంగా ఆహ్వానిస్తున్నాము"
              />
            </div>

            {/* Guest Name */}
            <motion.div
              style={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "18px 14px",
                margin: "24px auto",
                maxWidth: "100%",
                overflow: "hidden",
                isolation: "isolate", // 🔥 prevents blending with other layers
              }}
            >
              {/* Glow border layer */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "18px",
                  border: "1px solid rgba(212,175,55,0.35)",
                  boxShadow: "0 0 25px rgba(212,175,55,0.15)",
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.6), rgba(255,255,255,0.2))",
                  backdropFilter: "blur(6px)",
                  zIndex: 0,
                }}
              />

              {/* Shine layer */}
              <motion.div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "-80%",
                  width: "60%",
                  height: "100%",
                  background:
                    "linear-gradient(120deg, transparent, rgba(255,255,255,0.6), transparent)",
                  transform: "skewX(-20deg)",
                  zIndex: 1,
                }}
                animate={{ left: ["-80%", "120%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              />

              <TypewriterName text={invitedName} />
            </motion.div>

            {/* Telugu subline */}
            <div
              style={{
                marginTop: "10px",
                fontSize: "14px",
                color: "#9a7b4f",
                minHeight: "1.4em",
              }}
            >
              <RotatingText
                en="to grace the occasion with your presence"
                te="మా ఆనందకర వేడుకకు విచ్చేసి ఆశీర్వదించండి"
              />
            </div>

            {/* Divider */}
            <div
              style={{
                width: "70px",
                height: "2px",
                background: "#d4af37",
                margin: "18px auto 0",
              }}
            />
          </div>

          {/* Names Section */}
          <div style={styles.namesWrapper}>

            {/* Border Top */}
            <div style={styles.border} />

            <motion.img
              src="/ganesh.png"
              alt="center-img"
              style={styles.centerImage}
              animate={{
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            {/* Quote */}
            <div style={styles.quote}>
              Two souls, one sacred journey, united in love and destiny.
            </div>

            {/* LOVE BACKGROUND */}
            <div style={styles.loveBg}>♡</div>

            {/* Names */}
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={styles.name}>
                <RotatingText en="HEMANTH KUMAR" te="హేమంత్ కుమార్" />
              </div>

              <div style={styles.weds}>
                <RotatingText en="weds" te="వివాహం" />
              </div>

              <div style={styles.name}>
                <RotatingText en="NEERAJA" te="నీరజ" />
              </div>
            </div>

            {/* Border Bottom */}
            <div style={styles.border} />
          </div>
          <div style={styles.inviteLine}>
            <RotatingText
              en="cordially invites you to join the occasion of their joyous commitment on"
              te="మా ఆనందకర వివాహ వేడుకకు మిమ్మల్ని ఆహ్వానిస్తున్నాము"
            />
          </div>
          {/* Date Section */}
          <motion.div
            style={styles.dateWrap}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Top Line */}
            <div style={styles.line} />

            {/* Day */}
            <div style={styles.day}>
              <RotatingText en="SUNDAY" te="ఆదివారం" />
            </div>

            {/* Main Date */}
            <div style={styles.mainDate}>
              <span style={styles.big}>10</span>
              <div style={styles.side}>
                <RotatingText en="MAY" te="మే" />
                <span style={styles.year}>2026</span>
              </div>
            </div>

            {/* Time */}
            <div style={styles.time}>
              <RotatingText en="10:19 PM" te="రాత్రి 10:19" />
            </div>

            {/* Bottom Line */}
            <div style={styles.line} />
          </motion.div>

          {/* Countdown */}
          {/* Countdown */}
          <div style={styles.countdownWrap}>
            {["days", "hours", "minutes", "secs"].map((k) => (
              <motion.div
                key={k}
                style={styles.countdownBox}
                whileHover={{ scale: 1.05 }}
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div style={styles.countNumber}>
                  {String(timeLeft[k] || 0).padStart(2, "0")}
                </div>
                <div style={styles.countLabel}>{k.toUpperCase()}</div>
              </motion.div>
            ))}
          </div>



          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
              marginTop: "60px",
            }}
          >
            {/* WEDDING */}
            <motion.div
              style={{
                padding: "26px",
                borderRadius: "24px",
                background: "#fffdf8",
                border: "1px solid rgba(212,175,55,0.25)",
                boxShadow: "0 8px 25px rgba(0,0,0,0.06)",
                textAlign: "center",
              }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h3
                style={{
                  fontSize: "16px",
                  letterSpacing: "3px",
                  color: "#b45309",
                  marginBottom: "14px",
                }}
              >
                <RotatingText
                  en="WEDDING CEREMONY"
                  te="వివాహ వేడుక"
                />
              </h3>

              <p style={{ fontSize: "15px", fontWeight: "600", color: "#5b4636" }}>
                <RotatingText
                  en="May 10, 2026"
                  te="మే 10, 2026"
                />
              </p>

              <p style={{ fontSize: "14px", color: "#7a5c2e", marginBottom: "14px" }}>
                <RotatingText
                  en="10:19 PM (Muhurtham)"
                  te="రాత్రి 10:19 గంటలకు (ముహూర్తం)"
                />
              </p>

              <div
                style={{
                  marginTop: "16px",
                  padding: "16px",
                  borderRadius: "18px",
                  background: "#fff7ed",
                  border: "1px solid rgba(212,175,55,0.2)",
                }}
              >
                <h4 style={{ fontSize: "15px", fontWeight: "600", color: "#6b4f1d" }}>
                  <RotatingText
                    en="Sri Sundara Sai Nigamagamu"
                    te="శ్రీ సుందర సాయి నిగమాగము"
                  />
                </h4>

                <p style={{ fontSize: "13px", color: "#8b6f3d" }}>
                  <RotatingText
                    en="Kalyana Mandapam"
                    te="కళ్యాణ మండపం"
                  />
                </p>

                <p style={{ fontSize: "12px", color: "#9a7b4f", marginBottom: "12px" }}>
                  <RotatingText
                    en="Near RTC Complex, Kovvur"
                    te="ఆర్టీసీ కాంప్లెక్స్ సమీపం, కొవ్వూరు"
                  />
                </p>

                {/* 📍 GOOGLE MAP */}
                <a
                  href="https://maps.app.goo.gl/3gPmf8T3m1DM3EHs6"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    marginTop: "6px",
                    padding: "8px 14px",
                    borderRadius: "20px",
                    background: "#b45309",
                    color: "#fff",
                    fontSize: "12px",
                    textDecoration: "none",
                    letterSpacing: "1px",
                  }}
                >
                  View Location
                </a>
              </div>
            </motion.div>

            {/* RECEPTION */}
            <motion.div
              style={{
                padding: "26px",
                borderRadius: "24px",
                background: "#fffdfc",
                border: "1px solid rgba(244,63,94,0.18)",
                boxShadow: "0 8px 25px rgba(0,0,0,0.06)",
                textAlign: "center",
              }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <h3
                style={{
                  fontSize: "16px",
                  letterSpacing: "3px",
                  color: "#9f1239",
                  marginBottom: "14px",
                }}
              >
                <RotatingText
                  en="RECEPTION & LUNCH"
                  te="రిసెప్షన్ & విందు"
                />
              </h3>

              <p style={{ fontSize: "15px", fontWeight: "600", color: "#5b4636" }}>
                <RotatingText
                  en="May 11, 2026"
                  te="మే 11, 2026"
                />
              </p>

              <p style={{ fontSize: "14px", color: "#7a5c2e", marginBottom: "14px" }}>
                <RotatingText
                  en="12:00 PM onwards"
                  te="మధ్యాహ్నం 12:00 గంటల నుండి"
                />
              </p>

              <div
                style={{
                  marginTop: "16px",
                  padding: "16px",
                  borderRadius: "18px",
                  background: "#fff1f2",
                  border: "1px solid rgba(244,63,94,0.15)",
                }}
              >
                <h4 style={{ fontSize: "15px", fontWeight: "600", color: "#7f1d1d" }}>
                  <RotatingText
                    en="At Our Home"
                    te="మా గృహంలో"
                  />
                </h4>

                <p style={{ fontSize: "13px", color: "#9f1239" }}>
                  <RotatingText
                    en="Kakula Illindalaparru"
                    te="కాకుల ఇల్లిందలపర్రు"
                  />
                </p>

                <p style={{ fontSize: "12px", color: "#9a7b4f", marginBottom: "12px" }}>
                  <RotatingText
                    en="Reception & Lunch Gathering"
                    te="విందు & స్వాగత కార్యక్రమం"
                  />
                </p>

                {/* 📍 GOOGLE MAP BUTTON */}
                <a
                  href="https://maps.app.goo.gl/TEZf5xJ2HDcNH4ob7"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    marginTop: "6px",
                    padding: "8px 14px",
                    borderRadius: "20px",
                    background: "#9f1239",
                    color: "#fff",
                    fontSize: "12px",
                    textDecoration: "none",
                    letterSpacing: "1px",
                  }}
                >
                  View Location
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div
            style={{
              marginTop: "90px",
              padding: "50px 30px",
              borderRadius: "26px",
              background: "#fffef9",
              border: "1px solid rgba(212,175,55,0.2)",
              boxShadow: "0 10px 35px rgba(0,0,0,0.05)",
              textAlign: "center",
              fontFamily: "'Cormorant Garamond', serif",
            }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Title */}
            <h3
              style={{
                fontSize: "18px",
                letterSpacing: "4px",
                color: "#a16207",
                marginBottom: "30px",
              }}
            >
              <RotatingText
                en="With heartfelt invitation from"
                te="మనస్ఫూర్తిగా ఆహ్వానించువారు"
              />          </h3>

            {/* Divider */}
            <div
              style={{
                width: "70px",
                height: "2px",
                background: "#d4af37",
                margin: "0 auto 40px",
              }}
            />

            {/* GRID (main fix for tightness) */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "40px",
                alignItems: "start",
              }}
            >
              {/* Groom Side */}
              <div style={{ textAlign: "center" }}>
                <p
                  style={{
                    fontSize: "22px",
                    fontWeight: "600",
                    color: "#5b4636",
                    lineHeight: "1.6",
                  }}
                >
                  <RotatingText
                    en="Dhana Venkateswara Rao"
                    te="ధన వెంకటేశ్వర రావు"
                  />
                </p>

                <p
                  style={{
                    fontSize: "20px",
                    color: "#7a5c2e",
                    marginTop: "6px",
                  }}
                >
                  <RotatingText
                    en="& Kanakamaha Lakshmi"
                    te="& కనకమహా లక్ష్మి"
                  />
                </p>

                <p
                  style={{
                    marginTop: "10px",
                    fontSize: "13px",
                    color: "#5a3e17",
                    letterSpacing: "1px",
                  }}
                >

                  <RotatingText
                    en="& Groom’s Parents"
                    te="వరుడి తల్లిదండ్రులు"
                  />
                </p>
              </div>

              {/* Bride Side */}
              <div style={{ textAlign: "center" }}>
                <p
                  style={{
                    fontSize: "22px",
                    fontWeight: "600",
                    color: "#5b4636",
                    lineHeight: "1.6",
                  }}
                >
                  <RotatingText
                    en="Venkateswara Rao"
                    te="వెంకటేశ్వర రావు"
                  />
                </p>

                <p
                  style={{
                    fontSize: "20px",
                    color: "#7a5c2e",
                    marginTop: "6px",
                  }}
                >
                  <RotatingText
                    en="& Aadhi Lakshmi"
                    te="& ఆది లక్ష్మి"
                  />
                </p>

                <p
                  style={{
                    marginTop: "10px",
                    fontSize: "13px",
                    color: "#5a3e17",
                    letterSpacing: "1px",
                  }}
                >

                  <RotatingText
                    en="& Bride’s Parents"
                    te="వధువు తల్లిదండ్రులు"
                  />
                </p>
              </div>
            </div>

            {/* Brother (separate = better spacing) */}
            {/* Brother */}
            <div style={{ marginTop: "45px" }}>
              <p
                style={{
                  fontSize: "15px",
                  color: "#7a5c2e",
                  letterSpacing: "1px",
                }}
              >
                <RotatingText
                  en="Along with"
                  te="వారితో పాటు"
                />
              </p>

              <p
                style={{
                  fontSize: "20px",
                  color: "#5b4636",
                  marginTop: "8px",
                  lineHeight: "1.6",
                }}
              >
                <RotatingText
                  en="Bhanu Prakash (Balu)"
                  te="భాను ప్రకాష్ (బాలు)"
                />
              </p>
            </div>
          </motion.div>


        </motion.div>

      </div>
      <motion.div
        style={{
          marginTop: "80px",
          padding: "25px 10px",
          textAlign: "center",
          borderTop: "1px solid rgba(212,175,55,0.2)",
          fontFamily: "'Cormorant Garamond', serif",
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Divider */}
        <div
          style={{
            width: "50px",
            height: "2px",
            background: "#d4af37",
            margin: "0 auto 15px",
          }}
        />

        {/* Text */}
        <p
          style={{
            fontSize: "14px",
            color: "#7a5c2e",
            letterSpacing: "1px",
          }}
        >
          Designed with love by
        </p>

        <p
          style={{
            fontSize: "18px",
            color: "#5b4636",
            marginTop: "6px",
            fontWeight: "500",
            letterSpacing: "2px",
          }}
        >
          HEMANTH
        </p>

        {/* subtle glow effect */}
        <motion.div
          style={{
            marginTop: "10px",
            fontSize: "14px",
            color: "#d4af37",
          }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ♥
        </motion.div>
      </motion.div>
    </>
  );
}

/* -------- Styles -------- */
const styles = {



  centerImage: {
    width: "clamp(120px, 25vw, 220px)", // responsive size
    height: "auto",
    animation: "glowPulse 2.5s ease-in-out infinite",
  },



  title: {
    fontSize: "20px",
    letterSpacing: "2px",
    color: "#b45309",
    marginBottom: "8px",
  },

  date: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#6b4f1d",
  },

  time: {
    fontSize: "15px",
    color: "#7a5c2e",
  },

  place: {
    marginTop: "10px",
    fontSize: "14px",
    color: "#7a5c2e",
  },

  nextDay: {
    fontSize: "14px",
    padding: "6px 14px",
    borderRadius: "20px",
    background: "#fde68a",
    color: "#92400e",
    fontWeight: "600",
    zIndex: 1,
  },

  /* Shine animation overlay */
  shine: {
    position: "absolute",
    top: 0,
    left: "-75%",
    width: "50%",
    height: "100%",
    background: "linear-gradient(120deg, transparent, rgba(255,255,255,0.6), transparent)",
    transform: "skewX(-20deg)",
    animation: "shineMove 4s infinite",
  },
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #fffaf5, #fde68a, #fff7ed)", display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "clamp(12px,4vw,24px)",
    fontFamily: "'Poppins', sans-serif",
  },

  card: {
    width: "100%",
    maxWidth: "900px",
    padding: "clamp(20px,5vw,40px)",
    borderRadius: "30px",
    background: "rgba(255,255,255,0.85)",
    backdropFilter: "blur(10px)",
    textAlign: "center",
    boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
  },

  inviteLine: {
    marginTop: "30px",
    marginBottom: "10px",
    fontSize: "clamp(14px,3.5vw,20px)",
    color: "#7a5c2e",
    textAlign: "center",
    maxWidth: "600px",
    marginInline: "auto",
    lineHeight: "1.6",
    fontStyle: "italic",
    minHeight: "2.5em",
  },
  invite: {
    fontSize: "clamp(16px,3.5vw,20px)",
    color: "#7a5c2e",
  },

  guest: {
    fontSize: "clamp(26px,6vw,40px)",
    color: "#a16207",
    marginBottom: "15px",
  },

  namesWrapper: {
    position: "relative",
    margin: "clamp(70px,14vw,110px) 0", // increased vertical breathing room
  },

  border: {
    width: "100%",
    height: "2px",
    background: "linear-gradient(to right, transparent, #d4af37, transparent)",
    margin: "15px 0",
  },

  quote: {
    fontSize: "clamp(14px,4vw,22px)",
    color: "#7c2d12",
    fontStyle: "italic",
    fontFamily: "'Playfair Display', serif",
    marginBottom: "30px", // add spacing
    position: "relative",
    zIndex: 2,
  },

  loveBg: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "clamp(120px, 25vw, 260px)",
    color: "rgba(212,175,55,0.08)",
    pointerEvents: "none",
    zIndex: 0,
  },

  name: {
    fontSize: "clamp(26px,7vw,64px)",
    color: "#7c2d12",
    fontFamily: "'Playfair Display', serif",
    fontWeight: "600",
    letterSpacing: "1px",
    lineHeight: "1.2",        // important
    wordBreak: "break-word",  // prevents overflow on small screens
  },

  weds: {
    fontSize: "clamp(18px,4vw,26px)",
    margin: "12px 0",
    color: "#b45309",
    fontFamily: "'Playfair Display', serif",
    fontStyle: "italic",
  },

  dateWrap: {
    margin: "60px 0",
    textAlign: "center",
  },

  line: {
    height: "1px",
    width: "60%",
    margin: "12px auto",
    background: "linear-gradient(to right, transparent, #d4af37, transparent)",
  },

  day: {
    fontSize: "clamp(14px,3vw,18px)",
    letterSpacing: "3px",
    color: "#7a5c2e",
    minHeight: "1.4em",
  },

  mainDate: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "12px",
    margin: "10px 0",
  },

  big: {
    fontSize: "clamp(42px,10vw,72px)",
    color: "#b45309",
    fontWeight: "600",
    lineHeight: "1",
  },

  side: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    fontSize: "clamp(14px,3vw,18px)",
    color: "#6b4f1d",
    minHeight: "1.4em",
  },

  year: {
    fontSize: "clamp(12px,2.5vw,14px)",
    letterSpacing: "2px",
  },

  time: {
    fontSize: "clamp(16px,4vw,20px)",
    color: "#92400e",
    marginTop: "6px",
    letterSpacing: "1px",
    minHeight: "1.4em",
  },

  countdownWrap: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(70px, 1fr))",
    gap: "12px",
    marginTop: "25px",
    padding: "0 10px",
  },

  countdownBox: {
    background: "rgba(255, 243, 205, 0.7)",
    backdropFilter: "blur(6px)",
    border: "1px solid rgba(212,175,55,0.25)",
    borderRadius: "18px",
    padding: "14px 10px",
    textAlign: "center",
    boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
  },

  countNumber: {
    fontSize: "clamp(22px, 5vw, 34px)",
    fontWeight: "700",
    color: "#b45309",
    lineHeight: "1.1",
  },

  countLabel: {
    marginTop: "6px",
    fontSize: "11px",
    letterSpacing: "2px",
    color: "#7a5c2e",
  },

  box: {
    width: "clamp(70px,22vw,90px)",
    height: "clamp(70px,22vw,90px)",
    background: "#fff3cd",
    borderRadius: "15px",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },

  venue: {
    marginTop: "20px",
  },

  actions: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    flexWrap: "wrap",
  },

  btn: {
    padding: "10px 16px",
    borderRadius: "20px",
    background: "#b45309",
    color: "#fff",
    textDecoration: "none",
  },

};