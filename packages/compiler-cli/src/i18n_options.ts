/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {I18nVersion} from '@angular/core';

/** @internal */
export function normalizeI18nFormat(i18nFormat: string | null): string {
  return i18nFormat || 'xlf';
}

/** @internal */
export function normalizeI18nVersion(i18nVersion: string | number | null): I18nVersion {
  if (i18nVersion) {
    switch (i18nVersion) {
      case '0':
      case 0:
        return I18nVersion.V0;
      case '1':
      case 1:
        return I18nVersion.V1;
      default:
        throw new Error(`Unknown option for i18nVersion (${i18nVersion}). Use either "0" or "1".`);
    }
  }
  return I18nVersion.V0;
}