import { DOMHelper } from '../../helpers';

export default class Main {
  render() {
    const container = DOMHelper.createElement('main', [
      'container',
      'no-padding',
      'd-flex',
      'justify-content-center',
      'align-items-center',
    ], [{ prop: 'id', value: 'main' }]);

    return container;
  }
}