import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';
import { CalenderComponent } from './modules/components/calender/calender.component';
import { UpdateGroupComponent } from './modules/components/update-group/update-group.component';
import { DepartmentDetailsComponent } from './modules/components/department-details/department-details.component';
import { ListDepartmentComponent } from './modules/components/list-department/list-department.component';
import { VideoComponent } from './modules/components/video/video.component';
import { ListDemandeComponent } from './modules/components/list-demande/list-demande.component';
import { ListEntreprisesComponent } from './modules/components/list-entreprises/list-entreprises.component';
import { ChatComponent } from '@fuse/components/chat/chat.component';
import { ListNotificationsComponent } from './modules/components/list-notifications/list-notifications.component';
import { AuthConfirmationRequiredComponent } from './modules/auth/confirmation-required/confirmation-required.component';


// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to '/example'
    {path: '', pathMatch : 'full', redirectTo: '/example'},

    // Redirect signed-in user to the '/example'
    //
    // After the user signs in, the sign-in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'example'},


    {
        path: '',
        canMatch: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            
            {path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.module').then(m => m.AuthConfirmationRequiredModule)},
            {path: 'confirmation-email/:token', loadChildren: () => import('app/modules/auth/confirmation-email/confirmation-email.module').then(m => m.AuthConfirmationEmailModule)},
            {path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule)},
            {path: 'reset-password/:token', loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule)},
            {path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule)},
            {path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.module').then(m => m.AuthSignUpModule)},
           
        ]
    },
    {path: 'calender', component: LayoutComponent, resolve: { initialData: InitialDataResolver,},
   children: [{path: '', component:CalenderComponent},]}  ,
   {path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.module').then(m => m.AuthConfirmationRequiredModule)},
   {path: 'chat', component: LayoutComponent, resolve: { initialData: InitialDataResolver,},
   children: [{path: '', component:ChatComponent},]}  ,
{path: 'list-department',   component: LayoutComponent,resolve: { initialData: InitialDataResolver,},
children: [{path: '', component:ListDepartmentComponent},]} ,

{path: 'update-group/:id',component: LayoutComponent,resolve: { initialData: InitialDataResolver,},
children: [{path: '', component:UpdateGroupComponent},]} , 
{path: 'reset-password/:token', loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule)},
{path: 'department-details/:id',component: LayoutComponent,resolve: {    initialData: InitialDataResolver,},
children: [{path: '', component: DepartmentDetailsComponent},]} ,

{path: 'video',component: LayoutComponent,resolve: {    initialData: InitialDataResolver,},
children: [{path: '', component: VideoComponent},]} , 
{path: 'list-notifications',component: LayoutComponent,resolve: {    initialData: InitialDataResolver,},
children: [{path: '', component: ListNotificationsComponent},]},
{path: 'list-demande',component: LayoutComponent,resolve: {    initialData: InitialDataResolver,},
children: [{path: '', component: ListDemandeComponent},]} 
, 
{path: 'list-entreprises',component: LayoutComponent,resolve: {    initialData: InitialDataResolver,},
children: [{path: '', component: ListEntreprisesComponent},]} 

    // Auth routes for authenticated users
   , {
        path: '',
        canMatch: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule)},
            {path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule)},
      
        ]  
    },

    // Landing routes
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'home', loadChildren: () => import('app/modules/landing/home/home.module').then(m => m.LandingHomeModule)},
            
        ]
    },            {path: 'apps',component: LayoutComponent, children: [
        {path: 'profile', loadChildren: () => import('app/modules/components/profile/profile.module').then(m => m.ProfileModule)},
        {path: 'account', loadChildren: () => import('app/modules/components/settings/settings.module').then(m => m.SettingsModule)},
        {path: 'chat', loadChildren: () => import('app/modules/chat/chat.module').then(m => m.ChatModule)},
    ]},

    // Admin routes
    {
        path: '',
        canMatch: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            {path: 'example', loadChildren: () => import('app/modules/admin/example/example.module').then(m => m.ExampleModule)},
            {path: 'contact', loadChildren: () => import('app/modules/components/contact/contact.module').then(m => m.ContactModule)},
            {path: 'list-users', loadChildren: () => import('app/modules/components/contacts/contacts.module').then(m => m.ContactsModule)},
    
        ]
    }
];
