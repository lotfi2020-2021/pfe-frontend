import { Route } from '@angular/router';
import { AuthConfirmationEmailComponent } from 'app/modules/auth/confirmation-email/confirmation-email.component';
import { AuthConfirmationRequiredComponent } from 'app/modules/auth/confirmation-required/confirmation-required.component';
import { SettingsComponent } from 'app/modules/components/settings/settings.component';

export const settingsRoutes: Route[] = [
    {
        path     : '',
        component: SettingsComponent
    },
 
];
