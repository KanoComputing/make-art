#!groovy
node {
    stage('check environment') {
        if (env.BRANCH_NAME=="master" || env.BRANCH_NAME=="jenkins") {
            env.NODE_ENV = "staging"
        } else if (env.BRANCH_NAME=="prod") {
            env.NODE_ENV = "production"
        }

        if (env.NODE_ENV == "staging") {
            load "/var/lib/jenkins/userContent/make-art-config/staging.env"
        } else if (env.NODE_ENV == "production") {
            load "/var/lib/jenkins/userContent/make-art-config/prod.env"
        }
    }

    stage('checkout') {
        checkout scm
    }

    stage('clean') {
        sh "rm -rf node_modules"
    }

    stage('install dependencies') {
        sh "npm install --ignore-scripts"
        sh "bower i"
    }

    stage('build') {
        sh "gulp default"
    }

    stage('compress') {
        sh "gulp compress"
    }

    stage('deploy') {
        if (env.BRANCH_NAME == "jenkins") {
            echo 'deploy skipped'
        } else if (env.NODE_ENV=="staging") {
            deploy_staging()
        } else if (env.NODE_ENV=="production") {
            deploy_prod()
        }
    }
}

def deploy_staging() {
    sh 'aws s3 sync ./www s3://art-staging.kano.me --region eu-west-1 --cache-control "max-age=600"'
}

def deploy_prod() {
    sh 'aws s3 sync ./www s3://make-art-site-prod --region us-west-1 --cache-control "max-age=600"'
}
