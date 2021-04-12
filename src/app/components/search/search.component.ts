import {AfterViewInit, Component, ViewChild,Inject} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import {SelectionModel} from '@angular/cdk/collections';

import { DialogComponent } from '../dialog/dialog.component';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements AfterViewInit{
  displayedColumns = ['id','cardNo','firstName','lastName','deniedList','pay']
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  selectedRow:any;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
   ngAfterViewInit() {
     this.dataSource.sort = this.sort;
     this.dataSource.paginator = this.paginator;
   }
  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  /** Whether the number of selected elements matches the total number of rows. */

    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    /*
    masterToggle() {
      this.isAllSelected() ?
          this.selection.clear() :
          this.dataSource.data.forEach(row => this.selection.select(row));
    }*/

    /** The label for the checkbox on the passed row *//*
    checkboxLabel(row?: PeriodicElement): string {
      if (!row) {
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
    }
*/
    onRowClicked(row:string){
      this.selectedRow = row;
    }

    constructor(public dialog: MatDialog) {}
      openDialog() {
        const dialogRef = this.dialog.open(DialogComponent, {
          width: '50%',
          height: '45%',
          data: {
            cardNo : this.selectedRow.cardNo,
            firstName : this.selectedRow.firstName,
            lastName : this.selectedRow.lastName,
            deniedList : this.selectedRow.deniedList
           }
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
            });
          }

  /*onSearchClear()
    event = "";
    this.applyFilter();
  }*/
}



export interface PeriodicElement{
  id:number;
  cardNo:string;
  firstName:string;
  lastName:string;
  deniedList:number;
}
const ELEMENT_DATA: PeriodicElement[] = [
    {id: 1,cardNo: '9079895089465262', firstName: 'Chanotai',lastName: 'Hydrogen',deniedList: 1111},
    {id: 2,cardNo: '9651149919299911', firstName: 'Supanut',lastName: 'Helium',deniedList: 2222},
    {id: 3,cardNo: '2858553328316280', firstName: 'Asma',lastName: 'Lithium',deniedList: 3333},
    {id: 4,cardNo: '4904281936053814', firstName: 'Pannita',lastName: 'Beryllium',deniedList: 4444},
    {id: 5,cardNo: '2614132430115033', firstName: 'Napak',lastName: 'Boron',deniedList: 5555},
    {id: 6,cardNo: '7409672116264390', firstName: 'Paveetida',lastName: 'Carbon',deniedList: 6666},
    {id: 7,cardNo: '0071468365538940', firstName: 'Pakkapol',lastName: 'Nitrogen',deniedList: 7777},
    {id: 8,cardNo: '4166937387322085', firstName: 'Sirapob',lastName: 'Oxygen',deniedList: 8888},
    {id: 9,cardNo: '6411395029190201', firstName: 'Samuel',lastName: 'Fluorine',deniedList: 9999},
    {id: 10,cardNo: '7859447486990911', firstName: 'Chayatorn',lastName: 'Neon',deniedList: 1010},
    {id: 11,cardNo: '8458412982333561', firstName: 'Nuntapop',lastName: 'Sodium',deniedList: 1111 },
    {id: 12,cardNo: '5351034826075236', firstName: 'Korwies',lastName: 'Magnesium',deniedList: 1212},
    {id: 13,cardNo: '6312107661841406', firstName: 'Puttipong',lastName: 'Aluminum',deniedList: 1313},
    {id: 14,cardNo: '0984764707406605', firstName: 'Nuddcha',lastName: 'Silicon',deniedList: 1414},
    {id: 15,cardNo: '5244082811409330', firstName: 'Komas',lastName: 'Phosphorus',deniedList: 1515},
    {id: 16,cardNo: '4561198320082507', firstName: 'Wichayada',lastName: 'Sulfur',deniedList: 1616},
    {id: 17,cardNo: '9534306652538602', firstName: 'Chatchakorn',lastName: 'Chlorine',deniedList: 1717},
    {id: 18,cardNo: '1850528689508200', firstName: 'Pipatchai',lastName: 'Argon',deniedList: 1818},
    {id: 19,cardNo: '0414159684062747', firstName: 'Pakin',lastName: 'Potassium',deniedList: 1919},
    {id: 20,cardNo: '5557630083949963', firstName: 'Complex',lastName: 'Calcium',deniedList: 2020},
]
