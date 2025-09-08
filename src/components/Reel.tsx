import { Container, Graphics, Sprite, Texture } from "pixi.js";
import { extend } from "@pixi/react";
import { loadTextures } from "../game/textures";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SYMBOLS, WIDTH, HEIGHT, STEP, VISIBLE_HEIGHT } from "../game/constants";
import { rotateTextures } from "./../utils/reelUtils"

extend({ Container, Sprite });


const Reel = ({ x, y, isSpinning, onSpinComplete }: {
    x: number;
    y: number;
    isSpinning: boolean;
    onSpinComplete: () => void
}) => {
    const viewportRef = useRef<Container>(null); // Defines the visible area
    const contentRef = useRef<Container>(null); // Animated vertically container
    const spritesRef = useRef<Sprite[]>([]); // Hold the Pixi sprites (symbols)
    const texturesRef = useRef<Texture[]>([]); // Hold all available symbol textures

    // Function to get a random texture from the loaded slot textures
    const randTexture = () =>
        texturesRef.current[Math.floor(Math.random() * texturesRef.current.length)];

    useEffect(() => {
        let destroyed = false;

        loadTextures().then(({ slotTextures }) => {
            if (destroyed) return;

            texturesRef.current = slotTextures;

            // Animated sprites within content
            const content = contentRef.current;
            if (!content) return;

            for (let i = 0; i < SYMBOLS; i++) {
                // Container for the symbol
                const card = new Container();
                card.x = 0;
                card.y = (i - 1) * STEP;

                // Symbol sprite
                const s = new Sprite(randTexture());
                s.anchor.set(0.5);
                s.width = WIDTH;
                s.height = HEIGHT;
                card.addChild(s);

                // Simple rounded mask
                const mask = new Graphics()
                    .roundRect(-WIDTH / 2, -HEIGHT / 2, WIDTH, HEIGHT, 10) // x, y, w, h, radius
                    .fill(0xffffff); // white fill for mask

                card.addChild(mask);
                card.mask = mask; // Apply mask to container

                // Add to content and store sprite reference
                content.addChild(card);
                spritesRef.current.push(s);
            }

            // Static mask in viewport
            const viewport = viewportRef.current;
            if (!viewport) return;

            const mask = new Graphics();
            mask.beginFill(0xffffff);
            // Position and size the mask to correctly display the three symbols
            mask.drawRoundedRect(-WIDTH / 2, -HEIGHT / 2, WIDTH, VISIBLE_HEIGHT, 10); // Border rounded
            mask.endFill();
            viewport.addChild(mask);

            viewport.mask = mask;
        });

        return () => {
            destroyed = true;
        };
    }, []);

    useEffect(() => {
        if (isSpinning) {
            const c = contentRef.current;
            if (!c) return;

            let moved = 0;

            // Function to move the reel and rotate textures as needed
            const move = (speed: number) => {
                c.y += speed; // Move the container down
                moved += speed;

                while (moved >= STEP) {
                    moved -= STEP;
                    c.y -= STEP; // Reset container position for seamless looping
                    rotateTextures(spritesRef, randTexture); // Change textures to simulate new symbols
                }
            };

            // GSAP timeline for the spinning animation
            gsap
                .timeline()
                // Accelerate spin
                .to({}, {
                    duration: 0.8,
                    ease: "power2.in",
                    onUpdate: () => move(80)
                })
                // Constant spin speed
                .to({}, {
                    duration: 1,
                    ease: "none",
                    onUpdate: () => move(80)
                })
                // Decelerate spin
                .to({}, {
                    duration: 1,
                    ease: "power2.out",
                    onUpdate: () => move(60),
                    onComplete: () => {
                        c.y = 0;
                        onSpinComplete();
                    },
                }
                );
        }
    }, [isSpinning]);

    return (
        <pixiContainer ref={viewportRef} x={x} y={y}>
            <pixiContainer ref={contentRef} />
        </pixiContainer>
    );
};

export default Reel;
