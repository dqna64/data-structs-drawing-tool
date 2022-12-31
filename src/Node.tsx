import * as d3 from "d3"
import { motion } from "framer-motion"
import "./Node.css"
import plusIcon from "../public/plus.svg"


type PropTypes = {
    x: number,
    y: number
}

const Node = (props: PropTypes) => {
    const circle = d3
        .arc();

    const circle2Svg = circle({
        innerRadius: 0,
        outerRadius: 30,
        startAngle: 0,
        endAngle: 2 * Math.PI,
    }) ?? undefined;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1, x: props.x, y: props.y }}
            transition={{ duration: 0.25 }}
            style={{ position: "absolute", width: "min-content" }}
        >
            <motion.svg className="svgEle">
                <motion.path
                    d={circle2Svg} stroke="#832ed9" strokeWidth="3" fill="#3acdde"
                ></motion.path>
            </motion.svg>
            <CreateNodeBtn side='left' />
            <CreateNodeBtn side='right' />
        </motion.div>)
}

export default Node;

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

const CreateNodeBtn = (props: { side: string }) => {
    const btnOffset = btnOffsets[props.side]
    return (
        <motion.button
            // d={circle3Svg} stroke="none" fill="#24d191"
            style={{
                position: "absolute",
                // transform: "translate(-45px, 15px)",
                top: btnOffset.top,
                left: btnOffset.left,
                // x: "-45",
                // y: "-15",
                width: '30px',
                height: '30px',
                padding: "0",
                backgroundColor: "rgba(163, 163, 163, 0.6)",
                borderRadius: "50%",
                // color: "white",
                // fontSize: "1.6rem",
                // fontWeight: "800",
                // textAlign: "center",
                // verticalAlign: "middle",
                // lineHeight: "30px",
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',

            }}
            // animate={{scale: 1.2}}
            whileHover={{
                scale: 1.4,
                backgroundColor: "rgba(33, 217, 149, 1)",
            }}
            whileTap={{
                scale: 1.2,
            }}
        >
            <img src={plusIcon} width="18px"></img>
        </motion.button>
    )
}