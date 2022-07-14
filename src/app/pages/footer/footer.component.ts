import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StoreService } from 'src/app/services/store.service';
import { ProfileDialogComponent } from '../users/profile-dialog/profile-dialog.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  user: any;

  constructor(private storeService: StoreService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.Initializer();
  }

  Initializer() {
    this.storeService.getAuth().subscribe((auth) => {
      this.user = auth.user;
    });
  }

  openProfileDialog(){
    const dialogRef = this.dialog.open(ProfileDialogComponent, {
        height: '400px',
        width: '600px',
      });
      dialogRef.afterClosed().subscribe((result) => {
       return;
      });
    }

}
