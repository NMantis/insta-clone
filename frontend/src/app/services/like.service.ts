import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment as env } from "src/environments/environment";
import { Post } from "../models/Post";

@Injectable({
  providedIn: "root",
})
export class LikeService {
  constructor(private http: HttpClient) {}

  like(post_id: string): Observable<Post> {
    return this.http
      .post<{ data: Post }>(`${env.baseUrl}/api/posts/${post_id}/like`, {})
      .pipe(map((resp) => resp.data));
  }

  unlike(post_id: string): Observable<Post> {
    return this.http
      .delete<{ data: Post }>(`${env.baseUrl}/api/posts/${post_id}/unlike`)
      .pipe(map((resp) => resp.data));
  }
}
