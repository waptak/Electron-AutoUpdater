#!/usr/bin/env node

const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')
const rimraf = require('rimraf')

deleteOutputFolder()
  .then(getInstallerConfig)
  .then(createWindowsInstaller)
  .catch((error) => {
    console.error(error.message || error)
    process.exit(1)
  })

function getInstallerConfig () {
  const rootPath = path.join(__dirname, '..')
  const outPath = path.join(rootPath, 'out')

  return Promise.resolve({
    appDirectory: path.join(outPath, 'electron-quick-start-win32-x64'),
    outputDirectory: path.join(outPath, 'windows-installer'),
    loadingGif: path.join(rootPath, 'assets', 'loading.gif'),
    exe: 'electron-quick-start.exe',
    iconUrl: path.join(rootPath, 'assets', 'app.ico'),
    
    noMsi: true,
    
    setupExe: '测试安装包.exe',
    setupIcon: path.join(rootPath,  'assets', 'app.ico'),
    skipUpdateIcon: true
  })
}

function deleteOutputFolder () {
  return new Promise((resolve, reject) => {
    rimraf(path.join(__dirname, '..', 'out', 'windows-installer'), (error) => {
      error ? reject(error) : resolve()
    })
  })
}
