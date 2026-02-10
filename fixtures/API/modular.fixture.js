import { test as base, expect as baseExpect } from '@playwright/test';
import {getAllProductsFixture} from './getAllProducts.fixture.js'

export const test = base
    .extend(getAllProductsFixture)

export const expect = baseExpect;
