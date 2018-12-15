import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-smart',
  templateUrl: './smart.component.html'
})
export class SmartComponent implements OnInit {

  @Input() dtOptions: DataTables.Settings = {};
  @ Input() data ;

  constructor() { }

  ngOnInit() {
  }

}
