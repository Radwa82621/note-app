import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-navbra',
  templateUrl: './navbra.component.html',
  styleUrls: ['./navbra.component.css']
})
export class NavbraComponent {
menuName:string="login"
constructor(private _Router:Router){
  this._Router.events.subscribe({
    
    next:(res)=>{if(res instanceof NavigationEnd){                                                                                                          
      this.menuName=this._Router.url.replace("/"," ")
      

    }
    }
  })
}
}
