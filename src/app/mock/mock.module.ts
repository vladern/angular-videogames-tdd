import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpMockApiInterceptor } from './http-mock-api.interceptor';
import { CoreModule } from '@core/core.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoreModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpMockApiInterceptor,
      multi: true
    }
  ]
})
export class MockModule { }
