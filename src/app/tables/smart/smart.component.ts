import {
  Component,
  OnInit,
  Input,
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
  @Output() checkbox = new EventEmitter();
  @Input() titre;
  @Input() dtOptions: DataTables.Settings = {};
  @Input() dtTrigger = new Subject();
  @Input() data;
  @Input() columnsName;
  product = [];
  url;
  constructor() {
    this.url = window.location.pathname;
  }

  ngOnInit() {
  }

  deleteX(id) {
    this.delete.emit(id);
  }

  editX(id) {
    this.edit.emit(id);
  }

  detailsX(id) {
    this.details.emit(id);
  }

  selectProduct(ids) {
    this.checkbox.emit(this.product);
  }
}
