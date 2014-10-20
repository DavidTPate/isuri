var Benchmark = require('benchmark'),
    benchmarks = require('beautify-benchmark'),
    isUri = require('..'),
    suite = new Benchmark.Suite,
    testUri = 'http://asdf:qw%20er@127.0.0.1:8000?asdf=12345&asda=fc%2F#bacon';

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