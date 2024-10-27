/* eslint-disable no-unused-vars */
import { AdviceRank, scenarios } from "../../../public/static/scenario";

export class ProgressManager {
    static instance;
    unitsProgress;
    scenariosProgress;

    constructor() {
        this.unitsProgress = new Map(); // unitId to unitProgress map
        this.scenariosProgress = new Map(); // scenarioId to chosen advice id map
    }

    static getInstance() {
        if (!ProgressManager.instance) {
            ProgressManager.instance = new ProgressManager();
        }
        return ProgressManager.instance;
    }

    initializeUnit(unitId) {
        if (!this.unitsProgress.has(unitId)) {
            this.unitsProgress.set(unitId, {
                completedTasks: 0,
                tasks: new Map(),
                badgeEarned: false,
            });
        }
    }

    storeChosenAdvice(scenarioId, chosenAdviceId) {
        this.scenariosProgress.set(scenarioId, chosenAdviceId);
    }

    updateUnitProgress(scenarioId, chosenAdviceId) {
        const scenario = scenarios.get(scenarioId);
        if (!scenario) {
            console.error(`Scenario with ID ${scenarioId} not found`);
            return;
        }

        const unitId = scenario.unitId;
        const advice = scenario.adviceOptions.get(chosenAdviceId);

        if (!advice) {
            console.error(`Advice with ID ${chosenAdviceId} not found in scenario ${scenarioId}`);
            return;
        }

        if (advice.rank === AdviceRank.BEST) {
            this.incrementUnitProgress(unitId);
            this.checkAndUpdateBadge(unitId);
        }
    }

    incrementUnitProgress(unitId) {
        const unitProgress = this.unitsProgress.get(unitId);
        if (unitProgress) {
            unitProgress.completedTasks += 1;
        }
    }

    checkAndUpdateBadge(unitId) {
        const unitProgress = this.unitsProgress.get(unitId);
        if (!unitProgress) return;

        const totalScenarios = this.getTotalUnitScenarios(unitId);
        if (unitProgress.completedTasks >= totalScenarios) {
            unitProgress.badgeEarned = true;
        }
    }

    processAdviceSelection(scenarioId, chosenAdviceId) {
        this.storeChosenAdvice(scenarioId, chosenAdviceId);
        this.updateUnitProgress(scenarioId, chosenAdviceId);
        // console.log("Progress ", this.scenariosProgress);
        // console.log("Unit", this.unitsProgress);
    }

    getUnitProgress(unitId) {
        console.log("Unit Id ", unitId);
        console.log("Units ", this.unitsProgress);
        const unitProgress = this.unitsProgress.get(unitId);
        console.log("Unit Progress", unitProgress);
        return 0;
        // return unitProgress ? unitProgress.completedTasks : 0;
    }

    getTotalUnitScenarios(unitId) {
        return Array.from(scenarios.values())
            .filter(scenario => scenario.unitId === unitId)
            .length;
    }

    hasBadge(unitId) {
        const unitProgress = this.unitsProgress.get(unitId);
        return unitProgress ? unitProgress.badgeEarned : false;
    }

    getScenariosForUnit(unitId) {
        const unitScenarios = new Map();
        for (const [id, scenario] of scenarios.entries()) {
            if (scenario.unitId === unitId) {
                unitScenarios.set(id, scenario);
            }
        }
        return unitScenarios;
    }

    getUnitProgressSummary(unitId) {
        const unitProgress = this.unitsProgress.get(unitId);
        const totalScenarios = this.getTotalUnitScenarios(unitId);

        return {
            completedTasks: unitProgress?.completedTasks || 0,
            totalTasks: totalScenarios,
            progressPercentage: unitProgress
                ? (unitProgress.completedTasks / totalScenarios) * 100
                : 0,
            badgeEarned: this.hasBadge(unitId)
        };
    }

    debug() {
        console.group("🔍 Progress Manager Debug Info");

        console.group("📊 Overall Statistics");
        console.log("Total Units Tracked:", this.unitsProgress.size);
        console.log("Total Scenarios Tracked:", this.scenariosProgress.size);
        console.groupEnd();

        console.group("📚 Unit Progress");
        this.unitsProgress.forEach((progress, unitId) => {
            console.group(`Unit: ${unitId}`);
            const summary = this.getUnitProgressSummary(unitId);
            console.log("Completed Tasks:", summary.completedTasks);
            console.log("Total Available Tasks:", summary.totalTasks);
            console.log("Completion Rate:", `${summary.progressPercentage.toFixed(1)}%`);
            console.log("Badge Earned:", summary.badgeEarned ? "✅" : "❌");
            console.groupEnd();
        });
        console.groupEnd();

        console.group("🎯 Scenario Choices");
        this.scenariosProgress.forEach((choiceId, scenarioId) => {
            const scenario = scenarios.get(scenarioId);
            const choice = scenario?.adviceOptions.get(choiceId);
            console.group(`Scenario: ${scenarioId}`);
            console.log("Chosen Advice ID:", choiceId);
            console.log("Advice Rank:", choice?.rank || "Unknown");
            console.log("Unit:", scenario?.unitId || "Unknown");
            console.groupEnd();
        });
        console.groupEnd();

        console.groupEnd();

        return {
            totalUnits: this.unitsProgress.size,
            totalScenarios: this.scenariosProgress.size,
            unitProgress: Array.from(this.unitsProgress.entries())
                .map(([unitId, progress]) => ({
                    unitId,
                    ...this.getUnitProgressSummary(unitId)
                })),
            scenarioChoices: Array.from(this.scenariosProgress.entries())
                .map(([scenarioId, choiceId]) => ({
                    scenarioId,
                    choiceId,
                    unitId: scenarios.get(scenarioId)?.unitId,
                })),
        };
    }
}
