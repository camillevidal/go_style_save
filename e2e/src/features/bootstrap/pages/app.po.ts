import { browser, by, element } from 'protractor';

export class AppPage {
  static navigateTo() {
    return browser.get('/login');
  }
  static navigateToListpage(){
    return browser.get('/tab/tab3');
  }

  static getTitleLogin() {
    return element(by.id('login')).getText();
  }
  static findInputConnect(idValue){
    return element(by.xpath(`//input[@id="${idValue}"]`));
  }
  static findConnectionButton(){
    return element(by.id('btn-connect'))
  }
  static findInUrl(){
    return element(by.partialLinkText('tabs/tab2'))
  }
  static seeScannerPage(){
    return element(by.id('hello-app'))
  }
  static getCouponsListPage(){
    return element(by.id('liste-coupons'))
  }
  static voirUnCoupon(){
    return element(by.class('btn-coupon-detail'))
  }
  static noCoupons(){
    return element(by.class('no-coupons'))
  }
}
