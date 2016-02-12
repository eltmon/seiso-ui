#!/usr/bin/env node

/**
 * 'npm install' without a set of excluded packages.
 * 
 * Author: Ian McCunn <imccunn@expedia.com>
 *
 */

'use strict';

var fs = require('fs'),
    exec = require('child_process').exec,
    args = process.argv,
    packageFile = args[2] || 'package.json',
    exclusionsFile = args[3],
    preservePackage = (args[4] === 'true'),
    createBackup = (args[5] === 'true'),
    installPackages = (args[6] === 'true'),
    exclusions; // to be set after file is read.
console.log(args);

// Fail if any number of args are not passed.
// TODO: Use arguments handling package or create ability for optional flags. [IDM]
for (var i = 0; i < args.length; i++) {
  if (args[i] == undefined || args[i] == '') {
    console.log('bad arg: ', args[i]);
    usage();
    EXIT1();
    return;
  }
}

// Optionally create a backup/copy of original package.json
console.log('Installing deployment packages');
if (createBackup === 'true') {
  console.log('creating backup of package.json');
  exec('cp package.json package.json.bak', function(err, stdo, stderr) {
    if (err) return console.log(err);
    console.log('-- created backup');
  });
}

// Read in exclusions file of list of package names and create array of dependency names.
// This assumes they are spelled according to npm registry name.
if (!exclusionsFile) {
  console.log('No package exclusions specified.');
  console.log('Specify a newline delimited text file of package names to exlude from npm install');
  EXIT1();
} else {
  fs.readFile(exclusionsFile, 'utf-8', function(err, data) {
    if (err) return console.log(err);
    exclusions = data.split('\n');
    console.log('Excluding these packages: \n', exclusions);
  });
}

// Read package.json dependencies list.
fs.readFile(packageFile, 'utf-8', function(err, data) {
  if (err) return console.log(err);
  var originalPackage = JSON.parse(data),
      deployPackage = originalPackage;
  
  // Remove dependency from dependencies object if matched by exclusions list.
  for (var packKey in deployPackage.devDependencies) {
    if (exclusions.indexOf(packKey) !== -1) {
      delete deployPackage.devDependencies[packKey];
    }
  }
  // Remove original package.json.
  fs.unlink(packageFile, function(err) {
    if (err) return console.log(err);
    
    // Write package.json with dependencies list which has exclusions removed. 
    fs.writeFile(packageFile, JSON.stringify(deployPackage, null, 2), 'utf-8', function(err) {
      if (err) return console.log(err);

      if (installPackages) {
        // Run 'npm install' with deployment dependencies
        console.log('Installing dependencies...');
        exec('npm install', function(err, stdout, stderr) {
          if (err) return console.log(err);
          console.log(stdout, stderr);

          // Optionally reinstate original package.json.
          if (preservePackage) { 
            fs.writeFile('package.json', JSON.stringify(originalPackage, null, 2), function(err) { 
              if (err) return console.log(err);
              console.log('Original package.json restored.');
            }) 
          } else {
            // Otherwise remove package.json from deployment artifact.
            fs.unlink('package.json', function(err) {
              if (err) return console.log(err);
              console.log('Deploy packages installed. package.json removed.');
            });
          }
        });
      } else {
        console.log('Deploy package.json created. Packages not installed.');
      }
    });
  });
});

function EXIT1(){
  process.exit(1);
}

function usage() {
  console.log('Usage: ');
  console.log('node ./deployInstall.js \'package.json\' textFileOfExclusions Bool:preservePackage Bool:createPackageBackup');
}
