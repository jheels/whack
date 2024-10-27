/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { scenarios, AdviceRank } from "../../../public/static/scenario";
import { badges } from "../../../public/static/scenario";

export class ProgressManager {
    static instance;
    gameProgress;

    constructor() {
        this.gameProgress = {
            unitsProgress: new Map(), // unitId to unitProgress map
            scenariosProgress: new Map() // scenarioId to chosen advice id map
        };
    }

    static getInstance() {
        if (!ProgressManager.instance) {
            ProgressManager.instance = new ProgressManager();
        }
        return ProgressManager.instance;
    }

    initializeUnit(unitId, totalTasks) {
        if (!this.gameProgress.unitsProgress.has(unitId)) {
            this.gameProgress.unitsProgress.set(unitId, {
                completedTasks: 0,
                tasks: new Map(),
                badgeEarned: false,
            });
        }
    }

    storeChosenAdvice(scenarioId, chosenAdviceId) {
        this.gameProgress.scenariosProgress.set(scenarioId, chosenAdviceId);

        const scenario = scenarios.get(scenarioId);
        if (!scenario) {
            console.error(`Scenario with ID ${scenarioId} not found`);
            return;
        }

        const unitId = scenario.unitId;
        const rank = scenario.adviceOptions.get(chosenAdviceId).rank;
        if (rank == AdviceRank.BEST) {  // Assuming 1 is still the "BEST" advice ID
            const unitProgress = this.gameProgress.unitsProgress.get(unitId);
            if (unitProgress) {
                unitProgress.completedTasks += 1;
                if (unitProgress.completedTasks === this.getTotalUnitScenarios(unitId)) {
                    unitProgress.badgeEarned = true;
                }
            }
        }
    }

    getUnitProgress(unitId) {
        const unitProgress = this.gameProgress.unitsProgress.get(unitId);
        return unitProgress ? unitProgress.completedTasks : 0;
    }

    getTotalUnitScenarios(unitId) {
        // Count scenarios for this unit
        let count = 0;
        for (const scenario of scenarios.values()) {
            if (scenario.unitId === unitId) {
                count++;
            }
        }
        return count;
    }

    hasBadge(unitId) {
        const unitProgress = this.gameProgress.unitsProgress.get(unitId);
        return unitProgress ? unitProgress.badgeEarned : false;
    }

    // Helper method to get all scenarios for a unit
    getScenariosForUnit(unitId) {
        const unitScenarios = new Map();
        for (const [id, scenario] of scenarios.entries()) {
            if (scenario.unitId === unitId) {
                unitScenarios.set(id, scenario);
            }
        }
        return unitScenarios;
    }
}
