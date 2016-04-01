var Benchmark = require('benchmark'),
    benchmarks = require('beautify-benchmark'),
    isUri = require('..'),
    suite = new Benchmark.Suite,
    testUri = 'http://asdf:qw%20er@[FEDC:BA98:7654:3210:FEDC:BA98:7654:3210]:8000?asdf=12345&asda=fc%2F#bacon';

suite.add({
    name: 'isUri#test(uri)',
    minSamples: 100,
    fn: function () {
        isUri.isValid(testUri);
    }
}).on('start', function onCycle() {
    process.stdout.write('  Testing URI "' + testUri + '"\n\n')
}).on('cycle', function onCycle(event) {
    benchmarks.add(event.target);
}).on('complete', function onComplete() {
    benchmarks.log();
}).run();