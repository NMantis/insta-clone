import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { BehaviorSubject, Subject } from 'rxjs';
import { finalize, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Comment } from 'src/app/models/Comment';
import { Filters } from 'src/app/models/Filters';
import { Paginated } from 'src/app/models/Paginated';
import { Post } from 'src/app/models/Post';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-comment-modal',
  templateUrl: './comment-modal.component.html',
  styleUrls: ['./comment-modal.component.scss'],
})
export class CommentModalComponent implements OnInit, OnDestroy {

  @Input()
  post: Post;

  @ViewChild(IonInfiniteScroll)
  infiniteScroll: IonInfiniteScroll;

  loading: boolean = true;
  btnLoading: boolean;
  comments: Comment[] = [];
  text = new FormControl('');

  private filters$ = new BehaviorSubject(new Filters());
  private destroyed$ = new Subject<boolean>();

  constructor(
    private modal: ModalController,
    private commentService: CommentService
  ) { }

  ngOnInit() {

    this.filters$.pipe(
      takeUntil(this.destroyed$),
      tap(() => this.loading = true),
      switchMap(filters =>
        this.commentService.index(filters, this.post.id)
          .pipe(finalize(() => this.loading = false))
      )
    ).subscribe(resp => this.loadComments(resp))
  }

  loadComments(resp: Paginated<Comment>) {

    this.comments = this.comments.concat(resp.data);

    this.infiniteScroll.complete();
    this.infiniteScroll.disabled = !resp.next_page_url;
  }

  load() {
    if (this.loading) return;

    const filters = this.filters$.value;
    filters.page++;
    this.filters$.next(filters);
  }

  submit() {
    if (!this.text.value || this.btnLoading) return;

    this.btnLoading = true;

    const newComment = this.text.value;

    this.commentService
      .post(this.post.id, newComment)
      .pipe(finalize(() => this.btnLoading = false))
      .subscribe(() => this.dismiss(newComment));
  }

  dismiss(comment?: string) {
    this.modal.dismiss(comment).catch(err => console.log(err));
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
