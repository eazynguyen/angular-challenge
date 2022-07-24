import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../components/loading/loading.component';
import { TuiLoaderModule } from '@taiga-ui/core';
import { AlertDirective } from '../../directives/alert.directive';
import { FilterByNamePipe } from '../../pipes/filter-by-name.pipe';
import { LoadErrorComponent } from '../../components/load-error/load-error.component';

@NgModule({
  declarations: [
    LoadingComponent,
    LoadErrorComponent,
    AlertDirective,
    FilterByNamePipe,
  ],
  imports: [CommonModule, TuiLoaderModule],
  exports: [
    LoadingComponent,
    LoadErrorComponent,
    AlertDirective,
    FilterByNamePipe,
  ],
})
export class SharedModule {}
