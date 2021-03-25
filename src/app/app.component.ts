import { Component,OnInit } from '@angular/core';
import { CardModel } from './model/CardModel';
import { EmployeeModel } from './model/EmployeeModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  employee : any;
  card : any;
  cardNo : any;
  constructor(){
   //this.employee = new EmployeeModel();
   //this.card = new CardModel();
   }

  ngOnInit():void {
    this.card = new CardModel;

    this.card.id = 1;
    this.card.cardNo = "021";
    this.card.firstName = "Kunha";
    this.card.lastName = "DB";
    this.card.deniedList = 1111;
  }

 Search(){
  if(this.cardNo == ""){
    this.ngOnInit();
  }else{
    this.card = this.card.filter((res:any) => {
      return res.cardNo.toLocaleLowerCase().match(this.cardNo.toLocaleLowerCase());
    });
  }
 }
}
