import { CommonModule, CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { TextAlign } from '@shared/models/table';
import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    const material = [MatIconModule, MatButtonModule, MatChipsModule];
    await TestBed.configureTestingModule({
      declarations: [TableComponent],
      imports: [CommonModule, ...material],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a table element', () => {
    const htmlElement: HTMLElement = fixture.nativeElement;
    const table = htmlElement.querySelector('table');
    expect(table).toBeTruthy();
  });

  it('should contain a tr element into the table', () => {
    const htmlElement: HTMLElement = fixture.nativeElement;
    const table = htmlElement.querySelector('table');
    const tr = table.querySelector('tr');
    expect(tr).toBeTruthy();
  });

  it('should contain a th element into the tr element', () => {
    component.columnConfigList.push({
      label: 'Company',
      sortable: true,
      dataSourceParamName: 'company',
    });
    component.dataSource.push({ label: 'Company' });
    fixture.detectChanges();
    const htmlElement: HTMLElement = fixture.nativeElement;
    const table = htmlElement.querySelector('table');
    const tr = table.querySelector('tr');
    const th = tr.querySelector('th');
    expect(th).toBeTruthy();
  });

  it('should contain a td element into the second tr element', () => {
    component.columnConfigList.push({
      label: 'Company',
      sortable: true,
      dataSourceParamName: 'company',
    });
    component.dataSource.push({ label: 'Sony music' });
    fixture.detectChanges();
    const htmlElement: HTMLElement = fixture.nativeElement;
    const table = htmlElement.querySelector('table');
    const tr = table.querySelectorAll('tr');
    const th = tr.item(1).querySelector('td');
    expect(th).toBeTruthy();
  });

  it('component should have headerList', () => {
    expect(Array.isArray(component.columnConfigList)).toBeTruthy();
  });

  it('headerList should contain label an sortable params', () => {
    component.columnConfigList.push({
      label: 'Company',
      sortable: true,
      dataSourceParamName: 'company',
    });
    expect(Array.isArray(component.columnConfigList)).toBeTruthy();
    const isString =
      Object.prototype.toString.call(component.columnConfigList[0].label) ===
      '[object String]';
    expect(isString).toBeTruthy();
    expect(
      component.columnConfigList[0].sortable === true ||
        component.columnConfigList[0].sortable === false
    ).toBeTruthy();
  });

  it('first column header should be `Company`', () => {
    component.columnConfigList.push({
      label: 'Company',
      sortable: true,
      dataSourceParamName: 'company',
    });
    fixture.detectChanges();
    const htmlElement: HTMLElement = fixture.nativeElement;
    const table = htmlElement.querySelector('table');
    const tr = table.querySelector('tr');
    const th = tr.querySelector('th');
    expect(th.textContent).toEqual('Company');
  });

  it('first column header should be `Player`', () => {
    component.columnConfigList.push({
      label: 'Player',
      sortable: true,
      dataSourceParamName: 'company',
    });
    fixture.detectChanges();
    const htmlElement: HTMLElement = fixture.nativeElement;
    const table = htmlElement.querySelector('table');
    const tr = table.querySelector('tr');
    const th = tr.querySelector('th');
    expect(th.textContent).toEqual('Player');
  });

  it('component should have rowList', () => {
    expect(Array.isArray(component.dataSource)).toBeTruthy();
  });

  it('rowList should contain label param', () => {
    component.dataSource.push({ label: 'Sony Music' });
    const isString =
      Object.prototype.toString.call(component.dataSource[0].label) ===
      '[object String]';
    expect(isString).toBeTruthy();
  });

  it('first column content should be `Sony Music`', () => {
    component.columnConfigList.push({
      label: 'Company',
      sortable: true,
      dataSourceParamName: 'label',
    });
    component.dataSource.push({ label: 'Sony Music' });
    fixture.detectChanges();
    const htmlElement: HTMLElement = fixture.nativeElement;
    const table = htmlElement.querySelector('table');
    const tr = table.querySelectorAll('tr');
    const td = tr[1].querySelector('td');
    expect(td.textContent).toEqual('Sony Music');
  });

  it('header should be `Company` and data `Sony Music`', () => {
    component.columnConfigList.push({
      label: 'Company',
      sortable: true,
      dataSourceParamName: 'company',
    });
    component.dataSource.push({ company: 'Sony Music' });
    fixture.detectChanges();
    const htmlElement: HTMLElement = fixture.nativeElement;
    const table = htmlElement.querySelector('table');
    const tr = table.querySelectorAll('tr');
    const th = tr[0].querySelector('th');
    const td = tr[1].querySelector('td');
    expect(th.textContent).toEqual('Company');
    expect(td.textContent).toEqual('Sony Music');
  });

  it('header should be `Song` and data `Oh mama`', () => {
    component.columnConfigList.push(
      {
        label: 'Company',
        sortable: true,
        dataSourceParamName: 'company',
      },
      {
        label: 'Song',
        sortable: true,
        dataSourceParamName: 'song',
      }
    );
    component.dataSource.push({ company: 'Sony Music', song: 'Oh mama' });
    fixture.detectChanges();
    const htmlElement: HTMLElement = fixture.nativeElement;
    const table = htmlElement.querySelector('table');
    const tr = table.querySelectorAll('tr');
    const th = tr[0].querySelectorAll('th')[1];
    const td = tr[1].querySelectorAll('td')[1];
    expect(th.textContent).toEqual('Song');
    expect(td.textContent).toEqual('Oh mama');
  });

  it('header should be `Company` and data with no data', () => {
    component.columnConfigList.push({
      label: 'Company',
      sortable: true,
      dataSourceParamName: 'company',
    });
    component.dataSource.push({ company: 'Sony Music', song: 'Oh mama' });
    fixture.detectChanges();
    const htmlElement: HTMLElement = fixture.nativeElement;
    const table = htmlElement.querySelector('table');
    const tr = table.querySelectorAll('tr');
    const th = tr[0].querySelectorAll('th')[0];
    expect(th.textContent).toEqual('Company');
  });

  it('header should has two triangles when column is sortable', () => {
    component.columnConfigList.push({
      label: 'Company',
      sortable: true,
      dataSourceParamName: 'company',
    });
    component.dataSource.push({ company: 'Sony Music', song: 'Oh mama' });
    fixture.detectChanges();
    const htmlElement: HTMLElement = fixture.nativeElement;
    const table = htmlElement.querySelector('table');
    const tr = table.querySelectorAll('tr');
    const th = tr[0].querySelectorAll('th')[0];
    const arrowUp = th.querySelector('.arrow-up');
    const arrowDown = th.querySelector('.arrow-down');
    expect(arrowUp).toBeTruthy();
    expect(arrowDown).toBeTruthy();
  });

  it('header should not has two triangles when column is not sortable', () => {
    component.columnConfigList.push({
      label: 'Company',
      sortable: false,
      dataSourceParamName: 'company',
    });
    component.dataSource.push({ company: 'Sony Music', song: 'Oh mama' });
    fixture.detectChanges();
    const htmlElement: HTMLElement = fixture.nativeElement;
    const table = htmlElement.querySelector('table');
    const tr = table.querySelectorAll('tr');
    const th = tr[0].querySelectorAll('th')[0];
    const arrowUp = th.querySelector('.arrow-up');
    const arrowDown = th.querySelector('.arrow-down');
    expect(arrowUp).toBeNull();
    expect(arrowDown).toBeNull();
  });

  it('on click on sort triangles (first time) row-down should be hidden', async () => {
    component.columnConfigList.push({
      label: 'Company',
      sortable: true,
      dataSourceParamName: 'company',
    });
    component.dataSource.push({ company: 'Sony Music', song: 'Oh mama' });
    fixture.detectChanges();
    const htmlElement: HTMLElement = fixture.nativeElement;
    const table = htmlElement.querySelector('table');
    const tr = table.querySelectorAll('tr');
    const th = tr[0].querySelectorAll('th')[0];

    let sortContainer = fixture.debugElement.nativeElement.querySelector('.sort-container');
    sortContainer.click();
    fixture.detectChanges();

    const arrowUp = th.querySelector('.arrow-up');
    const arrowDown = th.querySelector('.arrow-down');

    expect(arrowUp).toBeDefined();
    expect(arrowDown).toBeNull();
  });

  it('on click on sort triangles (second time) row-up should be hidden and show row-down', async () => {
    component.columnConfigList.push({
      label: 'Company',
      sortable: true,
      dataSourceParamName: 'company',
    });
    component.dataSource.push({ company: 'Sony Music', song: 'Oh mama' });
    fixture.detectChanges();
    const htmlElement: HTMLElement = fixture.nativeElement;
    const table = htmlElement.querySelector('table');
    const tr = table.querySelectorAll('tr');
    const th = tr[0].querySelectorAll('th')[0];

    let sortContainer = fixture.debugElement.nativeElement.querySelector(
      '.sort-container'
    );
    sortContainer.click();
    fixture.detectChanges();
    sortContainer.click();
    fixture.detectChanges();

    const arrowDown = th.querySelector('.arrow-down');
    const arrowUp = th.querySelector('.arrow-up');

    expect(arrowUp).toBeNull();
    expect(arrowDown).toBeDefined();
  });

  it('on click on sort triangles (firs time) company dataSource should be ordered ascendingly', async () => {
    component.columnConfigList.push({
      label: 'Company',
      sortable: true,
      dataSourceParamName: 'company',
    });
    component.dataSource.push({ company: 'B' }, { company: 'A' });
    fixture.detectChanges();
    const htmlElement: HTMLElement = fixture.nativeElement;
    const table = htmlElement.querySelector('table');
    const tr = table.querySelectorAll('tr');
    const th = tr[0].querySelectorAll('th')[0];

    let sortContainer = fixture.debugElement.nativeElement.querySelector(
      '.sort-container'
    );
    sortContainer.click();
    fixture.detectChanges();

    expect(component.dataSource[0].company).toEqual('A');
    expect(component.dataSource[1].company).toEqual('B');
  });

  it('on click on sort triangles (second time) company dataSource should be ordered descendingly', async () => {
    component.columnConfigList.push({
      label: 'Company',
      sortable: true,
      dataSourceParamName: 'company',
    });
    component.dataSource.push(
      { company: 'BBB' },
      { company: 'CCC' },
      { company: 'DDD' },
      { company: 'CCC' },
      { company: 'AAA' }
    );
    fixture.detectChanges();

    let sortContainer = fixture.debugElement.nativeElement.querySelector(
      '.sort-container'
    );
    sortContainer.click();
    fixture.detectChanges();
    sortContainer.click();
    fixture.detectChanges();

    expect(component.dataSource[0].company).toEqual('DDD');
    expect(component.dataSource[1].company).toEqual('CCC');
    expect(component.dataSource[2].company).toEqual('CCC');
    expect(component.dataSource[3].company).toEqual('BBB');
    expect(component.dataSource[4].company).toEqual('AAA');
  });

  it('on click on sort triangles (third time) company dataSource should be ordered descendingly', async () => {
    component.columnConfigList.push({
      label: 'Company',
      sortable: true,
      dataSourceParamName: 'company',
    });
    component.dataSource.push(
      { company: 'BBB' },
      { company: 'CCC' },
      { company: 'DDD' },
      { company: 'CCC' },
      { company: 'AAA' }
    );
    fixture.detectChanges();

    let sortContainer = fixture.debugElement.nativeElement.querySelector(
      '.sort-container'
    );
    sortContainer.click();
    fixture.detectChanges();
    sortContainer.click();
    fixture.detectChanges();
    sortContainer.click();
    fixture.detectChanges();

    expect(component.dataSource[4].company).toEqual('DDD');
    expect(component.dataSource[3].company).toEqual('CCC');
    expect(component.dataSource[2].company).toEqual('CCC');
    expect(component.dataSource[1].company).toEqual('BBB');
    expect(component.dataSource[0].company).toEqual('AAA');
  });

  it('first column content should be `17/09/2020`', () => {
    const realeaseDate = new Date();
    realeaseDate.setFullYear(2020, 8, 17);
    component.columnConfigList.push({
      label: 'Realise date',
      sortable: true,
      dataSourceParamName: 'date',
      pipe: DatePipe,
      pipeArg: 'd/MM/yyy',
    });
    component.dataSource.push({ date: realeaseDate });
    fixture.detectChanges();
    const htmlElement: HTMLElement = fixture.nativeElement;
    const table = htmlElement.querySelector('table');
    const tr = table.querySelectorAll('tr');
    const td = tr[1].querySelector('td');
    expect(td.textContent).toEqual('17/09/2020');
  });

  it('first column content should be `15.00€`', () => {
    component.columnConfigList.push({
      label: 'Price',
      sortable: true,
      dataSourceParamName: 'price',
      pipe: DecimalPipe,
      pipeArg: '1.2',
      suffix: '€',
    });
    component.dataSource.push({ price: 15 });
    fixture.detectChanges();
    const htmlElement: HTMLElement = fixture.nativeElement;
    const table = htmlElement.querySelector('table');
    const tr = table.querySelectorAll('tr');
    const td = tr[1].querySelector('td');
    expect(td.textContent).toEqual('15.00€');
  });

  it('on click button callback should be triggered', () => {
    let callBackHasBeenCalled = false;
    component.columnConfigList.push(
      {
        label: 'Price',
        sortable: true,
        dataSourceParamName: 'price',
        pipe: DecimalPipe,
        pipeArg: '1.2',
        suffix: '€',
      },
      {
        label: '',
        sortable: false,
        icon: 'delete',
        callback: () => {
          callBackHasBeenCalled = true;
        },
      }
    );
    component.dataSource.push({ price: 15 });
    fixture.detectChanges();
    const htmlElement: HTMLElement = fixture.nativeElement;
    const table = htmlElement.querySelector('table');
    const tr = table.querySelectorAll('tr');
    const td = tr[1].querySelectorAll('td');
    const button = td[1].querySelector('button');
    button.click();
    fixture.detectChanges();
    expect(callBackHasBeenCalled).toBeTrue();
  });

  it('button should have delete icon', () => {
    component.columnConfigList.push(
      {
        label: 'Price',
        sortable: true,
        dataSourceParamName: 'price',
        pipe: DecimalPipe,
        pipeArg: '1.2',
        suffix: '€',
      },
      {
        label: '',
        sortable: false,
        icon: 'delete',
        callback: () => {},
      }
    );
    component.dataSource.push({ price: 15 });
    fixture.detectChanges();
    const htmlElement: HTMLElement = fixture.nativeElement;
    const table = htmlElement.querySelector('table');
    const tr = table.querySelectorAll('tr');
    const td = tr[1].querySelectorAll('td');
    const button = td[1].querySelector('button');
    button.querySelector('mat-icon');
    expect(button.textContent).toEqual('delete');
  });

  it('table should admit tags ', () => {
    component.columnConfigList.push(
      {
        label: 'Tags',
        sortable: false,
        dataSourceParamName: 'tags',
        hasTags: true,
      }
    );
    component.dataSource.push({ tags: ['Action', 'Roguelige'] });
    fixture.detectChanges();
    const htmlElement: HTMLElement = fixture.nativeElement;
    const table = htmlElement.querySelector('table');
    const tr = table.querySelectorAll('tr');
    const td = tr[1].querySelector('td');
    const matChipList = td.querySelectorAll('mat-chip');
    expect(matChipList[0].textContent).toEqual('Action');
    expect(matChipList[1].textContent).toEqual('Roguelige');
  });

  it('when you sort by two columns first column sort should be return to initial state', async () => {
    component.columnConfigList.push({
      label: 'Company',
      sortable: true,
      dataSourceParamName: 'company',
    },
    {
      label: 'Company',
      sortable: true,
      dataSourceParamName: 'company',
    });
    component.dataSource.push(
      { company: 'BBB' },
      { company: 'BBB' },
    );
    fixture.detectChanges();

    let sortContainerList = fixture.debugElement.nativeElement.querySelectorAll('.sort-container');
    let firtstArrowUp = sortContainerList[0].querySelector('.arrow-up');
    let firtstArrowDown = sortContainerList[0].querySelector('.arrow-down');
    let secondArrowUp = sortContainerList[1].querySelector('.arrow-up');
    let secondArrowDown = sortContainerList[1].querySelector('.arrow-down');
    expect(firtstArrowUp).toBeTruthy();
    expect(firtstArrowDown).toBeTruthy();
    expect(secondArrowUp).toBeTruthy();
    expect(secondArrowDown).toBeTruthy();

    sortContainerList[0].click();
    fixture.detectChanges();

    firtstArrowDown = sortContainerList[0].querySelector('.arrow-down');
    expect(firtstArrowDown).toBeFalsy();

    sortContainerList[0].click();
    fixture.detectChanges();

    firtstArrowUp = sortContainerList[0].querySelector('.arrow-up');
    firtstArrowDown = sortContainerList[0].querySelector('.arrow-down');
    expect(firtstArrowDown).toBeTruthy();
    expect(firtstArrowUp).toBeFalsy();

    sortContainerList[1].click();
    fixture.detectChanges();

    secondArrowUp = sortContainerList[1].querySelector('.arrow-up');
    secondArrowDown = sortContainerList[1].querySelector('.arrow-down');
    firtstArrowUp = sortContainerList[0].querySelector('.arrow-up');
    firtstArrowDown = sortContainerList[0].querySelector('.arrow-down');
    expect(secondArrowUp).toBeTruthy('secondArrowUp');
    expect(secondArrowDown).toBeFalsy('secondArrowDown');
    expect(firtstArrowUp).toBeTruthy('firtstArrowUp');
    expect(firtstArrowDown).toBeTruthy('firtstArrowDown');
  });

  it('table should admit tags ', () => {
    component.columnConfigList.push(
      {
        label: 'Price',
        sortable: false,
        dataSourceParamName: 'price',
        hasTags: false,
        textAlign: TextAlign.END,
        pipe: DecimalPipe,
        pipeArg: '1.2',
        suffix: '€',
      }
    );
    component.dataSource.push({ price: 15 });
    fixture.detectChanges();
    const htmlElement: HTMLElement = fixture.nativeElement;
    const table = htmlElement.querySelector('table');
    const tr = table.querySelectorAll('tr');
    const td = tr[1].querySelector('td');
    expect(td.className).toEqual('textAlignEnd');
  });

  it('table should admit tags ', () => {
    component.columnConfigList.push(
      {
        label: 'Price',
        sortable: false,
        dataSourceParamName: 'price',
        hasTags: false,
        textAlign: TextAlign.CENTER,
        pipe: DecimalPipe,
        pipeArg: '1.2',
        suffix: '€',
      }
    );
    component.dataSource.push({ price: 15 });
    fixture.detectChanges();
    const htmlElement: HTMLElement = fixture.nativeElement;
    const table = htmlElement.querySelector('table');
    const tr = table.querySelectorAll('tr');
    const td = tr[1].querySelector('td');
    expect(td.className).toEqual('textAlignCenter');
  });

  it('table should admit tags ', () => {
    component.columnConfigList.push(
      {
        label: 'Price',
        sortable: false,
        dataSourceParamName: 'price',
        hasTags: false,
        textAlign: TextAlign.LEFT,
        pipe: DecimalPipe,
        pipeArg: '1.2',
        suffix: '€',
      }
    );
    component.dataSource.push({ price: 15 });
    fixture.detectChanges();
    const htmlElement: HTMLElement = fixture.nativeElement;
    const table = htmlElement.querySelector('table');
    const tr = table.querySelectorAll('tr');
    const td = tr[1].querySelector('td');
    expect(td.className).toEqual('textAlignLeft');
  });
});
