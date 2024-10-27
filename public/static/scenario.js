export const Difficulty = {
    EASY: 'EASY',
    MEDIUM: 'MEDIUM',
    HARD: 'HARD'
};

export const AdviceRank = {
    BEST: 'BEST',
    GOOD: 'GOOD',
    POOR: 'POOR'
};

// Sample scenario data with advice options as a HashMap
const sampleAdviceOptions = new Map([
    [1, {
        id: 1,
        rank: AdviceRank.BEST,
        text: "Let's start with tracking your expenses for one month and aim to save 20% of your income.",
        explanation: "This balanced approach helps establish good habits while remaining realistic.",
        outcomes: {
            immediate: "Thanks for the practical advice! I've downloaded a budgeting app and started tracking.",
            longTerm: "After 6 months, I've built up my emergency fund and still enjoy occasional outings.",
        },
    }],
    [2, {
        id: 2,
        rank: AdviceRank.POOR,
        text: "Let's not track your expenses forever month and aim to save 0% of your income.",
        explanation: "This balanced approach helps establish bad habits while remaining unrealistic.",
        outcomes: {
            immediate: "No, Thanks for the practical advice! I've downloaded a budgeting app and started tracking.",
            longTerm: "After 6 months, I am broke.",
        },
    }]
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
        dialogue: "Hi, I just got my first job out of college and I'm making $45,000 a year. I've never had to budget before and I'm not sure where to start.",
    },
    learningPages: [
        {
            pageNumber: 1,
            title: "Understanding Income",
            text: "The first step in ___ is understanding your take-home pay. After taxes and deductions, your monthly income will be different from your annual ___. This difference can significantly impact your budgeting plans, as it’s essential to know exactly how much money you have available each month for expenses, ___, and discretionary spending. Additionally, consider other sources of income, such as ___, freelance work, or investment earnings, which can further affect your financial landscape.",
            correctOrder: ["budgeting","salary","savings","bonuses"],
        },
    ],
    adviceOptions: sampleAdviceOptions
};

// Variation 1 - Budgeting: Setting Financial Goals
export const sampleScenario1 = {
    scenarioId: "budget_goal_1",
    unitId: "budgeting",
    difficulty: Difficulty.EASY,
    title: "Setting Financial Goals",
    advisee: {
        name: "Michael Johnson",
        imageUrl: "https://unsplash.it/300/300",
        dialogue: "Hi, I want to save for a new car and I’m not sure how to set financial goals that help me get there.",
    },
    learningPages: [
        {
            pageNumber: 1,
            title: "Setting SMART Goals",
            text: "The first step in ___ is to set SMART goals. These should be Specific, Measurable, Achievable, Relevant, and Time-bound. For example, saving ___ each month for the next year is a clear goal. Consider what you want to achieve and create a plan to get there, adjusting your budget to meet these ___ over time.",
            correctOrder: ["budgeting", "X amount", "goals"],
        },
    ],
    adviceOptions: sampleAdviceOptions
};

// Variation 2 - Budgeting: Tracking Expenses
export const sampleScenario2 = {
    scenarioId: "budget_expense_1",
    unitId: "budgeting",
    difficulty: Difficulty.EASY,
    title: "Tracking Expenses",
    advisee: {
        name: "Jessica Smith",
        imageUrl: "https://unsplash.it/300/300",
        dialogue: "Hi, I have trouble keeping track of my daily expenses and need help figuring out how to do that.",
    },
    learningPages: [
        {
            pageNumber: 1,
            title: "The Importance of Tracking",
            text: "Tracking your expenses is crucial for effective ___. Begin by logging every purchase, no matter how small. You can categorize your spending into ___ like food, entertainment, and bills. This will help you identify ___ and make necessary adjustments to your budget.",
            correctOrder: ["budgeting", "categories", "patterns"],
        },
    ],
    adviceOptions: sampleAdviceOptions
};

