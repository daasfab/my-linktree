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
    appUrl: "", // medium doesn't support proper deep linking to profiles
    icon: <FaMedium />,
  },
  {
    name: "Instagram",
    url: "https://instagram.com/daasfab_",
    appUrl: "instagram://user?username=daasfab_", //will open my profile locally on the app instead of web
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

    const fallbackTimeout = setTimeout(() => {
      if (document.visibilityState === "visible") {
        window.open(link.url, "_blank", "noopener,noreferrer");
      }
    }, 1500);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        clearTimeout(fallbackTimeout);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange, {
      once: true,
    });

    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = link.appUrl;
    document.body.appendChild(iframe);

    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1000);
  };

  return (
    <div className="page">
      <div className="profile">
        <img src="/pfp.png" alt="profile" />
        <h1>Daulet Rashidov</h1>
        <p>Cybersecurity & Software Engineer</p>
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
            onClick={(e) => handleClick(e, link)}
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
