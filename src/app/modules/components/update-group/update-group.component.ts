import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from 'app/modules/service/group.service';
import { UserService } from 'app/modules/service/user.service';
import { environment } from 'environments/environment.development';
import { ToastrService } from 'ngx-toastr';
import { Observable, debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs';


@Component({
  selector: 'app-update-group',
  templateUrl: './update-group.component.html',
  styleUrls: ['./update-group.component.css']
})
export class UpdateGroupComponent implements OnInit {
  host = environment.apiUrl;
  group :any ;
  members:any ;
  groupId:any ;
  users :any;
  afterFilter:any
  email :any =''
  allEmails: string[] = [];
  emailCtrl = new FormControl();
  filteredEmails: any;
  groupForm  :FormGroup;
    constructor(private formBuilder: FormBuilder, private router :Router , private toastr :ToastrService,
       private groupService : GroupService , private userService : UserService , private  route :ActivatedRoute , private snackBar :MatSnackBar) {  this.filteredEmails = this.emailCtrl.valueChanges.pipe(
      startWith(null),
      switchMap((email: string | null) => {
        if (email) {
          return this.filterUsers(email);
        } else {
          return this.userService.getUsersWithoutGroup().pipe(map(users => users.map(user => user.email)));
        }
      }),
      map((filteredEmails: string[]) => {
        this.allEmails  =filteredEmails;
        return this._filter(this.emailCtrl.value);
      }),
    ); }
  
  
    
    ngOnInit(): void {
      this.groupId = this.route.snapshot.params['id'];
      this.getGroupById(this.groupId);
      this.getUsersWithoutGroup();
  
      this.groupForm = this.formBuilder.group({
        name: [this.group?.name, Validators.required],
        responsableGroup: [this.group?.responsableGroup, [Validators.required, Validators.email]],
        description: [this.group?.description, Validators.required]
      });
  
  
     this.afterFilter  =  this.filteredEmails = this.emailCtrl.valueChanges.pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(value => {
          return this.filterUsers(value as string);
        }),
      );
      
    }
  
    displayFn(email: string): string {
      return email ? email : '';
    }
    
  
  getGroupById(id:any){
  this.groupService.getGroupById(id).subscribe({
  next :(res:any)=>{
  
  this.group =res ;
  console.log(res +"res")
  this.groupForm.get('name').setValue(this.group.name)
  this.groupForm.get('responsableGroup').setValue(this.group.responsableGroup)
  this.groupForm.get('description').setValue(this.group.description)
  }
  
  })
  }
  
  getUsersWithoutGroup(){
    this.userService.getUsersWithoutGroup().subscribe({
    next :(res:any)=>{
    
    this.users = res
  
    console.log("ffffffffff" + res)
    
    }
    
    })
    }
  
  
    filterUsers(email: string): Observable<string[]> {
      return this.userService.getUsersWithoutGroup().pipe(
        map(users => users.filter(user => user.email.toLowerCase().startsWith(email.toLowerCase()))),
        map(users => users.map(user => user.email)),
      );
    }
  
    
    
    private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();
      return this.allEmails.filter(email => email.toLowerCase().startsWith(filterValue));
    }
  
  
    filterArray() {
      if (Array.isArray(this.filteredEmails)) {
        this.afterFilter = this.filteredEmails.filter(
          (res: any) =>
            res.email
              .toString()
              .toLocaleLowerCase()
              .includes(this.email.trim().toLowerCase())
        );
      } 
    }
  
    updateGroup(){
      const newGroup= this.groupForm.value;
      this.groupService.updateGroup( this.groupId ,newGroup ).subscribe({
        next:(res:any)=>{
         console.log(res);
      this.router.navigate(['/department-details' ,this.group.department.id])
        //  this.snackBar.open('update Group successfully', '', {
        //   duration: 5000,
          
        //   panelClass: 'snackbarstyle-green'
        //   });
        this.toastr.success('update group successfully','Success',  {
          timeOut: 7000});
        
        
        } , 
        error : (err:any)=>{
  
          // this.snackBar.open('failed  ', '', {
          //   duration: 5000,
            
          //   panelClass: 'snackbarstyle-rouge'
          //   });
          this.toastr.error('failed','ERROR',  {
            timeOut: 7000});
          
        }
        }
      
      )}
  
  
  deleteMember(userId:any){
  this.groupService.deleteUserToGroup(userId).subscribe({
    next : (res :any)=>{
  this.getGroupById(this.groupId)
  }
  })
  }
  
  
  addMember(){
    this.groupService.assighUserToGroup(this.groupId ,this.email).subscribe({
      next : (res :any)=>{
        this.email = '';
    this.getGroupById(this.groupId)
    }
    })
    }
  
}
