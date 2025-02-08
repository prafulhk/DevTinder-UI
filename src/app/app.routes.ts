import { Routes } from '@angular/router';
import { FeedComponent } from './components/feed/feed.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';

export const routes: Routes = [
    {
        path: "*", component: LoginComponent
    },
    {
        path: "login", component: LoginComponent
    },
    {
        path: "feed", component: FeedComponent
    },
    {
        path: "logout", component: LogoutComponent
    },
    {
        path: "profileUpdate", component: UpdateProfileComponent
    },

];
