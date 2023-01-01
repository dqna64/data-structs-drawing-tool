import * as d3 from "d3"
import { motion } from "framer-motion"
import "./Node.css"
import plusIcon from "./assets/plus.svg"
import { useRef, useState } from "react"


type PropTypes = {
    x: number,
    y: number,
    side: string,
}

const DURATION = 0.5

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
    init: ({pos, side}: any) => ({
        x: pos.x + (side ==='left'?-32:32),
        y: pos.y + 32,
    }),
    showUnmaterialised: ({pos, side}: any) => ({
        x: pos.x + (side ==='left'?-32:32),
        y: pos.y + 32,
    }),
    showMaterialised: ({pos, side}: any) => ({
        x: pos.x + 90*(side==='left'?-1:1),
        y: pos.y  + 90,
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

const Node = (props: PropTypes) => {
    // Whether the create-node button has turned into an actual node
    const [materialised, setMaterialised] = useState(false)
    const leftRef = useRef(null);
    const btnOffset = btnOffsets[props.side]

    // const circle = d3
    //     .arc();

    // const circle2Svg = circle({
    //     innerRadius: 0,
    //     outerRadius: 30,
    //     startAngle: 0,
    //     endAngle: 2 * Math.PI,
    // }) ?? undefined;

    return (
        <motion.div
            variants={containerVar}
            custom={{pos: { x: props.x, y: props.y}, side: props.side}}
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
                onClick={() => setMaterialised(true)}
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
            <div className="leftSlot" ref={leftRef}></div>
            <div className="rightSlot"></div>
        </motion.div>)
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