export class Question {
    questionId?: string;
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
    choiceId?: string;
    choiceText: string;
};


export class SurveyDetailDTO {
    surveyId: string;
    title: string;
    status: string;
    questionCount: number;
};

export class SubmitSurveyRequest {
    username: string;
    surveyId: string;
    responses: SelectedChoice[];

    constructor() {
        this.username = '';
        this.surveyId = '';
        this.responses = [];
    }
};

export class SelectedChoice {
    questionId: string;
    choiceId: string;

    constructor(questionId: string, choiceId: string) {
        this.choiceId = choiceId;
        this.questionId = questionId;
    }
};