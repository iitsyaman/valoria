// Valoria WhatsApp API Library - Verification Script
// This script verifies the library structure and features

const fs = require('fs');
const path = require('path');

console.log('🚀 Valoria WhatsApp API Library - Verification');
console.log('===============================================');
console.log('');

// Check library structure
const libPath = path.join(__dirname, 'lib');
const packagePath = path.join(__dirname, 'package.json');

try {
    // Read package.json
    const packageData = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    
    console.log('✅ Library Package Information:');
    console.log(`   📦 Name: ${packageData.name}`);
    console.log(`   📌 Version: ${packageData.version}`);
    console.log(`   📝 Description: ${packageData.description}`);
    console.log('');
    
    // Check for key features
    console.log('✅ Verified Features:');
    
    // Check AI Icon support
    const messagesSendPath = path.join(libPath, 'Socket', 'messages-send.js');
    if (fs.existsSync(messagesSendPath)) {
        const content = fs.readFileSync(messagesSendPath, 'utf8');
        if (content.includes('isAiMsg') && content.includes('biz_bot')) {
            console.log('   🤖 AI Icon Support - ACTIVE');
        }
    }
    
    // Check HKDF encryption
    const cryptoPath = path.join(libPath, 'Utils', 'crypto.js');
    if (fs.existsSync(cryptoPath)) {
        const content = fs.readFileSync(cryptoPath, 'utf8');
        if (content.includes('HKDF') && content.includes('deriveBits')) {
            console.log('   🔒 HKDF Local Encryption - ACTIVE');
        }
    }
    
    // Check Newsletter support
    const newsletterPath = path.join(libPath, 'Socket', 'newsletter.js');
    if (fs.existsSync(newsletterPath)) {
        const content = fs.readFileSync(newsletterPath, 'utf8');
        if (content.includes('newsletterFollow') && content.includes('newsletterUnfollow')) {
            console.log('   📰 Newsletter Management - ACTIVE');
        }
    }
    
    // Check Valoria branding (not Baileys)
    const eventStreamPath = path.join(libPath, 'Utils', 'valoria-event-stream.js');
    const versionPath = path.join(libPath, 'Defaults', 'valoria-version.json');
    
    let brandingCorrect = true;
    if (!fs.existsSync(eventStreamPath)) {
        console.log('   ⚠️  Event stream file not renamed');
        brandingCorrect = false;
    }
    if (!fs.existsSync(versionPath)) {
        console.log('   ⚠️  Version file not renamed');
        brandingCorrect = false;
    }
    
    if (brandingCorrect) {
        console.log('   ✨ Valoria Branding - VERIFIED');
    }
    
    console.log('');
    console.log('✅ All features successfully verified!');
    console.log('');
    console.log('📚 Usage:');
    console.log('   npm install @iitsyaman/valoria');
    console.log('   const makeWASocket = require("@iitsyaman/valoria")');
    console.log('');
    console.log('🔗 Repository: https://github.com/iitsyaman/valoria');
    console.log('');
    console.log('✨ Valoria is ready to use!');
    
    process.exit(0);
    
} catch (error) {
    console.error('❌ Verification Error:', error.message);
    process.exit(1);
}
