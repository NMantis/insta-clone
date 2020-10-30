import { ModalComponent } from './modal/modal.component';
import { Component } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { PhotoService } from 'src/app/services/photo.service';
import { PostService } from 'src/app/services/post.service';
import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(
    public photoService: PhotoService,
    public modal: ModalController,
    private postService: PostService,
    private router: Router,
    private toastCtrl: ToastController
  ) { }

  ionViewWillEnter() {
    this.photoService.openCam()
    .pipe(filter(img => !!img?.base64String))
    .subscribe(img => {
      const image = `data:image/${img.format};base64,${img.base64String}`
      this.presentModal(image)
    }, error => {
      if(error?.includes('cancelled'))
        this.router.navigateByUrl('/home')
    })
  }

  async presentModal(image) {
    const modal = await this.modal.create({
      component: ModalComponent,
      backdropDismiss: false,
      componentProps: {
        image: image
      }
    });

    await modal.present();

    await modal.onDidDismiss().then(resp => {
      if (resp?.data)
        this.postService.store(resp.data).subscribe(() => {
          this.router.navigateByUrl('/home')
        })
      else 
        this.router.navigateByUrl('/home')
    })
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'New Post created!',
      duration: 2000
    });
    toast.present();
  }
}
