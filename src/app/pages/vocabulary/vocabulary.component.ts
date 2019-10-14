import {Component, OnInit} from '@angular/core';
import {UnitService} from '../../services/unit.service';

@Component({
    selector: 'app-vocabulary',
    templateUrl: './vocabulary.component.html',
    styleUrls: ['./vocabulary.component.scss']
})
export class VocabularyComponent implements OnInit {

    constructor(private unitService: UnitService) {
    }

    ngOnInit() {
    }

}
