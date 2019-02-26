import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
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
  users;
  titre = 'Liste des utilisateurs';
  email;
  password;
  name;
  userId;
  columnsName;

  constructor(
    private userSerice: UserService,
    private _flashMessagesService: FlashMessagesService
  ) {}

  fetchData() {
    this.userSerice.getUsers().subscribe(data => {
      this.users = data.reverse();
      this.columnsName = Object.keys(this.users[0]);
      this.columnsName.push('Action');
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
    this.userSerice.deleteUser(id).subscribe(
      data => {
        this._flashMessagesService.show('Utilisateur supprimé!', {
          cssClass: 'alert-success',
          timeout: 2500
        });
      },
      () => {},
      () => {
        this.fetchData();
      }
    );
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
