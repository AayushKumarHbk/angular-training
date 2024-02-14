import { Inject, Injectable } from '@angular/core';
import { User } from "../models/user.model";
import { HttpClient } from "@angular/common/http";
import { map, Observable, ReplaySubject, tap } from "rxjs";
import { UserCreationDTO } from "../models/user-creation-dto.model";
import { convertUserEventDTOs } from "../components/utils/users-utils";
import { UserEvent } from "../models/user-event.model";
import { UserEventDTO } from "../models/user-event-dto";
import { API_BASE_URL } from "./tokens/base-url.token";

@Injectable()
export class UsersService {

  private readonly _userActionPerformed$ = new ReplaySubject<boolean>(1);
  public readonly userActionPerformed$ = this._userActionPerformed$.asObservable();

  constructor(
    @Inject(API_BASE_URL) private baseUrl: string,
    private readonly httpClient: HttpClient
  ) {
  }

  public getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseUrl}/training/users`);
  }

  public getUser(userId: string): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/training/user/${userId}`);
  }

  public createUser(userCreationDTO: UserCreationDTO): Observable<User> {
    return this.httpClient.post<User>(`${this.baseUrl}/training/user`, userCreationDTO).pipe(
      tap(() => this._userActionPerformed$.next(true))
    );
  }

  public updateUser(user: User): Observable<User> {
    return this.httpClient.put<User>(`${this.baseUrl}/training/user`, user).pipe(
      tap(() => this._userActionPerformed$.next(true))
    );
  }

  public deleteUser(userId: string): Observable<User> {
    return this.httpClient.delete<User>(`${this.baseUrl}/training/user/${userId}`).pipe(
      tap(() => this._userActionPerformed$.next(true))
    );
  }

  public deleteAllUsers(): Observable<User> {
    return this.httpClient.delete<User>(`${this.baseUrl}/training/users/removeAll`).pipe(
      tap(() => this._userActionPerformed$.next(true))
    );
  }

  public getUserEvents(): Observable<UserEvent[]> {
    return this.httpClient.get<UserEventDTO[]>(`${this.baseUrl}/training/users/history`).pipe(
      map(convertUserEventDTOs),
    );
  }
}
