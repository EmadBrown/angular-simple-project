import { Component, OnInit, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title = 'Web2_Group_4_Emad_Aman_Ivaylo';

  dashboard = true;

  constructor() { }
  @Output() dashboardEvent = new EventEmitter<boolean>();

  sendData() {
    this.dashboardEvent.emit(this.dashboard)
  }

  ngOnInit() {

  }

}
