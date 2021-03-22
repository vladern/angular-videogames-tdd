import { DatePipe, DecimalPipe } from '@angular/common';
import { ColumnConfig, TextAlign } from '@shared/models/table';

export const columnVideogamesConfigList: ColumnConfig[] = [
  {
    id: 'title',
    label: 'Title',
    sortable: true,
    dataSourceParamName: 'title',
    textAlign: TextAlign.LEFT,
  },
  {
    id: 'genreName',
    label: 'Genre',
    sortable: true,
    dataSourceParamName: 'genreName',
    textAlign: TextAlign.CENTER,
  },
  {
    id: 'tags',
    label: 'Tags',
    sortable: false,
    dataSourceParamName: 'tags',
    hasTags: true,
  },
  {
    id: 'releaseDate',
    label: 'Release date',
    sortable: true,
    dataSourceParamName: 'releaseDate',
    pipe: DatePipe,
    pipeArg: 'd/MM/yyy',
    textAlign: TextAlign.CENTER,
  },
  {
    id: 'price',
    label: 'Price',
    sortable: true,
    dataSourceParamName: 'price',
    pipe: DecimalPipe,
    pipeArg: '1.2',
    suffix: '€',
    textAlign: TextAlign.END,
  },
  {
    id: 'delete',
    label: '',
    sortable: false,
    icon: 'delete',
    callback: undefined,
  },
];
