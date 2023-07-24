import { Component } from '@angular/core';
import { UtilService } from './shared/services/util.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ng-starter';

  changeProps = this.getChangeProps();

  constructor(private utilSvc: UtilService) {}

  public getChangeProps() {
    const oldObj = {
      _id: crypto.randomUUID(),
      Name: 'fra-test-vm',
      Descprition: 'Central VM Test',
      Status: 'Active',
      Version: 1
    };
    const newObj = {
      _id: crypto.randomUUID(),
      Name: 'fra-test-vm 2',
      Descprition: 'Central VM Test',
      Status: 'Paused',
      Version: 2
    };

    return this.utilSvc.getObjectChanges(newObj, oldObj, ['_id']);
  }
}
