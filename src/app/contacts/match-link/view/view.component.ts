import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
declare let $: any;
@Component({
    selector: 'app-view-component',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewComponent {
    public contacts: any;
    public succeededListings: any = [];
    public data: any;
    public matchingStatus: any;
    public pendingListings: any = [];
    public failedListings: any = [];
    public matchLinkIdFromRoute: any;
    constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {
        const headers = new HttpHeaders().set('x-token', 'seAu4yf9Dhj0DQWKNemssni9pxDYMP')
            .set('content-type', 'application/json');
        const str = this.router.url;
        const index = str.indexOf('link/');
        this.matchLinkIdFromRoute = str.substring(index + 5, str.length - 5);
        this.http
            .get<any[]>(`https://ooba-digitaloffice.form.io/matchLink/submission/${this.matchLinkIdFromRoute}`, { headers })
            .subscribe((res: any) => {
                if (res) {
                    this.data = res;
                    this.contacts = res.data.contact.data;
                    this.succeededListings = res.data.listings.filter(p => p.status.indexOf('succeeded') >= 0);
                    this.pendingListings = res.data.listings.filter(p => p.status.indexOf('pending') >= 0);
                    this.failedListings = res.data.listings.filter(p => p.status.indexOf('failure') >= 0);
                    this.matchingStatus = res.data.matchingStatus;
                }
            });
    }
    openViewInfo(id) {
        window.open(`https://property-concierge.ooba.co.za/listings/${id}`);
    }

    getSchedule(value) {
        if (value) {
            if (value.indexOf('Date') < 0) {
                return false;
            } else {
                return true;
            }
        }
    }
    getFeedback(value) {
        if (value) {
            if (value.indexOf('feed') === 0 && value.length === 10) {
                return false;
            } else {
                return true;
            }
        }
    }
    getFeedbackNote(value) {
        if (value) {
            if (value.indexOf('note') === 0 && value.length === 10) {
                return false;
            } else {
                return true;
            }
        }
    }

    createlandingPage() {
        $('#landingBtn > i').addClass('fa-refresh  fa-spin');
        setTimeout(() => {
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            };
            fetch('https://hook.integromat.com/drttgj2phutrlccvtcrtuxfm93zahaeu', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(this.data)
            })
                .then(function (res) {
                });
            $('#landingBtn > i').removeClass('fa-refresh  fa-spin');
        }, 1000);
    }
}


