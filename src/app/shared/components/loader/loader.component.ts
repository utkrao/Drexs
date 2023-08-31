import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../core/services';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  isShow: boolean;
  constructor(
    private common: CommonService,
  ) { }

  ngOnInit(): void {
    this.common.loaderEvent.subscribe((response) => {
      this.isShow = response.show;
    })
  }

}
