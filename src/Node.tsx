import {motion} from "framer-motion"
import "./Node.css"

const Node = () => (
    <motion.div
    className="node"
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
/>
)

export default Node;