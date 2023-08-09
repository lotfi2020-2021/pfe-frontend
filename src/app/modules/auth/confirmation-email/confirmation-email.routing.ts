import { Route } from '@angular/router';
import { AuthConfirmationEmailComponent } from 'app/modules/auth/confirmation-email/confirmation-email.component';

export const authConfirmationEmailRoutes: Route[] = [
    {
        path     : '',
        component: AuthConfirmationEmailComponent
    }
];
