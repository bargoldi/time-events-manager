import { intervalCollection } from '../src/main';

describe('IntervalCollection', () => {
	it('should be empty', () => {
		// AAA
		chai.assert.strictEqual(intervalCollection.getAll().length, 0);
	});

	describe('Adding', () => {
		describe('Single Interval', () => {
			it('should consist of 1 interval', () => {
				// Arrange + Act
				setInterval(() => {
				}, 100);

				// Assert
				chai.assert.strictEqual(intervalCollection.getAll().length, 1);
			});

			it('should run the interval logic', (done) => {
				// Arrange + Act
				setInterval(() => {
					// Assert
					chai.assert.strictEqual(intervalCollection.getAll().length, 1);
				}, 100);

				done();
			});
		});

		describe('Few Intervals', () => {
			it('should consist of more than 1 interval', () => {
				// Arrange + Act
				setInterval(() => {
				}, 100);

				setInterval(() => {
				}, 200);

				// Assert
				chai.assert.strictEqual(intervalCollection.getAll().length, 1);
			});

			it('should run the interval logic', (done) => {
				let ranFirst = false;

				setInterval(() => {
					// Assert
					chai.assert.strictEqual(intervalCollection.getAll().length, 2);
					ranFirst = true;
				}, 100);

				// Arrange + Act
				setInterval(() => {
					// Assert
					chai.assert.strictEqual(intervalCollection.getAll().length, 2);
					chai.assert.strictEqual(ranFirst, true);
				}, 200);

				done();
			});
		});
	});

	describe('Fetching data', () => {

	});

	describe('Removing', () => {

	});

	it('should render correctly', () => {
	});

	it('should have correct prop values', () => {
	});
});