// Variation 3 - Housing: Renting vs. Buying
export const sampleScenario3 = {
    scenarioId: "housing_rent_buy_1",
    unitId: "housing",
    difficulty: Difficulty.EASY,
    title: "Renting vs. Buying a Home",
    advisee: {
        name: "David Lee",
        imageUrl: "https://unsplash.it/300/300",
        dialogue: "Hi, I’m trying to decide whether to rent or buy my first home. Can you help me weigh the pros and cons?",
    },
    learningPages: [
        {
            pageNumber: 1,
            title: "Understanding Your Options",
            text: "When considering whether to rent or ___, think about your financial situation. Renting often requires a lower upfront cost, while buying may involve a ___ for a mortgage. Additionally, consider how long you plan to stay in one place, as this can impact your decision to ___ a home.",
            correctOrder: ["buy", "down payment", "buy"],
        },
    ],
    adviceOptions: sampleAdviceOptions
};

// Variation 4 - Housing: Home Maintenance Costs
export const sampleScenario4 = {
    scenarioId: "housing_maintenance_1",
    unitId: "housing",
    difficulty: Difficulty.EASY,
    title: "Understanding Home Maintenance Costs",
    advisee: {
        name: "Emily Turner",
        imageUrl: "https://unsplash.it/300/300",
        dialogue: "Hi, I just bought my first house and I’m worried about how much I should budget for maintenance costs.",
    },
    learningPages: [
        {
            pageNumber: 1,
            title: "Planning for Maintenance",
            text: "As a new homeowner, it’s important to budget for ___ costs. A common rule of thumb is to save about 1% of your home’s value each year for maintenance and repairs. This means if your home is worth $300,000, you should plan for ___ annually. Keeping up with regular maintenance can save you from larger, unexpected expenses down the road.",
            correctOrder: ["maintenance", "3,000"],
        },
    ],
    adviceOptions: sampleAdviceOptions
};

// Variation 5 - Scam Awareness: Recognizing Common Scams
export const sampleScenario5 = {
    scenarioId: "scam_recognizing_1",
    unitId: "scam_awareness",
    difficulty: Difficulty.EASY,
    title: "Recognizing Common Scams",
    advisee: {
        name: "Alex Brown",
        imageUrl: "https://unsplash.it/300/300",
        dialogue: "Hi, I’ve heard about different scams but I’m not sure how to recognize them. Can you help?",
    },
    learningPages: [
        {
            pageNumber: 1,
            title: "Identifying Scams",
            text: "To protect yourself, it’s essential to recognize common ___. Many scams often use tactics such as high-pressure sales, unsolicited offers, or requests for personal ___. Always verify the source before providing any information, and be cautious of deals that seem too good to be ___.",
            correctOrder: ["scams", "information", "true"],
        },
    ],
    adviceOptions: sampleAdviceOptions
};

// Variation 6 - Scam Awareness: Reporting Scams
export const sampleScenario6 = {
    scenarioId: "scam_reporting_1",
    unitId: "scam_awareness",
    difficulty: Difficulty.EASY,
    title: "Reporting Scams",
    advisee: {
        name: "Rachel Green",
        imageUrl: "https://unsplash.it/300/300",
        dialogue: "Hi, I think I may have encountered a scam. How do I report it?",
    },
    learningPages: [
        {
            pageNumber: 1,
            title: "Steps to Report Scams",
            text: "If you encounter a scam, the first step is to report it to the ___ authorities, such as the Federal Trade Commission (FTC). Provide as much detail as possible about the ___, including the names and contact information involved. Reporting scams helps protect others and can aid in investigations to prevent further ____.",
            correctOrder: ["appropriate", "incident", "scams"],
        },
    ],
    adviceOptions: sampleAdviceOptions
};

