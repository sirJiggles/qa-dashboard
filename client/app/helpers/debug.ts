import { helper } from '@ember/component/helper';
import jsonParser from 'circular-json';

export function debug(params /*, hash*/) {
  console.error('--- DEBUG HELPER ----');
  console.error(jsonParser.stringify(params[0]));
}

export default helper(debug);
