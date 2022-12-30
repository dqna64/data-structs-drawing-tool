import { motion, useMotionValue } from "framer-motion"
import * as d3 from "d3"
import Node from "./Node"
import "./Canvas.css"
import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
import { xml } from "d3"

export const Canvas = () => {
    const [width, setWidth] = useState(0);
    const nodeX1 = useMotionValue(0);
    const nodeX2 = useMotionValue(0);
    const [linkSvg1, setLinkSvg1] = useState<string | null>(null);

    const handleChangePosX1 = (e: React.ChangeEvent<HTMLInputElement>) => {
        nodeX1.set(parseInt(e.target.value, 10) ?? 0)
    }

    const handleChangePosX2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        nodeX2.set(parseInt(e.target.value, 10) ?? 0)

    }

    useEffect(() => {
        setLinkSvg1(line([[nodeX1.get(), 30], [nodeX2.get(), 130]]))
        const unsubscribeNode1X = nodeX1.on("change", (newX1) => {
            setLinkSvg1(line([[newX1, 30], [nodeX2.get(), 130]]))
        })
        const unsubscribeNode2X = nodeX2.on("change", (newX2) => {
            setLinkSvg1(line([[nodeX1.get(), 30], [newX2, 130]]))
        })
        return () => {
            unsubscribeNode1X()
            unsubscribeNode2X()
        }
    }, [])

    const canvasRef = useRef(null);

    useLayoutEffect(() => {
        setWidth(canvasRef.current?.['offsetWidth'] ?? 600);
    }, [canvasRef.current?.['offsetWidth']]);

    let line = d3
        .line()
        .x((d) => d[0])
        .y((d) => d[1]);

    const circle = d3
        .arc();
    const circle1Svg = circle({
        innerRadius: 0,
        outerRadius: 30,
        startAngle: 0,
        endAngle: 2 * Math.PI,
    }) ?? undefined;

    const circle2Svg = circle({
        innerRadius: 0,
        outerRadius: 30,
        startAngle: 0,
        endAngle: 2 * Math.PI,
    }) ?? undefined;

    return (
        <div className="canvas" ref={canvasRef}>
            <motion.svg className="link">
                <motion.path
                    d={circle1Svg} stroke="#832ed9" strokeWidth="3" fill="#3acdde"
                    drag
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1, x: nodeX1.get(), y: 30 }}
                    transition={{ duration: 0.25 }}
                />
                <motion.path
                    d={circle2Svg} stroke="#832ed9" strokeWidth="3" fill="#3acdde"
                    drag
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1, x: nodeX2.get(), y: 130 }}
                    transition={{ duration: 0.25 }}
                />
                <motion.path d={linkSvg1 ?? undefined} stroke="#832ed9" strokeWidth="4" fill="none"
                    strokeLinecap="round"
                    animate={{
                        d: linkSvg1 ?? undefined
                    }}
                    transition={{ duration: 0.25 }}
                />
                <motion.circle

                    drag></motion.circle>

            </motion.svg>
            {/* <motion.div
            drag
                className="node"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1, x: width * posX2/100 }}
                transition={{ duration: 0.25 }}
            /> */}

            <input type="range" min={0} max={width} onChange={handleChangePosX1} />
            <input type="range" min={0} max={width} onChange={handleChangePosX2} />
            <h2>Canvas width: {width}</h2>

        </div>
    )
}
