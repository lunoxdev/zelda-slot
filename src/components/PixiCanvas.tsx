import { useEffect, useState } from "react";
import { Application, extend } from "@pixi/react";
import { Container, Text } from "pixi.js";

extend({ Container, Text });

const PixiCanvas = () => {
    const [windowReady, setWindowReady] = useState<boolean>(false);


    useEffect(() => {
        setWindowReady(true);
    }, []);

    if (!windowReady) return null;

    return (
        <section className="overflow-hidden">
            <Application
                resizeTo={window}
                background="#121212"
                autoStart
            >
                <pixiContainer x={window.innerWidth / 2} y={window.innerHeight / 2}>
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
            </Application>
        </section>
    );
};

export default PixiCanvas;
