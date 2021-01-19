import {ApplicationRef, enableProdMode} from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import {enableDebugTools} from '@angular/platform-browser';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule).then(module => {
  const applicationRef = module.injector.get(ApplicationRef);
  const componentRef = applicationRef.components[0];
  // allows to run `ng.profiler.timeChangeDetection();`
  enableDebugTools(componentRef);
})
  .catch(err => console.error(err));
