import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { environment } from "src/environments/environment";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AdminPageComponent } from './admin-page/admin-page.component';
import { DistributorPageComponent } from './distributor-page/distributor-page.component';
import { MenuComponent } from './menu/menu.component';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RequestComponent } from './request/request.component';
import { ViewQuantitiesComponent } from './view-quantities/view-quantities.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { MatTableModule } from '@angular/material/table';
import { AddComponent } from './add/add.component';
import { ViewRequestsComponent } from './view-requests/view-requests.component';
import { SummaryComponent } from './summary/summary.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { RequestDialogComponent } from './request-dialog/request-dialog.component';
import { AddWarehouseComponent } from './add-warehouse/add-warehouse.component';
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin/:id', component: AdminPageComponent },
  { path: 'distributor/:id', component: DistributorPageComponent }
  // { path: 'second-component', component: SecondComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminPageComponent,
    DistributorPageComponent,
    MenuComponent,
    RequestComponent,
    ViewQuantitiesComponent,
    SnackbarComponent,
    AddComponent,
    ViewRequestsComponent,
    SummaryComponent,
    RequestDialogComponent,
    AddWarehouseComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    FormsModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatTableModule,
    MatCheckboxModule,
    MatDialogModule
  ],
  entryComponents: [SnackbarComponent, RequestDialogComponent],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
