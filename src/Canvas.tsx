import { filterProps, motion, useMotionValue } from "framer-motion"
import * as d3 from "d3"
import Node from "./Node"
import "./Canvas.css"
import React, { useEffect, useLayoutEffect, useRef, useState } from "react"

const RAD = 30
const START_Y = 110

export const Canvas = () => {
    const [width, setWidth] = useState(0);
    const [widthInitialised, setWidthInitialised] = useState(false)
    const nodeX1 = useMotionValue(width / 2);
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
        setWidthInitialised(true)
        nodeX1.set(width / 2)
        nodeX2.set(width / 4)
        nodeX3.set(3 * width / 4)

        const intersectPoints_1_1 = calcIntersectPoints(nodeX1.get(), START_Y, nodeX2.get(), 180, RAD, RAD)
        setLinkSvg1(line([[nodeX1.get() + intersectPoints_1_1.start.x, START_Y + intersectPoints_1_1.start.y], [nodeX1.get() + intersectPoints_1_1.end.x, START_Y + intersectPoints_1_1.end.y]]))

        const intersectPnts_1_2 = calcIntersectPoints(nodeX1.get(), START_Y, nodeX3.get(), 180, RAD, RAD)
        setLinkSvg2(line([[nodeX1.get() + intersectPnts_1_2.start.x, START_Y + intersectPnts_1_2.start.y], [nodeX1.get() + intersectPnts_1_2.end.x, START_Y + intersectPnts_1_2.end.y]]))
    }, [width])

    useEffect(() => {

        const unsubscribeNode1X = nodeX1.on("change", (newX1) => {
            const intersectPoints_1_1 = calcIntersectPoints(newX1, START_Y, nodeX2.get(), 180, RAD, RAD)
            setLinkSvg1(line([[newX1 + intersectPoints_1_1.start.x, START_Y + intersectPoints_1_1.start.y], [newX1 + intersectPoints_1_1.end.x, START_Y + intersectPoints_1_1.end.y]]))

            const intersectPnts_1_2 = calcIntersectPoints(newX1, START_Y, nodeX3.get(), 180, RAD, RAD)
            setLinkSvg2(line([[newX1 + intersectPnts_1_2.start.x, START_Y + intersectPnts_1_2.start.y], [newX1 + intersectPnts_1_2.end.x, START_Y + intersectPnts_1_2.end.y]]))
        })
        const unsubscribeNode2X = nodeX2.on("change", (newX2) => {
            setLinkSvg1(line([[nodeX1.get(), START_Y], [newX2, 180]]))
        })
        const unsubscribeNode3X = nodeX3.on("change", (newX3) => {
            setLinkSvg2(line([[nodeX1.get(), START_Y], [newX3, 180]]))
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
                {widthInitialised && (
                    <>
                        {/* <motion.svg className="svgEle">
                            <motion.path
                                d={circle1Svg} stroke="#832ed9" strokeWidth="3" fill="rgba(49, 179, 235, 0.6)"
                                initial={{ opacity: 0, scale: 0.5, x: nodeX1.get(), y: START_Y }}
                                animate={{ opacity: 1, scale: 1, x: nodeX1.get(), y: START_Y }}
                                transition={{ duration: 0.5 }}
                            />
                        </motion.svg> */}
                        <motion.button
                            style={{
                                position: "absolute",
                                // top: materialised ? '-30px'  : btnOffset.top,
                                // left: materialised ? '-30px'  : btnOffset.left,
                                width: '28px',
                                height: '28px',
                                padding: "0",
                                backgroundColor: "rgba(49, 179, 235, 0.6)",
                                borderRadius: "50%",
                                border: 'none',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',

                            }}
                            initial={{
                                opacity: 0,
                                scale: 0.3,
                                x: nodeX1.get() - 15,
                                y: START_Y - 15,
                            }}
                            animate={{
                                x: nodeX1.get() - 15,
                                y: START_Y - 15,
                                scale: 2,
                                opacity: 1,
                                pathLength: 1,
                            }}
                            transition={{ duration: 0.5 }}
                            whileHover={{
                                scale: 1.4,
                                backgroundColor: "rgba(33, 217, 149, 1)",
                                cursor: "pointer",
                            }}
                            whileTap={{
                                scale: 1.2,
                            }}
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 0.84 }}
                                transition={{ duration: 0.5 }}
                            >{Math.floor(9 * Math.random()) + 1}</motion.div>
                        </motion.button>

                        <Node x={nodeX1.get()} y={START_Y} side='left' />
                        <Node x={nodeX1.get()} y={START_Y} side='right' />
                        {/* <motion.svg className="svgEle">
                            <motion.path d={linkSvg1 ?? undefined} stroke="#832ed9" strokeWidth="4" fill="none"
                                strokeLinecap="round"
                                initial={{ pathLength: 0 }}
                                animate={{
                                    d: linkSvg1 ?? undefined,
                                    pathLength: 1
                                }}
                                transition={{ duration: 0.5 }}
                                />
                        </motion.svg> */}
                        {/* <motion.svg className="svgEle">
                            <motion.path d={linkSvg2 ?? undefined} stroke="#832ed9" strokeWidth="4" fill="none"
                                strokeLinecap="round"
                                initial={{ pathLength: 0 }}
                                animate={{
                                    d: linkSvg2 ?? undefined,
                                    pathLength: 1
                                }}
                                transition={{ duration: 0.5 }}
                            />
                        </motion.svg> */}

                    </>)}
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

/**
 * Given two nodes and their radii, find the points intersecting their
 * circumferences by the shortest line connecting them.
 * @param x1 x coord of start node
 * @param y1 y coord of start node
 * @param x2 x coord of end node
 * @param y2 y coord of end node
 * @param rad1 radius of start node
 * @param rad2 radius of end node
 */
const calcIntersectPoints = (x1: number, y1: number, x2: number, y2: number, rad1: number, rad2: number): { start: { x: number, y: number }, end: { x: number, y: number } } => {
    const dx = (x2 - x1)
    const dy = (y2 - y1)
    const dist = Math.sqrt(dx ** 2 + dy ** 2)
    const start = { x: (rad1 / dist) * dx, y: (rad1 / dist) * dy }
    const end = { x: (1 - (rad2 / dist)) * dx, y: (1 - (rad2 / dist)) * dy }
    return { start, end }
}