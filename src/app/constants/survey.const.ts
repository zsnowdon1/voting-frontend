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
    status: string;
    questions: Question[];

    constructor() {
        this.title = '';
        this.questions = [];
        this.status = 'NOT-LIVE';
    }
};

export class Choice {
    choiceId?: number;
    choiceText: string;
};


export class SurveyDetailDTO {
    surveyId: string;
    title: string;
    status: string;
    questionCount: number;
};