pipeline {
    agent { label 'playwright' }

    environment {
        PLAYWRIGHT_HEADLESS = "1"
    }

    stages {

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t pw-automationexcercise .'
            }
        }

        stage('Register Test') {
            steps {
                bat 'if exist "%WORKSPACE%\\allure-results" rmdir /s /q "%WORKSPACE%\\allure-results"'
                bat 'if exist "%WORKSPACE%\\allure-report\\register" rmdir /s /q "%WORKSPACE%\\allure-report\\register"'

                bat """
                    docker run --rm ^
                        -e PLAYWRIGHT_HEADLESS=1 ^
                        -v %WORKSPACE%\\allure-results:/app/allure-results ^
                        -v %WORKSPACE%\\allure-report:/app/allure-report ^
                        pw-automationexcercise ^
                        /bin/bash -c "npx playwright test /app/tests/register.spec.js --project=chromium && npx allure generate /app/allure-results --clean -o /app/allure-report/register"
                """
            }
        }

        stage('Login Test') {
            steps {
                bat 'if exist "%WORKSPACE%\\allure-results" rmdir /s /q "%WORKSPACE%\\allure-results"'
                bat 'if exist "%WORKSPACE%\\allure-report\\login" rmdir /s /q "%WORKSPACE%\\allure-report\\login"'

                bat """
                    docker run --rm ^
                        -e PLAYWRIGHT_HEADLESS=1 ^
                        -v %WORKSPACE%\\allure-results:/app/allure-results ^
                        -v %WORKSPACE%\\allure-report:/app/allure-report ^
                        pw-automationexcercise ^
                        /bin/bash -c "npx playwright test /app/tests/login.spec.js --project=chromium && npx allure generate /app/allure-results --clean -o /app/allure-report/login"
                """
            }
        }

        stage('AfterLogin Test') {
            steps {
                bat 'if exist "%WORKSPACE%\\allure-results" rmdir /s /q "%WORKSPACE%\\allure-results"'
                bat 'if exist "%WORKSPACE%\\allure-report\\AfterLogin" rmdir /s /q "%WORKSPACE%\\allure-report\\AfterLogin"'

                bat """
                    docker run --rm ^
                        -e PLAYWRIGHT_HEADLESS=1 ^
                        -v %WORKSPACE%\\allure-results:/app/allure-results ^
                        -v %WORKSPACE%\\allure-report:/app/allure-report ^
                        pw-automationexcercise ^
                        /bin/bash -c "npx playwright test /app/tests/AfterLogin --project=chromium && npx allure generate /app/allure-results --clean -o /app/allure-report/AfterLogin"
                """
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'allure-report/**', allowEmptyArchive: true
        }
    }
}
