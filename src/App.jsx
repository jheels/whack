/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";

import { ScenarioManager } from "./game/components/ScenarioManager";
import { sampleScenario } from "../public/static/scenario";

import { PhaserGame } from "./game/PhaserGame";
import "./App.css";
import ProgressPopup from "./game/components/Progress";
import { ProgressManager } from "./game/components/ProgressManager";

function App() {
    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef();
    const [showScenario, setShowScenario] = useState(false);
    const [showProgress, setShowProgress] = useState(false);

    useEffect(() => {
        // Access the Phaser game instance
        const game = phaserRef.current.game;
        game.events.on("interaction-triggered", () => {
            setShowScenario(true);
        });
        return () => {
            setShowScenario(false);
            game.destroy(true);
        };
    }, []);

    useEffect(() => {
        const game = phaserRef.current.game;
        game.events.on("display-progress", () => {
            setShowProgress(true);
        });
    }, []);

    return (
        <div id="app">
            <div className="text-black">
                {showScenario && (
                    <ScenarioManager
                        scenario={sampleScenario}
                        onComplete={() => {
                            setShowScenario(false);
                            // To just see current state:
                            // const manager = ProgressManager.getInstance();
                            // manager.debug();
                        }}
                        onClose={() => setShowScenario(false)}
                    />
                )}
            </div>
            <div>
                {showProgress && (
                    <ProgressPopup onClose={() => setShowProgress(false)} />
                )}
            </div>

            <PhaserGame ref={phaserRef} />
        </div>
    );
}

export default App;
