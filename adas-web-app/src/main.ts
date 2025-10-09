// src/main.ts
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

// ✅ Add these two lines for AG Grid v34+
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]);

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
