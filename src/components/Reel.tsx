import { Container, Graphics, Sprite, Texture } from "pixi.js";
import { extend } from "@pixi/react";
import { loadTextures } from "../game/textures";
import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import gsap from "gsap";

extend({ Container, Sprite });

const SYMBOLS = 3; // Number of symbols per reel
const WIDTH = 110;
const HEIGHT = 190;
const GAP = 20;
const STEP = HEIGHT + GAP;

// Fits 3 symbols with internal gaps
const VISIBLE_HEIGHT = SYMBOLS * STEP - GAP;

export interface ReelRef {
    spin: () => void;
}

const Reel = forwardRef<ReelRef, { x: number; y: number }>(({ x, y }, ref) => {
    const viewportRef = useRef<Container>(null); // Defines the visible area
    const contentRef = useRef<Container>(null); // Animated vertically container
    const spritesRef = useRef<Sprite[]>([]); // Hold the Pixi sprites (symbols)
    const texturesRef = useRef<Texture[]>([]); // Hold all available symbol textures

    // Function to get a random texture from the loaded slot textures
    const randTexture = () =>
        texturesRef.current[Math.floor(Math.random() * texturesRef.current.length)];

    // Function to rotate the textures, simulating new symbols appearing at the top
    const rotateTextures = () => {
        for (let i = spritesRef.current.length - 1; i > 0; i--) {
            spritesRef.current[i].texture = spritesRef.current[i - 1].texture; // Move texture down
        }
        spritesRef.current[0].texture = randTexture(); // Assign a new random texture to the top
    };

    useEffect(() => {
        let destroyed = false;

        loadTextures().then(({ slotTextures }) => {
            if (destroyed) return;

            texturesRef.current = slotTextures;

            // Animated sprites within content
            const content = contentRef.current;
            if (!content) return;

            for (let i = 0; i < SYMBOLS; i++) {
                const s = new Sprite(randTexture());
                s.anchor.set(0.5);
                s.x = 0;
                s.y = i * STEP;
                s.width = WIDTH;
                s.height = HEIGHT;
                content.addChild(s);
                spritesRef.current.push(s);
            }

            // Static mask in viewport
            const viewport = viewportRef.current;
            if (!viewport) return;

            const mask = new Graphics();
            mask.beginFill(0xffffff);
            // Center the mask horizontally and crop from y=0 downward; -WIDTH/2 aligns with center-anchored sprites
            const EXTRA_CUT = 100;
            mask.drawRect(-WIDTH / 2, 0, WIDTH, VISIBLE_HEIGHT - EXTRA_CUT);
            mask.endFill();
            viewport.addChild(mask);

            viewport.mask = mask;
        });

        return () => {
            destroyed = true;
        };
    }, []);

    useImperativeHandle(ref, () => ({
        spin: () => {
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
                    rotateTextures(); // Change textures to simulate new symbols
                }
            };

            // GSAP timeline for the spinning animation
            gsap.timeline()
                .to({}, { duration: 0.8, ease: "power2.in", onUpdate: () => move(40) }) // Accelerate spin
                .to({}, { duration: 1, ease: "none", onUpdate: () => move(40) }) // Constant spin speed
                .to({}, { duration: 1, ease: "power2.out", onUpdate: () => move(20), onComplete: () => { c.y = 0; } }); // Decelerate spin
        }
    }));

    return (
        <pixiContainer ref={viewportRef} x={x} y={y}>
            <pixiContainer ref={contentRef} />
        </pixiContainer>
    );
});

export default Reel;
