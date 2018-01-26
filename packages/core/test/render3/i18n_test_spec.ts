/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {C, E, NC, T, V, a, b, b1, b2, b3, b4, b5, b6, b7, b8, bV, cR, cr, defineComponent, e, k, m, p, r, s, t, v} from '../../src/render3/index';
import {NO_CHANGE} from '../../src/render3/instructions';

import {containerEl, renderToHtml} from './render_util';

fdescribe('i18n test', () => {

  it('translate a basic template', () => {
    expect(renderToHtml(Template, null)).toEqual('<b>Monde</b> Salut');

    function Template(ctx: any, cm: boolean) {
      // Source message is
      // - "Hello <b>World <i>!</i></b>""
      // - ['S_B', 'S_I', 'C_I', C_B']

      if (cm) {
        // START translatable structure
        // The translation can contain a maximum of 5 text nodes (before, inside and after the els)
        // TODO: figure out if we need to pre-allocate them ? Should they be moved in the ltree for
        // projection ?
        T(0);
        T(1);
        T(2);
        T(3);
        T(4);
        E(5, 'b');
        E(6, 'i');
        e();
        e();
        // END translatable structure

        // GENERATED translation information -> need compiler updates

        // should be outside of the Template fn
        let childElMap: {[el: number]: number[]}|undefined;
        let detachEl: number[];
        let tokens: string[];

        // Total number of placeholder text ndoes
        const nbTxtNodes = 3;
        const TxtNodeContents: Array<number|undefined> = new Array(nbTxtNodes);

        if (!childElMap) {
          // Executed once when the component is first used

          // Translation tokens
          // - even indexes: static text
          // - odd indexes: placeholders
          // NOTE: this will be generated at runtime by parsing the translation
          tokens = ['', 'S_B', 'Monde', 'C_B', ' Salut'];

          // Indexes of the elements for each placeholder
          const elPhIdxs: {[name: string]: number[]} = {
            'S_B': [5],
            'S_I': [6],
          };

          [childElMap, detachEl] = computeTranslation(tokens, TxtNodeContents, elPhIdxs);
        }

        // Called all the time in Creation Mode
        translate(tokens !, nbTxtNodes, TxtNodeContents, detachEl !, childElMap);
        // END OF GENERATED
      }
    }
  });

});

// Translation shared code

const ROOT_ELEMENT = -1;

function computeTranslation(
    tokens: string[], TxtNodeContents: Array<number|undefined>,
    elPhIdxs: {[ph: string]: number[]}): [{[el: number]: number[]}, number[]] {
  const elIdxToChildrenIdxs: {[el: number]: number[]} = {};

  elIdxToChildrenIdxs[ROOT_ELEMENT] = [];

  let txtNodeIndex = 0;

  const parents: number[] = [ROOT_ELEMENT];
  let parentIdx: number = ROOT_ELEMENT;

  for (let tokenIdx = 0; tokenIdx < tokens.length; tokenIdx++) {
    const token = tokens[tokenIdx];
    const isText = tokenIdx % 2 === 0;

    if (isText) {
      // Text nodes
      if (token) {
        TxtNodeContents[txtNodeIndex] = tokenIdx;
        elIdxToChildrenIdxs[parentIdx].push(txtNodeIndex);
        txtNodeIndex++;
      }
    } else {
      // Placeholders
      // TODO: Handle interpolations. Either start tag or end tag for now
      if (token in elPhIdxs) {
        // opening tag
        const elIdx = elPhIdxs[token].shift() !;
        elIdxToChildrenIdxs[parentIdx].push(elIdx);
        elIdxToChildrenIdxs[elIdx] = [];
        parents.push(elIdx);
        parentIdx = elIdx;
      } else {
        parents.pop();
        parentIdx = parents[parents.length - 1];
      }
    }
  }

  // All elements in the view
  const viewElIdxs = (Object.keys(elPhIdxs) as any as number[])
                         .reduce((p: number[], k: number) => p.concat(elPhIdxs[k]), []);
  const detachEls = viewElIdxs.filter(e => elIdxToChildrenIdxs[e] == null);

  return [elIdxToChildrenIdxs, detachEls];
}

function translate(
    tokens: string[], numberOfTxtNodes: number, TextNodeContents: Array<number|undefined>,
    detachElIdxs: number[], elIdxToChildrenIdxs: {[el: number]: number[]}): void {
  // Create the text nodes as defined in the translation
  for (let nodeIdx = 0; nodeIdx < numberOfTxtNodes; nodeIdx++) {
    const tokenIdx = TextNodeContents[nodeIdx];
    if (tokenIdx == null) {
      break;
    }
    t(nodeIdx, tokens[tokenIdx]);
  }

  // Detach elements that are not part of the translation any more
  detachElIdxs.forEach(e => {
    const remove = E(e);
    // TODO: cleaner way to retrieve the parent node ?
    const parent = (E(e) as any).parentNode;
    parent.removeChild(remove);
  });

  // Re-order the nodes as defined in the translation
  const childMap: {[k: number]: number[]} = elIdxToChildrenIdxs !;
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