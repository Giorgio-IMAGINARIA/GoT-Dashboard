// Angular modules
import { NgModule } from '@angular/core';
import { Renderer } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
// Routing
import { routing } from './app.routing';
// Components
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard.component';
import { PanelControlsComponent } from './components/panelControls.component';
import { PanelDeadComponent } from './components/panelDead.component';
import { PanelLivingComponent } from './components/panelLiving.component';

// Directives
// Services
import { AriaDataService } from './services/aria.data.service';

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
    PanelDeadComponent,
    PanelLivingComponent,
    PanelControlsComponent
  ],
  providers: [
    AriaDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }