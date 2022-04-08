import { Component } from '@angular/core';

import { FIELDS } from 'src/app/constants/strings';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  fields = FIELDS;
  constructor() {}

}
