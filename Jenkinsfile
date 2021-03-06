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
                    docker.image('kanocomputing/node-gyp:10').inside('-u root') {
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
                    if (env.BRANCH_NAME == "rc") {
                        e = 'staging'
                    }
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
                    def target = "dev"
                    if (env.BRANCH_NAME != "master" && env.BRANCH_NAME != "rc" && env.BRANCH_NAME != "prod") {
                        return;
                    }
                    if (env.BRANCH_NAME == "rc") {
                        target = "staging"
                    }
                    if (env.BRANCH_NAME == "prod") {
                        target = "prod"
                    }
                    docker.image('ughly/alpine-aws-cli').inside {
                        withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: 'kart', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) {
                            sh "aws s3 rm s3://art-${target}.kano.me --recursive"
                            sh "aws s3 cp ./out/www s3://art-${target}.kano.me --recursive --acl public-read"
                        }
                    }
                }
            }
        }
    }
    post {
        always {
            jiraSendBuildInfo site: 'kanocomputing.atlassian.net'
        }
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
