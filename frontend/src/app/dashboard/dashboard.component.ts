import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { UserService } from '@app/user.service';
import { DashboardService } from './dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit, OnDestroy {

  mobileQuery: MediaQueryList;

  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

  fillerContent = Array.from({length: 50}, () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);

  private _mobileQueryListener: () => void;
  userName: any;

  constructor(
    changeDetectorRef: ChangeDetectorRef, 
    media: MediaMatcher,
    private dashboardService : DashboardService,
    private userService : UserService,
    private router: Router,
    private ren: Renderer2,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

  ngOnInit(){
    this.userName = this.userService.user['username']
    console.log('uss',this.userName)
  }
  
  logout(){
    this.dashboardService.logout().subscribe(res => {
      console.log(res)
      sessionStorage.clear();
      this.userService.alertToUser(res['message']);
      this.router.navigate(['/']);
    },
    error => {
      let errorObject = error['error']
      this.userService.alertToUser(errorObject['message']);
      return;
    })
  }

  toggleParentDrawer(source, target) {
    if(target.classList.contains('tree-open')) {
      this.ren.removeClass(source, 'tree-open');
      this.ren.removeClass(target, 'tree-open');
    } else {
      this.ren.addClass(source, 'tree-open');
      this.ren.addClass(target, 'tree-open');
    }
  }

}
