export const Difficulty = {
    EASY: "EASY",
    MEDIUM: "MEDIUM",
    HARD: "HARD",
};

export const AdviceRank = {
    BEST: "BEST",
    GOOD: "GOOD",
    POOR: "POOR",
};

// Sample scenario data with advice options as a HashMap
const sampleAdviceOptions = new Map([
    [
        1,
        {
            id: 1,
            rank: AdviceRank.BEST,
            text: "Let's start with tracking your expenses for one month and aim to save 20% of your income.",
            explanation:
                "This balanced approach helps establish good habits while remaining realistic.",
            outcomes: {
                immediate:
                    "Thanks for the practical advice! I've downloaded a budgeting app and started tracking.",
                longTerm:
                    "After 6 months, I've built up my emergency fund and still enjoy occasional outings.",
            },
        },
    ],
    [
        2,
        {
            id: 2,
            rank: AdviceRank.POOR,
            text: "Let's not track your expenses forever month and aim to save 0% of your income.",
            explanation:
                "This balanced approach helps establish bad habits while remaining unrealistic.",
            outcomes: {
                immediate:
                    "No, Thanks for the practical advice! I've downloaded a budgeting app and started tracking.",
                longTerm: "After 6 months, I am broke.",
            },
        },
    ],
]);

// Sample scenario with HashMap for advice options
export const sampleScenario = {
    scenarioId: "budget_easy_1",
    unitId: "budgeting",
    difficulty: Difficulty.EASY,
    title: "First Time Budgeting",
    advisee: {
        name: "Sarah Chen",
        imageUrl: "https://unsplash.it/300/300",
        dialogue:
            "Hi, I just got my first job out of college and I'm making $45,000 a year. I've never had to budget before and I'm not sure where to start.",
    },
    learningPages: [
        {
            pageNumber: 1,
            title: "Understanding Income",
            text: "The first step in budgeting is understanding your take-home pay. After taxes and deductions, your monthly income will be different from your annual ___.",
            correctOrder: ["salary"],
        },
    ],
    adviceOptions: sampleAdviceOptions,
};

// Convert scenarios to HashMap
export const scenarios = new Map([["budget_easy_1", sampleScenario]]);

// Convert badges to HashMap
export const badges = new Map([
    [
        "budgeting",
        {
            unitId: "budgeting",
            name: "Budgeting Badge",
        },
    ],
    [
        "loans",
        {
            unitId: "loans",
            name: "Loans Badge",
        },
    ],
    [
        "credit",
        {
            unitId: "credit",
            name: "Credit Badge",
        },
    ],
    [
        "housing",
        {
            unitId: "housing",
            name: "Housing Badge",
        },
    ],
    [
        "scams",
        {
            unitId: "scams",
            name: "Scams Badge",
        },
    ],
]);
