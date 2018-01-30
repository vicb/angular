/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {E} from './index';

const ROOT_ELEMENT = -1;

// TODO:
// check the code in node_manipulations
// is moving the DOM nodes around impacting the code there ??
// ie should we add assert, re-organize the logical tree, ...

// TODO(vicb): comment
export function computeTranslation(
    tokens: string[], txtNodeDef: {[node: number]: number[]},
    elPhIdxs: {[ph: string]: number[]}, expPhIdxs: {[ph: string]: number}): [{[el: number]: number[]}, number[]] {
  const childElMap: {[el: number]: number[]} = {};

  childElMap[ROOT_ELEMENT] = [];

  const parents: number[] = [ROOT_ELEMENT];
  let parentIdx: number = ROOT_ELEMENT;

  // - odd indexes = static texts (as index in tokens)
  // - exp indexes = expression (as index)
  let txtNodeParts: number[] = [];
  let txtNodeIdx = 0;
  let lastTxtPart: string = '';

  function closeTxtNodeDef() {
    // `['']` means no text
    if (txtNodeParts.length > 1 || lastTxtPart !== '') {
      txtNodeDef[txtNodeIdx] = txtNodeParts;
      childElMap[parentIdx].push(txtNodeIdx);
      txtNodeIdx++;
    }
    txtNodeParts = [];
  }

  for (let tokenIdx = 0, isText = true; tokenIdx < tokens.length; isText = !isText, tokenIdx++) {
    const token = tokens[tokenIdx];

    if (isText) {
      // Text nodes
      txtNodeParts.push(tokenIdx);
      lastTxtPart = token;
    } else {
      // Placeholders
      if (token in expPhIdxs) {
        // expression ph
        txtNodeParts.push(expPhIdxs[token]);
      } else {
        closeTxtNodeDef();
        if (token in elPhIdxs) {
          // opening tag
          const elIdx = elPhIdxs[token].shift() !;
          childElMap[parentIdx].push(elIdx);
          childElMap[elIdx] = [];
          parents.push(elIdx);
          parentIdx = elIdx;
        } else {
          // closing tag
          parents.pop();
          parentIdx = parents[parents.length - 1];
        }
      }
    }
  }

  closeTxtNodeDef();

  // All elements in the view
  const viewElIdxs = (Object.keys(elPhIdxs) as any as number[])
                         .reduce((p: number[], k: number) => p.concat(elPhIdxs[k]), []);
  const detachEls = viewElIdxs.filter(e => childElMap[e] == null);

  return [childElMap, detachEls];
}

// TODO(vicb: cpmment)
export function translateDomTree(detachElIdxs: number[], childElMap: {[el: number]: number[]}): void {
  // Detach elements that are not part of the translation any more
  detachElIdxs.forEach(e => {
    const remove = E(e);
    // TODO: cleaner way to retrieve the parent node ?
    const parent = (E(e) as any).parentNode;
    parent.removeChild(remove);
  });

  // Re-order the nodes as defined in the translation
  const childMap: {[k: number]: number[]} = childElMap !;
  Object.keys(childMap).forEach((p: string) => {
    const parentIdx: number = Number(p);
    childMap[parentIdx].forEach(childIdx => {
      const childEl = E(childIdx);
      // TODO: simplify by using the host if -1 or the E(idx) instead
      const parentEl = parentIdx == -1 ? (childEl as any).parentNode : E(parentIdx);
      parentEl.appendChild(childEl);
    });
  });
}