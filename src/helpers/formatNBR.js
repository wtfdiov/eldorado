
import { config } from '../../app.json';
import precision from './precision';

export default (value, isFixed) => {
  if (isNaN(value)) {
    return 'N/A'
  } else {
    const v = (value / config.defaultUnit)
    if (isFixed) {
      return v.toFixed(config.decimals).toString()
    } else {
      return v.toFixed(precision(v)).toString()
    }
  }
}