import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormioModule } from 'angular-formio';
import {
  FormioResource,
  FormioResourceIndexComponent,
  FormioResourceCreateComponent,
  FormioResourceEditComponent,
  FormioResourceViewComponent,
  FormioResourceDeleteComponent,
  FormioResourceConfig,
  FormioResourceService
} from 'angular-formio/resource';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';
import { MatchLinkComponent } from './match-component/match-link.component';

@NgModule({
  declarations: [ViewComponent, EditComponent, MatchLinkComponent],
  imports: [
    CommonModule,
    FormioModule,
    FormioResource,
    RouterModule.forChild([
      {
        path: '',
        component: FormioResourceIndexComponent
      },
      {
        path: 'new',
        component: FormioResourceCreateComponent
      },
      {
        path: ':id',
        component: MatchLinkComponent,
        children: [
          {
            path: '',
            redirectTo: 'view',
            pathMatch: 'full'
          },
          {
            path: 'view',
            component: ViewComponent
          },
          {
            path: 'edit',
            component: EditComponent
          },
        ]
      },

      // {
      //   path: ':id/view',
      //   component: ViewComponent
      // },
      // {
      //   path: ':id/edit',
      //   component: EditComponent
      // },
    ])
  ],
  providers: [
    FormioResourceService,
    {
      provide: FormioResourceConfig,
      useValue: {
        name: 'matchLink',
        form: 'matchLink',
        parents: [
          'contact'
        ]
      }
    }
  ]
})
export class MatchLinkModule { }
