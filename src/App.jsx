import Phaser from 'phaser';
import { useRef, useState } from 'react';
import { PhaserGame } from './game/PhaserGame';
import { ScenarioManager } from './game/components/ScenarioManager';
import { sampleScenario } from '../public/static/scenario';

// Main App Component
const App = () => {
    const [showScenario, setShowScenario] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            {/* Main content */}
            <div className="max-w-4xl bg-blue-500 mx-auto">
                <h1 className="text-3xl font-bold mb-6">Financial Advisor Game</h1>

                {/* Sample content that will be overlaid */}
                <div className="bg-white rounded-lg p-6 shadow-lg">
                    <h2 className="text-xl font-semibold mb-4">Welcome to the Financial Office</h2>
                    <p className="text-gray-600 mb-4">
                        Here you can help people with their financial decisions.
                        Click the button below to start helping Sarah with her budgeting.
                    </p>
                    <button
                        onClick={() => setShowScenario(true)}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Talk to Sarah
                    </button>
                </div>
            </div>

            {/* Scenario Manager Overlay */}
            {
                showScenario && (
                    <ScenarioManager
                        scenario={sampleScenario}
                        onComplete={() => {
                            setShowScenario(false);
                            // Handle scenario completion
                        }}
                        onClose={() => setShowScenario(false)}
                    />
                )
            }
        </div >
    );
};

export default App
