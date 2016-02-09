/* global document */

import diff from 'virtual-dom/diff';
import patch from 'virtual-dom/patch';
import createElement from 'virtual-dom/create-element';
import report from './components/report/report';
import store from './store';

let tree = report(store.getState());
let rootNode = createElement(tree);

store.subscribe(function storeRootListener() {
  const newTree = report(store.getState());
  const patches = diff(tree, newTree);

  rootNode = patch(rootNode, patches);
  tree = newTree;
});

document.body.appendChild(rootNode);
