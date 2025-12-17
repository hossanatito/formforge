import { FormConfig } from '@/types';
import { generateJVZooPHP } from './jvzoo';
import { generateWarriorPlusPHP } from './warriorplus';

export function generatePHP(config: FormConfig): string {
    if (config.platform === 'jvzoo') {
        return generateJVZooPHP(config);
    } else {
        return generateWarriorPlusPHP(config);
    }
}

export { generateJVZooPHP, generateWarriorPlusPHP };
