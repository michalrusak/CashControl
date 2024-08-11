import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteAccountComponent } from './delete-account.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from 'src/app/modules/shared/material/material.module';
import { NotifierModule } from 'angular-notifier';

describe('DeleteAccountComponent', () => {
  let component: DeleteAccountComponent;
  let fixture: ComponentFixture<DeleteAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteAccountComponent],
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        RouterModule.forRoot([]),
        MaterialModule,
        NoopAnimationsModule,
        NotifierModule,
      ],
    });
    fixture = TestBed.createComponent(DeleteAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
