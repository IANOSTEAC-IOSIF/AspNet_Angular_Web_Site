import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CatService } from '../services/cat.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css']
})
export class CreatepostComponent  {

    catForm : FormGroup;

  constructor(private fb: FormBuilder, private catService: CatService, private router: Router, private toastr: ToastrService) {
    this.catForm = this.fb.group({
      "description":[''],
      "imageUrl":['',Validators.required]
    })
   }

  create(){
      this.catService.create(this.catForm.value).subscribe(res =>{
        console.log(res);
        this.router.navigate(['cats'])
        this.toastr.success('Succesfuly posted')
      })
  }
  //add by
  get imageUrl(){
    return this.catForm.get('imageUrl');
  }

  get description(){
    return this.catForm.get('description');
  }
 goToCats(){
  if(confirm('Are you sure you want to cancel the post?')){
    this.router.navigate(['cats']);
    this.toastr.info('Post was canceled!');
  }else{
    window.location.reload()
  }
 }

}
