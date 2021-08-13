import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { GridOptions, IDatasource, IGetRowsParams } from 'ag-grid-community';
import { DatePipe } from '@angular/common';
import { ListingService } from './listing.service';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

type tabTypes = 'new' | 'opportunityClosed';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
    @ViewChild('agGrid') agGrid: AgGridAngular;
    columnDefs = [
      {headerName: 'Name', width: 190, field: 'fullName', filter: 'agTextColumnFilter', sortable: true},
      {headerName: 'Status', width: 160, field: 'contactStatus', filter: 'agTextColumnFilter', sortable: true},
      {headerName: 'Assigned To', width: 150, field: 'assignedTo', filter: 'agTextColumnFilter', sortable: true},
      {headerName: 'Email', width: 200, field: 'email', filter: 'agTextColumnFilter', sortable: true},
      {headerName: 'Mobile', width: 120, field: 'mobile', filter: 'agTextColumnFilter', sortable: true},
      //  { headerName: 'Primary Suburb', width: 240, field: 'primarySuburb', filter: 'agTextColumnFilter', sortable: true },

      {
          headerName: 'Updated', width: 140, field: 'updated', filter: 'agDateColumnFilter', sortable: true,
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
          headerName: 'created', sort: 'desc', width: 140, field: 'created', filter: 'agDateColumnFilter', sortable: true,
          //   cellRenderer: (data) => {
          //     return data.value ? (new Date(data.value)).toLocaleDateString() : '';
          // }
      },
      {
          headerName: 'Opportunity Date', width: 140, field: 'opportunityDate', filter: 'agDateColumnFilter', sortable: true,
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
    public rowData: any[];
    public gridOptions: any = {
      rowSelection: 'single',
      cacheBlockSize: 17,
      maxBlocksInCache: 5,
      rowModelType: 'infinite',
      pagination: true,
      animateRows: true,
      paginationPageSize: 17
    };
    gridParams: any;
    activeTab: 'opportunity';
    officeId;
    isGridReady: boolean = true;
    totalRows = undefined;
    urlParams = ''
    public opportunity = 'opportunity';
  
    constructor(private listingService: ListingService, private route: ActivatedRoute, private datepipe: DatePipe, private router: Router,) { }
  
    ngOnInit() {
      this.officeId = '';
      this.activeTab='opportunity';
      this.columnDefs.forEach((ele: any) => {
        if (ele.filter == "agNumberColumnFilter") {
          ele.filterParams = {
            filterOptions: ['equals', 'greaterThan', 'lessThan'],
            suppressAndOrCondition: true
          }
        }
        else if (ele.filter == "agDateColumnFilter") {
          ele.filterParams = {
            filterOptions: ['equals', 'greaterThan', 'lessThan', 'inRange'],
            suppressAndOrCondition: true
          }
        }
        else {
          ele.filterParams = {
            filterOptions: ['contains', 'notEqual', 'equals'],
            suppressAndOrCondition: true
          }
        }
      })
    }
  
    handleTabClick(type) {
      this.totalRows = undefined;
      
      // if clicked tab is myListing, i need to find out another way to get mylisting other than using username and filtering out data with that username.
      // is it possible to use any type of ID to only fetch data of mylisting rather than filtering out.
      this.activeTab = type
      this.isGridReady = false;
      setTimeout(() => {
        this.isGridReady = true;
      }, 1)
    }
  
    createUrlParams(startRow: number, endRow: number, sort, filter) {
      return new Promise((resolve) => {
          let searchData:any;
          if(this.activeTab == undefined){
             searchData = '';

          }else if(this.activeTab  == this.opportunity){
            searchData = '&data.contactStatus__nin=new,opportunityClosed';
          } else{
         searchData = '&data.contactStatus=' + this.activeTab;

          }

        let sortData = '-created';
        let limit = 17;
  
        if (sort.length) {
          let sortField = sort[0].colId;
          let sortType = sort[0].sort;
          sortData = this.getFieldName(sortField);
          sortData = sortData+'&'+sortData+'__exists=true&'+sortData+'__ne=null';
          console.log({ sortField, sortType, sortData })
          if (sortType == 'desc') {
            sortData = '-' + sortData;
          }
        } else {
          sortData = '-modified';
        }
  
        if (Object.keys(filter).length) {
          for (let key in filter) {
            console.log(filter[key])
            if (filter[key].filterType && filter[key].filterType == "date") {
              if (filter[key].type == 'equals') {
                let date = new Date(filter[key].dateFrom);
                let startDate = date.toISOString();
                let endDate = date.setHours(23, 59, 0, 0);
                searchData = searchData + "&created__gt=" + startDate + "&created__lt=" + endDate
                // create less than or greater than condition.
              } else if (filter[key].type == 'inRange') {
                let startDate = new Date(filter[key].dateFrom).toISOString();
                let endDate = new Date(filter[key].dateTo).toISOString();
                searchData = searchData + "&created__gt=" + startDate + "&created__lt=" + endDate
                // create start and end date - with leas than or greater than
              } else if (filter[key].type == 'greaterThan') {
                let startDate = new Date(filter[key].dateFrom).toISOString();
                searchData = searchData + "&created__gt=" + startDate
                // create only greater than condition
              } else if (filter[key].type == 'lessThan') {
                let endDate = new Date(filter[key].dateFrom).toISOString();
                searchData = searchData + "&created__lt=" + endDate
                // create only less than conditon
              }
            }
            else {
              searchData = searchData.length
                ? '&'+searchData + '&' + this.getFieldName(key) + this.getFilterTypeAndValue(filter[key].type, filter[key].filter)
                : '&'+searchData + this.getFieldName(key) + this.getFilterTypeAndValue(filter[key].type, filter[key].filter)
            }
          }
        }
        const params = '?sort=' + sortData + '&skip=' + startRow + '&limit=' + limit +searchData;
        console.log(params)
        resolve(params)
      })
    }
  
    getRowData(params) {
      this.gridParams.api.showLoadingOverlay()
      return new Promise(resolve => {
        this.listingService.getGridData(this.officeId, params).subscribe(resp => {
          resolve(resp)
        })
      })
    }
  
    getFieldName(name) {
      if (name == 'fullName') {
        return 'data.fullName'
      } else if (name == 'contactStatus') {
        return 'data.contactStatus'
      } else if (name == 'homeLoanQualificationAmount') {
        return 'data.homeLoanQualificationAmount'
      } else if (name == 'assignedTo') {
        return 'data.assignedTo.data.firstName'
      } else if (name == 'email') {
        return 'data.email'
      } else if (name == 'mobile') {
        return 'data.mobile'
      } else if (name == 'lastUpdated') {
        return 'data.lastUpdated'
     } else if (name == 'updated') {
        return 'modified'
      } else if (name == 'opportunityStatus') {
        return 'data.opportunityStatus'
    } else if (name == 'opportunityDate') {
        return 'data.opportunityStatus'
      } else if (name == 'followUpDate') {
        return 'data.followUpDate'
      } else if (name == 'futureFollowUp') {
        return 'data.futureFollowUp'
      } else if (name == 'recommendAgency') {
        return 'data.recommendAgency'
      } else if (name == 'existingPropertySale') {
        return 'data.existingPropertySale'
      } else if (name == 'houseCurrentlyOnMarket') {
        return 'data.houseCurrentlyOnMarket'
      } else if (name == 'createdTime') {
        return 'data.createdTime'
     } else if (name == 'created') {
        return 'created'
      } else if (name == 'id') {
        return 'id'
      } else if (name == 'newStatus') {
        return 'data.newStatus'
      } else if (name == 'campaignedStatus') {
        return 'data.campaignedStatus'
      } else if (name == 'noStockStatus') {
        return 'data.noStockStatus'
      } else if (name == 'assignedStatus') {
        return 'data.assignedStatus'
      } else if (name == 'propertiesMatched') {
        return 'data.propertiesMatched';
      } else if (name == 'micrositeInitiated') {
        return 'data.micrositeInitiated';
      } else if (name == 'micrositeCreated') {
        return 'data.micrositeCreated';
      } else if (name == 'micrositeEmail') {
        return 'data.micrositeEmail';
      } else if (name == 'customerFeedbackReceived') {
        return 'data.customerFeedbackReceived';
      } else if (name == 'customerScheduleRequested') {
        return 'data.customerScheduleRequested';
      } else if (name == 'viewingScheduled') {
        return 'data.viewingScheduled';
      } else if (name == 'viewing') {
        return 'data.viewing';
      } else if (name == 'contactedAgent') {
        return 'data.contactedAgent';
      } else if (name == 'contactPreparingOffer') {
        return 'data.contactPreparingOffer';
      } else if (name == 'opportunityClosed') {
        return 'data.opportunityClosed';
      } else if (name == 'customerStillLooking') {
        return 'data.customerStillLooking';
      } else if (name == 'opportunityClosed1') {
        return 'data.opportunityClosed1';
      } else if (name == 'boughtMatchedProperty') {
        return 'data.boughtMatchedProperty';
      }
    }
  
    getFilterTypeAndValue(type, key) {
      if (key == null) {
        return null
      }
      if (type == 'equals') {
        return "=" + key
      } else if (type == 'notEqual') {
        return "__ne=" + key
      } else if (type == "contains") {
        return "__regex=" + key
      } else if (type == "greaterThan") {
        return "__gt=" + key
      } else if (type == "lessThan") {
        return "__lt=" + key
      } else if (type == "inRange") {
        return "__lt=" + key
      }
    }
  
    async onGridReady(params: any) {
      params.api.showLoadingOverlay()
      this.gridParams = params;
      console.clear();
      console.log("---------------------GRID READY EVENT-----------------------------")
      var datasource = {
        getRows: async (params: IGetRowsParams) => {
          let urlParams = await this.createUrlParams(params.startRow, params.endRow, params.sortModel, params.filterModel);
          let totalCountPromise = Promise.resolve(this.totalRows)// this.totalRows == undefined ? this.listingService.getTotalRows(this.officeId, this.activeTab) : Promise.resolve(this.totalRows);
          let dataPromise: any = this.getRowData(urlParams);
          let [totalCount, data]: any = await Promise.all([totalCountPromise, dataPromise]);
          this.totalRows = totalCount;
          let parSedData = [];
          for (let i = 0; i < data.length; i++) {
            let element = data[i];
            parSedData.push({
  
              'fullName': element.data.fullName,
              'contactStatus': element.data.contactStatus,
              'homeLoanQualificationAmount': element.data.homeLoanQualificationAmount,
              'assignedTo': element.data.assignedTo ? element.data.assignedTo.data.firstName + ' ' + element.data.assignedTo.data.lastName : '',
              'email': element.data.email,
              'mobile': element.data.mobile,
              'lastUpdated': element.data.lastUpdated ? this.datepipe.transform(element.data.lastUpdated, 'd/M/yy, h:mm a') : '',
              'opportunityStatus': element.data.opportunityStatus ? this.datepipe.transform(element.data.opportunityStatus, 'd/M/yy, h:mm a') : '',
              'opportunityDate': element.data.opportunityStatus ? this.datepipe.transform(element.data.opportunityStatus, 'd/M/yy, h:mm a') : '',
              'followUpDate': element.data.followUpDate ? this.datepipe.transform(element.data.followUpDate, 'd/M/yy, h:mm a') : '',
              'futureFollowUp': element.data.futureFollowUp ? this.datepipe.transform(element.data.futureFollowUp, 'd/M/yy, h:mm a') : '',
              'recommendAgency': element.data.recommendAgency,
              'existingPropertySale	': element.data.existingPropertySale,
              'houseCurrentlyOnMarket': element.data.houseCurrentlyOnMarket,
              //    "primarySuburb": element.data.primarySuburb ? element.data.suburb:'',
              'createdTime': element.data.createdTime ? this.datepipe.transform(element.data.createdTime, 'd/M/yy, h:mm a') : '',
              'created': element.created ? this.datepipe.transform(element.created, 'd/M/yy, h:mm a') : '',
              'updated': element.modified ? this.datepipe.transform(element.modified, 'd/M/yy, h:mm a') : '',
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
  
          this.gridParams.api.hideOverlay();
          if (!parSedData.length) {
            this.gridParams.api.showNoRowsOverlay()
            return params.successCallback([], 0)
          } else {
            return params.successCallback(parSedData)
          }
        }
      };
      params.api.setDatasource(datasource);
    }
  
    clearFilters() {
      // this.handleTabClick('active')
      this.gridParams.api.setFilterModel(null);
    }
  
    cellClicked(event) {
      this.router.navigate([`/contacts/${event.data.id}/view`]);
    }
  
    newListing() {
      this.router.navigate([`/contacts/new`]);
    }
  
  }
  