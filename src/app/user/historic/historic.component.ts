import { Component, OnInit } from '@angular/core';
import { Historic } from 'src/app/model/historic.model';
import { HistoricService } from '../historic.service';

@Component({
  selector: 'app-historic',
  templateUrl: './historic.component.html',
  styleUrls: ['./historic.component.css']
})
export class HistoricComponent implements OnInit {

  historic: Historic[] = [];

  constructor(private historicService: HistoricService) { }

  ngOnInit() {
    this.historicService.findAll().subscribe(historic => this.historic = historic);
  }

}
