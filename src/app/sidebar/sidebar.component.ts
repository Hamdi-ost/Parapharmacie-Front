import { Component } from '@angular/core';
import { CommonService } from '../shared/services/common.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  constructor(public cmnSrv: CommonService) {  }

  sidebarItems = [
    {link: '/', label: 'Dashboard', icon: 'dashboard'},
    {link: '/produits', label: 'Produits', icon: 'apps'},
    {link: '/categories', label: 'Categories', icon: 'pages'},
    {label: 'Interfaces', icon: 'ballot', subItem: [
      {link: '/interfaces/productsHome', label: 'Produits', icon: 'P'},
      {link: '/interfaces/sliders', label: 'Sliders', icon: 'S'}
    ]},
    {link: '/users', label: 'Utilisateur', icon: 'ballot'},
    {link: '/marques', label: 'Marques', icon: 'apps'}
  ];
}
