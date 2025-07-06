pipeline {
    agent any

    stages {
        stage("Install Dependencies") {
            steps {
                sh "npm install"
            }
        }

        stage("Build") {
            steps {
                sh "npm run build"
            }
        }

        stage("Deliver") {
            steps {
                sh "./jenkins/deploy.sh"
                input message: "Finished using the web site? (Click \"Proceed\" to continue)"
                sh "./jenkins/kill.sh"
            }
        }
    }
}