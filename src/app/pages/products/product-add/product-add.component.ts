import {ChangeDetectionStrategy, Component, OnDestroy, OnInit,} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductsService} from '../../../services/products.service';
import {IProduct} from '../../../interfaces/product';
import {
  BehaviorSubject,
  catchError,
  concatMap,
  finalize,
  map,
  of,
  Subject,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs';
import {funcFormRequired, funcValidateForm} from '../../../utils/functions';
import {ILoadingStatus} from '../../../interfaces/loading-status';
import {defaultEditorExtensions, TUI_EDITOR_EXTENSIONS,} from '@taiga-ui/addon-editor';
import {HttpErrorResponse} from '@angular/common/http';
import {AlertService} from '../../../services/-alert.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: TUI_EDITOR_EXTENSIONS,
      useValue: defaultEditorExtensions,
    },
  ],
})
export class ProductAddComponent implements OnInit, OnDestroy {
  private subject$ = new Subject();
  private state$ = new BehaviorSubject<ProductState>({
    product: null as any,
    categories: [''],
    isLoading: ILoadingStatus.Idle,
    isUpdate: false,
  });

  vm$ = this.state$.asObservable();
  formProduct: FormGroup = null as any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    protected router: Router,
    private productsService: ProductsService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getProduct();
    this.getCategories();
  }

  ngOnDestroy() {
    this.state$.complete();
    this.subject$.complete();
  }

  private initForm() {
    this.formProduct = this.fb.group({
      title: [null, [funcFormRequired('Title is required!')]],
      price: [null, [funcFormRequired('Price is required!')]],
      discountPercentage: [0],
      category: [null, [funcFormRequired('Category Id is required!')]],
    });
  }

  private getProduct() {
    of('')
      .pipe(
        takeUntil(this.subject$),
        withLatestFrom(this.route.params),
        tap(([, { slug }]) => {
          if (slug) {
            this.patchState({ isUpdate: true });
          }
        }),
        switchMap(([, { slug }]) => {
          if (!slug) return of('');

          return this.productsService.getOne(slug).pipe(
            tap((product) => {
              this.patchState({ product });
              this.formProduct.patchValue({
                ...product,
              });
            }),
            catchError((error: HttpErrorResponse) =>
              this.alertService.error(error.message)
            )
          );
        })
      )
      .subscribe();
  }

  private getCategories() {
    of('')
      .pipe(
        takeUntil(this.subject$),
        switchMap(() =>
          this.productsService.getCategories().pipe(
            tap((categories) => {
              this.patchState({ categories });
              this.formProduct.patchValue({
                category: categories[0],
              });
            }),
            catchError((error: HttpErrorResponse) =>
              this.alertService.error(error.message)
            )
          )
        )
      )
      .subscribe();
  }

  onSubmit() {
    if (this.formProduct.valid) {
      const product: IProduct = this.formProduct.getRawValue();
      this.createOrUpdateProduct(product);
    } else {
      funcValidateForm(this.formProduct);
    }
  }

  private createOrUpdateProduct(product: IProduct) {
    of('')
      .pipe(
        takeUntil(this.subject$),
        tap(() => this.patchState({ isLoading: ILoadingStatus.Pending })),
        map(() => product),
        withLatestFrom(this.route.params),
        switchMap(([body, { slug }]) => {
          if (!slug) {
            return this.createProduct(body);
          }
          return this.updateProduct(body, slug);
        })
      )
      .subscribe();
  }

  private createProduct(product: IProduct) {
    return this.productsService.create(product).pipe(
      tap(() => this.router.navigate(['/products'])),
      finalize(() => this.patchState({ isLoading: ILoadingStatus.Done })),
      concatMap(() => this.alertService.success('Create successfully!')),
      catchError((error: HttpErrorResponse) =>
        this.alertService.error(error.error.message || error.message)
      )
    );
  }

  private updateProduct(product: IProduct, id: number) {
    return this.productsService.update(product, id).pipe(
      tap(() => this.router.navigate(['/products'])),
      finalize(() => this.patchState({ isLoading: ILoadingStatus.Done })),
      concatMap(() => this.alertService.success('Update successfully!')),
      catchError((error: HttpErrorResponse) =>
        this.alertService.error(error.message)
      )
    );
  }

  private patchState({
    product,
    isLoading,
    isUpdate,
    categories
  }: Partial<ProductState>) {
    of('')
      .pipe(
        takeUntil(this.subject$),
        withLatestFrom(this.state$),
        tap(([, state]) => {
          this.state$.next({
            ...state,
            isLoading: isLoading || state.isLoading,
            product: product || state.product,
            isUpdate: isUpdate || state.isUpdate,
            categories: categories || state.categories
          });
        })
      )
      .subscribe();
  }

}

interface ProductState {
  product: IProduct;
  categories: string[];
  isLoading: ILoadingStatus;
  isUpdate: boolean;
}
