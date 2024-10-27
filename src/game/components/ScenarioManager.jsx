/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import DialogueScreen from "./DialougeScreen";
import { LearningPage } from "./LearningScreen";
import { AdviceScreen } from "./AdviceScreen";
import { LoadingDots, OutcomeScreen } from "./OutcomesScreen";
import { ProgressManager } from "./ProgressManager";

export const ScenarioManager = ({ scenario, onComplete, onClose }) => {
    const [stage, setStage] = useState("dialogue");
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [selectedOutcome, setSelectedOutcome] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Initialize the progress manager and unit
    const progressManager = ProgressManager.getInstance();

    progressManager.initializeUnit(scenario.unitId);

    const handleStartLearning = () => {
        setStage("learning");
    };

    const handlePageComplete = (pageNumber, answers) => {

        if (currentPageIndex < scenario.learningPages.length - 1) {
            setCurrentPageIndex((prev) => prev + 1);
        } else {
            setStage("advice");
        }
        return true;
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
    const handleAdviceSelect = async (adviceId) => {
        // Use the new combined method instead of just storeChosenAdvice
        progressManager.processAdviceSelection(scenario.scenarioId, adviceId.id);

        setStage("outcome");
        setIsLoading(true);

        await new Promise(resolve => setTimeout(resolve, 2000));

        const selectedAdvice = scenario.adviceOptions.get(adviceId.id);
        setSelectedOutcome(selectedAdvice);
        setIsLoading(false);
    };
    const handleRestart = () => {
        // Reset to initial state
        setStage("dialogue");
        setCurrentPageIndex(0);
        setSelectedOutcome(null);
    };

    const handleContinue = () => {
        // Call the original onComplete callback
        if (onComplete) {
            onComplete(selectedOutcome);
        }
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
                    onComplete={(answers) =>
                        handlePageComplete(
                            scenario.learningPages[currentPageIndex].pageNumber,
                            answers
                        )
                    }
                    onBack={handlePageBack}
                    isLastPage={currentPageIndex === scenario.learningPages.length - 1}
                />
            )}
            {stage === "advice" && (
                <AdviceScreen
                    scenario={scenario}
                    onSelectAdvice={handleAdviceSelect}
                    onBack={handleAdviceBack}
                />
            )}
            {stage === "outcome" && (
                <div className="p-6">
                    {isLoading ? (
                        <LoadingDots />
                    ) : (
                        <OutcomeScreen
                            outcome={selectedOutcome}
                            onRestart={handleRestart}
                            onContinue={handleContinue}
                        />
                    )}
                </div>
            )}
        </div>
    );
};
