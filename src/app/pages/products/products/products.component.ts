import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { IProduct } from '../../../interfaces/product';
import {
  BehaviorSubject,
  catchError,
  debounceTime,
  finalize,
  Observable,
  of,
  Subject,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs';
import { ProductsService } from '../../../services/products.service';
import { FormControl } from '@angular/forms';
import { ILoadingStatus } from '../../../interfaces/loading-status';
import { AlertDirective } from '../../../directives/alert.directive';
import { ProductDeleteComponent } from '../product-delete/product-delete.component';
import { IPagination } from '../../../interfaces/response';
import { AlertService } from '../../../services/-alert.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PAGE_LIMIT } from '../../../utils/constant';
import {UserListStore} from "../../users/users/users-store.store";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent implements OnInit, OnDestroy {
  @ViewChild(AlertDirective) showDialogDelete!: AlertDirective;

  private subject$ = new Subject();
  private state$ = new BehaviorSubject<ProductState>({
    products: [],
    isLoading: ILoadingStatus.Idle,
    pagination: null as any,
  });
  vm$: Observable<ProductState> = this.state$.asObservable();

  query = new FormControl('');

  constructor(
    private productsService: ProductsService,
    private alertService: AlertService,
  ) {}

  ngOnInit(): void {
    this.getProducts();

    this.query.valueChanges
      .pipe(
        debounceTime(300),
        switchMap((str) =>
          this.productsService.searchProduct({ q: `${str}`.trim() }).pipe(
            tap((result) => {
              console.log(result);
              this.patchState({
                products: result.products,
                pagination: {
                  totalResult: result.total,
                  totalPage: Math.ceil(result.total / PAGE_LIMIT),
                  currentPage: 1,
                },
              });
            })
          )
        )
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.subject$.complete();
    this.state$.complete();
  }

  deleteProduct(product: IProduct) {
    const containerRef = this.showDialogDelete.viewContainerRef;
    containerRef.clear();

    const componentRef = containerRef.createComponent<ProductDeleteComponent>(
      ProductDeleteComponent
    );

    componentRef.instance.product = product;
    componentRef.instance.onClose
      .pipe(takeUntil(this.subject$))
      .subscribe((result) => {
        containerRef.clear();
        if (result) {
          this.getProducts();
        }
      });
  }

  goToPage(index: number): void {
    this.getProducts(`${index * PAGE_LIMIT}`);
  }

  private getProducts(page = '0') {
    of('')
      .pipe(
        takeUntil(this.subject$),
        tap(() => this.patchState({ isLoading: ILoadingStatus.Pending })),
        switchMap(() =>
          this.productsService.getPagination(page, PAGE_LIMIT).pipe(
            tap((result) =>
              this.patchState({
                products: result.products,
                pagination: {
                  totalResult: result.total,
                  totalPage: Math.ceil(result.total / PAGE_LIMIT),
                  currentPage: Math.floor(+page / PAGE_LIMIT),
                },
              })
            ),
            finalize(() => this.patchState({ isLoading: ILoadingStatus.Done })),
            catchError((error: HttpErrorResponse) =>
              this.alertService.error(error.error.message || error.message)
            )
          )
        )
      )
      .subscribe();
  }

  private patchState({
    products,
    isLoading,
    pagination,
  }: Partial<ProductState>) {
    of('')
      .pipe(
        takeUntil(this.subject$),
        withLatestFrom(this.state$),
        tap(([, state]) => {
          this.state$.next({
            ...state,
            products: products || state.products,
            isLoading: isLoading || state.isLoading,
            pagination: pagination || state.pagination,
          });
        })
      )
      .subscribe();
  }
}

interface ProductState {
  products: IProduct[];
  pagination: IPagination;
  isLoading: ILoadingStatus;
}
