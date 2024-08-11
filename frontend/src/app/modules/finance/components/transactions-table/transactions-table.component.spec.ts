import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransacationsTableComponent } from './transactions-table.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { NotifierModule } from 'angular-notifier';
import { MaterialModule } from 'src/app/modules/shared/material/material.module';

describe('TransacationsTableComponent', () => {
  let component: TransacationsTableComponent;
  let fixture: ComponentFixture<TransacationsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransacationsTableComponent],
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
    fixture = TestBed.createComponent(TransacationsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
