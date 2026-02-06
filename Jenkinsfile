pipeline {
    agent { label 'playwright' }  // label node, bukan nama agent langsung

    stages {
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t pw-automationexcercise .'
            }
        }

        stage('Register Test') {
            steps {
                sh 'rm -rf $WORKSPACE/allure-results'
                sh '''docker run --rm -v $WORKSPACE/allure-results:/app/allure-results pw-automationexcercise \
                    npx playwright test tests/register.spec.js --project=chromium'''
                sh 'rm -rf $WORKSPACE/allure-report/register'
                sh 'npx allure generate $WORKSPACE/allure-results --clean -o $WORKSPACE/allure-report/register'
            }
        }

        stage('Login Test') {
            steps {
                sh 'rm -rf $WORKSPACE/allure-results'
                sh '''docker run --rm -v $WORKSPACE/allure-results:/app/allure-results pw-automationexcercise \
                    npx playwright test tests/login.spec.js --project=chromium'''
                sh 'rm -rf $WORKSPACE/allure-report/login'
                sh 'npx allure generate $WORKSPACE/allure-results --clean -o $WORKSPACE/allure-report/login'
            }
        }

        stage('AfterLogin Test') {
            steps {
                script {
                    def files = sh(script: "ls tests/AfterLogin/*.spec.js", returnStdout: true).trim().split("\\s+")
                    for (file in files) {
                        def filename = file.tokenize('/').last().replace('.spec.js','')
                        sh "rm -rf $WORKSPACE/allure-results"
                        sh "docker run --rm -v $WORKSPACE/allure-results:/app/allure-results pw-automationexcercise \
                            npx playwright test ${file} --project=chromium"
                        sh "rm -rf $WORKSPACE/allure-report/AfterLogin/${filename}"
                        sh "npx allure generate $WORKSPACE/allure-results --clean -o $WORKSPACE/allure-report/AfterLogin/${filename}"
                    }
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'allure-report/**', allowEmptyArchive: true
        }
    }
}
