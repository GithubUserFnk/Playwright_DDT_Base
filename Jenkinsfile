pipeline {
    agent { label 'playwright' }  // label node, bukan nama agent langsung

    stages {
        stage('Build Docker Image') {
            steps {
                bat 'docker build -t pw-automationexcercise .'
            }
        }

        stage('Register Test') {
            steps {
                bat 'rm -rf $WORKSPACE/allure-results'
                bat '''docker run --rm -v $WORKSPACE/allure-results:/app/allure-results pw-automationexcercise \
                    npx playwright test tests/register.spec.js --project=chromium'''
                bat 'rm -rf $WORKSPACE/allure-report/register'
                bat 'npx allure generate $WORKSPACE/allure-results --clean -o $WORKSPACE/allure-report/register'
            }
        }

        stage('Login Test') {
            steps {
                bat 'rm -rf $WORKSPACE/allure-results'
                bat '''docker run --rm -v $WORKSPACE/allure-results:/app/allure-results pw-automationexcercise \
                    npx playwright test tests/login.spec.js --project=chromium'''
                bat 'rm -rf $WORKSPACE/allure-report/login'
                bat 'npx allure generate $WORKSPACE/allure-results --clean -o $WORKSPACE/allure-report/login'
            }
        }

        stage('AfterLogin Test') {
            steps {
                script {
                    def files = bat(script: "ls tests/AfterLogin/*.spec.js", returnStdout: true).trim().split("\\s+")
                    for (file in files) {
                        def filename = file.tokenize('/').last().replace('.spec.js','')
                        bat "rm -rf $WORKSPACE/allure-results"
                        bat "docker run --rm -v $WORKSPACE/allure-results:/app/allure-results pw-automationexcercise \
                            npx playwright test ${file} --project=chromium"
                        bat "rm -rf $WORKSPACE/allure-report/AfterLogin/${filename}"
                        bat "npx allure generate $WORKSPACE/allure-results --clean -o $WORKSPACE/allure-report/AfterLogin/${filename}"
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
