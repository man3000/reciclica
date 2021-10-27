import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      imports: [
        IonicModule.forRoot(),
        AppRoutingModule  
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should go to pickup-calls on see all',() =>{
    spyOn(router,'navigate');
    component.goToPickUpCalls();
    expect(router.navigate).toHaveBeenCalledWith(['pickup-calls'])
  });
  
  it('should go new pickup-call on create pickup',() =>{
    spyOn(router,'navigate');
    component.newPickUpCall();
    expect(router.navigate).toHaveBeenCalledWith(['pickup-call'])
  });

});
