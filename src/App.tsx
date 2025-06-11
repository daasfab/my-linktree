import { useState, useEffect } from "react";
import { FaGithub, FaInstagram, FaMedium, FaUserShield } from "react-icons/fa";
import "./App.css";

const links = [
  {
    name: "GitHub",
    url: "https://github.com/daasfab",
    icon: <FaGithub />,
  },
  {
    name: "Medium",
    url: "https://medium.com/@thatonecyberguy",
    icon: <FaMedium />,
  },
  {
    name: "Instagram",
    url: "https://instagram.com/daasfab_",
    icon: <FaInstagram />,
  },
  {
    name: "Portfolio (Coming Soon)",
    url: "#",
    icon: <FaUserShield />,
    comingSoon: true,
  },
];

export default function LinktreePage() {
  const [_isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", checkMobile);
    checkMobile();
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="page">
      <div className="profile">
        <img src="/pfp.png" alt="Profile" />
        <h1>Daulet Rashidov</h1>
        <p>Cybersecurity & Software Engineer</p>
        <p>Pronouns: He/Him</p>
        <p className="bio">
          Software Engineer with a Cyber Security soul—building smart systems,
          breaking them (ethically 😅), and always learning. Fueled by
          curiosity, coffee (lots), and a love for digital defense. Let’s
          connect & Make Magic Happen! ✨"
        </p>
      </div>

      <div className="links">
        {links.map((link, idx) => (
          <a
            key={idx}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`link-item ${link.comingSoon ? "coming-soon" : ""}`}
          >
            <div className="link-left">
              <span>{link.icon}</span>
              {link.name}
            </div>
            {link.comingSoon && (
              <span
                style={{ fontSize: "14px", fontStyle: "italic", color: "#aaa" }}
              >
                Soon
              </span>
            )}
          </a>
        ))}
      </div>

      <footer className="footer">
        © {new Date().getFullYear()} Daulet. Striving for Excellence.
      </footer>
    </div>
  );
}
