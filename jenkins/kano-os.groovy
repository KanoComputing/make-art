#!/usr/bin/env groovy

@Library('kanolib') _

node('os') {
     stage('build') {
         dr {
             withCredentials([string(credentialsId: 'npm-read-only', variable: 'NPM_TOKEN')]) {
                 sh script: "dr build kano-draw -b ${env.BRANCH_NAME}"
                 
             }
         }
         
     }
    
}