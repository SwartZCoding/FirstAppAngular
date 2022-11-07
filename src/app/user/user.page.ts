import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User} from '../models';
import {Camera, CameraResultType} from '@capacitor/camera';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  public user: User;
  public img: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient) {
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.http.get<User>(`https://jsonplaceholder.typicode.com/users/${id}`)
      .subscribe(user => {
        user.avatarUrl = `https://i.pravatar.cc/350?u=${user.id}`;
        this.user = user;
      });
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64
    });
    this.img = `data:image/jpeg;base64,${image.base64String}`;
  };

}
