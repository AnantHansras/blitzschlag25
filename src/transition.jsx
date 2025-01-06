import { motion } from "framer-motion";
import "./App.css";

const Transition = (Comp) => {
    return () => (
        <>
            <Comp />
            <motion.div
                className="slide-in"
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                exit={{ scaleY: 0 }}
                transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.div
                className="slide-out"
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                exit={{ scaleY: 0}}
                transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            />
            
        </>
    );
};

export default Transition;
