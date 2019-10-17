export interface VocabularyTestModel {
    name: string;
    date: Date;
    correctAnswers: number;
    wrongAnswers: number;
    vocableQuestions: VocableQuestionModel[];
}

export interface VocableQuestionModel {
    question: string;
    answer: string;
    correctAnswer: string;
    isCorrect: boolean;
}
