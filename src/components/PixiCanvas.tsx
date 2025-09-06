'use client'

import { useEffect, useState, useRef } from "react";
import { Application, extend } from "@pixi/react";
import { Container, Text } from "pixi.js";

extend({ Container, Text });

const PixiCanvas = () => {
    const parentRef = useRef<HTMLDivElement>(null);
    const [windowReady, setWindowReady] = useState<boolean>(false);

    useEffect(() => {
        setWindowReady(true);
    }, []);

    if (!windowReady) return null;

    return (
        <section ref={parentRef} className="h-screen w-screen">
            <Application
                resizeTo={parentRef}
                background="#121212"
                autoStart
            >
                {/* Game title */}
                <pixiContainer
                    x={window.innerWidth / 2}
                    y={window.innerHeight / 2}
                >
                    <pixiText
                        text="Zelda Slot"
                        anchor={0.5}
                        style={{
                            fontSize: 30,
                            fill: "#ffffff",
                            dropShadow: {
                                color: "#fff",
                                blur: 5,
                                distance: 4,
                                angle: Math.PI / 4,
                                alpha: 0.5,
                            },
                        }}
                    />
                </pixiContainer>

                {/* Spin button */}
                <pixiContainer
                    x={window.innerWidth / 2}
                    y={(window.innerHeight / 2) + 300}
                    eventMode="static"
                    cursor="pointer"
                    onPointerDown={() => console.log("Spin button clicked!")}
                >
                    <pixiText
                        text="Spin"
                        anchor={0.5}
                        style={{
                            fontSize: 30,
                            fill: "#ffffff",
                            dropShadow: {
                                color: "#fff",
                                blur: 5,
                                distance: 4,
                                angle: Math.PI / 4,
                                alpha: 0.5,
                            },
                        }}
                    />
                </pixiContainer>
            </Application>
        </section>
    );
};

export default PixiCanvas;
