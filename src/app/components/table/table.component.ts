import { Component, OnInit } from '@angular/core';

import { GateService } from '../../service/gate.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor(private  service:GateService) { }

   UserList:any=[];

    ngOnInit():void{
      this.refreshList();
    }
    refreshList(){
      this.service.getList().subscribe(
        data=>{
          this.UserList=data;
        }
      );
    }
}
