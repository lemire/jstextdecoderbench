// textdecoder-benchmark.js

import { Bench } from 'tinybench';

const encoder = new TextEncoder('utf-8');
const decoder = new TextDecoder('utf-8');

const urls = {
  latin: "https://raw.githubusercontent.com/lemire/unicode_lipsum/main/lipsum/Latin-Lipsum.utf8.txt",
  arabic: "https://raw.githubusercontent.com/lemire/unicode_lipsum/main/lipsum/Arabic-Lipsum.utf8.txt",
  chinese: "https://raw.githubusercontent.com/lemire/unicode_lipsum/main/lipsum/Chinese-Lipsum.utf8.txt"
};

// Fetch the three texts individually
const [latinRes, arabicRes, chineseRes] = await Promise.all([
  fetch(urls.latin),
  fetch(urls.arabic),
  fetch(urls.chinese)
]);

const latinText = await latinRes.text();
const arabicText = await arabicRes.text();
const chineseText = await chineseRes.text();

const latinBytes = encoder.encode(latinText);
const arabicBytes = encoder.encode(arabicText);
const chineseBytes = encoder.encode(chineseText);

const bench = new Bench({
  warmupIterations: 10,
  iterations: 50
});

bench
  .add('Latin lipsum (ASCII)', () => {
    decoder.decode(latinBytes);
  })
  .add('Arabic lipsum', () => {
    decoder.decode(arabicBytes);
  })
  .add('Chinese lipsum', () => {
    decoder.decode(chineseBytes);
  });

await bench.run();

const results = bench.results;

console.log('Data sizes:');
console.log(`Latin:   ${(latinBytes.byteLength / 1024).toFixed(3)} KiB`);
console.log(`Arabic:  ${(arabicBytes.byteLength / 1024).toFixed(3)} KiB`);
console.log(`Chinese: ${(chineseBytes.byteLength / 1024).toFixed(3)} KiB\n`);

console.log('Benchmark results (higher GiB/s is better):');
console.log('| Test | Size | Throughput | Mean Time |');
console.log('|------|------|------------|-----------|');
const tasks = bench.tasks;
const sizes = [latinBytes.byteLength, arabicBytes.byteLength, chineseBytes.byteLength];
tasks.forEach((task, i) => {
  const result = task.result;
  const sizeGB = sizes[i] / (1024 ** 3);
  const opsPerSec = result.throughput.mean;
  const throughput = (sizeGB * opsPerSec).toFixed(2);
  const sizeKiB = (sizes[i] / 1024).toFixed(3);
  console.log(`| ${task.name} | ${sizeKiB} KiB | ${throughput} GiB/s | ${result.latency.mean.toFixed(3)} ms |`);
});