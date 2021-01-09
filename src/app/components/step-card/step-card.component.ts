import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-step-card',
  templateUrl: './step-card.component.html',
  styleUrls: ['./step-card.component.scss'],
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
export class StepCardComponent implements OnInit {

  @Input() steps: {icon: string, title: string}[]
  @Output() stepsChange = new EventEmitter()
  @Output() stepClicked = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  deleteSteps(i: number) {
    this.stepClicked.emit({data: this.steps[i], step: i + 1})
    this.steps = this.steps.slice(0, i)
    this.stepsChange.emit(this.steps);
  }
}
