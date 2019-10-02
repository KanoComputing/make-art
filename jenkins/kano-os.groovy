#!/usr/bin/env groovy

@Library('kanolib') _

node('os') {
     stage('build') {
         dr {
             withCredentials([string(credentialsId: 'npm-read-only', variable: 'NPM_TOKEN')]) {
                 sh script: "set -e; dr build kano-draw -b OS-1064/jenkins-built-process-for-KanoOS"
                 
             }
         }
         
     }
    
}