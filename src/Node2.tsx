import * as d3 from "d3"
import { motion, useMotionValue } from "framer-motion"
import "./Node.css"
import plusIcon from "./assets/plus.svg"
import { useEffect, useRef, useState } from "react"


type PropTypes = {
    x: number,
    y: number,
    side: string,
}

const DURATION = 0.5
const RAD = 30

const newNodeOffset = {
    x: 90,
    y: 90,
}
const btnOffsets: { [side: string]: { top: string, left: string }, } = {
    left: {
        top: "21px",
        left: "-51px"
    },
    right: {
        top: "21px",
        left: "21px"
    },
}

const containerVar = {
    init: ({ pos, side }: any) => ({
        x: pos.x + (side === 'left' ? -32 : 32),
        y: pos.y + 32,
    }),
    showUnmaterialised: ({ pos, side }: any) => ({
        x: pos.x + (side === 'left' ? -32 : 32),
        y: pos.y + 32,
    }),
    showMaterialised: ({ pos, side }: any) => ({
        x: pos.x + newNodeOffset.x * (side === 'left' ? -1 : 1),
        y: pos.y + newNodeOffset.y,
    }),
}

const nodeCircVar = {
    init: {
        opacity: 0,
        scale: 0.3,
        x: - 15,
        y: - 15,
    },
    showUnmaterialised: {
        x: - 15,
        y: - 15,
        scale: 1,
        opacity: 0.8,
        pathLength: 1,
        transition: { duration: DURATION }
    },
    showMaterialised: {
        x: - 15,
        y: - 15,
        scale: 2,
        opacity: 1,
        pathLength: 1,
        transition: { duration: DURATION }
    },
}

const linkLineVar = {
    init:{ pathLength: 0, opacity: 0 },
                    show: (linkLineSvg: string) => ({
                        d: linkLineSvg ?? undefined,
                        pathLength: 1,
                        opacity: 1,
                        transition:{ duration: DURATION, delay: 0.05 }
                    }),
}

const linkArrowVar = {
    init:{ opacity: 0, 
    },
                    show: (linkArrowSvg: string) => ({
                        
                        d: linkArrowSvg ?? undefined,
                        opacity: 1,
                        transition:{ duration: DURATION, delay: 0.08 }
                    }),
}

