pipeline {
    agent playwright

    stages {
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t pw-automationexcercise .'
            }
        }

        stage('Register Test') {
            steps {
                // Bersihkan folder allure-results sebelum run
                sh 'rm -rf $WORKSPACE/allure-results'

                // Jalankan test register di Docker
                sh 'docker run --rm -v $WORKSPACE/allure-results:/app/allure-results pw-automationexcercise \
                    npx playwright test tests/register.spec.js --project=chromium'

                // Generate HTML report fase register
                sh 'rm -rf $WORKSPACE/allure-report/register'
                sh 'npx allure generate $WORKSPACE/allure-results --clean -o $WORKSPACE/allure-report/register'
            }
        }

        stage('Login Test') {
            steps {
                sh 'rm -rf $WORKSPACE/allure-results'

                sh 'docker run --rm -v $WORKSPACE/allure-results:/app/allure-results pw-automationexcercise \
                    npx playwright test tests/login.spec.js --project=chromium'

                sh 'rm -rf $WORKSPACE/allure-report/login'
                sh 'npx allure generate $WORKSPACE/allure-results --clean -o $WORKSPACE/allure-report/login'
            }
        }

        stage('AfterLogin Test') {
            steps {
                script {
                    // Ambil semua file .spec.js di folder AfterLogin
                    def files = sh(script: "ls tests/AfterLogin/*.spec.js", returnStdout: true).trim().split("\\s+")
                    
                    for (file in files) {
                        def filename = file.tokenize('/').last().replace('.spec.js','')
                        
                        // Bersihkan allure-results sebelum tiap file run
                        sh "rm -rf $WORKSPACE/allure-results"
                        
                        // Run test di Docker
                        sh "docker run --rm -v $WORKSPACE/allure-results:/app/allure-results pw-automationexcercise \
                            npx playwright test ${file} --project=chromium"
                        
                        // Bersihkan report HTML lama
                        sh "rm -rf $WORKSPACE/allure-report/AfterLogin/${filename}"
                        
                        // Generate report per file
                        sh "npx allure generate $WORKSPACE/allure-results --clean -o $WORKSPACE/allure-report/AfterLogin/${filename}"
                    }
                }
            }
        }
    }

    post {
        always {
            // Archive semua HTML report
            archiveArtifacts artifacts: 'allure-report/**', allowEmptyArchive: true
        }
    }
}
