pipeline {
    agent any
    tools {nodejs "nodejs"}

    stages {
        stage('Checkout') {
            steps {
                // Check out the source code from your repository
                git branch: 'dev_tinder', url: 'https://github.com/prafulhk/DevTinder-UI.git' 
            }
        }

        stage('Build and publish') {
            steps {
                sh 'npm run build'
            }
        }
    }

}