const Node = (props: PropTypes) => {
    // Whether the create-node button has turned into an actual node
    const [materialised, setMaterialised] = useState(false)
    const nodeX1 = useMotionValue(0);
    const nodeX2 = useMotionValue(0);
    const nodeX3 = useMotionValue(0);
    const btnOffset = btnOffsets[props.side]
    const [linkLineSvg, setLinkLineSvg] = useState<string | null>(null);
    const [linkArrowSvg, setLinkArrowSvg] = useState<string | null>(null)
    const [linkSvg2, setLinkSvg2] = useState<string | null>(null);


    let line = d3
        .line()
        .x((d) => d[0])
        .y((d) => d[1]);

    let triangle = d3.symbol()
        .type(d3.symbolTriangle)
        .size(25)

    useEffect(() => {
        setLinkArrowSvg(triangle())
    }, [])


    // useEffect(() => {

    //     const unsubscribeNode1X = nodeX1.on("change", (newX1) => {
    //         const intersectPoints_1_1 = calcIntersectPoints(newX1, 50, nodeX2.get(), 180, RAD, RAD)
    //         setLinkLineSvg(line([[newX1 + intersectPoints_1_1.start.x, 50 + intersectPoints_1_1.start.y], [newX1 + intersectPoints_1_1.end.x, 50 + intersectPoints_1_1.end.y]]))

    //         const intersectPnts_1_2 = calcIntersectPoints(newX1, 50, nodeX3.get(), 180, RAD, RAD)
    //         setLinkSvg2(line([[newX1 + intersectPnts_1_2.start.x, 50 + intersectPnts_1_2.start.y], [newX1 + intersectPnts_1_2.end.x, 50 + intersectPnts_1_2.end.y]]))
    //     })
    //     const unsubscribeNode2X = nodeX2.on("change", (newX2) => {
    //         setLinkLineSvg(line([[nodeX1.get(), 50], [newX2, 180]]))
    //     })
    //     const unsubscribeNode3X = nodeX3.on("change", (newX3) => {
    //         setLinkSvg2(line([[nodeX1.get(), 50], [newX3, 180]]))
    //     })
    //     return () => {
    //         unsubscribeNode1X()
    //         unsubscribeNode2X()
    //         unsubscribeNode3X()
    //     }
    // }, [])

    const materialise = () => {
        setMaterialised(true)

        const intersectPnts_1_1 = calcIntersectPoints(0, 0, (props.side === "left" ? 1 : -1) * newNodeOffset.x, -newNodeOffset.y, RAD, RAD)
        setLinkLineSvg(line([[0 + intersectPnts_1_1.start.x, intersectPnts_1_1.start.y], [intersectPnts_1_1.end.x, intersectPnts_1_1.end.y]]))

        const intersectPnts_1_2 = calcIntersectPoints(props.x, props.y, props.x + 90, props.y + 90, RAD, RAD)
        setLinkSvg2(line([[props.x + intersectPnts_1_2.start.x, props.y + intersectPnts_1_2.start.y], [props.x + intersectPnts_1_2.end.x, props.y + intersectPnts_1_2.end.y]]))

    }


    return (<>
        <motion.div
            variants={containerVar}
            custom={{ pos: { x: props.x, y: props.y }, side: props.side }}
            initial="init"
            animate={materialised ? "showMaterialised" : "showUnmaterialised"}
            // initial={{ opacity: 0, scale: 0.5, x: props.x, y: props.y }}
            // animate={{ opacity: 1, scale: 1, x: props.x, y: props.y }}
            transition={{ duration: DURATION }}
            style={{
                position: "absolute", width: "min-content",
                // top: props.x, left: props.y
            }}
        >
            {/* <motion.svg className="svgEle">
                <motion.path
                    d={circle2Svg} stroke="#832ed9" strokeWidth="3" fill="#3acdde"
                    variants={nodeCircVar}
                    initial="init"
                    animate="show"
                ></motion.path>
            </motion.svg> */}
            {materialised && <motion.svg className="svgEle">
                <motion.path d={linkLineSvg ?? undefined} stroke="#832ed9" strokeWidth="4" fill="none"
                    strokeLinecap="round"
                    variants={linkLineVar}
                    custom={linkLineSvg}
                    initial="init"
                    animate="show"
                    // initial={{ pathLength: 0, opacity: 0 }}
                    // animate={{
                        //     d: linkLineSvg ?? undefined,
                        //     pathLength: 1,
                        //     opacity: 1,
                        // }}
                        // transition={{ duration: DURATION, delay: 0.05 }}
                        />
            </motion.svg>}
            {materialised && 
            <motion.svg className="svgEle">
                <motion.path d={linkArrowSvg ?? undefined} stroke="#832ed9" strokeWidth="4" fill="none"
                    strokeLinecap="round"
                    variants={linkArrowVar}
                    custom={linkArrowSvg}
                    initial="init"
                    animate="show"
                    style={{
                        x:props.side ==='left'?22.4:-22.4,
                        y:-21,
                        rotate: props.side ==='left'?-135:135
                    }}
                    />
            </motion.svg>}

            <motion.button
                style={{
                    position: "absolute",
                    // top: materialised ? '-30px'  : btnOffset.top,
                    // left: materialised ? '-30px'  : btnOffset.left,
                    width: '28px',
                    height: '28px',
                    padding: "0",
                    backgroundColor: materialised ? "rgba(49, 179, 235, 0.6)" : "rgba(163, 163, 163, 0.6)",
                    borderRadius: "50%",
                    border: 'none',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',

                }}
                variants={nodeCircVar}
                initial='init'
                animate={materialised ? 'showMaterialised' : 'showUnmaterialised'}
                whileHover={{
                    scale: 1.4,
                    backgroundColor: "rgba(33, 217, 149, 1)",
                    cursor: "pointer",
                }}
                whileTap={{
                    scale: 1.2,
                }}
                onClick={materialise}
            >{materialised ||
                <img src={plusIcon} width="18px"></img>
                }
            </motion.button>
            {materialised &&
                <Node x={0} y={0} side="left" />

            }
            {materialised &&
                <Node x={0} y={0} side="right" />
            }
        </motion.div>

    </>)
}

export default Node;



const CreateNodeBtn = (props: { side: string }) => {
    const btnOffset = btnOffsets[props.side]
    return (
        <motion.button
            style={{
                position: "absolute",
                top: btnOffset.top,
                left: btnOffset.left,
                width: '30px',
                height: '30px',
                padding: "0",
                backgroundColor: "rgba(163, 163, 163, 0.6)",
                borderRadius: "50%",
                border: 'none',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',

            }}
            animate={{ scale: 1.2 }}
            whileHover={{
                scale: 1.4,
                backgroundColor: "rgba(33, 217, 149, 1)",
                cursor: "pointer",
            }}
            whileTap={{
                scale: 1.2,
            }}
        >
            <img src={plusIcon} width="18px"></img>
        </motion.button>

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