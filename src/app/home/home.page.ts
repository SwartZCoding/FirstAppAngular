import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {User} from '../models';
import { DataService, Message } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public messages: Message[] = this.data.getMessages().slice(0, 4);
  public users: User[];

  constructor(private data: DataService,
              private http: HttpClient) {}

  ngOnInit(): void {

    this.http.get<User[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe(users => {
        this.users = users.map(user => {
          user.avatarUrl = `https://i.pravatar.cc/40?u=${user.id}`;
          return user;
        });
      });

    console.log('constructor est terminé');
  }

  refresh(ev) {
    this.messages = this.messages.concat(this.data.getMessages().slice(4, 10));
    ev.detail.complete();
  }

}
