// Angular modules
import { NgModule} from '@angular/core';
import { Renderer } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
// Routing
import { routing } from './app.routing';
// Components
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard.component';
import { PanelChartComponent } from './components/panelChart.component';
import { PanelControlsComponent } from './components/panelControls.component';
import { DialogOverviewExampleDialog } from './components/dialogOverviewExampleDialog.component';
// Directives
// Services
import { DbDataService } from './services/db.data.service';

// External modules
import { MaterialModule } from '@angular/material';
import 'hammerjs';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    MaterialModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    PanelChartComponent,
    PanelControlsComponent
  ],
  providers: [
    DbDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }