import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { GrowerComponent } from './grower.component';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { environment } from '../../../environment/environment';

describe('GrowerComponent', () => {
  let component: GrowerComponent;
  let fixture: ComponentFixture<GrowerComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrowerComponent, FormsModule],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(GrowerComponent);
    component = fixture.componentInstance;

    component.id = '1';
    component.name = 'Test Grower';
    component.address = '123 Test St';
    component.email = 'test@example.com';
    component.phone = '1234567890';
    component.specialty = 'Test Specialty';

    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open and close the modal', () => {
    component.onEdit();
    fixture.detectChanges();
    let modal = fixture.debugElement.query(By.css('.modal'));
    expect(modal).toBeTruthy();

    component.cancelEdit();
    fixture.detectChanges();
    modal = fixture.debugElement.query(By.css('.modal'));
    expect(modal).toBeNull();
  });

  it('should update grower and emit growerUpdated event', () => {
    spyOn(component.growerUpdated, 'emit');

    component.editGrower = {
      id: '1',
      name: 'Updated Grower',
      address: '123 Updated St',
      email: 'updated@example.com',
      phone: '1234567890',
      specialty: 'Updated Specialty',
    };

    component.onUpdate();
    const req = httpMock.expectOne(
      `${environment.apiUrl}/grower/${component.id}`
    );
    req.flush({});

    expect(component.isEditing).toBeFalse();
    expect(component.growerUpdated.emit).toHaveBeenCalled();
  });

  it('should delete grower and emit growerDeleted event', () => {
    spyOn(component.growerDeleted, 'emit');

    component.onDelete();
    const req = httpMock.expectOne(
      `${environment.apiUrl}/grower/${component.id}`
    );
    req.flush({});

    expect(component.growerDeleted.emit).toHaveBeenCalledWith(component.id);
  });
});
