import { Component, OnInit } from '@angular/core';
import { HomeProductsService } from 'app/services/home-products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  url1: any;
  url2: any;
  path1;
  path2;

  constructor(private interfaceService: HomeProductsService, private router: Router) {}

  ngOnInit() {}

  onSelectFile1(event) {
    this.path1 = event.target.files[0].name;
    // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = event => {
        // called once readAsDataURL is completed
        this.url1 = event.target['result'];
      };
    }
  }

  onSelectFile2(event) {
    this.path2 = event.target.files[0].name;
    // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = event => {
        // called once readAsDataURL is completed
        this.url2 = event.target['result'];
      };
    }
  }

  valider () {
    const slider1 = {
      imagePath: this.path1
    };
    this.interfaceService.postSliders(slider1).subscribe();
    const slider2 = {
      imagePath: this.path2
    };
    this.interfaceService.postSliders(slider2).subscribe();
    this.router.navigate(['/produits']);

  }
}
