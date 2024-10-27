import { useRef, useState } from "react";

import { ScenarioManager } from "./game/components/ScenarioManager";
import { sampleScenario } from "../public/static/scenario";

import Phaser from "phaser";
import { PhaserGame } from "./game/PhaserGame";

function App() {
    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef();
    const [showScenario, setShowScenario] = useState(true);

    return (
        <div id="app">
            <div>
                {showScenario && (
                    <ScenarioManager
                        scenario={sampleScenario}
                        onComplete={() => {
                            setShowScenario(false);
                            // Handle scenario completion
                        }}
                        onClose={() => setShowScenario(false)}
                    />
                )}
            </div>
            <PhaserGame ref={phaserRef} />
        </div>
    );
}

export default App;
