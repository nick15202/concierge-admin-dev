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

    ngOnInit() {
        for (let i = 0; i < this.service.resource.data.listings.length; i++) {
            if (this.service.resource.data.listings[i].feedbackForm && this.service.resource.data.listings[i].feedbackForm._id) {
                const feedbackForm = {
                    '_id': this.service.resource.data.listings[i].feedbackForm._id
                };
                const scheduleForm = {
                    '_id': this.service.resource.data.listings[i].scheduleForm._id
                };
                this.service.resource.data.listings[i].feedbackForm = feedbackForm;
                this.service.resource.data.listings[i].scheduleForm = scheduleForm;
            }
        }
    }
}
