import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.Initializer();
  }

  Initializer() {
    //this.storeService.getAuth().subscribe((auth) => {
      //this.userId = auth.user?.Id;
    //});
    
  }

}
