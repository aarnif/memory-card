import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";

export function Footer({ animationTransition }) {
  const styles = {
    footer:
      "bg-header flex flex-col justify-around items-center shadow-blue p-2",
    ul: "flex justify-center items-center",
    li: "px-1",
    h3: "text-xl",
  };

  return (
    <motion.footer
      className={styles.footer}
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ ...animationTransition, duration: 0.3 }}
    >
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
    </motion.footer>
  );
}
