import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteTransactionComponent } from './delete-transaction.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NotifierModule } from 'angular-notifier';
import { MaterialModule } from 'src/app/modules/shared/material/material.module';

describe('DeleteTransactionComponent', () => {
  let component: DeleteTransactionComponent;
  let fixture: ComponentFixture<DeleteTransactionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteTransactionComponent],
      imports: [
        RouterModule.forRoot([]),
        MaterialModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        NotifierModule,
      ],
    });
    fixture = TestBed.createComponent(DeleteTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
