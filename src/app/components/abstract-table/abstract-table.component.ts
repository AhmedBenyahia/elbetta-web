import {Component, Injectable, OnInit} from '@angular/core';
import {PaginationModel} from '../../_models/pagination.model';

@Injectable()
export abstract class AbstractTableComponent implements OnInit {

  itemPagination = new PaginationModel();
  dateFormat = 'dd/MM/yyyy';
  currencyCode = 'DTN';
  cols: { field: string, header: string, date: boolean, currency: boolean, hasSubField?: boolean, link?: boolean, subfield?: string, img?: boolean, recursive?: boolean, groupRow?: boolean}[];


  // Boolean
  showBefore = false;
  showAfter = false;

  // Other
  pageCursor = 0;
  Arr = Array;

  protected constructor() { }

  ngOnInit() {
    this.itemPagination = new PaginationModel();
  }

  /** show or not page number in pagintation. */
  shouldShowPageNumber(page) {
    this.pageCursor = page;
    return page === 0 || (page - this.itemPagination.page > -3 && page - this.itemPagination.page < 3) ||
        this.itemPagination.totalPages - page < 2;
  }

  /**  show after ...u */
  showAfterPonctuation(page) {
    if (!this.showAfter) {
      if (this.itemPagination.page - page < -3 && page !== this.itemPagination.totalPages) {
        this.showAfter = true;
        return true;
      }
    } else {
      return false;
    }
  }

  /**  Before ... */
  showBeforePonctuation(page) {
    if (!this.showBefore) {
      if (this.itemPagination.page - page > 2 && page !== 0) {
        this.showBefore = true;
        return true;
      }
    } else {
      return false;
    }
  }

  /** get next page. */
  next() {
    if (this.itemPagination.page >= this.itemPagination.totalPages - 1) {
      return;
    }
    this.itemPagination.page++;
    this.updatePagination();
  }

  /** get previous page. */
  previous() {
    if (this.itemPagination.page <= 0) {
      return;
    }
    this.itemPagination.page--;
    this.updatePagination();
  }

  /** get specific page. */
  getPage(page) {
    if (this.itemPagination.page === page) {
      this.showBefore = false;
      this.showAfter = false;
      return;
    }
    this.itemPagination.page = page;
    this.updatePagination();
  }

  /**
   * find value in object.
   * @param object
   * @param key
   */
  findVal(object, key) {
    const keys = key.split('.');
    let obj = object;
    keys.forEach((k) => {
      if (obj) {
        obj = obj[k];
      } else {
        obj = null;
      }
    });
    return obj;
  }

  itemClicked(item) {}

  abstract updatePagination();

}
