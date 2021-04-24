pipeline {
    agent none
    environment {
        CONTAINER_REGISTRY = '253520709108.dkr.ecr.us-west-2.amazonaws.com'
        CONTAINER_REPO = 'mcc-code-school-recipe-app'
    }      
    stages {
        stage('Build App') {
            agent { 
                docker { 
                    image 'node:10.24.1-stretch'
                    args '-u root:sudo' 
                }
            }
            steps {
                echo "testing"
                // sh "npm install"
                // sh "npm run build"
            }
        }
        stage('Build and Publish Docker Container') {
            agent any
            steps {
                script {
                    docker.withRegistry('https://'${env.CONTAINER_REGISTRY}, 'ecr:us-west-2:jenkins-ecr') {
                        def image = docker.build('${env.CONTAINER_REPO}:${env.BUILD_ID}')
                        image.push()
                    }
                }
            }
        }
        stage('Deploy') {
            agent any
            steps {
                sshagent(credentials: ['AppServer']) {
                    sh """scp deploy.sh ubuntu@172.31.49.124:recipe"""
                    sh """ssh -t -o StrictHostKeyChecking=no ubuntu@172.31.49.124 'cd recipe && chmod 755 deploy.sh && ./deploy.sh ${env.BRANCH_NAME} ${CONTAINER_REGISTRY} ${env.CONTAINER_REPO}:${env.BUILD_ID}'"""
                }
            }
        }
    }
}