import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historic',
  templateUrl: './historic.component.html',
  styleUrls: ['./historic.component.css']
})
export class HistoricComponent implements OnInit {

  historic: any[] = [
    {exam: 'Java SE 8 Programmer I', date: '17/03/2019', time: '01:30:25', percentage: '70%'},
    {exam: 'Java SE 8 Programmer I', date: '18/03/2019', time: '01:50:30', percentage: '80%'},
    {exam: 'Java SE 8 Programmer I', date: '18/03/2019', time: '01:20:10', percentage: '90%'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
