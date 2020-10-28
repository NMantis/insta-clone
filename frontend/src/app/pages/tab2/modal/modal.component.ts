import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() image: any;
  form: FormGroup;
  constructor(public modal: ModalController) { }

  ngOnInit() {
    this.form = new FormGroup({
      image: new FormControl(this.image),
      title: new FormControl(''),
      description: new FormControl('')
    })
  }


  submit() {
    this.modal.dismiss(this.form.value);
  }

  dismiss() {
    this.modal.dismiss();
  }
}
