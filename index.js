var Bottleneck = require("bottleneck");

const limiter = new Bottleneck({
	reservoir: 40,
	reservoirIncreaseAmount: 2,
	reservoirIncreaseInterval: 1000,
	reservoirIncreaseMaximum: 40,
	maxConcurrent: 5,
	minTime: 250
});

// console.log(limiter);

const fn = one => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log("Done with: ", one);
			resolve(one);
		}, 2000);
	});
};
for (var i = 0; i < 100; i++) {
	console.log("Starting ", i);
	limiter.schedule(fn, i).then(res => console.log("Resolved: ", res));
}
