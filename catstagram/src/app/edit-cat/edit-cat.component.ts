import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cat } from '../models/Cat';
import { CatService } from '../services/cat.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-cat',
  templateUrl: './edit-cat.component.html',
  styleUrls: ['./edit-cat.component.css']
})
export class EditCatComponent implements OnInit {
  cat: Cat;
  catForm:FormGroup;
  catId: string;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private catService: CatService,
    private router: Router,
    private toastr: ToastrService) {
      this.catForm = this.fb.group({
        'id':[''],
        'description':[''],
        'imageUrl':['this.cat.imageUrl']
      })
     }

  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      this.catId = params['id'];
      this.catService.getCat(this.catId).subscribe(res =>{
        this.cat = res;
        this.catForm = this.fb.group({
          'id':[this.cat.id],
          'description':[this.cat.description],
          'imageUrl':[this.cat.imageUrl]
        })
      })
    })

  }
  editCat(){
    this.catService.updateCat(this.catForm.value).subscribe(res =>{
      this.router.navigate(['cats']);
      this.toastr.info('update successfuly')
    });
  }

}
