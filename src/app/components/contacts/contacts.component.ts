import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService, Contact } from '../../services/contact.service';

@Component({
  selector: 'app-contacts',
  standalone: false,
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent implements OnInit {
  contacts: Contact[] = [];
  displayedColumns = ['id', 'name', 'actions'];
  addForm: FormGroup;
  editingId: number | null = null;
  editName = '';

  constructor(private contactService: ContactService, private fb: FormBuilder) {
    this.addForm = this.fb.group({ name: ['', Validators.required] });
  }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.contactService.getAll().subscribe(data => this.contacts = data);
  }

  add(): void {
    if (this.addForm.invalid) return;
    this.contactService.create({ id: null, name: this.addForm.value.name }).subscribe(() => {
      this.addForm.reset();
      this.load();
    });
  }

  startEdit(contact: Contact): void {
    this.editingId = contact.id;
    this.editName = contact.name ?? '';
  }

  saveEdit(contact: Contact): void {
    this.contactService.update({ ...contact, name: this.editName }).subscribe(() => {
      this.editingId = null;
      this.load();
    });
  }

  cancelEdit(): void {
    this.editingId = null;
  }

  delete(id: number | null): void {
    if (id == null) return;
    this.contactService.delete(id).subscribe(() => this.load());
  }
}
