import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormioResourceComponent} from 'angular-formio/resource';

@Component({
  selector: 'app-event-resource',
  templateUrl: './event-resource.component.html',
  styleUrls: ['./event-resource.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventResourceComponent extends FormioResourceComponent{}
