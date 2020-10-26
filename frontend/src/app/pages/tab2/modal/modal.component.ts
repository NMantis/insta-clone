import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() imgUrl: any;
  constructor(public modal: ModalController) { }

  ngOnInit() {}


  dismiss() {
    this.modal.dismiss();
  }
}
