import { Injectable } from '@angular/core';
import {User} from '../_models/user';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MemberListResolver implements Resolve<User[]> {
    constructor(private userService: UserService, private router: Router, private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        // Resolver to Load User when load data
        return this.userService.getUsers()
        // Catch Error if there's a problems
        .pipe(
            catchError(error => {
                this.alertify.error('Problem Retrieving Data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
