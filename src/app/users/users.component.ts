import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  AfterViewInit,
  Renderer2,
  OnDestroy,
  Renderer,
  ɵConsole
} from '@angular/core';
import { Routes, Router } from '@angular/router';
import { UserService } from 'app/services/user.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Logs } from 'selenium-webdriver';

declare var jQuery: any;

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-users',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  dtOptions: any;
  users;
  dtTrigger = new Subject();
  titre = 'Liste des utilisateurs';
  email;
  password;
  name;
  userId;

  constructor(
    private http: HttpClient,
    private userSerice: UserService,
    private _flashMessagesService: FlashMessagesService,
    private renderer: Renderer,
    private router: Router
  ) {}

  fetchData() {
    this.userSerice.getUsers().subscribe(data => {
      this.users = data.reverse();
    });
  }

  ngOnInit(): void {
    this.fetchData();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };
  }

  deleteUser(id) {
    this.userSerice.deleteUser(id).subscribe(data => {
      this._flashMessagesService.show('Utilisateur supprimé!', {
        cssClass: 'alert-success',
        timeout: 2500
      });
    }, () => {}, () => {   this.fetchData(); });
  }

  getUser(id) {
    this.userId = id;
    this.userSerice.getUser(id).subscribe(user => {
      this.name = user.username;
      this.email = user.email;
      jQuery('#editModal').modal('show');
    });
  }

  detailsUser(id) {
    this.userId = id;
    this.userSerice.getUser(id).subscribe(user => {
      this.name = user.username;
      this.email = user.email;
      jQuery('#detailsModal').modal('show');
    });
  }
    updateUser() {
      const UpdatedUser = {
        username: this.name,
        password: this.password,
        email: this.email
      };
      this.userSerice.updateUser(UpdatedUser, this.userId).subscribe(data => {
        jQuery('#editModal').modal('hide');
        this.fetchData();
        this._flashMessagesService.show('Utilisateur Updated!', {
          cssClass: 'alert-success',
          timeout: 2500
        });
      });
    }

  addUser() {
    const user = {
      username: this.name,
      password: this.password,
      email: this.email
    };
    this.userSerice.postUser(user).subscribe(data => {
      console.log(data);
      if (data.msg === 'existe') {
        this._flashMessagesService.show('Utilisateur existe déja!', {
          cssClass: 'alert-danger',
          timeout: 2500
        });
      } else {
        this._flashMessagesService.show('Utilisateur créé!', {
          cssClass: 'alert-success',
          timeout: 2500
        });
      }
      jQuery('#exampleModal').modal('hide');
      this.fetchData();
    });
  }
}
