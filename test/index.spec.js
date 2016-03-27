import {expect} from 'chai';
import htmlReporter from '../src/index';

describe('html-reporter', function () {
  it('should be a function', function () {
    expect(htmlReporter).to.be.a('function');
  });
});
