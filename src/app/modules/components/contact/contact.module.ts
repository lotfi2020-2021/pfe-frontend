import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslocoModule } from '@ngneat/transloco';

import { SharedModule } from 'app/shared/shared.module';
import { ContactComponent } from './contact.component';
import { contactRoutes } from './contact.routing';
import { MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { ValidDialog2Component } from './valid-dialog2/valid-dialog2.component';
import { NgxNotificationMsgModule } from 'ngx-notification-msg';



@NgModule({
    declarations: [
        ContactComponent,
        ValidDialog2Component
    ],
    imports     : [
        RouterModule.forChild(contactRoutes),
        MatButtonModule,
        MatButtonToggleModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        MatProgressBarModule,
        MatRippleModule,
        MatSidenavModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        TranslocoModule,
        SharedModule,
        MatDialogModule,
        NgxNotificationMsgModule
     
    ],
    
})
export class ContactModule
{
}
