#!/usr/bin/env groovy
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Library('kanolib') _

def archiveUrl;
def utils;

def notify(data) {
    JSONArray attachments = new JSONArray();

    JSONObject message = new JSONObject();
    message.put('title', "New version of Make Art available for ${data.platformName} available");
    message.put('color', '#36a64f');

    attachments.add(message);

    JSONObject platform = new JSONObject();
    platform.put('title', data.downloadLink);
    platform.put('author_name', data.platformName);
    platform.put('author_icon', data.icon);
    platform.put('color', '#36a64f');

    attachments.add(platform);

    slackSend channel: data.channel, attachments: attachments.toString()
}

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
        PUBLISHER_ID = '5F3CCEA7-D562-4AF0-A330-11A092BC3806' /* Publisher id for the App */
        MSBUILD_PATH = "D:\\Program Files (x86)\\Microsoft Visual Studio\\2017\\Community\\MSBuild\\15.0\\Bin\\MsBuild.exe"
        DevEnvDir = "D:\\Program Files (x86)\\Microsoft Visual Studio\\2017\\Community\\Common7\\IDE"
        NODE_ENV = 'staging'
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
                        bat "yarn build:uwp --dev-cert=${devCert} --windows-kit=\"${WINDOWS_KIT}\" --env=${env.NODE_ENV} --msbuild-path=\"${env.MSBUILD_PATH}\" --release"
                    }
                    def appPath = bat returnStdout: true, script: "@yarn run --silent find-app:uwp"
                    withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'kart']]) {
                        archiveUrl = bat returnStdout: true, script: "@yarn run --silent kart archive ${appPath.trim()} -a releases.kano.me --name make-art-pc --arch appx -t none -b ${env.BUILD_NUMBER} -c ${env.NODE_ENV} -r ."
                        archiveUrl = archiveUrl.replace("releases.kano.me.s3.amazonaws.com", "releases.kano.me")
                        notify channel: '#beta-releases', platformName: 'Microsoft Store', downloadLink: archiveUrl, icon: 'https://upload.wikimedia.org/wikipedia/fr/2/2b/Microsoft_Store_Logo.png'
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
