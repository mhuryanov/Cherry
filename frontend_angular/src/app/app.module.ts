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
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ContactsService } from './shared/services/contacts.service';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular-6-datatable';
import { MomentModule } from 'angular2-moment';
import { MomentTimezoneModule } from 'angular-moment-timezone';
import { ChatComponent } from './chat/chat.component';
import { SlideshowModule } from 'ng-simple-slideshow';
import { ChatService } from './shared/services/chat.service';
import { WebsocketService } from './shared/services/websocket.service';
import { ChatdemoComponent } from './chatdemo/chatdemo.component';
import { NgDatepickerModule } from 'ng2-datepicker';
import { WaitinglistComponent } from './dashboard/waitinglist/waitinglist.component';
import { RequestService } from './shared/services/request.service';
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
    ManageactionsComponent,
    ChatComponent,
    ChatdemoComponent,
    WaitinglistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DataTableModule,
    MomentModule,
    MomentTimezoneModule,
    SlideshowModule,
    NgDatepickerModule
    // NgbModule.forRoot()
  ],
  providers: [
    ProfileService,
    StaffService,
    TagService,
    TemplateService,
    StatusService,
    LoginService,
    ContactsService,
    ChatService,
    WebsocketService,
    RequestService,
    ActionService,
    AuthguardService,

    // NgbModal
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
