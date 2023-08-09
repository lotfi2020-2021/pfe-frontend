import { NgModule, CUSTOM_ELEMENTS_SCHEMA ,NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { FuseModule } from '@fuse';

import { FuseConfigModule } from '@fuse/services/config';
import { FuseMockApiModule } from '@fuse/lib/mock-api';
import { CoreModule } from 'app/core/core.module';
import { appConfig } from 'app/core/config/app.config';
import { mockApiServices } from 'app/mock-api';
import { LayoutModule } from 'app/layout/layout.module';
import { AppComponent } from 'app/app.component';
import { appRoutes } from 'app/app.routing';
import { CalenderComponent } from './modules/components/calender/calender.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import {NgxNotificationMsgModule} from 'ngx-notification-msg';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { FuseCardModule } from '@fuse/components/card';
import { SharedModule } from './shared/shared.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PhotoUploadComponent } from './modules/components/photo-upload/photo-upload.component';
import {  MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';


import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';

import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatRippleModule, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatAutocompleteModule} from'@angular/material/autocomplete';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UpdateGroupComponent } from './modules/components/update-group/update-group.component';
import { GroupDetailsComponent } from './modules/components/group-details/group-details.component';
import { ConfirmDialogGroupComponent } from './modules/components/confirm-dialog-group/confirm-dialog-group.component';
import { ConfirmDialogDepartmentComponent } from './modules/components/confirm-dialog-department/confirm-dialog-department.component';
import { UpdateDepartmentComponent } from './modules/components/update-department/update-department.component';
import { DepartmentDetailsComponent } from './modules/components/department-details/department-details.component';
import { AddDepartmentComponent } from './modules/components/add-department/add-department.component';
import { ListDepartmentComponent } from './modules/components/list-department/list-department.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComfirmDialogAgendaComponent } from './modules/components/confirm-dialog-agenda/confirm-dialog-agenda.component';
import { UpdateEventComponent } from './modules/components/update-event/update-event.component';
import { EventDetailsComponent } from './modules/components/event-details/event-details.component';
import { AddEventComponent } from './modules/components/add-event/add-event.component';
import { AddAgendaComponent } from './modules/components/add-agenda/add-agenda.component';
import { UpdateAgendaComponent } from './modules/components/update-agenda/update-agenda.component';
import { AgendaDetailsComponent } from './modules/components/agenda-details/agenda-details.component';
import { VideoComponent } from './modules/components/video/video.component';
import { DemandeEntrepriseComponent } from './modules/components/demande-entreprise/demande-entreprise.component';
import { ListDemandeComponent } from './modules/components/list-demande/list-demande.component';
import { DemandeDetailsComponent } from './modules/components/demande-details/demande-details.component';
import { ConfirmDialogDemandeComponent } from './modules/components/confirm-dialog-demande/confirm-dialog-demande.component';
import { ValidationDialogComponent } from './modules/components/validation-dialog/validation-dialog.component';
import { ListEntreprisesComponent } from './modules/components/list-entreprises/list-entreprises.component';
import { ListNotificationsComponent } from './modules/components/list-notifications/list-notifications.component';
import { ConfirmDialogNotificationComponent } from './modules/components/confirm-dialog-notification/confirm-dialog-notification.component';
import { NotificationDetailsComponent } from './modules/components/notification-details/notification-details.component';
import { UpdateNotificationComponent } from './modules/components/update-notification/update-notification.component';
import { AddNotificationComponent } from './modules/components/add-notification/add-notification.component';
import { NotificationBellInfoComponent } from './modules/components/notification-bell-info/notification-bell-info.component';
import { UserDetailsComponent } from './modules/components/user-details/user-details.component';
import { FuseAlertModule } from '@fuse/components/alert';
import { ConfirmDialogUserComponent } from './modules/components/confirm-dialog-user/confirm-dialog-user.component';
import { ToastrModule, provideToastr } from 'ngx-toastr';








const routerConfig: ExtraOptions = {
    preloadingStrategy       : PreloadAllModules,
    scrollPositionRestoration: 'enabled'
};

@NgModule({
    declarations: [
        AppComponent,
        CalenderComponent,
        PhotoUploadComponent,
        ListDepartmentComponent,
        AddDepartmentComponent,
        DepartmentDetailsComponent,
        UpdateDepartmentComponent,
        ConfirmDialogDepartmentComponent,
        ConfirmDialogGroupComponent,
        GroupDetailsComponent,
        UpdateGroupComponent,
        ComfirmDialogAgendaComponent,
        AgendaDetailsComponent,
        AddAgendaComponent,
        UpdateAgendaComponent,
        AddEventComponent,
        EventDetailsComponent,
        UpdateEventComponent,
        VideoComponent,
        DemandeEntrepriseComponent,
        ListDemandeComponent,
        DemandeDetailsComponent,
        ConfirmDialogDemandeComponent,
        ValidationDialogComponent,
        ListEntreprisesComponent,
        ListNotificationsComponent,
        ConfirmDialogNotificationComponent,
        NotificationDetailsComponent,
        UpdateNotificationComponent,
        AddNotificationComponent,
        NotificationBellInfoComponent,
        UserDetailsComponent,
        ConfirmDialogUserComponent
       
      
    
    ],
    imports     : [
        ToastrModule.forRoot(),
        NoopAnimationsModule,
        FuseAlertModule, 
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
		ReactiveFormsModule,
        RouterModule.forRoot(appRoutes, routerConfig),
        FullCalendarModule,
        NgxNotificationMsgModule,
        
        // Fuse, FuseConfig & FuseMockAPI
        FuseModule,
        FuseConfigModule.forRoot(appConfig),
        FuseMockApiModule.forRoot(mockApiServices),
        MatButtonModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatTooltipModule,
        
        FuseCardModule,
        SharedModule,
        MatToolbarModule,
		MatCardModule,
		MatProgressBarModule,
		MatProgressSpinnerModule,
		MatListModule,
		MatChipsModule,
		MatCheckboxModule,
		MatBadgeModule,
		MatDialogModule,
		MatSnackBarModule,
		MatRippleModule,
		MatTabsModule,
		MatSelectModule,
		MatRadioModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatSidenavModule,
		MatTableModule,
		MatPaginatorModule,
		MatAutocompleteModule,
        
        
        
      
        // Core module of your application
        CoreModule,
      
        // Layout module of your application
        LayoutModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
    bootstrap   : [
        AppComponent
    ], 
    providers: [
        provideAnimations(), // required animations providers
        provideToastr(),]
})
export class AppModule
{
}
