import { Component, OnInit } from '@angular/core';
import { ZoneService } from './../shared/zone.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-zone-list',
  templateUrl: './zone-list.component.html',
  styleUrls: ['./zone-list.component.scss']
})
export class ZoneListComponent implements OnInit {

  items: Observable<any>

  constructor(private router: Router, private service: ZoneService) { }

  ngOnInit() {
    this.items = this.service.getAll();
  }

  editItem(item: any){
    this.router.navigate(['zones/edit/', item.key]);
  }

  removeItem(item: any){
    this.service.remove(item.key);
  }

}
