import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditTransactionComponent } from './edit-transaction.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { NotifierModule } from 'angular-notifier';
import { MaterialModule } from 'src/app/modules/shared/material/material.module';

describe('EditTransactionComponent', () => {
  let component: EditTransactionComponent;
  let fixture: ComponentFixture<EditTransactionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditTransactionComponent],
      imports: [
        ReactiveFormsModule,
        StoreModule.forRoot({}),
        RouterModule.forRoot([]),
        MaterialModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        NotifierModule,
      ],
    });
    fixture = TestBed.createComponent(EditTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
