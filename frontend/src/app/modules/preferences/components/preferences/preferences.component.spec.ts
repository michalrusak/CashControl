import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { NotifierModule } from 'angular-notifier';
import { MaterialModule } from 'src/app/modules/shared/material/material.module';
import { PreferencesComponent } from './preferences.component';

describe('PreferencesComponent', () => {
  let component: PreferencesComponent;
  let fixture: ComponentFixture<PreferencesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreferencesComponent],
      imports: [
        ReactiveFormsModule,
        StoreModule.forRoot({}),
        MaterialModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        NotifierModule,
      ],
    });
    fixture = TestBed.createComponent(PreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
