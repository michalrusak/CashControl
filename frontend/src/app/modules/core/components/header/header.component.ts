import { Component } from '@angular/core';
import { RouterEnum } from 'src/enums/router.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  RouterEnum = RouterEnum;
}
