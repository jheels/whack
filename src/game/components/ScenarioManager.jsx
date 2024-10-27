/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import DialogueScreen from "./DialougeScreen";
import { LearningPage } from "./LearningScreen";
import { AdviceScreen } from "./AdviceScreen";
import { ProgressManager } from "./ProgressManager";

export const ScenarioManager = ({ scenario, onComplete, onClose }) => {
    const [stage, setStage] = useState("dialogue");
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [pageAnswers, setPageAnswers] = useState(
        new Map(scenario.learningPages.map((page) => [page.pageNumber, []]))
    );

    // Initialize the progress manager and unit
    const progressManager = ProgressManager.getInstance();

    const unitId = scenario.unitId;
    const totalScenerios = progressManager.getTotalUnitScenarios(unitId);

    progressManager.initializeUnit(scenario.unitId, totalScenerios);

    const handleStartLearning = () => {
        setStage("learning");
    };

    const handlePageComplete = (pageNumber, answers) => {
        // Store the answers for this page
        setPageAnswers((prev) => new Map(prev).set(pageNumber, answers));

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

    const handleAdviceSelect = (adviceId) => {
        // Store the selected advice in the progress manager
        progressManager.storeChosenAdvice(scenario.scenarioId, adviceId.id);

        // Call the original onComplete callback
        if (onComplete) {
            onComplete(adviceId);
        }
    };

    // Get previously submitted answers for current page if they exist
    const getCurrentPageAnswers = () => {
        return (
            pageAnswers.get(
                scenario.learningPages[currentPageIndex].pageNumber
            ) || []
        );
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
                    initialAnswers={getCurrentPageAnswers()}
                    isLastPage={
                        currentPageIndex === scenario.learningPages.length - 1
                    }
                />
            )}
            {stage === "advice" && (
                <AdviceScreen
                    scenario={scenario}
                    onSelectAdvice={handleAdviceSelect}
                    onBack={handleAdviceBack}
                />
            )}
        </div>
    );
};
