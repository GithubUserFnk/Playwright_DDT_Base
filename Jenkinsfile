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
                // Hapus hasil lama allure
                bat 'if exist "%WORKSPACE%\\allure-results" rmdir /s /q "%WORKSPACE%\\allure-results"'
                bat 'if exist "%WORKSPACE%\\allure-report\\register" rmdir /s /q "%WORKSPACE%\\allure-report\\register"'

                // Jalankan test Register, ga perlu storage/downloads
                bat 'docker run --rm -e PLAYWRIGHT_HEADLESS=1 -v %WORKSPACE%\\allure-results:/app/allure-results pw-automationexcercise /bin/bash -c "npx playwright test /app/tests/register.spec.js --project=chromium"'

                // Generate report
                bat 'npx allure generate %WORKSPACE%\\allure-results --clean -o %WORKSPACE%\\allure-report/register'
            }
        }

        stage('Login Test') {
            steps {
                bat 'if exist "%WORKSPACE%\\allure-results" rmdir /s /q "%WORKSPACE%\\allure-results"'
                bat 'if exist "%WORKSPACE%\\allure-report\\login" rmdir /s /q "%WORKSPACE%\\allure-report\\login"'

                // 🔹 Hapus dulu storage & downloads kalau ada
                bat 'if exist "%WORKSPACE%\\storage" rmdir /s /q "%WORKSPACE%\\storage"'
                bat 'if exist "%WORKSPACE%\\downloads" rmdir /s /q "%WORKSPACE%\\downloads"'

                // 🔹 Buat ulang storage & downloads
                bat 'mkdir "%WORKSPACE%\\storage"'
                bat 'mkdir "%WORKSPACE%\\downloads"'

                // Jalankan Login test di Docker
                bat 'docker run --rm -e PLAYWRIGHT_HEADLESS=1 -v %WORKSPACE%\\allure-results:/app/allure-results -v %WORKSPACE%\\storage:/app/storage -v %WORKSPACE%\\downloads:/app/downloads pw-automationexcercise /bin/bash -c "npx playwright test /app/tests/login.spec.js --project=chromium"'

                // Generate report
                bat 'npx allure generate %WORKSPACE%\\allure-results --clean -o %WORKSPACE%\\allure-report/login'
            }
        }

        stage('AfterLogin Test') {
            steps {
                bat 'if exist "%WORKSPACE%\\allure-results" rmdir /s /q "%WORKSPACE%\\allure-results"'
                bat 'if exist "%WORKSPACE%\\allure-report\\AfterLogin" rmdir /s /q "%WORKSPACE%\\allure-report\\AfterLogin"'

                // Jalankan AfterLogin test, pakai storage & downloads dari Login stage
                bat 'docker run --rm -e PLAYWRIGHT_HEADLESS=1 -v %WORKSPACE%\\allure-results:/app/allure-results -v %WORKSPACE%\\storage:/app/storage -v %WORKSPACE%\\downloads:/app/downloads pw-automationexcercise /bin/bash -c "npx playwright test /app/tests/AfterLogin --project=chromium"'

                // Generate report
                bat 'npx allure generate %WORKSPACE%\\allure-results --clean -o %WORKSPACE%\\allure-report/AfterLogin'
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
