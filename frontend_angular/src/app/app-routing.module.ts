import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/home/home.component';
import { ContactsComponent } from './contacts/contacts.component';
import { AdminComponent } from './admin/admin.component';
import { ProfileComponent } from './profile/profile.component';
import { ManagestaffComponent } from './admin/managestaff/managestaff.component';
import { ManagetagsComponent } from './admin/managetags/managetags.component';
import { ManagetemplatesComponent } from './admin/managetemplates/managetemplates.component';
import { ManagestatusComponent } from './admin/managestatus/managestatus.component';
import { ManageactionsComponent } from './admin/manageactions/manageactions.component';
import { AuthguardService } from './shared/services/authguard.service';
import { ChatComponent } from './chat/chat.component';
import { ChatdemoComponent } from './chatdemo/chatdemo.component';

const routes: Routes = [
    {
        component: LoginComponent,
        path: 'login'
    },
    {
        component: DashboardComponent,
        path: 'dashboard',
        canActivate: [AuthguardService],
        children: [{
                component: HomeComponent,
                path: 'home'
            }, {
                component: ContactsComponent,
                path: 'contacts'
            }, {
                component: ProfileComponent,
                path: 'profile'
            }, {
                component: AdminComponent,
                path: 'admin',
                children: [{
                        component: ManagestaffComponent,
                        path: 'managestaff'
                    }, {
                        component: ManagetagsComponent,
                        path: 'managetags'
                    }, {
                        component: ManagetemplatesComponent,
                        path: 'managetemplates'
                    }, {
                        component: ManagestatusComponent,
                        path: 'managestatus'
                    }, {
                        component: ManageactionsComponent,
                        path: 'manageactions'
                    }]
            }, {
                component: ChatComponent,
                path: 'chat/:contactId/:userId'
            }
        ]
    },
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    },
    {
        path: 'chatdemo',
        component: ChatdemoComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
