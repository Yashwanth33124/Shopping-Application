import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./ScrollStack.css";

export const ScrollStackItem = ({ children, index, total, progress }) => {
    // Each card is fully visible for its own segment [start, nextStart]
    const start = index / total;
    const nextStart = (index + 1) / total;

    // Entrance: Slide in from the bottom
    const y = useTransform(progress, [start - 0.1, start], ["100vh", "0vh"]);

    // Exit: When the NEXT card reaches its start, this card FADES OUT
    const opacity = useTransform(progress,
        [start - 0.05, start, nextStart - 0.05, nextStart],
        [0, 1, 1, 0]
    );

    // Slight scale down for depth
    const scale = useTransform(progress, [nextStart - 0.05, nextStart], [1, 0.95]);

    return (
        <motion.div
            className="scroll-stack-item"
            style={{
                y,
                opacity,
                scale,
                zIndex: index,
            }}
        >
            <div className="scroll-stack-card">
                {children}
            </div>
        </motion.div>
    );
};

const ScrollStack = ({ children }) => {
    const containerRef = useRef(null);
    const items = React.Children.toArray(children);
    const totalSegments = items.length + 1; // +1 for the final VOGUECART PRIME text

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Final Text Animation: Appears after the last card
    const finalStart = items.length / totalSegments;
    const finalOpacity = useTransform(scrollYProgress, [finalStart, finalStart + 0.05], [0, 1]);
    const finalScale = useTransform(scrollYProgress, [finalStart, finalStart + 0.05], [0.8, 1]);

    return (
        <div
            ref={containerRef}
            className="scroll-stack-container"
            style={{ height: `${totalSegments * 100}vh` }}
        >
            <div className="scroll-stack-sticky-wrapper">
                {items.map((child, index) => (
                    <ScrollStackItem
                        key={index}
                        index={index}
                        total={totalSegments}
                        progress={scrollYProgress}
                    >
                        {child.props.children}
                    </ScrollStackItem>
                ))}

                {/* FINAL OUTRO TEXT */}
                <motion.div
                    className="scroll-stack-final"
                    style={{
                        opacity: finalOpacity,
                        scale: finalScale,
                    }}
                >
                    <h1>VOGUECART PRIME</h1>
                </motion.div>
            </div>
        </div>
    );
};

export default ScrollStack;
