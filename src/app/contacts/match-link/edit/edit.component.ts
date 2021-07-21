import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormioResourceEditComponent } from 'angular-formio/resource';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
    selector: 'app-edit-match',
    templateUrl: './edit.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditComponent extends FormioResourceEditComponent {
}
