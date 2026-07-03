const fs = require('fs');
const path = require('path');
const https = require('https');

const screens = [
  { name: 'SEO_Meta_Configuration', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1NWIwZjEzZGUxM2IwMDMwM2UxMmIzMDIxNjJkEgsSBxCwrcqG6A4YAZIBIwoKcHJvamVjdF9pZBIVQhMyNzI4MzQ2OTE0NzAzMDIwODA2&filename=&opi=89354086' },
  { name: 'Learners_Dashboard', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1NWIwZjEyZDA4Y2IwOTI1YzdkYWNhMmI3ZGM1EgsSBxCwrcqG6A4YAZIBIwoKcHJvamVjdF9pZBIVQhMyNzI4MzQ2OTE0NzAzMDIwODA2&filename=&opi=89354086' },
  { name: 'App_Integrations', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1NWIwZjE1ZTAxYzIwOTI1YzdkYWNhMmI3ZGM1EgsSBxCwrcqG6A4YAZIBIwoKcHJvamVjdF9pZBIVQhMyNzI4MzQ2OTE0NzAzMDIwODA2&filename=&opi=89354086' },
  { name: 'Global_Settings', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1NWIwZjE2YWM0OGYwNTNiNDk4OTk0MTRkYTAzEgsSBxCwrcqG6A4YAZIBIwoKcHJvamVjdF9pZBIVQhMyNzI4MzQ2OTE0NzAzMDIwODA2&filename=&opi=89354086' }
];

const outputDir = path.join(__dirname);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        // Handle redirect
        download(response.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  for (const s of screens) {
    const dest = path.join(outputDir, `${s.name}.html`);
    console.log(`Downloading ${s.name} into ${dest}...`);
    try {
      await download(s.url, dest);
      console.log(`Downloaded ${s.name}`);
    } catch (e) {
      console.error(`Failed ${s.name}:`, e);
    }
  }
}

run();
