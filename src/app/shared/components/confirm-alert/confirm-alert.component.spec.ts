import { Component, NgModule } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ConfirmAlertComponent } from './confirm-alert.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

describe('InformationDialog', () => {
  let dialog: MatDialog;
  let overlayContainerElement: HTMLElement;

  let noop: ComponentFixture<NoopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DialogTestModule],
      providers: [
        {
          provide: OverlayContainer,
          useFactory: () => {
            overlayContainerElement = document.createElement('div');
            return { getContainerElement: () => overlayContainerElement };
          },
        },
      ],
    });

    dialog = TestBed.get(MatDialog);

    noop = TestBed.createComponent(NoopComponent);
  });

  it('shows information', () => {
    const config = {
      width: '250px',
      data: { message: 'Are you sure you want to delete this element?' },
    };
    dialog.open(ConfirmAlertComponent, config);

    noop.detectChanges(); // Updates the dialog in the overlay

    const p = overlayContainerElement.querySelector('p');
    const button = overlayContainerElement.querySelectorAll('button');

    expect(p.textContent).toBe('Are you sure you want to delete this element?');
    expect(button[0].textContent).toBe('Cancel');
    expect(button[1].textContent).toBe('Accept');
  });

  it('on click accept button, dialog should close and emit true value', (done: DoneFn) => {
    const config = {
      width: '250px',
      data: { message: 'Are you sure you want to delete this element?' },
    };
    dialog.open(ConfirmAlertComponent, config).afterClosed().subscribe(res => {
        expect(res).toBeTruthy();
        done();
    });
    noop.detectChanges(); 

    const buttonList = overlayContainerElement.querySelectorAll('button');

    buttonList[1].click();
    noop.detectChanges(); 
  });

  it('on click cancel button, dialog should close and emit void string', (done: DoneFn) => {
    const config = {
      width: '250px',
      data: { message: 'Are you sure you want to delete this element?' },
    };
    dialog.open(ConfirmAlertComponent, config).afterClosed().subscribe(res => {
        expect(res).toEqual('');
        done();
    });
    noop.detectChanges(); 

    const buttonList = overlayContainerElement.querySelectorAll('button');

    buttonList[0].click();
    noop.detectChanges(); 
  });
});

// Noop component is only a workaround to trigger change detection
@Component({
  template: '',
})
class NoopComponent {}

const TEST_DIRECTIVES = [ConfirmAlertComponent, NoopComponent];

@NgModule({
  imports: [MatDialogModule, NoopAnimationsModule],
  exports: TEST_DIRECTIVES,
  declarations: TEST_DIRECTIVES,
  entryComponents: [ConfirmAlertComponent],
})
class DialogTestModule {}
