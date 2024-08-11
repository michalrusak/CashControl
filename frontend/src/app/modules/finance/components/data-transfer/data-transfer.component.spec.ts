import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataTransferComponent } from './data-transfer.component';

describe('DataTransferComponent', () => {
  let component: DataTransferComponent;
  let fixture: ComponentFixture<DataTransferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataTransferComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(DataTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
