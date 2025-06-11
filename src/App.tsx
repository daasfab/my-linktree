import { useState, useEffect } from "react";
import { FaGithub, FaInstagram, FaMedium, FaUserShield } from "react-icons/fa";
import "./App.css";

const links = [
  {
    name: "GitHub",
    url: "https://github.com/daasfab",
    appUrl: "github://user?username=daasfab", // this will see if the app is instlaled to user's mobile device (if site is opened on mobile), if so, will open the link on the respective app! :)
    icon: <FaGithub />,
  },
  {
    name: "Medium",
    url: "https://medium.com/@thatonecyberguy",
    appUrl: "medium://@thatonecyberguy", 
    icon: <FaMedium />,
  },
  {
    name: "Instagram",
    url: "https://instagram.com/daasfab_",
    appUrl: "instagram://user?username=daasfab_",
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

  const handleClick = (
  e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  link: typeof links[number]
) => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile && link.appUrl) {
    e.preventDefault();

    // attemptin to open app
    window.location.href = link.appUrl;

    // falling back only if user stays on the page (i.e., app did not open)
    const fallbackTimeout = setTimeout(() => {
      if (document.visibilityState === "visible") {
        window.open(link.url, "_blank", "noopener,noreferrer");
      }
    }, 1500);

    // cancelling fallback if app takes focus
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        clearTimeout(fallbackTimeout);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange, {
      once: true,
    });
  }
};

  
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
            onClick={(e) => handleClick(e, link)}
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
