import { Route } from '@angular/router';
import { ContactResolver } from './contact.resolvers';
import { ContactComponent } from './contact.component';



export const contactRoutes: Route[] = [
    {
        path     : '',
        component: ContactComponent,
        
        resolve  : {
            data: ContactResolver
        },
        
    },

];
