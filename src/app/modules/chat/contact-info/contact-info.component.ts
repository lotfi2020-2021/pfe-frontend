import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { environment } from 'environments/environment.development';


@Component({
    selector       : 'chat-contact-info',
    templateUrl    : './contact-info.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactInfoComponent
{
    host = environment.apiUrl; 
    @Input() user: any;
    @Input() drawer: MatDrawer;

    /**
     * Constructor
     */
    constructor()
    {
    }
}
