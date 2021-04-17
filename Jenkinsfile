pipeline {
    agent { docker { image 'node:10.24.0'
                     args '-u root:sudo -v /var/run/docker.sock:/var/run/docker.sock -v /usr/bin/docker:/usr/bin/docker' 
                    }
    stages {
        stage('Prebuild') {
            steps {
                sh "npm install"
                sh "docker ps"
            }
        }
        stage('Build') {
            environment {
                BITBUCKET_COMMON_CREDS = credentials('RecipeAppJenkins')
            }
            steps {
                sh "npm run build"
                sh "docker login gitlab.mccinfo.net:5050 -u ${BITBUCKET_COMMON_CREDS_USR} -p ${BITBUCKET_COMMON_CREDS_PSW}"
                sh "docker build -t gitlab.mccinfo.net:5050/code-school/students/recipe-app ."
                sh "docker push gitlab.mccinfo.net:5050/code-school/students/recipe-app"
            }
        }
        stage('Deploy') {
            steps {
                sshagent(credentials: ['AppServer']) {
                    sh """ssh -t -o StrictHostKeyChecking=no ubuntu@172.31.49.124 'touch jenkins_was.here'"""
                }
            }
        }
    }
}