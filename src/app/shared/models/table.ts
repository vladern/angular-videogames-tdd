import { Pipe } from '@angular/core';

export interface ColumnConfig {
  label: string;
  sortable: boolean;
  dataSourceParamName?: string;
  pipe?: Pipe;
  pipeArg?: string;
  suffix?: string;
  sort?: Sort;
  icon?: string;
  callback?: (index: number) => void;
}

export enum Sort {
  ASC = 'asc',
  DESC = 'desc',
}
