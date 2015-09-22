var GENERAL_REGIONS = [
	{ 'key' : 'na', 'name' : 'North America' },
	{ 'key' : 'eu', 'name' : 'Europe' },
	{ 'key' : 'apac', 'name' : 'Asia/Pacific' },
	{ 'key' : 'sa', 'name' : 'South America' }
];

// Register constants
module.exports = function(app) {
	app.constant('generalRegions', GENERAL_REGIONS);
};
		
