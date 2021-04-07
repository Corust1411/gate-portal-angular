import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  selected:any;
  constructor(
  public dialogRef: MatDialogRef<SearchComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any){
    this.selected = data;
  }

  ngOnInit(): void {
  }

}
