import { Container, Sprite, Texture } from "pixi.js";
import { extend } from "@pixi/react";
import { loadTextures } from "../game/textures";
import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import gsap from "gsap";

extend({ Container, Sprite });

const SYMBOLS = 3; // Number of symbols per reel
const WIDTH = 110;
const HEIGHT = 190;
const GAP = 20;
const STEP = HEIGHT + GAP; // Total height of a symbol plus gap, used for movement

export interface ReelRef {
    spin: () => void;
}

const Reel = forwardRef<ReelRef, { x: number; y: number }>(({ x, y }, ref) => {
    const containerRef = useRef<Container>(null); // Ref to the Pixi container for the reel
    const spritesRef = useRef<Sprite[]>([]); // Ref to hold the Pixi sprites (symbols)
    const texturesRef = useRef<Texture[]>([]); // Ref to hold all available symbol textures

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
        // Load slot textures and initialize the reel with sprites
        loadTextures().then(({ slotTextures }) => {
            texturesRef.current = slotTextures;
            if (containerRef.current) {
                for (let i = 0; i < SYMBOLS; i++) {
                    const s = new Sprite(randTexture()); // Create a new sprite with a random texture
                    s.anchor.set(0.5); // Set anchor to center for proper positioning
                    s.x = 0;
                    s.y = i * STEP; // Position sprites with a gap
                    s.width = WIDTH;
                    s.height = HEIGHT;
                    containerRef.current.addChild(s); // Add sprite to the reel container
                    spritesRef.current.push(s); // Store sprite ref
                }
            }
        });
    }, []);

    useImperativeHandle(ref, () => ({
        spin: () => {
            if (!containerRef.current) return;
            const c = containerRef.current;
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

    return <pixiContainer ref={containerRef} x={x} y={y} />;
});

export default Reel;
