const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
  { name: 'vincent-about-portrait.jpg', id: '1MLlNtGpdf0WwJxkSxtZMdoAmvVdq6B1W' },
  { name: 'about-section-bg.jpg', id: '159GRBKof-1PiDfdPy48my0ldxcqdwFmn' },
  { name: 'about-bg-drive.jpg', id: '159GRBKof-1PiDfdPy48my0ldxcqdwFmn' },
  { name: 'solutions-section-bg.jpg', id: '1IcnLFsmdVR6T7qAlGwyQp2M6loEG_tPI' },
  { name: 'about-page-portrait.jpg', id: '1pOREKWbV0xz8T86jHSfAYryDF4C7MhZz' },
  { name: 'about-page-bg.jpg', id: '1Fy9D2gnUd8_Zm-7naplOwBjTjAONyB36' },
  { name: 'career-timeline-bg.jpg', id: '1SFSREcdcQQ0QDRXfYMje2ODMZuyb2pBO' },
  { name: 'timeline-1996-photo.jpg', id: '1LA_4dkGAe5AuG4XJhxmia3vhQs32Pgnh' },
  { name: 'timeline-2004-photo.jpg', id: '1ZJdD4suaTO7RwSw9xgMChmqz8RYznBgR' },
  { name: 'timeline-2009-photo.jpg', id: '1w2mG7LNbxHh5A1UhE6nIZ469lwNSXl59' },
  { name: 'timeline-2018-photo.jpg', id: '1FJxgo4yLi3r3JRHq-zHa-_Bvd29VCPHc' },
  { name: 'timeline-2023-photo.jpg', id: '1SDD5HTHpenoSv4DlRkps9ikCc_Dh1WcS' },
  { name: 'timeline-present-photo.jpg', id: '1YlAp_jSntLuR0lBNl-BY7Lrs4tPCcGXw' },
  { name: 'contact-page-bg.jpg', id: '14mM7a_HWvAdzoUP0ttr14XyP5D7fpknx' },
  { name: 'contact-page-bg-alt.jpg', id: '1INshm8OMsMhZ-r5lX1OeQcPqM7FZCYb-' },
  { name: 'contact-page-bg-alt2.jpg', id: '14mM7a_HWvAdzoUP0ttr14XyP5D7fpknx' },
  { name: 'services-page-bg.jpg', id: '1WBJL_9W178UX5CEQBNgy4VUC_i0HRDM7' },
  { name: 'production-process-bg.jpg', id: '1Dx6zT_4KKSWWbYfnDlX7Eugzu7_DwnQo' },
  { name: 'portfolio-section-bg.jpg', id: '1vFQfJEkmrzDZMBnro-nBHUlH3thjaOir' },
  { name: 'youtube-channel-bg.jpg', id: '1SFkMUuCwKCx9RnhAfpvtTccupXXO_FOe' }
];

function fetchBinary(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        fetchBinary(res.headers.location).then(resolve).catch(reject);
      } else if (res.statusCode === 200) {
        const chunks = [];
        res.on('data', chunk => chunks.push(chunk));
        res.on('end', () => resolve(Buffer.concat(chunks)));
      } else {
        reject(new Error('HTTP ' + res.statusCode));
      }
    }).on('error', reject);
  });
}

async function restoreAll() {
  const dirs = ['src/assets', 'public', 'dist'];
  dirs.forEach(d => {
    if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
  });

  console.log('Downloading and saving all images...');
  for (const item of images) {
    try {
      const url = `https://lh3.googleusercontent.com/d/${item.id}=s2500`;
      const buffer = await fetchBinary(url);
      const header = buffer.slice(0, 3).toString('hex');
      const isValid = header === 'ffd8ff' || header === '89504e';

      if (isValid) {
        dirs.forEach(d => {
          fs.writeFileSync(path.join(d, item.name), buffer);
        });
        console.log(`VALID JPEG: ${item.name.padEnd(28)} | ${buffer.length} bytes`);
      } else {
        console.error(`INVALID HEADER for ${item.name}: ${header}`);
      }
    } catch (e) {
      console.error(`Error downloading ${item.name}:`, e.message);
    }
  }
  console.log('Done downloading!');
}

restoreAll();
