import { ModalComponent } from './modal/modal.component';
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PhotoService } from 'src/app/services/photo.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(
    public photoService: PhotoService,
    public modal: ModalController,
    private postService: PostService
    ) { }

  createPost() {
    // GET PHOTO 
    const image = this.photoService.addNewToGallery();

    // OPEN MODAL FOR DESCRIPTION / LOCATION 
    this.presentModal(image)
    // POST 

    // REDIRECT TO HOME

  }

  async presentModal(image) {
    const modal = await this.modal.create({
      component: ModalComponent,
      componentProps: {
        imgUrl: image.webviewPath
      }
    });

    await modal.present();

    await modal.onDidDismiss().then(resp => {
      if(resp)
      console.log(resp)
        // this.postService.store(resp.data).subscribe()
    })
  }
  

}
