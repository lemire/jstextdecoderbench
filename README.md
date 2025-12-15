# JS TextDecoder Benchmark

This project benchmarks the performance of JavaScript's `TextDecoder` API when decoding different types of Unicode text.

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/yourusername/jstextdecoderbench.git
cd jstextdecoderbench
npm install
```

## Usage

Run the benchmark:

```bash
node textdecoder-benchmark.js
```

## What it does

The benchmark:

1. Downloads three different Unicode text samples:
   - [Latin lipsum](https://raw.githubusercontent.com/lemire/unicode_lipsum/main/lipsum/Latin-Lipsum.utf8.txt)
   - [Arabic lipsum](https://raw.githubusercontent.com/lemire/unicode_lipsum/main/lipsum/Arabic-Lipsum.utf8.txt)
   - [Chinese lipsum](https://raw.githubusercontent.com/lemire/unicode_lipsum/main/lipsum/Chinese-Lipsum.utf8.txt)

2. Encodes each text to UTF-8 bytes using `TextEncoder`

3. Uses Tinybench to measure the performance of decoding each byte array back to text using `TextDecoder`

4. Reports the throughput in GB/s (higher is better) and mean decoding time in milliseconds

## Results

Node 24 with Apple M4

| Test | Size | Throughput | Mean Time |
|------|------|------------|-----------|
| Latin lipsum (ASCII) | 84.902 KiB | 19.69 GiB/s | 0.004 ms |
| Arabic lipsum | 79.771 KiB | 0.40 GiB/s | 0.193 ms |
| Chinese lipsum | 68.203 KiB | 0.45 GiB/s | 0.144 ms |


Bun 1.3.4 

| Test | Size | Throughput | Mean Time |
|------|------|------------|-----------|
| Latin lipsum (ASCII) | 84.902 KiB | 55.83 GiB/s | 0.002 ms |
| Arabic lipsum | 79.771 KiB | 2.51 GiB/s | 0.031 ms |
| Chinese lipsum | 68.203 KiB | 5.69 GiB/s | 0.012 ms |

## Dependencies

- [tinybench](https://github.com/tinylibs/tinybench) 

## License

Public Domain. Do what you want with this code.