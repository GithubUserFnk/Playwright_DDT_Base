// fixtures/modular.fixture.js
import { test as base, expect } from './fullwindow.fixture.js';
import { registerFixtures } from './register.fixture.js';
import {loginFixtures} from './login.fixture.js'
import {addToCartFixtures} from './addTocart.fixture.js'
import {CheckoutFixtures} from './checkout.fixture.js'
// import fixture modul lain juga misal loginFixtures, fillFormFixtures

export const test = base
  .extend(registerFixtures)
  .extend(loginFixtures)
  .extend(addToCartFixtures)
  .extend(CheckoutFixtures)
  // .extend(fillFormFixtures)

export { expect };
