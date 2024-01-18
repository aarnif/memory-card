import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <h3>
        Copyright © {currentYear} aarnif{" "}
        <FontAwesomeIcon
          icon={faGithub}
          style={{ color: "#0077f2" }}
          size={"lg"}
        />
      </h3>
    </footer>
  );
}
