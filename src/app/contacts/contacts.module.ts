import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormioModule } from 'angular-formio';
import { DatePipe } from '@angular/common';
import {
  FormioResource,
  FormioResourceConfig,
  FormioResourceService,
  FormioResourceIndexComponent,
  FormioResourceCreateComponent,
  FormioResourceViewComponent,
  FormioResourceEditComponent,
  FormioResourceDeleteComponent
} from 'angular-formio/resource';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { ResourceComponent } from './resource/resource.component';
import { IndexComponent } from './index/index.component';
import { FormioGrid } from 'angular-formio/grid';

@NgModule({
  imports: [
    CommonModule,
    FormioModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    FormioGrid,
    FormioResource,
    RouterModule.forChild([
      {
        path: '',
        component: IndexComponent
      },
      {
        path: 'new',
        component: FormioResourceCreateComponent
      },
      {
        path: ':id',
        component: ResourceComponent,
        children: [
          {
            path: '',
            redirectTo: 'view',
            pathMatch: 'full'
          },
          {
            path: 'view',
            component: FormioResourceViewComponent
          },
          {
            path: 'edit',
            component: FormioResourceEditComponent
          },
          {
            path: 'delete',
            component: FormioResourceDeleteComponent
          },
          {
            path: 'contacts-listings',
            loadChildren: './contacts-listings/contacts-listings.module#ContactsListingsModule'
          },
          {
            path: 'notes',
            loadChildren: './notes/notes.module#NotesModule'
          }
        ]
      }
    ])
  ],
  declarations: [ResourceComponent, IndexComponent],
  providers: [
    FormioResourceService,
    DatePipe,
    {
      provide: FormioResourceConfig,
      useValue: {
        name: 'contact',
        form: 'contact'
      }
    }
  ]
})
export class ContactsModule { }
