import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface DataTableItem {
  id: number;
  cardNo: string;
  firstName: string;
  lastName: string;
  deniedList: number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: DataTableItem[] = [
  {id: 1,cardNo: '9079895089465262', firstName: 'Hydrogen',lastName: 'Sodium',deniedList: 1111},
  {id: 2,cardNo: '9651149919299911', firstName: 'Helium',lastName: 'Magnesium',deniedList: 2222},
  {id: 3,cardNo: '2858553328316280', firstName: 'Lithium',lastName: 'Aluminum',deniedList: 3333},
  {id: 4,cardNo: '4904281936053814', firstName: 'Beryllium',lastName: 'Silicon',deniedList: 4444},
  {id: 5,cardNo: '2614132430115033', firstName: 'Boron',lastName: 'Phosphorus',deniedList: 5555},
  {id: 6,cardNo: '7409672116264390', firstName: 'Carbon',lastName: 'Sulfur',deniedList: 6666},
  {id: 7,cardNo: '0071468365538940', firstName: 'Nitrogen',lastName: 'Chlorine',deniedList: 7777},
  {id: 8,cardNo: '4166937387322085', firstName: 'Oxygen',lastName: 'Argon',deniedList: 8888},
  {id: 9,cardNo: '6411395029190201', firstName: 'Fluorine',lastName: 'Potassium',deniedList: 9999},
  {id: 10,cardNo: '5264538285197691', firstName: 'Neon',lastName: 'Calcium',deniedList: 1010},
  /*{id: 11, name: 'Sodium'},
  {id: 12, name: 'Magnesium'},
  {id: 13, name: 'Aluminum'},
  {id: 14, name: 'Silicon'},
  {id: 15, name: 'Phosphorus'},
  {id: 16, name: 'Sulfur'},
  {id: 17, name: 'Chlorine'},
  {id: 18, name: 'Argon'},
  {id: 19, name: 'Potassium'},
  {id: 20, name: 'Calcium'},*/
];

/**
 * Data source for the DataTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DataTableDataSource extends DataSource<DataTableItem> {
  data: DataTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<DataTableItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: DataTableItem[]): DataTableItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: DataTableItem[]): DataTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'cardNo': return compare(+a.cardNo, +b.cardNo, isAsc);
        case 'firstName': return compare(a.firstName, b.firstName, isAsc);
        case 'lastName': return compare(a.lastName, b.lastName, isAsc);
        case 'deniedList': return compare(a.deniedList, b.deniedList, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
