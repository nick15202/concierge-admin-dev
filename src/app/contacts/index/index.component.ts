import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AgGridAngular} from 'ag-grid-angular';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';


import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';


@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
    @ViewChild('agGrid') agGrid: AgGridAngular;
    title = 'my-app';
    public data = [];
    public res: string[] = [];

    columnDefs = [
        {headerName: 'Name', width: 190, field: 'fullName', filter: 'agTextColumnFilter', sortable: true},
        {headerName: 'Status', width: 160, field: 'contactStatus', filter: 'agTextColumnFilter', sortable: true},
        {headerName: 'Assigned To', width: 150, field: 'assignedTo', filter: 'agTextColumnFilter', sortable: true},
        {headerName: 'Email', width: 200, field: 'email', filter: 'agTextColumnFilter', sortable: true},
        {headerName: 'Mobile', width: 120, field: 'mobile', filter: 'agTextColumnFilter', sortable: true},
        //  { headerName: 'Primary Suburb', width: 240, field: 'primarySuburb', filter: 'agTextColumnFilter', sortable: true },
        {
            headerName: 'Updated', width: 140, field: 'lastUpdated', filter: 'agDateColumnFilter', sortable: true,
            //    cellRenderer: (data) => {
            //     return data.value ? (new Date(data.value)).toLocaleDateString() : '';
            // }
        },
        {
            headerName: 'Follow Up Date', width: 140, field: 'followUpDate', filter: 'agDateColumnFilter',
            //   cellRenderer: (data) => {
            //     return data.value ? (new Date(data.value)).toLocaleDateString() : '';
            // },
            sortable: true
        },
        {
            headerName: 'Future Follow Up Date', width: 140, field: 'futureFollowUp', filter: 'agDateColumnFilter',
            //   cellRenderer: (data) => {
            //     return data.value ? (new Date(data.value)).toLocaleDateString() : '';
            // },
            sortable: true
        },
        {
            headerName: 'Created', width: 140, field: 'createdTime', filter: 'agDateColumnFilter', sortable: true,
            //   cellRenderer: (data) => {
            //     return data.value ? (new Date(data.value)).toLocaleDateString() : '';
            // }
        },
        {
            headerName: 'Opportunity Date', width: 140, field: 'opportunityStatus', filter: 'agDateColumnFilter', sortable: true,
            //    cellRenderer: (data) => {
            //     return data.value ? (new Date(data.value)).toLocaleDateString() : '';
            // }
        },
        {
            headerName: 'Existing Property Sale	',
            width: 120,
            field: 'existingPropertySale	',
            filter: 'agTextColumnFilter',
            sortable: true
        },

        {headerName: 'Recommend Agency', width: 150, field: 'recommendAgency', filter: 'agTextColumnFilter', sortable: true},
        {
            headerName: 'House Currently On Market',
            width: 160,
            field: 'houseCurrentlyOnMarket',
            filter: 'agTextColumnFilter',
            sortable: true
        },

        {
            headerName: 'Home Loan Qualification',
            width: 160,
            field: 'homeLoanQualificationAmount',
            filter: 'agNumberColumnFilter',
            sortable: true
        },
        {
            headerName: 'Created Time', width: 140, field: 'createdTime', filter: 'agDateColumnFilter', sortable: true,
        },
        {
            headerName: 'Last Updated', width: 140, field: 'lastUpdated', filter: 'agDateColumnFilter', sortable: true,
        },
        {
            headerName: 'New Status', width: 140, field: 'newStatus', filter: 'agDateColumnFilter', sortable: true,
        },
        {
            headerName: 'Campaigned Status', width: 140, field: 'campaignedStatus', filter: 'agDateColumnFilter', sortable: true,
        },
        {
            headerName: 'No Stock Status', width: 140, field: 'noStockStatus', filter: 'agDateColumnFilter', sortable: true,
        },
        {
            headerName: 'Opportunity Status', width: 140, field: 'opportunityStatus', filter: 'agDateColumnFilter', sortable: true,
        },
        {
            headerName: 'Assigned Status', width: 140, field: 'assignedStatus', filter: 'agDateColumnFilter', sortable: true,
        },
        {
            headerName: 'Properties Matched', width: 140, field: 'propertiesMatched', filter: 'agDateColumnFilter', sortable: true,
        },
        {
            headerName: 'Microsite Initiated', width: 140, field: 'micrositeInitiated', filter: 'agDateColumnFilter', sortable: true,
        },
        {
            headerName: 'Microsite Created', width: 140, field: 'micrositeCreated', filter: 'agDateColumnFilter', sortable: true,
        },
        {
            headerName: 'Microsite Email', width: 140, field: 'micrositeEmail', filter: 'agDateColumnFilter', sortable: true,
        },
        {
            headerName: 'Customer Feedback Received', width: 140, field: 'customerFeedbackReceived', filter: 'agDateColumnFilter', sortable: true,
        },
        {
            headerName: 'Customer Schedule Requested', width: 140, field: 'customerScheduleRequested', filter: 'agDateColumnFilter', sortable: true,
        },
        {
            headerName: 'Viewing Scheduled', width: 140, field: 'viewingScheduled', filter: 'agDateColumnFilter', sortable: true,
        },
        {
            headerName: 'Viewing', width: 140, field: 'viewing', filter: 'agDateColumnFilter', sortable: true,
        },
        {
            headerName: 'Contacted Agent', width: 140, field: 'contactedAgent', filter: 'agDateColumnFilter', sortable: true,
        },
        {
            headerName: 'Contact Preparing Offer', width: 140, field: 'contactPreparingOffer', filter: 'agDateColumnFilter', sortable: true,
        },
        {
            headerName: 'Opportunity Closed', width: 140, field: 'opportunityClosed', filter: 'agDateColumnFilter', sortable: true,
        },
        {
            headerName: 'Customer Still Looking', width: 140, field: 'customerStillLooking', filter: 'agDateColumnFilter', sortable: true,
        },
        {
            headerName: 'Opportunity Closed', width: 140, field: 'opportunityClosed1', filter: 'agDateColumnFilter', sortable: true,
        },
        {
            headerName: 'Bought Matched Property', width: 140, field: 'boughtMatchedProperty', filter: 'agDateColumnFilter', sortable: true,
        },

    ];


    rowData: any;
    public a = 'all';
    gridOptions: {
        // enables pagination in the grid
        pagination: true,

        // sets 10 rows per page (default is 100)
        paginationPageSize: 20,

        // other options
    };

    constructor(private http: HttpClient, private router: Router, public datepipe: DatePipe) {

    }

    onRowClicked(event) {
        this.router.navigate([`/contacts/${event.data.id}/view`]);
    }

    newListing() {
        this.router.navigate([`/contacts/new`]);
    }

    ngOnInit() {
        this.gridData(this.a);
    }

    gridData(a) {
        let headers = new HttpHeaders().set('x-token', 'seAu4yf9Dhj0DQWKNemssni9pxDYMP')
            .set('content-type', 'application/json');

        this.http
            .get<any[]>('https://ooba-digitaloffice.form.io/contact/submission?sort=-created&skip=0&limit=1000', {headers})
            .subscribe((res) => {
                this.data = [];
                res.forEach(element => {
                    if (a == 'all' && element.data.contactStatus !== 'new' && element.data.contactStatus !== 'opportunityClosed') {
                         debugger;
                        return this.data.push({
                            'fullName': element.data.fullName,
                            'contactStatus': element.data.contactStatus,
                            'homeLoanQualificationAmount': element.data.homeLoanQualificationAmount,
                            'assignedTo': element.data.assignedTo ? element.data.assignedTo.data.firstName + ' ' + element.data.assignedTo.data.lastName : '',
                            'email': element.data.email,
                            'mobile': element.data.mobile,
                            'lastUpdated': element.data.lastUpdated ? this.datepipe.transform(element.data.lastUpdated, 'd/M/yy, h:mm a') : '',
                            'opportunityStatus': element.data.opportunityStatus ? this.datepipe.transform(element.data.opportunityStatus, 'd/M/yy') : '',
                            'followUpDate': element.data.followUpDate ? this.datepipe.transform(element.data.followUpDate, 'd/M/yy, h:mm a') : '',
                            'futureFollowUp': element.data.futureFollowUp ? this.datepipe.transform(element.data.futureFollowUp, 'd/M/yy, h:mm a') : '',
                            'recommendAgency': element.data.recommendAgency,
                            'existingPropertySale	': element.data.existingPropertySale,
                            'houseCurrentlyOnMarket': element.data.houseCurrentlyOnMarket,
                            //    "primarySuburb": element.data.primarySuburb ? element.data.suburb:'',
                            'createdTime': element.data.createdTime ? this.datepipe.transform(element.data.createdTime, 'd/M/yy, h:mm a') : '',
                            'id': element._id,
                            'newStatus' : element.data.newStatus ? this.datepipe.transform(element.data.newStatus, 'd/M/yy, h:mm a') : '',
                            'campaignedStatus' : element.data.campaignedStatus ? this.datepipe.transform(element.data.campaignedStatus, 'd/M/yy, h:mm a') : '',
                            'noStockStatus' : element.data.noStockStatus ? this.datepipe.transform(element.data.noStockStatus, 'd/M/yy, h:mm a') : '',
                            'assignedStatus' : element.data.assignedStatus ? this.datepipe.transform(element.data.assignedStatus, 'd/M/yy, h:mm a') : '',
                            'propertiesMatched' : element.data.propertiesMatched ? this.datepipe.transform(element.data.propertiesMatched, 'd/M/yy, h:mm a') : '',
                            'micrositeInitiated' : element.data.micrositeInitiated ? this.datepipe.transform(element.data.micrositeInitiated, 'd/M/yy, h:mm a') : '',  
                            'micrositeCreated' : element.data.micrositeCreated ? this.datepipe.transform(element.data.micrositeCreated, 'd/M/yy, h:mm a') : '',
                            'micrositeEmail' : element.data.micrositeEmail ? this.datepipe.transform(element.data.micrositeEmail, 'd/M/yy, h:mm a') : '',
                            'customerFeedbackReceived' : element.data.customerFeedbackReceived ? this.datepipe.transform(element.data.customerFeedbackReceived, 'd/M/yy, h:mm a') : '',
                            'customerScheduleRequested': element.data.customerScheduleRequested ? this.datepipe.transform(element.data.customerScheduleRequested, 'd/M/yy, h:mm a') : '',
                            'viewingScheduled' : element.data.viewingScheduled ? this.datepipe.transform(element.data.viewingScheduled, 'd/M/yy, h:mm a') : '',
                            'viewing' : element.data.viewing ? this.datepipe.transform(element.data.viewing, 'd/M/yy, h:mm a') : '',
                            'contactedAgent' : element.data.contactedAgent ? this.datepipe.transform(element.data.contactedAgent, 'd/M/yy, h:mm a') : '',
                            'contactPreparingOffer' : element.data.contactPreparingOffer ? this.datepipe.transform(element.data.contactPreparingOffer, 'd/M/yy, h:mm a') : '',
                            'opportunityClosed': element.data.opportunityClosed ? this.datepipe.transform(element.data.opportunityClosed, 'd/M/yy, h:mm a') : '',
                            'customerStillLooking' : element.data.customerStillLooking ? this.datepipe.transform(element.data.customerStillLooking, 'd/M/yy, h:mm a') : '',
                            'opportunityClosed1' : element.data.opportunityClosed1 ? this.datepipe.transform(element.data.opportunityClosed1, 'd/M/yy, h:mm a') : '',
                            'boughtMatchedProperty': element.data.boughtMatchedProperty ? this.datepipe.transform(element.data.boughtMatchedProperty, 'd/M/yy, h:mm a') : '',
                            

                        });
                    }

                    if (a == 'new' && element.data.contactStatus == 'new') {
                        return this.data.push({
                            'fullName': element.data.fullName,
                            'contactStatus': element.data.contactStatus,
                            'homeLoanQualificationAmount': element.data.homeLoanQualificationAmount,
                            'assignedTo': element.data.assignedTo ? element.data.assignedTo.data.firstName + ' ' + element.data.assignedTo.data.lastName : '',
                            'email': element.data.email,
                            'mobile': element.data.mobile,
                            'lastUpdated': element.data.lastUpdated ? this.datepipe.transform(element.data.lastUpdated, 'd/M/yy, h:mm a') : '',
                            'opportunityStatus': element.data.opportunityStatus ? this.datepipe.transform(element.data.opportunityStatus, 'd/M/yy') : '',
                            'followUpDate': element.data.followUpDate ? this.datepipe.transform(element.data.followUpDate, 'd/M/yy, h:mm a') : '',
                            'futureFollowUp': element.data.futureFollowUp ? this.datepipe.transform(element.data.futureFollowUp, 'd/M/yy, h:mm a') : '',
                            'recommendAgency': element.data.recommendAgency,
                            'existingPropertySale	': element.data.existingPropertySale,
                            'houseCurrentlyOnMarket': element.data.houseCurrentlyOnMarket,
                            //    "primarySuburb": element.data.primarySuburb ? element.data.suburb:'',
                            'createdTime': element.data.createdTime ? this.datepipe.transform(element.data.createdTime, 'd/M/yy, h:mm a') : '',
                            'id': element._id,
                            'newStatus' : element.data.newStatus ? this.datepipe.transform(element.data.newStatus, 'd/M/yy, h:mm a') : '',
                            'campaignedStatus' : element.data.campaignedStatus ? this.datepipe.transform(element.data.campaignedStatus, 'd/M/yy, h:mm a') : '',
                            'noStockStatus' : element.data.noStockStatus ? this.datepipe.transform(element.data.noStockStatus, 'd/M/yy, h:mm a') : '',
                            'assignedStatus' : element.data.assignedStatus ? this.datepipe.transform(element.data.assignedStatus, 'd/M/yy, h:mm a') : '',
                            'propertiesMatched' : element.data.propertiesMatched ? this.datepipe.transform(element.data.propertiesMatched, 'd/M/yy, h:mm a') : '',
                            'micrositeInitiated' : element.data.micrositeInitiated ? this.datepipe.transform(element.data.micrositeInitiated, 'd/M/yy, h:mm a') : '',  
                            'micrositeCreated' : element.data.micrositeCreated ? this.datepipe.transform(element.data.micrositeCreated, 'd/M/yy, h:mm a') : '',
                            'micrositeEmail' : element.data.micrositeEmail ? this.datepipe.transform(element.data.micrositeEmail, 'd/M/yy, h:mm a') : '',
                            'customerFeedbackReceived' : element.data.customerFeedbackReceived ? this.datepipe.transform(element.data.customerFeedbackReceived, 'd/M/yy, h:mm a') : '',
                            'customerScheduleRequested': element.data.customerScheduleRequested ? this.datepipe.transform(element.data.customerScheduleRequested, 'd/M/yy, h:mm a') : '',
                            'viewingScheduled' : element.data.viewingScheduled ? this.datepipe.transform(element.data.viewingScheduled, 'd/M/yy, h:mm a') : '',
                            'viewing' : element.data.viewing ? this.datepipe.transform(element.data.viewing, 'd/M/yy, h:mm a') : '',
                            'contactedAgent' : element.data.contactedAgent ? this.datepipe.transform(element.data.contactedAgent, 'd/M/yy, h:mm a') : '',
                            'contactPreparingOffer' : element.data.contactPreparingOffer ? this.datepipe.transform(element.data.contactPreparingOffer, 'd/M/yy, h:mm a') : '',
                            'opportunityClosed': element.data.opportunityClosed ? this.datepipe.transform(element.data.opportunityClosed, 'd/M/yy, h:mm a') : '',
                            'customerStillLooking' : element.data.customerStillLooking ? this.datepipe.transform(element.data.customerStillLooking, 'd/M/yy, h:mm a') : '',
                            'opportunityClosed1' : element.data.opportunityClosed1 ? this.datepipe.transform(element.data.opportunityClosed1, 'd/M/yy, h:mm a') : '',
                            'boughtMatchedProperty': element.data.boughtMatchedProperty ? this.datepipe.transform(element.data.boughtMatchedProperty, 'd/M/yy, h:mm a') : '',
                        });
                    }
                    if (a == 'closed' && element.data.contactStatus == 'opportunityClosed') {
                        return this.data.push({
                            'fullName': element.data.fullName,
                            'contactStatus': element.data.contactStatus,
                            'homeLoanQualificationAmount': element.data.homeLoanQualificationAmount,
                            'assignedTo': element.data.assignedTo ? element.data.assignedTo.data.firstName + ' ' + element.data.assignedTo.data.lastName : '',
                            'email': element.data.email,
                            'mobile': element.data.mobile,
                            'lastUpdated': element.data.lastUpdated ? this.datepipe.transform(element.data.lastUpdated, 'd/M/yy, h:mm a') : '',
                            'opportunityStatus': element.data.opportunityStatus ? this.datepipe.transform(element.data.opportunityStatus, 'd/M/yy') : '',
                            'followUpDate': element.data.followUpDate ? this.datepipe.transform(element.data.followUpDate, 'd/M/yy, h:mm a') : '',
                            'futureFollowUp': element.data.futureFollowUp ? this.datepipe.transform(element.data.futureFollowUp, 'd/M/yy, h:mm a') : '',
                            'recommendAgency': element.data.recommendAgency,
                            'existingPropertySale	': element.data.existingPropertySale,
                            'houseCurrentlyOnMarket': element.data.houseCurrentlyOnMarket,
                            //    "primarySuburb": element.data.primarySuburb ? element.data.suburb:'',
                            'createdTime': element.data.createdTime ? this.datepipe.transform(element.data.createdTime, 'd/M/yy, h:mm a') : '',
                            'id': element._id,
                            'newStatus' : element.data.newStatus ? this.datepipe.transform(element.data.newStatus, 'd/M/yy, h:mm a') : '',
                            'campaignedStatus' : element.data.campaignedStatus ? this.datepipe.transform(element.data.campaignedStatus, 'd/M/yy, h:mm a') : '',
                            'noStockStatus' : element.data.noStockStatus ? this.datepipe.transform(element.data.noStockStatus, 'd/M/yy, h:mm a') : '',
                            'assignedStatus' : element.data.assignedStatus ? this.datepipe.transform(element.data.assignedStatus, 'd/M/yy, h:mm a') : '',
                            'propertiesMatched' : element.data.propertiesMatched ? this.datepipe.transform(element.data.propertiesMatched, 'd/M/yy, h:mm a') : '',
                            'micrositeInitiated' : element.data.micrositeInitiated ? this.datepipe.transform(element.data.micrositeInitiated, 'd/M/yy, h:mm a') : '',  
                            'micrositeCreated' : element.data.micrositeCreated ? this.datepipe.transform(element.data.micrositeCreated, 'd/M/yy, h:mm a') : '',
                            'micrositeEmail' : element.data.micrositeEmail ? this.datepipe.transform(element.data.micrositeEmail, 'd/M/yy, h:mm a') : '',
                            'customerFeedbackReceived' : element.data.customerFeedbackReceived ? this.datepipe.transform(element.data.customerFeedbackReceived, 'd/M/yy, h:mm a') : '',
                            'customerScheduleRequested': element.data.customerScheduleRequested ? this.datepipe.transform(element.data.customerScheduleRequested, 'd/M/yy, h:mm a') : '',
                            'viewingScheduled' : element.data.viewingScheduled ? this.datepipe.transform(element.data.viewingScheduled, 'd/M/yy, h:mm a') : '',
                            'viewing' : element.data.viewing ? this.datepipe.transform(element.data.viewing, 'd/M/yy, h:mm a') : '',
                            'contactedAgent' : element.data.contactedAgent ? this.datepipe.transform(element.data.contactedAgent, 'd/M/yy, h:mm a') : '',
                            'contactPreparingOffer' : element.data.contactPreparingOffer ? this.datepipe.transform(element.data.contactPreparingOffer, 'd/M/yy, h:mm a') : '',
                            'opportunityClosed': element.data.opportunityClosed ? this.datepipe.transform(element.data.opportunityClosed, 'd/M/yy, h:mm a') : '',
                            'customerStillLooking' : element.data.customerStillLooking ? this.datepipe.transform(element.data.customerStillLooking, 'd/M/yy, h:mm a') : '',
                            'opportunityClosed1' : element.data.opportunityClosed1 ? this.datepipe.transform(element.data.opportunityClosed1, 'd/M/yy, h:mm a') : '',
                            'boughtMatchedProperty': element.data.boughtMatchedProperty ? this.datepipe.transform(element.data.boughtMatchedProperty, 'd/M/yy, h:mm a') : '',
                        });
                    }

                });
                this.rowData = this.data;
            });
    }


}

