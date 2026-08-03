pipeline {
    agent any

    environment {
        DOCKER_USERNAME = "shrawanambarte0101"
        BACKEND_IMAGE = "${DOCKER_USERNAME}/shopping-backend:${BUILD_NUMBER}"
        FRONTEND_IMAGE = "${DOCKER_USERNAME}/shopping-frontend:${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh 'mvn clean package'
                }
            }
        }

        stage('Build Docker Images') {
            steps {

                dir('backend') {
                    sh "docker build -t ${BACKEND_IMAGE} ."
                }

                dir('frontend') {
                    sh "docker build -t ${FRONTEND_IMAGE} ."
                }

            }
        }

        stage('Docker Login') {
            steps {

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

        stage('Push Docker Images') {
            steps {

                sh "docker push ${BACKEND_IMAGE}"
                sh "docker push ${FRONTEND_IMAGE}"

            }
        }

        stage('Deploy to Kubernetes') {
            steps {

                sh """
                kubectl set image deployment/shopping-backend \
                backend=${BACKEND_IMAGE} \
                -n shopping
                """

                sh """
                kubectl set image deployment/shopping-frontend \
                frontend=${FRONTEND_IMAGE} \
                -n shopping
                """

            }
        }

        stage('Verify Deployment') {
            steps {

                sh 'kubectl rollout status deployment/shopping-backend -n shopping'
                sh 'kubectl rollout status deployment/shopping-frontend -n shopping'

            }
        }
    }
}
