"use client"
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const Marquee = ({ children, speed = 20, direction = "left" }) => {
    const elementRef = useRef(null);
    const wrapperRef = useRef(null);

    useEffect(() => {
        const elementWidth = elementRef.current?.offsetWidth || 0;

        if (elementWidth > 0) {
            gsap.to(wrapperRef.current, {
                x: direction === "left" ? -elementWidth : elementWidth,
                duration: elementWidth / speed,
                ease: "none",
                repeat: -1,
            });
        } else {
            console.error("Element width is zero. Ensure children render properly.");
        }
    }, [speed, direction]);

    return (
        <div className="overflow-hidden relative w-screen">
            <div
                ref={wrapperRef}
                className="flex absolute whitespace-nowrap"
            >
                <div ref={elementRef} className="inline-flex">
                    {children}
                </div>
                <div className="inline-flex">{children}</div>
            </div>
        </div>
    );
};

export default Marquee;
