import {
  Component,
  OnInit,
  Input,
  ViewChild,
  AfterViewInit,
  Renderer2,
  OnDestroy,
  Output,
  EventEmitter
} from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-smart',
  templateUrl: './smart.component.html'
})
export class SmartComponent implements OnInit {
  @Output() delete = new EventEmitter();
  @Output() details = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Input() titre;
  @Input() dtOptions: DataTables.Settings = {};
  @Input() dtTrigger = new Subject();
  @Input() data;
  @Input() users;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {}

  deleteX(id) {
    this.delete.emit(id);
  }

  editX(id) {
    this.edit.emit(id);
  }

  detailsX(id) {
    this.details.emit(id);
  }
}
