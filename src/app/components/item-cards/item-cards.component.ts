import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-item-cards',
  templateUrl: './item-cards.component.html',
  styleUrls: ['./item-cards.component.scss'],
  animations: [
    trigger('items', [
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }),  // initial
        animate('1s cubic-bezier(.8, -0.6, 0.2, 1.5)',
            style({ transform: 'scale(1)', opacity: 1 }))  // final
      ])
    ])
  ]
})
export class ItemCardsComponent implements OnInit {

  @Input() items: {title: string, label: string, value: any, icon: string}[]
  @Output() itemClick = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  itemClicked(item) {
    this.itemClick.emit(item);
  }
}
