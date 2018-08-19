import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/home/home.component';
import { HeaderComponent } from './dashboard/header/header.component';
import { ContactsComponent } from './contacts/contacts.component';
import { AdminComponent } from './admin/admin.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileService } from './shared/services/profile.service';
import { AdminheaderComponent } from './admin/adminheader/adminheader.component';
import { ManagestaffComponent } from './admin/managestaff/managestaff.component';
import { ManagetagsComponent } from './admin/managetags/managetags.component';
import { ManagetemplatesComponent } from './admin/managetemplates/managetemplates.component';
import { ManagestatusComponent } from './admin/managestatus/managestatus.component';
import { ManageactionsComponent } from './admin/manageactions/manageactions.component';
import { StaffService } from './shared/services/staff.service';
import { TagService } from './shared/services/tag.service';
import { TemplateService } from './shared/services/template.service';
import { StatusService } from './shared/services/status.service';
import { ActionService } from './shared/services/action.service';
import { AuthguardService } from './shared/services/authguard.service';
import { LoginService } from './shared/services/login.service';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HomeComponent,
    HeaderComponent,
    ContactsComponent,
    AdminComponent,
    ProfileComponent,
    AdminheaderComponent,
    ManagestaffComponent,
    ManagetagsComponent,
    ManagetemplatesComponent,
    ManagestatusComponent,
    ManageactionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    // NgbModule.forRoot()
  ],
  providers: [
    ProfileService,
    StaffService,
    TagService,
    TemplateService,
    StatusService,
    ActionService,
    AuthguardService,
    LoginService
    // NgbModal
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
