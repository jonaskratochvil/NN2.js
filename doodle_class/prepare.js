// split train and test data

function prepareData(category, data, label) {
	category.training = [];
	category.testing = [];

	for (let i = 0; i < total_data; i++) {
		let treshold = floor(0.8 * total_data);
		offset = i * len;

		if (i < treshold) {
			category.training[i] = data.bytes.subarray(offset, offset + len);
			category.training[i].label = label;
		} else {
			category.testing[i - treshold] = data.bytes.subarray(offset, offset + len);
			category.testing[i - treshold].label = label;
		}
	}
}
