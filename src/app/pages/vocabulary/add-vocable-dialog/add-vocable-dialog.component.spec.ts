import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVocableDialogComponent } from './add-vocable-dialog.component';

describe('AddVocableDialogComponent', () => {
  let component: AddVocableDialogComponent;
  let fixture: ComponentFixture<AddVocableDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVocableDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVocableDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
