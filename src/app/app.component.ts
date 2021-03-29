import { Component,OnInit } from '@angular/core';
import { CardModel } from './model/CardModel';
import { EmployeeModel } from './model/EmployeeModel';
import { DataTableItem } from './components/data-table/CardModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  employee : any;
  card : CardModel[] = [];
  data : DataTableItem[] = [];
  cardNo : any;
  constructor(){
   //this.employee = new EmployeeModel();
   //this.card = new CardModel();
   }

  ngOnInit():void {
    /*
    this.card = [{
      "id" : 1,
      "cardNo":"021",
      "firstName":"Kunha",
      "lastName":"DB",
      "deniedList":123123
    },{
      "id":2,
      "cardNo":"641",
      "firstName":"Kunha",
      "lastName":"Python",
      "deniedList":14113
    }];

    this.card.id = 1;
    this.card.cardNo = "021";
    this.card.firstName = "Kunha";
    this.card.lastName = "DB";
    this.card.deniedList = 1111;*/
  }

 Search(){
  if(this.cardNo == ""){
    this.ngOnInit();
  }else{
    this.data = this.data.filter((res:any) => {
      return res.cardNo.toLocaleLowerCase().match(this.cardNo.toLocaleLowerCase());
    });
  }
 }
}
