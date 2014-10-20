var Benchmark = require('benchmark'),
    benchmarks = require('beautify-benchmark'),
    isUri = require('..'),
    suite = new Benchmark.Suite,
    testUri = 'mailto:John.Doe@example.com';

suite.add({
    name: 'isUri#test(uri)',
    minSamples: 100,
    fn: function () {
        isUri.test(testUri);
    }
}).on('start', function onCycle() {
    process.stdout.write('  Testing URI "' + testUri + '"\n\n')
}).on('cycle', function onCycle(event) {
    benchmarks.add(event.target);
}).on('complete', function onComplete() {
    benchmarks.log();
}).run();