import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { PostComponent } from './post.component';

@NgModule({
  imports: [ SharedModule ],
  declarations: [PostComponent],
  exports: [PostComponent]
})
export class Tab1PageModule {}
