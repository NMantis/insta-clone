import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController, LoadingController } from '@ionic/angular';
import { filter, finalize } from 'rxjs/operators';
import { PhotoService } from 'src/app/services/photo.service';
import { PostService } from 'src/app/services/post.service';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.page.html',
  styleUrls: ['./create-post.page.scss'],
})
export class CreatePostPage {

  constructor(
    public photoService: PhotoService,
    public modal: ModalController,
    private postService: PostService,
    private router: Router,
    private toastCtrl: ToastController,
    public loaderCtrl: LoadingController
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
      if (resp?.data){
        const loader = this.presentLoading();
        this.postService.store(resp.data)
        .pipe(finalize(() => this.dismissLoader(loader)))
        .subscribe(() => {
          this.router.navigateByUrl('/home')
        })
      }
      else 
        this.router.navigateByUrl('/home')
    })
  }

  async presentLoading() {
    const loader = await this.loaderCtrl.create({
      message: 'Creating Post..',
      spinner: 'bubbles'
    });

    await (await loader).present();
    return loader;
  }

  dismissLoader(loading) {
    loading.then(load => load.dismiss())
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'New Post created!',
      duration: 2000
    });
    toast.present();
  }
}
