import {Before, Given, When, Then} from 'cucumber';
import {expect} from 'chai';
import {AppPage} from '../pages/app.po';
import { browser } from 'protractor';


Before(() => {
  browser.waitForAngularEnabled(true)
});

Given('I am on the login page', async () => {
  await AppPage.navigateTo();
});

When('I do nothing', async() => {
});

Then('I should see the title', async () => {
  expect(await AppPage.getTitleLogin()).to.equal('Login');
});

When('I write {string} in {string}', async (value,id)=>{
  console.log(value);
  const y = AppPage.findInputConnect(id)
  await y.sendKeys(value)
  console.log(id)
});
When('I write {string} in {string}', async (value,id)=>{
  console.log(value);
  const y = AppPage.findInputConnect(id)
  await y.sendKeys(value)
  console.log(id)
});
When('I connect',async()=>{
  const u = AppPage.findConnectionButton()
  await u.click()
});

Then('I see tab in url',async()=>{
  
  expect(await AppPage.findInUrl())
  
})
Then('Then I see Scanner page',async()=>{
  expect(await AppPage.seeScannerPage().getText()).to.contain("Scan QR code")


})

Given('I am on the list page', async () => {
  await AppPage.navigateToListpage();
});
Then('I should see the couponList', async () => {
  expect(await AppPage.getCouponsListPage()).to.equal('Liste Coupons');
});
Then('I click on voir coupons',async()=>{
  const u = AppPage.voirUnCoupon()
  await u.click()
});
Then('I should see pas de coupons', async () => {
  expect(await AppPage.getCouponsListPage()).to.contain('pas de coupons');
});
