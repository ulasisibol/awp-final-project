import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) { }

    canActivate(): boolean {
        if (isPlatformBrowser(this.platformId)) {
            if (localStorage.getItem('token')) {
                return true;
            } else {
                this.router.navigate(['/login']);
                return false;
            }
        } else {
            // Sunucu tarafı lojik veya başka bir yönlendirme
            return false;
        }
    }
}