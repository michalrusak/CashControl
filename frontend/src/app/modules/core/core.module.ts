import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [SharedModule],
  exports: [HeaderComponent, FooterComponent],
})
export class CoreModule {}
