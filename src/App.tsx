import { useState, useEffect } from "react";
import {
  FaGithub,
  FaInstagram,
  FaMedium,
  FaUserShield,
} from "react-icons/fa";
import "./App.css";

const links = [
  {
    name: "GitHub",
    url: "https://github.com/daasfab",
    appUrl: "",
    icon: <FaGithub />,
  },
  {
    name: "Medium",
    url: "https://medium.com/@thatonecyberguy",
    appUrl: "",
    icon: <FaMedium />,
  },
  {
    name: "Instagram",
    url: "https://instagram.com/daasfab_",
    appUrl: "",
    icon: <FaInstagram />,
  },
  {
    name: "Portfolio (coming soon)",
    url: "#",
    icon: <FaUserShield />,
    comingSoon: true,
  },
];

export default function LinktreePage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", checkMobile);
    checkMobile();
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

 const handleClick = (
  e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  link: typeof links[number]
) => {
  if (!isMobile || !link.appUrl || link.comingSoon) return;

  e.preventDefault();

  const start = Date.now();

  // try to open the app
  window.location.href = link.appUrl;

  // fallback to web if app doesn't open within 1s
  setTimeout(() => {
    const now = Date.now();
    if (now - start < 2000) {
      window.open(link.url, "_blank", "noopener,noreferrer");
    }
  }, 1000);
};

  return (
    <div className="page">
      <div className="profile">
        <img src="/pfp.png" alt="profile" />
        <h1>Daulet Rashidov</h1>
        <p>Cyber Security & Software Engineer</p>
        <p>Pronouns: He/Him</p>
        <p className="bio">
          Software Engineer with a Cyber Security soul—building smart systems,
          breaking them (ethically! 😅), and always learning. Fueled by
          curiosity, coffee (lots), and a love for digital defense. Let’s
          connect & Make Magic Happen! ✨
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
            onClick={(e) => handleClick(e, link)} // ❌ remove this line
          >

            <div className="link-left">
              <span>{link.icon}</span>
              {link.name}
            </div>
            {link.comingSoon && (
              <span
                style={{
                  fontSize: "14px",
                  fontStyle: "italic",
                  color: "#aaa",
                }}
              >
                soon
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
