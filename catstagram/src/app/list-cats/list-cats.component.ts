import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cat } from '../models/Cat';
import { CatService } from '../services/cat.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-list-cats',
  templateUrl: './list-cats.component.html',
  styleUrls: ['./list-cats.component.css']
})
export class ListCatsComponent implements OnInit {
  cats: Array<Cat>
  constructor(private catService: CatService, private router: Router, private toastr: ToastrService, private authService : AuthService) { }

  ngOnInit(): void {
    this.fetchCats()
  }
  fetchCats() {
    this.catService.getCats().subscribe(cats => {
      this.cats = cats;
      console.log(this.cats)
    })
  }
  deleteCat(id: any) {
    if (confirm('Are you sure to delete this post?')) {
      this.catService.deleteCat(id).subscribe(res => {
        console.log(res);
        this.fetchCats();
        this.toastr.error("Deleted succesfully", "Payment Detail Register")
        //for reload the page
        //window.location.reload();
      })
    }
  }
  editCat(id: any){
      this.router.navigate(["cats/" + id + "/edit"])
  }
  logOut(){
    this.authService.deleteToken();
    this.router.navigate(['login']);
  }

}
