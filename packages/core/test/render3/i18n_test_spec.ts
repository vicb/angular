/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {C, E, NC, T, V, a, b, b1, b2, b3, b4, b5, b6, b7, b8, bV, cR, cr, defineComponent, e, k, m, p, r, s, t, dtb, v, computeTranslation, translateDomTree, ComponentTemplate} from '../../src/render3/index';
import {NO_CHANGE} from '../../src/render3/instructions';
import {containerEl, renderToHtml} from './render_util';

fdescribe('i18n tests', () => {

  describe('basic use cases', () => {
    it('should translate a single text node', () => {
      const lTree = () => {
        T(0);
      };

      const cmp = createTemplateFn(lTree, ['translation'], {}, {});

      expect(renderToHtml(cmp, [])).toBe('translation');
    });

    describe('mix of text and element nodes', () => {
      it('should add text nodes around element', () => {
        const lTree = () => {
          T(0);
          T(1);
          T(2);
          E(3, 'p');
          e();
        };

        const dstHtml = 'before<p>in</p>after';
        const tokens = ['before', 'S_P', 'in', 'C_P', 'after'];
        const elPhIdxs = {
          'S_P': [3]
        };

        const cmp = createTemplateFn(lTree, tokens, elPhIdxs, {});

        expect(renderToHtml(cmp, [])).toBe(dstHtml);
      });

      it('should support re-order sibling nodes', () => {
        // From html `1<a>2<c>3</c>4<d>5</d>6</a>7<b>8</b>9`
        const lTree = () => {
          T(0);
          T(1);
          T(2);
          T(3);
          T(4);
          T(5);
          T(6);
          T(7);
          T(8);
          E(9, 'a');
          E(10, 'c');
          e();
          E(11, 'd');
          e();
          e();
          E(12, 'b');
          e();
        };

        const dstHtml = '1<b>2</b>3<a>4<d>5</d>6<c>7</c>8</a>9';
        const tokens = ['1', 'S_B', '2', 'C_B', '3', 'S_A', '4', 'S_D', '5', 'C_D', '6', 'S_C', '7', 'C_C', '8', 'C_A', '9'];
        const elPhIdxs = {
          'S_A': [9],
          'S_C': [10],
          'S_D': [11],
          'S_B': [12],
        };

        const cmp = createTemplateFn(lTree, tokens, elPhIdxs, {});
        expect(renderToHtml(cmp, [])).toBe(dstHtml);
      });

      it('should support detaching nodes', () => {
        // From html `<a></a><b><c></c></b>`
        const lTree = () => {
          T(0);
          T(1);
          T(2);
          T(3);
          T(4);
          T(5);
          T(6);
          E(7, 'a');
          e();
          E(8, 'b');
          E(9, 'c');
          e();
          e();
        };

        const dstHtml = `1<b>2</b>3`;
        const tokens = ['1', 'S_B', '2', 'C_B', '3'];
        const elPhIdxs = {
          'S_A': [7],
          'S_B': [8],
          'S_C': [9],
        };

        const cmp = createTemplateFn(lTree, tokens, elPhIdxs, {});
        expect(renderToHtml(cmp, [])).toBe(dstHtml);
      });
    });

    describe('interpolation / bound text nodes', () => {
      it('should support text node', () => {
        const lTree = () => {
          T(0);
        };

        const dstHtml = (name: string) => `before ${name} after`;
        const tokens = ['before ', 'EXP', ' after'];
        const expPhIdxs = {
          'EXP': 0,
        };

        let name = 'vic';
        const cmp = createTemplateFn(lTree, tokens, {}, expPhIdxs);
        expect(renderToHtml(cmp, [name])).toBe(dstHtml(name));
        // updating the value
        name = 'vicb';
        expect(renderToHtml(cmp, [name])).toBe(dstHtml(name));
        // same value
        expect(renderToHtml(cmp, [NC])).toBe(dstHtml(name));
      });

      it('should support multiple expressions', () => {
        const lTree = () => {
          T(0);
          T(1);
          T(2);
          E(3, 'p');
          e();
        };


        const tokens = ['', 'S_P', '1', 'EXP_1', '2', 'C_P', '3', 'EXP_2', ''];
        const elPhIdxs = {
          'S_P': 3,
        }
        const expPhIdxs = {
          'EXP_1': 0,
          'EXP_2': 1,
        };

        const cmp = createTemplateFn(lTree, tokens, {}, expPhIdxs);
        expect(renderToHtml(cmp, ['e1', 'e2'])).toBe(`<p>1e12</p>3e2`);
        expect(renderToHtml(cmp, ['e1b', NC])).toBe(`<p>1e1b2</p>3e2`);
      });

    });






  });


});

function createTemplateFn(createLTree: () => void, tokens: string[], elPhIdxs: {[ph: string]: number[]},expPhIdxs: {[ph: string]: number}): ComponentTemplate<any> {
    let childElMap: {[el: number]: number[]}|undefined;
    let detachEl: number[];
    const txtNodeDefs: {[node: number]: number[]} = {};

  return function Template(ctx: any, cm: boolean) {
    if (cm) {
      createLTree();

      if (!childElMap) {
        [childElMap, detachEl] = computeTranslation(tokens, txtNodeDefs, elPhIdxs, expPhIdxs);
      }
    }

    dtb(tokens, txtNodeDefs, ctx);

    if (cm) {
      translateDomTree(detachEl !, childElMap !);
    }

  }
}

/*

xdescribe('i18n test', () => {

  it('translate a basic template', () => {
    const ctx = {
      'e1': 'Vic',
      'e2': 'Tor',
    };

    // ++ GENERATED
    let childElMap: {[el: number]: number[]}|undefined;
    let detachEl: number[];
    let tokens: string[];
    // Defines the structure of each array node as:
    // - even index = text index in the tokens,
    // - odd index = binding index
    const txtNodeDefs: {[node: number]: number[]} = {};

    // Indexes of the elements for each placeholder
    const elPhIdxs: {[name: string]: number[]} = {
      'S_B': [5],
      'S_I': [6],
    };
    // Index of the binding for each exp ph (0 based)
    const expPhIdxs: {[ph: string]: number} = {
      'EXP_1': 0,
      'EXP_2': 1,
    };
    // -- GENERATED

    expect(renderToHtml(Template, ctx)).toEqual('<b>Monde</b> Salut');

    function Template(ctx: any, cm: boolean) {
      // Source message is
      // - "Hello <b>{{name}}<i>!</i></b>""
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

        if (!childElMap) {
          // Executed once when the component is first used

          // Translation tokens
          // - even indexes: static text
          // - odd indexes: placeholders
          // NOTE: this will be generated at runtime by parsing the translation
          // TODO: Have text nodes first to release PH memory after translation ?
          tokens = ['', 'S_B', '++' , 'S_I', '', 'EXP_2', '', 'EXP_1', '', 'CI', '--', 'C_B', ' Salut'];

          [childElMap, detachEl] = computeTranslation(tokens, txtNodeDefs, elPhIdxs, expPhIdxs);

          // TODO: release unneeded info from memory (ph infos, ...)
        }
      } // E/O Creation Mode

      // Dynamic Text Binding
      // IMPORTANT: `dtb()` must be the first instruction after cm to have the first binding slot
      dtb(tokens, txtNodeDefs, [ctx.e1, ctx.e2]);

      if (cm) {
        translateDomTree(detachEl !, childElMap !);
      }
    }
  });

});

*/