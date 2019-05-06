#!/usr/bin/env groovy
@Library('kanolib') _

def archiveUrl;
def utils;

pipeline {
    agent {
        node {
            label 'win-slave-1'
            customWorkspace "ws/${env.JOB_NAME}"
        }
    }
    environment {
        KASH_TMP_DIR = '.tmp'
        WINDOWS_KIT = 'C:/Program Files (x86)/Windows Kits/10/bin/10.0.15063.0/x64/' /* Location of the windows kit on win-slave-1 */
        PUBLISHER_ID = '5F3CCEA7-D562-4AF0-A330-11A092BC3806' /* Publisher id for the Kano App */
    }
    stages {
        stage('checkout') {
            steps {
                checkout scm
            }
        }
        stage('build') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'npm-read-only', variable: 'NPM_TOKEN')]) {
                        bat "echo //registry.npmjs.org/:_authToken=${NPM_TOKEN} > .npmrc"
                    }
                    sshagent(['read-only-github']) {
                        bat "yarn"
                    }
                    withCredentials([file(credentialsId: PUBLISHER_ID, variable: 'devCert')]) {
                        bat "yarn build:uwp --dev-cert=${devCert} --windows-kit=\"${WINDOWS_KIT}\" --env=${env.NODE_ENV} --release"
                    }
                    withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'kart']]) {
                        archiveUrl = bat returnStdout: true, script: "@yarn run --silent kart archive ./KanoComputing.MakeArt.appx -a releases.kano.me --name make-art --arch appx -t none -b ${env.BUILD_NUMBER} -c ${env.NODE_ENV} -r ."
                        archiveUrl = archiveUrl.replace("releases.kano.me.s3.amazonaws.com", "releases.kano.me")
                    }
                }
            }
        }
    }
    post {
        fixed {
            script {
                email.notifyCulprits()
            }
        }
        regression {
            script {
                email.notifyCulprits()
            }
        }
    }
}
