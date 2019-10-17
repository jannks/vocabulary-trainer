import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UnitService} from '../../services/unit.service';
import {VocableService} from '../../services/vocable.service';
import {MatSnackBar} from '@angular/material';
import {VocableModel} from '../../models/vocable.model';
import {VocableQuestionModel, VocabularyTestModel} from '../../models/vocabulary-test.model';

@Component({
    selector: 'app-vocabulary-test',
    templateUrl: './vocabulary-test.component.html',
    styleUrls: ['./vocabulary-test.component.scss']
})
export class VocabularyTestComponent implements OnInit {

    public loaded = false;
    public showResults = false;
    public selectedTab: number;

    private unit: UnitModel;
    private vocables: VocableModel[];
    private vocabularyTest: VocabularyTestModel;

    constructor(
        private unitService: UnitService,
        private vocableService: VocableService,
        private route: ActivatedRoute,
        private router: Router,
        private snackBar: MatSnackBar) {
    }

    ngOnInit() {
        const unitId = Number(this.route.snapshot.paramMap.get('id'));
        this.selectedTab = 0;
        this.unitService.get(unitId).then(
            (unit: UnitModel) => {
                if (!unit) {
                    this.snackBar.open('Unit not found!', 'Ok', {
                        duration: 3000,
                    });
                    this.router.navigate(['/']);
                    return;
                }
                this.unit = unit;
                this.vocableService.getAllFromUnit(unit).then(
                    (vocables: VocableModel[]) => {
                        this.vocables = vocables;
                        this.createTest();
                    }
                );
            }
        );
    }

    private createTest(): void {
        this.vocabularyTest = {
            name: this.unit.name,
            date: new Date(),
            correctAnswers: 0,
            wrongAnswers: 0,
            vocableQuestions: []
        } as VocabularyTestModel;

        for (const vocable of this.vocables) {
            this.vocabularyTest.vocableQuestions.push({
                question: vocable.firstMeaning,
                answer: '',
                correctAnswer: vocable.secondMeaning,
                isCorrect: false
            } as VocableQuestionModel);
        }

        this.loaded = true;
    }

    public switchQuestionsAnswers(): void {

        const vocableQuestions: VocableQuestionModel[] = [];

        for (const question of this.vocabularyTest.vocableQuestions) {
            vocableQuestions.push({
                question: question.correctAnswer,
                correctAnswer: question.question
            } as VocableQuestionModel);
        }

        this.vocabularyTest.vocableQuestions = vocableQuestions;
    }

    public shuffleArray(array): void {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    public evaluateTest(): void {
        for (const question of this.vocabularyTest.vocableQuestions) {
            if (this.prepareAnswer(question.answer) === this.prepareAnswer(question.correctAnswer)) {
                question.isCorrect = true;
                this.vocabularyTest.correctAnswers++;
            } else {
                this.vocabularyTest.wrongAnswers++;
            }
        }
        this.showResults = true;
        this.selectedTab = this.vocabularyTest.vocableQuestions.length;
    }

    private prepareAnswer(str: string): string {
        return  str.toUpperCase().replace(/\s/g, '');
    }

}
