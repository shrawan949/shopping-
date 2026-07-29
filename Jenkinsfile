pipeline{
    agent any
    environment{
        DOCKER_USERNAME = "shrawanambarte0101"
        BACKEND_IMAGE = "shrawanambarte0101/backend:${BUILD_NUMBER}"
        FRONTEND_IMAGE = "shrawanambarte0101/frontend:${BUILD_NUMBER}"

    }
    tools{
        maven 'maven'
    }
    stages{
        stage('checkout'){
            steps{
                checkout scm
            }
        }
        stage('Build Backend'){
            steps{
                dir ('backend'){
                    sh 'mvn clean package'
                }
            }
        }
        stage('Build Backend Docker Image'){
            steps{
                dir ('backend'){
                    sh 'docker build -t shrawanambarte0101/backend:${BUILD_NUMBER} .'
                }
            }
        }
        stage('Build frontend image'){
            steps{
                dir ('frontend'){
                    sh 'docker build -t shrawanambarte0101/frontend:${BUILD_NUMBER} .'
                }
            }
        }
        stage('Docker login'){
            steps{
                  withCredentials([
                    usernamePassword(
                        credentialsId: 'docker-cred',
                        usernameVariable: 'USERNAME',
                        passwordVariable: 'PASSWORD'
                    )
                ]) {
                    sh '''
                    echo "$PASSWORD" | docker login \
                    -u "$USERNAME" \
                    --password-stdin
                    '''
                }
            }
        }
        stage('docker image push '){
            steps{
                sh 'docker push shrawanambarte0101/frontend:${BUILD_NUMBER}'
                sh 'docker push shrawanambarte0101/backend:${BUILD_NUMBER}'
            }
        }
        stage('Deploy to kubernetes'){
            steps{
                sh 'kubectl set image deployment/java-pro con1=shrawanambarte0101/backend:${BUILD_NUMBER}'
                sh 'kubectl set image deployment/java-pro-front con1=shrawanambarte0101/frontend:${BUILD_NUMBER}'
            }
        }
    }
    post {
        success {
            echo 'Deployment completed successfully.'
        }

        failure {
            echo 'Pipeline failed.'
        }

        always {
            sh 'docker logout || true'
        }
    }

}