// Variation 7 - Scam Awareness: Online Safety
export const sampleScenario7 = {
    scenarioId: "scam_online_safety_1",
    unitId: "scam_awareness",
    difficulty: Difficulty.EASY,
    title: "Staying Safe Online",
    advisee: {
        name: "Tom Harris",
        imageUrl: "https://unsplash.it/300/300",
        dialogue: "Hi, I’m worried about online scams and want to know how to stay safe while browsing.",
    },
    learningPages: [
        {
            pageNumber: 1,
            title: "Practicing Online Safety",
            text: "To stay safe online, always use strong, unique passwords for each account and enable ___ authentication whenever possible. Be wary of suspicious emails and links that ask for your personal ___. Keeping your software updated can also help protect you from ___ vulnerabilities.",
            correctOrder: ["two-factor", "information", "security"],
        },
    ],
    adviceOptions: sampleAdviceOptions
};

// Variation 8 - Consumer Credit: Understanding Credit Scores
export const sampleScenario8 = {
    scenarioId: "credit_scores_1",
    unitId: "consumer_credit",
    difficulty: Difficulty.EASY,
    title: "Understanding Credit Scores",
    advisee: {
        name: "Lisa White",
        imageUrl: "https://unsplash.it/300/300",
        dialogue: "Hi, I keep hearing about credit scores and how important they are. Can you explain what they are?",
    },
    learningPages: [
        {
            pageNumber: 1,
            title: "What is a Credit Score?",
            text: "A credit score is a numerical representation of your ___ history, reflecting how responsible you are with borrowed money. It typically ranges from 300 to 850, with higher scores indicating better creditworthiness. Factors influencing your score include payment history, ___ utilization, and length of credit history.",
            correctOrder: ["credit", "credit"],
        },
    ],
    adviceOptions: sampleAdviceOptions
};

// Variation 9 - Consumer Credit: Managing Debt
export const sampleScenario9 = {
    scenarioId: "credit_debt_management_1",
    unitId: "consumer_credit",
    difficulty: Difficulty.EASY,
    title: "Managing Debt Effectively",
    advisee: {
        name: "Mark Wilson",
        imageUrl: "https://unsplash.it/300/300",
        dialogue: "Hi, I have some debt and I'm not sure how to manage it. Can you help me?",
    },
    learningPages: [
        {
            pageNumber: 1,
            title: "Strategies for Debt Management",
            text: "To manage debt effectively, start by listing all your debts, including amounts and interest ___. Prioritize paying off high-interest debt first while making minimum payments on other loans. Consider strategies like the ___ method or snowball method to pay down your debt more effectively.",
            correctOrder: ["rates", "avalanche"],
        },
    ],
    adviceOptions: sampleAdviceOptions
};

// Variation 10 - Consumer Credit: Responsible Credit Card Use
export const sampleScenario10 = {
    scenarioId: "credit_card_use_1",
    unitId: "consumer_credit",
    difficulty: Difficulty.EASY,
    title: "Responsible Credit Card Use",
    advisee: {
        name: "Natalie King",
        imageUrl: "https://unsplash.it/300/300",
        dialogue: "Hi, I just got my first credit card, and I want to use it responsibly. Any tips?",
    },
    learningPages: [
        {
            pageNumber: 1,
            title: "Using Credit Cards Wisely",
            text: "To use your credit card responsibly, always pay your balance in ___ to avoid interest charges. Limit your spending to what you can afford to pay back each month, and keep your credit utilization below ___. Regularly monitor your statements for any unauthorized transactions.",
            correctOrder: ["full", "30%"],
        },
    ],
    adviceOptions: sampleAdviceOptions
};

// Variation 11 - Loans: Understanding Different Types of Loans
export const sampleScenario11 = {
    scenarioId: "loans_types_1",
    unitId: "loans",
    difficulty: Difficulty.EASY,
    title: "Understanding Different Types of Loans",
    advisee: {
        name: "Oliver Scott",
        imageUrl: "https://unsplash.it/300/300",
        dialogue: "Hi, I’m considering taking out a loan but I'm confused about the different types. Can you explain?",
    },
    learningPages: [
        {
            pageNumber: 1,
            title: "Types of Loans Explained",
            text: "There are various types of loans available, including ___ loans, personal loans, and student loans. Each type has its own terms and interest rates. For instance, a mortgage loan is specifically for buying a ___ and typically has lower interest rates compared to personal loans.",
            correctOrder: ["mortgage", "home"],
        },
    ],
    adviceOptions: sampleAdviceOptions
};

