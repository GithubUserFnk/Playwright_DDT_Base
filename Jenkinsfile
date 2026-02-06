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
                bat 'if exist "%WORKSPACE%\\allure-results" rmdir /s /q "%WORKSPACE%\\allure-results"'

                bat """
                    docker run --rm -v %WORKSPACE%\\allure-results:/app/allure-results pw-automationexcercise ^
                        npx playwright test tests/register.spec.js --project=chromium --no-sandbox
                """

                bat 'if exist "%WORKSPACE%\\allure-report\\register" rmdir /s /q "%WORKSPACE%\\allure-report\\register"'
                bat 'npx allure generate %WORKSPACE%\\allure-results --clean -o %WORKSPACE%\\allure-report\\register'
            }
        }

        stage('Login Test') {
            steps {
                bat 'if exist "%WORKSPACE%\\allure-results" rmdir /s /q "%WORKSPACE%\\allure-results"'

                bat """
                    docker run --rm -v %WORKSPACE%\\allure-results:/app/allure-results pw-automationexcercise ^
                        npx playwright test tests/login.spec.js --project=chromium --no-sandbox
                """

                bat 'if exist "%WORKSPACE%\\allure-report\\login" rmdir /s /q "%WORKSPACE%\\allure-report\\login"'
                bat 'npx allure generate %WORKSPACE%\\allure-results --clean -o %WORKSPACE%\\allure-report\\login'
            }
        }

        stage('AfterLogin Test') {
            steps {
                script {
                    def files = bat(script: "dir /b tests\\AfterLogin\\*.spec.js", returnStdout: true).trim().split("\\r?\\n")
                    for (file in files) {
                        def filename = file.tokenize('\\').last().replace('.spec.js','')
                        bat 'if exist "%WORKSPACE%\\allure-results" rmdir /s /q "%WORKSPACE%\\allure-results"'

                        bat """
                            docker run --rm -v %WORKSPACE%\\allure-results:/app/allure-results pw-automationexcercise ^
                                npx playwright test tests\\AfterLogin\\${file} --project=chromium --no-sandbox
                        """

                        bat "if exist \"%WORKSPACE%\\allure-report\\AfterLogin\\${filename}\" rmdir /s /q \"%WORKSPACE%\\allure-report\\AfterLogin\\${filename}\""
                        bat "npx allure generate %WORKSPACE%\\allure-results --clean -o %WORKSPACE%\\allure-report\\AfterLogin\\${filename}"
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
