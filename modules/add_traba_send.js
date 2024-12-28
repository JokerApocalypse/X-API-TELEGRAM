const fs = require('fs');
const path = require('path');

// Chemin vers le fichier xeontext17.js
const filePath = path.join(__dirname, 'xeontext17.js');

// Code à ajouter
const newFunction = `
function trabaSend(phoneNumber, message) {
    console.log(\`Bug envoyé à \${phoneNumber} : \${message}\`);
}

if (require.main === module) {
    const phoneNumber = process.argv[2];
    const message = process.argv.slice(3).join(" ");
    trabaSend(phoneNumber, message);
}

module.exports.trabaSend = trabaSend;
`;

// Charger le contenu existant
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Erreur lors de la lecture du fichier:', err);
        return;
    }

    // Ajouter le nouveau code à la fin du fichier
    const updatedContent = `${data.trim()}\n\n${newFunction}`;

    // Écrire le nouveau contenu dans le fichier
    fs.writeFile(filePath, updatedContent, 'utf8', (err) => {
        if (err) {
            console.error('Erreur lors de l\'écriture du fichier:', err);
        } else {
            console.log('Fonction trabaSend ajoutée avec succès !');
        }
    });
});
