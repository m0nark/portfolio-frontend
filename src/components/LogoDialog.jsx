import React, { useState } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./LogoDialog.css";

const LogoDialog = ({ logoSrc }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDialog = () => setIsOpen(prev => !prev);

    return (
        <>
            <motion.img
                src={logoSrc}
                alt="Logo"
                className="clickable-logo"
                onClick={(e) => {
                    e.stopPropagation();
                    toggleDialog();
                }}
                animate={{
                    y: [5, -8, 5],
                }}
                transition={{
                    duration: 1.25,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut"
                }}
            />

            {ReactDOM.createPortal(
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            className="dialog-overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={toggleDialog}
                        >
                            <motion.div
                                className="dialog-box"
                                onClick={(e) => e.stopPropagation()}
                                initial={{ rotateY: 0, scale: 0.3 }}
                                animate={{
                                    rotateY: [0, 180, 360],
                                    scale: 1,
                                    transition: {
                                        duration: 0.8,
                                        ease: "easeInOut",
                                    },
                                }}
                                exit={{ opacity: 0, scale: 0.7 }}
                            >
                                <button
                                    className="dialog-close-btn"
                                    onClick={toggleDialog}
                                >
                                    ×
                                </button>
                                <div className="dialog-image-placeholder">
                                    <img
                                        src={logoSrc}
                                        alt="Logo"
                                        className="dialog-logo-image"
                                    />
                                </div>
                                <div className="dialog-text-placeholder">
                                    <h2 className="dialog-title">Behind the Name</h2>
                                    <p className="dialog-paragraph">
                                        I created <strong>m0nark</strong> when I wanted a space to just be myself — no pressure, no labels.
                                    </p>
                                    <p className="dialog-paragraph">
                                        The name comes from <em>monarch</em>. Not just the idea of royalty, but the kind of leader who doesn’t need to shout. The kind that leads quietly, by example.
                                    </p>
                                    <p className="dialog-paragraph">
                                        It started during online gaming, but it stuck — this second identity where I could build, explore, and just be. me.
                                    </p>
                                    <p className="dialog-paragraph">
                                        So if you’ve seen <strong>m0nark</strong> around — that’s still me. Just the version that lives online.
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
};

export default LogoDialog;
