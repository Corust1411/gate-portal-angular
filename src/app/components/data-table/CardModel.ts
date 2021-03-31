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
  {id: 11,cardNo: '8458412982333561', firstName: 'Nuntapob',lastName: 'Sodium',deniedList: 1111 },
  {id: 12,cardNo: '5351034826075236', firstName: 'Korwies',lastName: 'Magnesium',deniedList: 1212},
  {id: 13,cardNo: '6312107661841406', firstName: 'Puttipong',lastName: 'Aluminum',deniedList: 1313},
  {id: 14,cardNo: '0984764707406605', firstName: 'Nuddcha',lastName: 'Silicon',deniedList: 1414},
  {id: 15,cardNo: '5244082811409330', firstName: 'Komas',lastName: 'Phosphorus',deniedList: 1515},
  {id: 16,cardNo: '4561198320082507', firstName: 'Wichayada',lastName: 'Sulfur',deniedList: 1616},
  {id: 17,cardNo: '9534306652538602', firstName: 'Chatchakorn',lastName: 'Chlorine',deniedList: 1717},
  {id: 18,cardNo: '1850528689508200', firstName: 'Pipatchai',lastName: 'Argon',deniedList: 1818},
  {id: 19,cardNo: '0414159684062747', firstName: 'Pakin',lastName: 'Potassium',deniedList: 1919},
  {id: 20,cardNo: '5557630083949963', firstName: 'Complex',lastName: 'Calcium',deniedList: 2020},
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
