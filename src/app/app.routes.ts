import { RequestRecievedComponent } from './components/request-recieved/request-recieved.component';
import { Routes } from '@angular/router';
import { FeedComponent } from './components/feed/feed.component';
import { LogoutComponent } from './components/logout/logout.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { LoginComponent } from './components/lgoin/login.component';
import { ConnectionsComponent } from './components/connections/connections.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

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
    {
        path: "requests", component: RequestRecievedComponent
    },
    {
        path: "connections", component: ConnectionsComponent
    },
    {
        path: "forgotPassword", component: ForgotPasswordComponent
    },
    {
        path: "resetPassword", component: ChangePasswordComponent
    },
];
