import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { MatDialogModule,MatDialogRef } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatTableModule } from '@angular/material/table';

import { AppComponent } from './app.component';
import { UserService } from './user.service';
import { AuthGuard } from './auth.guard';;
import { UserLoginRegisterComponent } from './user-login-register/user-login-register.component';
import { UserLoginRegisterService } from './user-login-register/user-login-register.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './application-modules/admin/admin.component'
;
import { CrmComponent } from './application-modules/crm/crm.component';
const appRoutes: Routes = [
    { path: "", redirectTo: "authentication", pathMatch: "full" },
    { path: "authentication", component: UserLoginRegisterComponent },
    { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] },
    { path: "admin", component: AdminComponent, canActivate: [AuthGuard] },
    { path: "crm", component: CrmComponent, canActivate: [AuthGuard] },
]

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        BrowserAnimationsModule,
        MatDialogModule,
        FormsModule,
        MatExpansionModule,
        MatSnackBarModule,
        NgSelectModule,
        A11yModule,
        MatButtonModule,
        MatDialogModule,
        MatExpansionModule,
        MatNativeDateModule,
        MatRippleModule,
        MatSidenavModule,
        MatSnackBarModule,
        OverlayModule,
        PortalModule,
        ScrollingModule,
        MatIconModule,
        MatToolbarModule,
        MatListModule,
        MatTableModule
    ],
    declarations: [
        AppComponent,
        UserLoginRegisterComponent,
        DashboardComponent
,
        AdminComponent ,
        CrmComponent   ],
    providers: [
        UserService,
        UserLoginRegisterService
    ],
    bootstrap: [AppComponent],
    entryComponents: [
    ],
})
export class AppModule { };