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
                // Hapus results & report lama
                bat 'if exist "%WORKSPACE%\\allure-results" rmdir /s /q "%WORKSPACE%\\allure-results"'
                bat 'if exist "%WORKSPACE%\\allure-report\\register" rmdir /s /q "%WORKSPACE%\\allure-report\\register"'

                // Run test di container, storage/downloads reset
                bat """
                    docker run --rm ^
                        -e PLAYWRIGHT_HEADLESS=1 ^
                        -v %WORKSPACE%\\allure-results:/app/allure-results ^
                        -v %WORKSPACE%\\storage:/app/storage ^
                        -v %WORKSPACE%\\downloads:/app/downloads ^
                        pw-automationexcercise ^
                        /bin/bash -c "
                            rm -rf /app/storage /app/downloads &&
                            mkdir -p /app/storage /app/downloads &&
                            npx playwright test /app/tests/register.spec.js --project=chromium
                        "
                """

                // Generate report di host
                bat """
                    npx allure generate %WORKSPACE%\\allure-results --clean -o %WORKSPACE%\\allure-report/register
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
                        -v %WORKSPACE%\\storage:/app/storage ^
                        -v %WORKSPACE%\\downloads:/app/downloads ^
                        pw-automationexcercise ^
                        /bin/bash -c "
                            rm -rf /app/storage /app/downloads &&
                            mkdir -p /app/storage /app/downloads &&
                            npx playwright test /app/tests/login.spec.js --project=chromium
                        "
                """

                bat """
                    npx allure generate %WORKSPACE%\\allure-results --clean -o %WORKSPACE%\\allure-report/login
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
                        -v %WORKSPACE%\\storage:/app/storage ^
                        -v %WORKSPACE%\\downloads:/app/downloads ^
                        pw-automationexcercise ^
                        /bin/bash -c "
                            rm -rf /app/storage /app/downloads &&
                            mkdir -p /app/storage /app/downloads &&
                            npx playwright test /app/tests/AfterLogin --project=chromium
                        "
                """

                bat """
                    npx allure generate %WORKSPACE%\\allure-results --clean -o %WORKSPACE%\\allure-report/AfterLogin
                """
            }
        }
    }

    post {
        always {
            // Archive semua report
            archiveArtifacts artifacts: 'allure-report/**', allowEmptyArchive: true
        }
    }
}
