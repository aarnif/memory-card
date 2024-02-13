import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";

export function Footer() {
  const styles = {
    footer:
      "bg-black-rgba flex flex-col justify-around items-center shadow-blue-under p-2",
    ul: "flex justify-center items-center",
    li: "px-1",
    h3: "text-xl",
  };

  return (
    <footer className={styles.footer}>
      <ul className={styles.ul}>
        <li className={styles.li}>
          <h3 className={styles.h3}>Created By aarnif</h3>
        </li>
        <li className={styles.li}>
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
