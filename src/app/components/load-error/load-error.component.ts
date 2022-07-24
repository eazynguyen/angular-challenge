import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-load-error',
  templateUrl: './load-error.component.html',
  styleUrls: ['./load-error.component.scss'],
})
export class LoadErrorComponent implements OnInit {
  @Input() message = '';

  constructor() {}

  ngOnInit(): void {}
}
