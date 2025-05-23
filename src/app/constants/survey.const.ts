export class Question {
    questionId: string;
    questionText: string;
    choices: Choice[];

    constructor() {
        this.questionId = '';
        this.questionText = '';
        this.choices = [];
    }
};

export class Survey {
    surveyId: string;
    title: string;
    hostUsername?: string;
    status: string;
    questions: Question[];

    constructor() {
        this.surveyId = '';
        this.title = '';
        this.questions = [];
        this.status = 'NOT-LIVE';
    }
};

export class Choice {
    choiceId: string;
    choiceText: string;

    constructor() {
        this.choiceId = '';
        this.choiceText = '';
    }
};


export class SurveyDetailDTO {
    surveyId: string;
    title: string;
    status: string;
    questionCount: number;
    accessCode?: string;

    constructor() {
        this.surveyId = '';
        this.title = '';
        this.status = '';
        this.questionCount = 0;
    }
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

export class ToggleStatusResponse {
    newStatus: string;
    accessCode: string;

    constructor(newStatus: string, accessCode: string) {
        this.newStatus = newStatus;
        this.accessCode = accessCode;
    }
}

export class SurveyResultResponse {
    resultMap:  { [questionId: string]: { [choiceId: string]: number } };

    constructor() {
        this.resultMap = {};
    }
}

export interface VoteUpdate {
    questionId: string;
    choiceId: string;
    total: number;
}