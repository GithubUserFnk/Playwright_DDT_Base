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

                // Jalankan test + generate Allure di dalam container
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
                script {
                    // Ambil daftar file .spec.js di workspace Windows
                    def files = bat(script: "dir /b tests\\AfterLogin\\*.spec.js", returnStdout: true).trim().split("\\r?\\n")
                    for (file in files) {
                        def filename = file.replace('.spec.js','')
                        bat 'if exist "%WORKSPACE%\\allure-results" rmdir /s /q "%WORKSPACE%\\allure-results"'
                        bat "if exist \"%WORKSPACE%\\allure-report\\AfterLogin\\${filename}\" rmdir /s /q \"%WORKSPACE%\\allure-report\\AfterLogin\\${filename}\""

                        // Jalankan test di container menggunakan path Linux style
                        bat """
                            docker run --rm ^
                                -e PLAYWRIGHT_HEADLESS=1 ^
                                -v %WORKSPACE%\\allure-results:/app/allure-results ^
                                -v %WORKSPACE%\\allure-report:/app/allure-report ^
                                pw-automationexcercise ^
                                /bin/bash -c "npx playwright test /app/tests/AfterLogin/${file} --project=chromium && npx allure generate /app/allure-results --clean -o /app/allure-report/AfterLogin/${filename}"
                        """
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
