pipeline {

    agent any

    stages {

        stage('Checkout') {

            steps {

                git branch: 'dev_tinder', url: 'https://github.com/prafulhk/DevTinder-UI.git' 

            }

        }

        stage('Build Angular') {

            steps {

                dir('/home/ubuntu/DevTinder-UI') { // Navigate to the Angular project directory

                    sh 'sudo npm run build --prod'

                }

            }

        }

    }

}