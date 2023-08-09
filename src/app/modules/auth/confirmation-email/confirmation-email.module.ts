import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FuseCardModule } from '@fuse/components/card';
import { SharedModule } from 'app/shared/shared.module';
import { authConfirmationEmailRoutes } from 'app/modules/auth/confirmation-email/confirmation-email.routing';
import { AuthConfirmationEmailComponent } from 'app/modules/auth/confirmation-email/confirmation-email.component';
@NgModule({
    declarations: [
        AuthConfirmationEmailComponent
    ],
    imports     : [
        RouterModule.forChild(authConfirmationEmailRoutes),
        MatButtonModule,
        FuseCardModule,
        SharedModule
    ]
})
export class AuthConfirmationEmailModule
{
}
