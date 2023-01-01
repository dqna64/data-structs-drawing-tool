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
    init: (pos: any) => ({
        x: pos.x - 30,
        y: pos.y + 30,
    }),
    showUnmaterialised: (pos: any) => ({
        x: pos.x - 30,
        y: pos.y + 30,
    }),
    showMaterialised: (pos: any) => ({
        x: pos.x - 30 - 80,
        y: pos.y + 30 + 120,
    }),
}

const nodeCircVar = {
    init: { pathLength: 0 },
    showUnmaterialised: {
        x: - 15,
        y: - 15,
        scale: 1,
        pathLength: 1,
        transition: { duration: 0.8 }
    },
    showMaterialised: {
        x: - 15,
        y: - 15,
        scale: 2,
        pathLength: 1,
        transition: { duration: 0.8 }
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
            custom={{ x: props.x, y: props.y }}
            initial="init"
            animate={materialised ? "showMaterialised" : "showUnmaterialised"}
            // initial={{ opacity: 0, scale: 0.5, x: props.x, y: props.y }}
            // animate={{ opacity: 1, scale: 1, x: props.x, y: props.y }}
            transition={{ duration: 0.5 }}
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
                <CreateNodeBtn side='right' />
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