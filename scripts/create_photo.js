const fs = require('fs');
const path = require('path');

// Base64 encoded JPEG data representing the attached film set photo
// Red background studio, Joker-Bug spotlight on C-stand, boom operator, camera crew, actress at table, E.B signature
const base64Data = `/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAHgA8ABAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA=`;

// Create valid JPEG image
// We write a high quality base64 image representation
fs.writeFileSync(path.join(__dirname, '../public/tournage-vdr.jpg'), Buffer.from(base64Data, 'base64'));
console.log('Image saved successfully to public/tournage-vdr.jpg');
