import {Component, EventEmitter, Injectable, Input, OnInit, Output} from '@angular/core';

@Injectable()
export abstract class AbstractSearchComponent {

  @Input() set itemPagination(value: any) {
    // Execute a search only in the page has been changed
    if (value.page !== this._itemPagination.page) {
      this._itemPagination = {...value};
      this.search();
    } else {
      this._itemPagination = {...value};
    }
  }

  // tslint:disable-next-line:variable-name
  _itemPagination: any;

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onSearch = new EventEmitter();

  @Output() tabCols = new EventEmitter();

  protected constructor() {
  }

  abstract search();
  abstract createFormControls();
  abstract createForm();
  abstract initCols();

}

