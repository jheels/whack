/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import DialogueScreen from "./DialougeScreen";
import { LearningPage } from "./LearningScreen";
import { AdviceScreen } from "./AdviceScreen";

export const ScenarioManager = ({ scenario, onComplete, onClose }) => {
    const [stage, setStage] = useState("dialogue");
    const [currentPageIndex, setCurrentPageIndex] = useState(0);

    const handleStartLearning = () => {
        setStage("learning");
    };

    const handlePageComplete = () => {
        if (currentPageIndex < scenario.learningPages.length - 1) {
            setCurrentPageIndex((prev) => prev + 1);
        } else {
            setStage("advice");
        }
    };

    const handlePageBack = () => {
        if (currentPageIndex > 0) {
            setCurrentPageIndex((prev) => prev - 1);
        } else {
            setStage("dialogue");
        }
    };

    const handleAdviceBack = () => {
        setCurrentPageIndex(scenario.learningPages.length - 1);
        setStage("learning");
    };

    return (
        <div>
            {stage === "dialogue" && (
                <DialogueScreen
                    scenario={scenario}
                    onStartLearning={handleStartLearning}
                    onClose={onClose}
                />
            )}

            {stage === "learning" && (
                <LearningPage
                    page={scenario.learningPages[currentPageIndex]}
                    onComplete={handlePageComplete}
                    onBack={handlePageBack}
                />
            )}

            {stage === "advice" && (
                <AdviceScreen
                    scenario={scenario}
                    onSelectAdvice={onComplete}
                    onBack={handleAdviceBack}
                />
            )}
        </div>
    );
};
