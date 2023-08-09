import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InitialDataResolver } from 'app/app.resolvers';
import { Location } from '@angular/common';
@Component({
    selector     : 'landing-home',
    templateUrl  : './home.component.html',
    encapsulation: ViewEncapsulation.None
})
export class LandingHomeComponent
{
    constructor(
        private router: Router,
        private route: ActivatedRoute ,
       private initialDataResolver :InitialDataResolver,
       private location: Location
      ) {
        console.log('Component Constructor');
        console.log(route.snapshot.data.test); //初次進入此路由時取得的data
      }
    
      ngOnInit() {
      }
    
      reloadResolve(): void {
        window.location.replace('/example')
        

       
      }

    //   reloadResolve() {
    //     // 調整導引狀態為尚未導引
    //     this.router.navigated = true;
    
    //     // 重新導引到目前路由
    //     this.router.navigate(['example']).then(() => {
    //         this.initialDataResolver.resolve();
    //     // window.location.reload();
    //     });
    //   }

    
}
