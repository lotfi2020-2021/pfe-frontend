import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FuseAlertModule } from '@fuse/components/alert';
import { SharedModule } from 'app/shared/shared.module';
import { SettingsComponent } from 'app/modules/components/settings/settings.component';
import { SettingsAccountComponent } from 'app/modules/components/settings/account/account.component';
import { SettingsSecurityComponent } from 'app/modules/components/settings/security/security.component';
import { SettingsChangeEmailComponent } from 'app/modules/components/settings/change-email/change-email.component';

import { settingsRoutes } from 'app/modules/components/settings/settings.routing';
import { SettingsTeamComponent } from './team/team.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgxNotificationMsgModule } from 'ngx-notification-msg';


@NgModule({
    declarations: [
        SettingsComponent,
        SettingsAccountComponent,
        SettingsSecurityComponent,
        SettingsChangeEmailComponent,
        SettingsTeamComponent

        
        

    ],
    imports     : [
        RouterModule.forChild(settingsRoutes),
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
        MatSidenavModule,
        MatDatepickerModule,
        MatSlideToggleModule,
        FuseAlertModule,
        SharedModule,
        NgxNotificationMsgModule
    
    ]
})
export class SettingsModule
{
}
