import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, Input, OnInit, Pipe } from '@angular/core';
import { ColumnConfig, Sort, TextAlign } from '@shared/models/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() columnConfigList: ColumnConfig[] = [];
  @Input() dataSource: any[] = [];

  public Sort = Sort;
  public DatePipe = DatePipe;
  public DecimalPipe = DecimalPipe;
  public TextAlign = TextAlign;

  constructor() {}

  ngOnInit(): void {}

  public sort(columnConfig: ColumnConfig) {
    if (
      columnConfig.sort === undefined ||
      columnConfig.sort === null ||
      columnConfig.sort === Sort.DESC
    ) {
      this._resetSortInColumnConfigList();
      columnConfig.sort = Sort.ASC;
      this.dataSource.sort((a, b) =>
        this._sortObject(
          a,
          b,
          columnConfig.dataSourceParamName,
          columnConfig.sort
        )
      );
    } else {
      this._resetSortInColumnConfigList();
      columnConfig.sort = Sort.DESC;
      this.dataSource.sort((a, b) =>
        this._sortObject(
          a,
          b,
          columnConfig.dataSourceParamName,
          columnConfig.sort
        )
      );
    }
  }

  private _sortObject(
    objectA: Object,
    objectB: Object,
    dataSourceParamName: string,
    sort: Sort
  ): number {
    if (objectA[dataSourceParamName] > objectB[dataSourceParamName]) {
      return sort === Sort.ASC ? 1 : -1;
    }
    if (objectA[dataSourceParamName] < objectB[dataSourceParamName]) {
      return sort === Sort.ASC ? -1 : 1;
    }
    return 0;
  }

  private _resetSortInColumnConfigList() {
    this.columnConfigList.forEach(elem => {
      elem.sort = undefined;
    });
  }
}


