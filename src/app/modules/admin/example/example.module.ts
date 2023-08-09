import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ExampleComponent } from 'app/modules/admin/example/example.component';
import { PushNotificationsService } from 'ng-push-ivy';
import { NgxNotificationMsgModule } from 'ngx-notification-msg';



const exampleRoutes: Route[] = [
    {
        path     : '',
        component: ExampleComponent
    }
];

@NgModule({
    declarations: [
        ExampleComponent
    ],
    imports     : [
        RouterModule.forChild(exampleRoutes),
        NgxNotificationMsgModule
      
    ]
})
export class ExampleModule
{
}
