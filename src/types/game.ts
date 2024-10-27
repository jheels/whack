// src/types.ts
export enum Difficulty {
    EASY = 'EASY',
    MEDIUM = 'MEDIUM',
    HARD = 'HARD'
}

export enum AdviceRank {
    BEST = 'BEST',
    GOOD = 'GOOD',
    POOR = 'POOR'
}

export interface LearningPage {
    pageNumber: number;
    title: string;
    text: string;
    correctOrder: string[];
}

export interface AdviceOption {
    id: number;
    rank: AdviceRank;
    text: string;
    explanation: string;
    outcomes: {
        immediate: string;
        longTerm: string;
    };
}

export interface Scenario {
    scenarioId: string;
    difficulty: Difficulty;
    title: string;
    advisee: {
        name: string;
        imageUrl: string;
        dialogue: string;
    };
    learningPages: LearningPage[];
    adviceOptions: AdviceOption[];
}

