import { motion, useMotionValue } from "framer-motion"
import * as d3 from "d3"
import Node from "./Node"
import "./Canvas.css"
import React, { useEffect, useLayoutEffect, useRef, useState } from "react"

export const Canvas = () => {
    const [width, setWidth] = useState(0);
    const nodeX1 = useMotionValue(0);
    const nodeX2 = useMotionValue(width / 4);
    const nodeX3 = useMotionValue(3 * width / 4);
    const [linkSvg1, setLinkSvg1] = useState<string | null>(null);
    const [linkSvg2, setLinkSvg2] = useState<string | null>(null);

    const handleChangePosX1 = (e: React.ChangeEvent<HTMLInputElement>) => {
        nodeX1.set(parseInt(e.target.value, 10) ?? 0)
    }

    const handleChangePosX2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        nodeX2.set(parseInt(e.target.value, 10) ?? 0)

    }

    const handleChangePosX3 = (e: React.ChangeEvent<HTMLInputElement>) => {
        nodeX3.set(parseInt(e.target.value, 10) ?? 0)

    }

    useEffect(() => {
        setLinkSvg1(line([[nodeX1.get(), 50], [nodeX2.get(), 180]]))
        const unsubscribeNode1X = nodeX1.on("change", (newX1) => {
            setLinkSvg1(line([[newX1, 50], [nodeX2.get(), 180]]))
            setLinkSvg2(line([[newX1, 50], [nodeX3.get(), 180]]))
        })
        const unsubscribeNode2X = nodeX2.on("change", (newX2) => {
            setLinkSvg1(line([[nodeX1.get(), 50], [newX2, 180]]))
        })
        const unsubscribeNode3X = nodeX3.on("change", (newX3) => {
            setLinkSvg2(line([[nodeX1.get(), 50], [newX3, 180]]))
        })
        return () => {
            unsubscribeNode1X()
            unsubscribeNode2X()
            unsubscribeNode3X()
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

    const circle3Svg = circle({
        innerRadius: 0,
        outerRadius: 10,
        startAngle: 0,
        endAngle: 2 * Math.PI,
    }) ?? undefined;

    return (
        <div>
            <h2>Canvas width: {width}</h2>
            <input type="range" min={0} max={width} onChange={handleChangePosX1} />
            <input type="range" min={0} max={width} onChange={handleChangePosX2} />
            <input type="range" min={0} max={width} onChange={handleChangePosX3} />

            <div className="canvas" ref={canvasRef}>
                <motion.svg className="svgEle">
                    <motion.path
                        d={circle1Svg} stroke="#832ed9" strokeWidth="3" fill="#3acdde"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1, x: nodeX1.get(), y: 50 }}
                        transition={{ duration: 0.25 }}
                    />
                </motion.svg>
                <Node x={nodeX2.get()} y={180} />
                <Node x={nodeX3.get()} y={180} />
                <motion.svg className="svgEle">
                    <motion.path d={linkSvg1 ?? undefined} stroke="#832ed9" strokeWidth="4" fill="none"
                        strokeLinecap="round"
                        animate={{
                            d: linkSvg1 ?? undefined
                        }}
                        transition={{ duration: 0.25 }}
                    />
                </motion.svg>
                <motion.svg className="svgEle">
                    <motion.path d={linkSvg2 ?? undefined} stroke="#832ed9" strokeWidth="4" fill="none"
                        strokeLinecap="round"
                        animate={{
                            d: linkSvg2 ?? undefined
                        }}
                        transition={{ duration: 0.25 }}
                    />
                </motion.svg>
                {/* <motion.div
            drag
                className="node"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1, x: width * posX2/100 }}
                transition={{ duration: 0.25 }}
            /> */}


            </div>
        </div>
    )
}
