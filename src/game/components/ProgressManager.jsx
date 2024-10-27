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
            scenariosProgress: new Map(), // scenarioId to chosen advice id map
        };
    }

    static getInstance() {
        if (!ProgressManager.instance) {
            ProgressManager.instance = new ProgressManager();
        }
        return ProgressManager.instance;
    }

    initializeUnit(unitId) {
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
        if (rank == AdviceRank.BEST) {
            // Assuming 1 is still the "BEST" advice ID
            const unitProgress = this.gameProgress.unitsProgress.get(unitId);
            if (unitProgress) {
                unitProgress.completedTasks += 1;
                if (
                    unitProgress.completedTasks ===
                    this.getTotalUnitScenarios(unitId)
                ) {
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

    debug() {
        console.log(this.gameProgress);
        console.group("🔍 Progress Manager Debug Info");

        // Overall Progress Stats
        console.group("📊 Overall Statistics");
        console.log(
            "Total Units Tracked:",
            this.gameProgress.unitsProgress.size
        );
        console.log(
            "Total Scenarios Tracked:",
            this.gameProgress.scenariosProgress.size
        );
        console.groupEnd();

        // Unit Progress Details
        console.group("📚 Unit Progress");
        this.gameProgress.unitsProgress.forEach((progress, unitId) => {
            console.group(`Unit: ${unitId}`);
            console.log("Completed Tasks:", progress.completedTasks);
            console.log(
                "Total Available Tasks:",
                this.getTotalUnitScenarios(unitId)
            );
            console.log(
                "Completion Rate:",
                `${(
                    (progress.completedTasks /
                        this.getTotalUnitScenarios(unitId)) *
                    100
                ).toFixed(1)}%`
            );
            console.log("Badge Earned:", progress.badgeEarned ? "✅" : "❌");
            console.groupEnd();
        });
        console.groupEnd();

        // Scenario Choices
        console.group("🎯 Scenario Choices");
        this.gameProgress.scenariosProgress.forEach((choiceId, scenarioId) => {
            const scenario = scenarios.get(scenarioId);
            const choice = scenario?.adviceOptions.get(choiceId);
            console.group(`Scenario: ${scenarioId}`);
            console.log("Chosen Advice ID:", choiceId);
            console.log("Advice Rank:", choice?.rank || "Unknown");
            console.log("Unit:", scenario?.unitId || "Unknown");
            console.groupEnd();
        });
        console.groupEnd();

        // Earned Badges Summary
        console.group("🏆 Earned Badges");
        let earnedBadgesCount = 0;
        badges.forEach((badge, unitId) => {
            const earned = this.hasBadge(unitId);
            console.log(`${badge.name}: ${earned ? "✅" : "❌"}`);
            if (earned) earnedBadgesCount++;
        });
        console.log(`Total Badges Earned: ${earnedBadgesCount}/${badges.size}`);
        console.groupEnd();

        console.groupEnd();

        // Return a summary object for testing purposes
        return {
            totalUnits: this.gameProgress.unitsProgress.size,
            totalScenarios: this.gameProgress.scenariosProgress.size,
            totalBadges: earnedBadgesCount,
            unitProgress: Array.from(
                this.gameProgress.unitsProgress.entries()
            ).map(([unitId, progress]) => ({
                unitId,
                completedTasks: progress.completedTasks,
                totalTasks: this.getTotalUnitScenarios(unitId),
                badgeEarned: progress.badgeEarned,
            })),
            scenarioChoices: Array.from(
                this.gameProgress.scenariosProgress.entries()
            ).map(([scenarioId, choiceId]) => ({
                scenarioId,
                choiceId,
                unitId: scenarios.get(scenarioId)?.unitId,
            })),
        };
    }
}
