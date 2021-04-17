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
            agent { 
                any
            }
            steps {
                script {
                    docker.withRegistry('https://gitlab.mccinfo.net:5050', 'RecipeAppJenkins') {
                        def image = docker.build("gitlab.mccinfo.net:5050/code-school/students/recipe-app:${env.BUILD_ID}")
                        image.push()
                    }
                }
            }
        }
        stage('Deploy') {
            agent {
                any
            }
            steps {
                sshagent(credentials: ['AppServer']) {
                    sh """ssh -t -o StrictHostKeyChecking=no ubuntu@172.31.49.124 'touch jenkins_was.here'"""
                }
            }
        }
    }
}