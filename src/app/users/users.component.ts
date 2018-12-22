import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Routes } from '@angular/router';
import { UserService } from 'app/services/user.service';
import { FlashMessagesService } from 'angular2-flash-messages';
declare var jQuery: any;
@Component({
  selector: 'app-users',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  dtOptions: any;
  users = [['Hamdi', 'hamdi@yahoo.fr', 'admin']];
  titre = 'Liste des utilisateurs';

  email;
  password;
  name;

  constructor(
    private userSerice: UserService,
    private _flashMessagesService: FlashMessagesService
  ) {
    let user = [];
    this.userSerice.getUsers().subscribe(data => {
      user = data;
      user.forEach(element => {
        this.users.push([element.username, element.email, 'admin']);
      });
    });
  }

  ngOnInit() {
    this.dtOptions = {
      data: this.users,
      columns: [
        { title: 'Nom' },
        { title: 'Email' },
        { title: 'Role' },
        {
          title: 'Action',
          render: (data: any, type: any, full: any) => {
            // tslint:disable-next-line:max-line-length
            return '<button ng-click="deleteUser()" class="btn  btn-just-icon btn-round btn-light"><i class="material-icons">details</i></button><button class="btn  btn-just-icon btn-round btn-light"><i class="material-icons">edit</i></button><button class="btn  btn-just-icon btn-round btn-light"><i class="material-icons">delete</i></button>';
          }
        }
      ]
    };
  }

  addUser() {
    const user = {
      username: this.name,
      password: this.password,
      email: this.email
    };
    this.userSerice.postUser(user).subscribe(data => {
      if (data.msg === 'existe') {
        this._flashMessagesService.show('Utilisateur existe déja!', {
          cssClass: 'alert-danger',
          timeout: 2500
        });
      } else if ((data.msg = 'null')) {
        this._flashMessagesService.show('Remplir tous les champs svp!', {
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
    });
  }

  deleteUser() {
    console.log('behy');
    // this.userSerice.deleteUser(id).subscribe();
  }
}
