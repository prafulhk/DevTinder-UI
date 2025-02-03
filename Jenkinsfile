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

        stage('Build and publish') {
            steps {
                sh 'npm run ng -- build --aot --output-hashing=all'
            }
        }
    }

}