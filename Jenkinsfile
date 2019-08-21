#!groovy
@Library('kanolib') _

def utils;

pipeline {
    agent {
        label 'ubuntu_18.04_with_docker'
    }
    stages {
        stage('checkout') {
            steps {
                checkout scm
            }
        }
        stage('install dependencies') {
            steps {
                script {
                    docker.image('node:10-alpine').inside {
                        sh "apk update && apk upgrade && apk add --no-cache bash git openssh"
                        sh "mkdir -p ~/.ssh && ssh-keyscan github.com >> ~/.ssh/known_hosts"
                        withCredentials([string(credentialsId: 'npm-read-only', variable: 'NPM_TOKEN')]) {
                            sh "echo \"//registry.npmjs.org/:_authToken=${NPM_TOKEN}\" > .npmrc"
                        }
                        sshagent(['read-only-github']) {
                            sh "yarn"
                        }
                    }
                }
            }
        }
        stage('build') {
            steps {
                script {
                    def e = env.BRANCH_NAME == 'master' ? 'staging' : 'production';
                    docker.image('node:10-alpine').inside {
                        sh "yarn build"
                        sh "yarn build:web --env=${e}"
                    }
                }
            }
        }
        stage('release') {
            steps {
                script {
                    if (env.BRANCH_NAME != "master") {
                        return;
                    }
                    docker.image('ughly/alpine-aws-cli').inside {
                        withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: 'kart', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) {
                            sh 'aws s3 sync ./out/www s3://art-staging.kano.me --acl public-read'
                        }
                    }
                }
            }
        }
    }
    post {
        regression {
            script {
                email.notifyCulprits()
            }
        }
        fixed {
            script {
                email.notifyCulprits()
            }
        }
    }
    options {
        buildDiscarder(logRotator(numToKeepStr: '20'))
        timeout(time: 60, unit: 'MINUTES')
    }
}
