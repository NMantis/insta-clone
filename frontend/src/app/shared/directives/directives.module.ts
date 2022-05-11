import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HideHeaderDirective } from './hide-header.directive';
import { FadeHeaderDirective } from './fade-header.directive';
import { OnlyNumbersDirective } from './only-numbers.directive';
import { ImagePreloadDirective } from './image-preload.directive';

const directives = [
  HideHeaderDirective,
  FadeHeaderDirective,
  OnlyNumbersDirective,
  ImagePreloadDirective
];
@NgModule({
  declarations: [directives],
  imports: [CommonModule],
  exports: [directives]
})
export class DirectivesModule { }
