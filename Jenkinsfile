pipeline {
    agent none      
    stages {
        stage('Build App') {
            agent { 
                docker { 
                    image 'node:10.24.1-stretch'
                    args '-u root:sudo --privileged -v /var/run/docker.sock:/var/run/docker.sock -v /usr/bin/docker:/usr/bin/docker' 
                }
            }
            steps {
                sh "npm install"
                sh "npm run build"
            }
        }
        stage('Build and Publish Docker Container') {
            agent any
            steps {
                sh "ls -latr"
                script {
                    docker.withRegistry('253520709108.dkr.ecr.us-west-2.amazonaws.com', 'ecr:us-west-2:jenkins-ecr') {
                        def image = docker.build("mcc-code-school-recipe-app:${env.BUILD_ID}")
                        image.push()
                    }
                }
            }
        }
        stage('Deploy') {
            agent any
            steps {
                sshagent(credentials: ['AppServer']) {
                    sh """ssh -t -o StrictHostKeyChecking=no ubuntu@172.31.49.124 'touch jenkins_was.here'"""
                }
            }
        }
    }
}