import { NgModule } from '@angular/core';
import { CreatePostPageRoutingModule } from './create-post-routing.module';
import { CreatePostPage } from './create-post.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  imports: [
    SharedModule,
    CreatePostPageRoutingModule
  ],
  declarations: [CreatePostPage, ModalComponent]
})
export class CreatePostPageModule {}
