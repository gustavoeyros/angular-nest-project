import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { GrowerFormComponent } from './grower-form.component';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';

describe('GrowerFormComponent', () => {
  let component: GrowerFormComponent;
  let fixture: ComponentFixture<GrowerFormComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrowerFormComponent, FormsModule],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(GrowerFormComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset the form after submission', () => {
    component.grower = {
      id: '1',
      name: 'Test Grower',
      address: '123 Test St',
      email: 'test@example.com',
      phone: '1234567890',
      specialty: 'Test Specialty',
    };

    component.onSubmit();
    const req = httpMock.expectOne(`${environment.apiUrl}/grower`);
    req.flush({});

    expect(component.grower).toEqual({
      id: '',
      name: '',
      address: '',
      email: '',
      phone: '',
      specialty: '',
    });
  });
});
