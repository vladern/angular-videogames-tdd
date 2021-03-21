import { DatePipe, DecimalPipe } from '@angular/common';
import { ColumnConfig } from '@shared/models/table';

export const columnVideogamesConfigList: ColumnConfig[] = [
  {
    id: 'title',
    label: 'Title',
    sortable: true,
    dataSourceParamName: 'title',
  },
  {
    id: 'genreName',
    label: 'Genre',
    sortable: true,
    dataSourceParamName: 'genreName',
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
  },
  {
    id: 'price',
    label: 'Price',
    sortable: true,
    dataSourceParamName: 'price',
    pipe: DecimalPipe,
    pipeArg: '1.2',
    suffix: '€',
  },
  {
    id: 'delete',
    label: '',
    sortable: false,
    icon: 'delete',
    callback: undefined,
  },
];
