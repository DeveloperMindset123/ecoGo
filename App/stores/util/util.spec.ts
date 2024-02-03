import { withTimeout } from './fetchGpsPosition';

describe('withTimeout', () => {
	it('should correct time out', async () => {
		jest.setTimeout(5000);

		const p = new Promise((resolve) => setTimeout(resolve, 2001));

		try {
			await withTimeout(p, 2000);

			throw new Error('Should have thrown');
		} catch (e) {
			// ok
		}
	});
});
