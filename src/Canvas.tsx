import { motion } from "framer-motion"
import * as d3 from "d3"
import Node from "./Node"
import "./Canvas.css"
import React, { useLayoutEffect, useRef, useState } from "react"

export const Canvas = () => {
    const [posX, setPosX] = useState(50);
    const [posX2, setPosX2] = useState(50);

    const handleChangePosX = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPosX(parseInt(e.target.value, 10) ?? 0)
    }

    const canvasRef = useRef(null);
    const [width, setWidth] = useState(0);

    useLayoutEffect(() => {
        setWidth(canvasRef.current?.['offsetWidth'] ?? 600);
    }, [canvasRef.current?.['offsetWidth']]);

    let line = d3
        .line()
        .x((d) => d[0])
        .y((d) => d[1]);
    let d = line([[width * posX/100,30], [posX2, 40], [40, 60]]) ?? undefined;

    const circleA = d3
        .arc();
    const circleAsvg = circleA({
        innerRadius: 0,
        outerRadius: 30,
        startAngle: 0,
        endAngle: 2 * Math.PI,
    }) ?? undefined;
        // .innerRadius(0)
        // .outerRadius(30)
        // .startAngle(0)
        // .endAngle(Math.PI * 2);

    return (
        <div className="canvas" ref={canvasRef}>
            <svg className="link">
                <path d={d} stroke="red" strokeWidth="2" fill="none"></path>
                <motion.path d={circleAsvg} stroke="red" strokeWidth="2" fill="green"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1, x: width * posX/100, y: 30 }}
            transition={{ duration: 0.2 }}
                ></motion.path>

            </svg>
            <motion.div
                className="node"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1, x: width * posX2/100 }}
                transition={{ duration: 0.2 }}
            />

            <input type="range" min={0} max={100} onChange={handleChangePosX} />
            <input type="range" min={0} max={100} onChange={(e) => setPosX2(parseInt(e.target.value, 10) ?? 0)} />
            <h2>Canvas width: {width}</h2>

        </div>
    )
}