// Variation 12 - Loans: The Loan Application Process
export const sampleScenario12 = {
    scenarioId: "loans_application_1",
    unitId: "loans",
    difficulty: Difficulty.EASY,
    title: "The Loan Application Process",
    advisee: {
        name: "Sophia Reed",
        imageUrl: "https://unsplash.it/300/300",
        dialogue: "Hi, I’m thinking of applying for a loan but I'm unsure about the process. Can you guide me?",
    },
    learningPages: [
        {
            pageNumber: 1,
            title: "Steps to Apply for a Loan",
            text: "The loan application process typically involves several steps: First, determine how much you need to borrow and the type of loan you want. Next, gather necessary ___ such as income proof and credit history. Finally, submit your application and wait for the lender’s ___. Be prepared for potential follow-up questions.",
            correctOrder: ["documents", "decision"],
        },
    ],
    adviceOptions: sampleAdviceOptions
};

// Variation 13 - Loans: Repaying Your Loan
export const sampleScenario13 = {
    scenarioId: "loans_repayment_1",
    unitId: "loans",
    difficulty: Difficulty.EASY,
    title: "Repaying Your Loan",
    advisee: {
        name: "Isabella Young",
        imageUrl: "https://unsplash.it/300/300",
        dialogue: "Hi, I just took out a loan, and I want to know the best way to repay it.",
    },
    learningPages: [
        {
            pageNumber: 1,
            title: "Effective Loan Repayment Strategies",
            text: "To repay your loan effectively, create a budget that includes your monthly loan ___. Try to make payments above the minimum required to reduce your overall ___ costs. Additionally, consider refinancing options if you can secure a lower interest rate, as this can save you money in the long run.",
            correctOrder: ["payments", "interest"],
        },
    ],
    adviceOptions: sampleAdviceOptions
};

// Variation 14 - Loans: Understanding Loan Terms
export const sampleScenario14 = {
    scenarioId: "loans_terms_1",
    unitId: "loans",
    difficulty: Difficulty.EASY,
    title: "Understanding Loan Terms",
    advisee: {
        name: "Liam Carter",
        imageUrl: "https://unsplash.it/300/300",
        dialogue: "Hi, I’m confused by the terms in my loan agreement. Can you help me understand them?",
    },
    learningPages: [
        {
            pageNumber: 1,
            title: "Key Loan Terms Explained",
            text: "When dealing with loans, it's important to understand terms like ___ rate, principal, and amortization. The interest rate determines how much extra you will pay over the life of the ___. Knowing these terms can help you make informed decisions and avoid potential pitfalls in borrowing.",
            correctOrder: ["interest", "loan"],
        },
    ],
    adviceOptions: sampleAdviceOptions
};


// Convert scenarios to HashMap
export const scenarios = new Map([
    ["budget_easy_1", sampleScenario],
    ["budget_goal_1", sampleScenario1],
    ["budget_expense_1", sampleScenario2],
    ["housing_rent_buy_1", sampleScenario3],
    ["housing_maintenance_1", sampleScenario4],
    ["scam_recognizing_1", sampleScenario5],
    ["scam_reporting_1", sampleScenario6],
    ["scam_online_safety_1", sampleScenario7],
    ["credit_scores_1", sampleScenario8],
    ["credit_debt_management_1", sampleScenario9],
    ["credit_card_use_1", sampleScenario10],
    ["loans_types_1", sampleScenario11],
    ["loans_application_1", sampleScenario12],
    ["loans_repayment_1", sampleScenario13],
    ["loans_terms_1", sampleScenario14],
]);

// Convert badges to HashMap
export const badges = new Map([
    ["budgeting", {
        unitId: "budgeting",
        name: "Budgeting Badge",
    }]
]);
