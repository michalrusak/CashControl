import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { NotifierModule } from 'angular-notifier';
import { MaterialModule } from 'src/app/modules/shared/material/material.module';
import { DetailTransactionComponent } from './detail-transaction.component';

describe('DetailTransactionComponent', () => {
  let component: DetailTransactionComponent;
  let fixture: ComponentFixture<DetailTransactionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailTransactionComponent],
      imports: [
        StoreModule.forRoot({}),
        RouterModule.forRoot([]),
        MaterialModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        NotifierModule,
      ],
    });
    fixture = TestBed.createComponent(DetailTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
