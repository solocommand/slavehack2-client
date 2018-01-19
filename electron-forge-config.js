const path = require('path');

const name = 'Slavehack 2';
const icon = 'assets/icons/logo';
const installer = 'assets/win/installer';
const desc = 'Slavehack2';
const year = new Date().getFullYear();
const company = 'Slavehack 2';

function getSigningCert() {
  if (process.platform !== 'win32') {
    return;
  }

  if (process.env.CODESIGN_CERTIFICATE) {
    return process.env.CODESIGN_CERTIFICATE;
  } else {
    console.log('Codesigning certificate can not be found, release build will fail');
    console.log('To fix, set CODESIGN_CERTIFICATE');
  }
}

function getSigningPassword() {
  if (process.platform !== 'win32') {
    return;
  }

  if (process.env.CODESIGN_PASSWORD) {
    return process.env.CODESIGN_PASSWORD;
  } else {
    console.log('Codesigning password can not be found, release build will fail');
    console.log('To fix, set CODESIGN_PASSWORD');
  }
}

module.exports = {
  make_targets: {
    win32: ['zip'],
    darwin: ['zip']
  },
  electronPackagerConfig: {
    asar: false,
    packageManager: 'yarn',
    appCategoryType: 'public.app-category.productivity',
    appCopyright: `Copyright (c) ${year} ${company}`,
    name: name,
    versionString: {
      CompanyName: company,
      FileDescription: desc,
      ProductName: name,
      InternalName: name
    },
    overwrite: true,
    icon: icon
  },
  electronInstallerDMG: {
    title: name,
    background: path.join(__dirname, `../${installer}.png`),
    icon: `${icon}.icns`,
    iconsize: 100,
    window: {
      size: {
        width: 600,
        height: 571
      }
    }
  },
  electronWinstallerConfig: {
    name: name,
    icon: icon,
    authors: company,
    exe: `${name}.exe`,
    iconUrl: `https://www.slavehack2.com/favicon.png`,
    setupIcon: path.join(__dirname, `../${icon}.ico`),
    title: name,
    noMsi: false,
    loadingGif: path.join(__dirname, `../${installer}.png`),
    certificateFile: getSigningCert(),
    certificatePassword: getSigningPassword()
  },
  electronInstallerDebian: {},
  electronInstallerRedhat: {},
  github_repository: {
    owner: 'limit-zero',
    name: 'slavehack2-electron',
    draft: false,
    prerelease: true
  },
  windowsStoreConfig: {
    packageName: `io.limit0.sh2.${name}`,
    name: name
  }
};
