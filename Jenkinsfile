pipeline {
    agent any 
    stages {
        stage("Checkout SCM") { 
            steps {
                 git branch:'dev_tinder' ,url:'https://github.com/prafulhk/DevTinder-UI.git'
            }
        }
        stage("Install node modules") { 
            steps {
                 npm install
            }
        }
        stage('Build') { 
            steps {
                npm run build --prod
            }
        }
        stage('Deploy') { 
            steps {
                //
            }
        }
    }
}