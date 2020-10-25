import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HideHeaderDirective } from './hide-header.directive';
import { FadeHeaderDirective } from './fade-header.directive';
import { OnlyNumbersDirective } from './only-numbers.directive';

@NgModule({
  declarations: [HideHeaderDirective, FadeHeaderDirective, OnlyNumbersDirective],
  imports: [CommonModule],
  exports: [HideHeaderDirective, FadeHeaderDirective, OnlyNumbersDirective]
})
export class DirectivesModule { }
