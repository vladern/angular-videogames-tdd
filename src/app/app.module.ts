import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '@env';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MockModule } from './mock/mock.module';

const mockModule = environment.production ? [] : [MockModule];
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ...mockModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
