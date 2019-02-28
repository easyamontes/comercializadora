import { Component, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { UserService } from './../../../../services/user.service';
import { GeneralCallService } from '../../../../services/generalCall.service';

@Component({
    selector: 'requi-view',
    templateUrl: './view.component.html',
    providers:[
        UserService,
        GeneralCallService
    ]
})

export class RequisicionViewComponent implements OnInit{
    public title:string;
    public status: string;
    public token:any;



    ngOnInit(){

    }
}//end class