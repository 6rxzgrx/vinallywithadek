export type { PageData } from './types';

export { welcomePage } from './welcome';
export { groomPage } from './groom';
export { bridePage } from './bride';
export { seeYouTherePage } from './seeYouThere';

import { welcomePage } from './welcome';
import { groomPage } from './groom';
import { bridePage } from './bride';
import { seeYouTherePage } from './seeYouThere';
import type { PageData } from './types';

export const pages: PageData[] = [
	welcomePage,
	groomPage,
	bridePage,
	seeYouTherePage,
];
