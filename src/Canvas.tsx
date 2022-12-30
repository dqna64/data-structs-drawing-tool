import { motion } from "framer-motion"
import Node from "./Node"
import "./Canvas.css"
import "./Node.css"
import { useLayoutEffect, useRef, useState } from "react"

export const Canvas = () => {
    const [posX, setPosX] = useState(50);
    const [posX2, setPosX2] = useState(50);
    
    const canvasRef = useRef(null);
    const [width, setWidth] = useState(0);

    useLayoutEffect(() => {
        setWidth(canvasRef.current?.['offsetWidth'] ?? 600);
    }, [canvasRef.current?.['offsetWidth']]);

    return (
        <div className="canvas" ref={canvasRef}>
            <motion.div
                className="node"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1, x: width * posX/100 }}
                transition={{ duration: 0.2 }}
            />
            <motion.div
                className="node"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1, x: width * posX2/100 }}
                transition={{ duration: 0.2 }}
            />

            <input type="range" min={0} max={100} onChange={(e) => setPosX(parseInt(e.target.value, 10) ?? 0)} />
            <input type="range" min={0} max={100} onChange={(e) => setPosX2(parseInt(e.target.value, 10) ?? 0)} />
            <h2>Canvas width: {width}</h2>

        </div>
    )
}
