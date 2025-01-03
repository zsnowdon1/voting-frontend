export class Question {
    questionId?: number;
    questionText: string;
    choices: Choice[];

    constructor() {
        this.questionText = '';
        this.choices = [];
    }
};

export class Survey {
    surveyId?: string;
    title: string;
    hostUsername?: string;
    questions: Question[];

    constructor() {
        this.title = '';
        this.questions = [];
    }
};

export class Choice {
    choiceId?: number;
    choiceText: string;
};