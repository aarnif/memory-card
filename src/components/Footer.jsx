import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="footer">
      <ul className="footer-items">
        <li>
          <h3>Created By aarnif</h3>
        </li>
        <li>
          <motion.div
            whileHover={{
              scale: 1.5,
              rotate: 360,
            }}
            transition={{ duration: 0.5 }}
          >
            <a
              href="https://github.com/aarnif"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon
                icon={faGithub}
                style={{ color: "#0077f2" }}
                size={"xl"}
              />
            </a>
          </motion.div>
        </li>
      </ul>
    </footer>
  );
}
