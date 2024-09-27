import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Grower } from '../../entities/grower';
import { environment } from '../../../environment/environment';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-grower-form',
  standalone: true,
  imports: [FormsModule, CommonModule, NgxMaskDirective],
  templateUrl: './grower-form.component.html',
  providers: [provideNgxMask()],
  styleUrls: ['./grower-form.component.css'],
})
export class GrowerFormComponent {
  @Output() growerAdded = new EventEmitter<Grower>();

  grower: Grower = {
    id: '',
    name: '',
    address: '',
    email: '',
    phone: '',
    specialty: '',
  };

  isModalOpen = false;

  constructor(private http: HttpClient) {}

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  onModalClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('modal')) {
      this.closeModal();
    }
  }

  resetForm() {
    this.grower = {
      id: '',
      name: '',
      address: '',
      email: '',
      phone: '',
      specialty: '',
    };
  }

  onSubmit() {
    this.http.post(`${environment.apiUrl}/grower`, this.grower).subscribe({
      next: (response) => {
        console.log('Grower added successfully', response);
        this.growerAdded.emit(this.grower);
        this.closeModal();
        this.resetForm();
      },
      error: (error) => {
        console.error('Error adding grower', error);
      },
    });
  }
}
