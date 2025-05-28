import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cat-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cat-card.component.html',
  styleUrls: ['./cat-card.component.scss']
})
export class CatCardComponent {
  @Input() id!: string;
  @Input() imageUrl!: string;
  @Output() selected = new EventEmitter<string>();

  handleClick() {
    this.selected.emit(this.id);
  }
}
