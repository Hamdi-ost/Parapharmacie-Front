import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-smart',
  templateUrl: './smart.component.html'
})
export class SmartComponent implements OnInit {
  @Input() titre;
  @Input() dtOptions: DataTables.Settings = {};
  @Input() data;

  constructor() {}

  ngOnInit() {}
  renderWith(function(data, type, full) {
    return `<a class="ng-scope"><span ng-click='remove("${data}")' class='fa fa-times-circle'></span></a>`;
})

dtInstanceCallback = (dtInstance) => {
    dtInstance = dtInstance;
    dtInstance.DataTable.on('draw.dt', () => {
        const elements = angular.element('#' + dtInstance.id + ' .ng-scope');
        angular.forEach(elements, (element) => {
            $compile(element)($scope);
        });
    });
}

}
