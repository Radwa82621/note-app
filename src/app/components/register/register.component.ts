import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  implements OnInit{
  registerForm!:FormGroup
  hide = true;
  constructor(private _fb:FormBuilder ,
    private _AuthService:AuthService,
    private _router:Router,
    private _ToastrService:ToastrService){

  }
  ngOnInit(): void {
this.createForm()  }
createForm(){


  this.registerForm=this._fb.group({
    email :['', [Validators.required, Validators.email]],
    name :['', [Validators.required, Validators.maxLength(10)]],
    phone :['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/gm)]],
    age :['', [Validators.required, Validators.max(100)]],
    password :['', [Validators.required]],

  })
}
 
  get email():any{
    return this.registerForm.get('email')
  }
  get name():any{
    return this.registerForm.get('name')
  }  get phone():any{
    return this.registerForm.get('phone')
  }  get age():any{
    return this.registerForm.get('age')
  }  get password():any{
    return this.registerForm.get('password')
  }




register(){
if(this.registerForm.valid){
  console.log(this.registerForm.value);
  this._AuthService.register(this.registerForm.value).subscribe({
    next:(res)=>{console.log(res);
        this._router.navigate(["/login"])
     
    },
    error:(err)=>{console.log(err);
      this._ToastrService.warning(err.error.msg,"error")


    },
  })

}
}

}
