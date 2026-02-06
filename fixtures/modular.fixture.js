// fixtures/modular.fixture.js
import { test as base, expect as baseExpect } from '@playwright/test';
import { loginFixtures } from './login.fixture.js';
import { addToCartFixtures } from './addTocart.fixture.js';
import { CheckoutFixtures } from './checkout.fixture.js';
import { registerFixtures } from './register.fixture.js';

export const test = base
  .extend(registerFixtures)
  .extend(loginFixtures)
  .extend(addToCartFixtures)
  .extend(CheckoutFixtures);

export const expect = baseExpect;
