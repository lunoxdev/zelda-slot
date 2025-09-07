const GameTitle = () => {
    return (
        <pixiContainer x={window.innerWidth / 2} y={window.innerHeight / 2 - 400}>
            <pixiText
                text="Zelda Slot"
                anchor={0.5}
                style={{
                    fontSize: 30,
                    fill: "#39FF14",
                    dropShadow: {
                        color: "#39FF14",
                        blur: 5,
                        distance: 4,
                        angle: Math.PI / 4,
                        alpha: 0.5,
                    },
                }}
            />
        </pixiContainer>
    );
};
export default GameTitle;
