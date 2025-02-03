pipeline {
    agent any
    tools {nodejs "nodejs"}

    stages {
        stage('Checkout') {
            steps {
                // Check out the source code from your repository
                checkout scm
            }
        }

        stage('Build Angular App') {
            steps {
                // Build the Angular app
                sh 'npm run build'
            }
        }
    }

}