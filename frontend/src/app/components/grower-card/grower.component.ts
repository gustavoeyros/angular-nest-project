import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environment/environment';
import { Grower } from '../../entities/grower';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-grower-card',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxMaskDirective],
  providers: [provideNgxMask()],
  templateUrl: './grower.component.html',
  styleUrls: ['./grower.component.css'],
})
export class GrowerComponent {
  @Input() id!: string;
  @Input() name!: string;
  @Input() address!: string;
  @Input() email!: string;
  @Input() phone!: string;
  @Input() specialty!: string;
  @Output() growerDeleted = new EventEmitter<string>();
  @Output() growerUpdated = new EventEmitter<void>();

  isEditing = false;
  editGrower: Grower = {
    id: '',
    name: '',
    address: '',
    email: '',
    phone: '',
    specialty: '',
  };

  constructor(private http: HttpClient) {}

  onEdit() {
    this.isEditing = true;
    this.editGrower = {
      id: this.id,
      name: this.name,
      address: this.address,
      email: this.email,
      phone: this.phone,
      specialty: this.specialty,
    };
  }

  cancelEdit() {
    this.isEditing = false;
  }

  onUpdate() {
    this.http
      .put(`${environment.apiUrl}/grower/${this.id}`, this.editGrower)
      .subscribe({
        next: (response) => {
          console.log('Grower updated successfully', response);
          this.isEditing = false;
          this.growerUpdated.emit();
        },
        error: (error) => {
          console.error('Error updating grower', error);
        },
      });
  }

  onDelete() {
    this.http.delete(`${environment.apiUrl}/grower/${this.id}`).subscribe({
      next: (response) => {
        console.log('Grower deleted successfully', response);
        this.growerDeleted.emit(this.id);
      },
      error: (error) => {
        console.error('Error deleting grower', error);
      },
    });
  }

  onModalClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('modal')) {
      this.cancelEdit();
    }
  }
}
