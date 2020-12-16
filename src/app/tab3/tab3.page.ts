import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor() {}

  Anna = {
    active: true, 
    Name: "Anna",
    Alter: 18,
    Gender: "F"
  }
  Nina = {
    active: true, 
    Name: "Nina",
    Alter: 18,
    Gender: "F"
  }
  Max = {
    active: true, 
    Name: "Max",
    Alter: 18,
    Gender: "M"
  }
  Matches = [
    this.Anna, this.Nina, this.Max
];




}
