import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormioResourceComponent } from 'angular-formio/resource';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
    selector: 'app-match-link',
    templateUrl: './match-link.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchLinkComponent extends FormioResourceComponent {

}
