import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";

export function Footer({ animationTransition }) {
  return (
    <motion.footer
      className="flex flex-col justify-around items-center bg-header shadow-blue p-2"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ ...animationTransition, duration: 0.3 }}
    >
      <ul className="flex justify-center items-center">
        <li className="px-1">
          <h3 className="text-md lg:text-lg xl:text-xl">Created By aarnif</h3>
        </li>
        <li className="px-1">
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
