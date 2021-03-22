import { Pipe } from '@angular/core';

export interface ColumnConfig {
  id?: string,
  label: string;
  sortable: boolean;
  dataSourceParamName?: string;
  pipe?: Pipe;
  pipeArg?: string;
  suffix?: string;
  sort?: Sort;
  textAlign?: TextAlign,
  icon?: string;
  hasTags?: boolean;
  callback?: (index: number) => void;
}

export enum Sort {
  ASC = 'asc',
  DESC = 'desc',
}

export enum TextAlign {
  LEFT,
  CENTER,
  END
}
