@Library('solution-shared-libraries') _

pipeline {
    agent any

    environment{
            
            GIT_TOKEN= credentials('Ahmed-git-token')
            DB_HOST= "local"
            USER= "Ahmed"
            USER_PASS= credentials('Ahmed-pass')
            DB_NAME= "testdb"
            SERVICE= "http://165.22.84.60:30100/"
    }

    tools{
        nodejs 'nodejs16'
    }
    options {
        timestamps()
            }

    stages {
        stage('Git Checkout') {
            steps {
                git branch: 'main', credentialsId: 'Ahmed-git-cred', url: 'https://github.com/Ahmedmelenany/End-To-End-React-NodeJS-Project.git'
            }
        }
        
        stage('Install Dependencies ') {
           steps{ 
                cache(maxCacheSize: 600, caches: [
                    arbitraryFileCache(
                    cacheName: 'npm-dependencies',
                    cacheValidityDecidingFile: 'package-lock.json',
                    includes: '**/*',
                    path: 'node_modules')]) {   
                        
                        sh 'npm install --no-audit'
                        //stash (includes: 'node_modules/', name: 'node-modules-stashing')
                        //unstash 'node-modules-stashing'
                }
                }
                        }

        stage('NPM dependencies') {
            steps {
            catchError(buildResult: 'SUCCESS', message: 'NPM dependencies has a Critical vulnerabilities', stageResult: 'UNSTABLE'){
               sh 'npm audit --audit-level=critical'         
            }
            }
        }    
            
        
        stage('Build Stage') {
           
           parallel{
            
            stage('Build-Client'){
                steps {
                    sh "npm run build-client" 
                      }
                                 }
            stage('Build Server and Browserify '){
            
                stages{

                    stage('build-server'){
                        steps {
                            sh "npm run build-server" 
                             }
                                         }

                    stage('build browsify'){
                        steps {
                            sh "npm run browserify" 
                              }
                                           }
                      }
                                    }
                    } 
                              }

        stage('Test Stage') {
            steps {
                sh "npm test"
                  }
        }
        
        
        
        stage('Building Docker Image') {
            steps {
                    sh 'docker build -t ahmedelenany703/solutionapp:$GIT_COMMIT .'        
            }
                
            }

        
        stage('Trivy Vulnerability Scanner'){
            parallel{

            stage('Trivy FS Scan') {
            steps {
                sh '''
                    trivy fs . \
                    --cache-dir /tmp/trivy/ \
                    --format json \
                    --quiet \
                    --output nodejs-trivy-fs-scan.json
                    ''' 
            } 
        }
            stage('Trivy Image Scan') {
            steps {
                sh  ''' 
                    trivy image ahmedelenany703/solutionapp:$GIT_COMMIT \
                        --severity LOW,MEDIUM,HIGH \
                        --cache-dir /tmp/trivy/ \
                        --quiet \
                        --format json -o trivy-image-LOW-MEDIUM-HIGH-results.json

                    trivy image ahmedelenany703/solutionapp:$GIT_COMMIT \
                        --severity CRITICAL \
                        --cache-dir /tmp/trivy/ \
                        --quiet \
                        --format json -o trivy-image-CRITICAL-results.json
                '''
            }
        }


            }
            post {
                always {
                    sh '''
                        trivy convert \
                            --format template --template "@/usr/local/share/trivy/html.tpl" \
                            --output trivy-image-LOW-MEDIUM-HIGH-results.html trivy-image-LOW-MEDIUM-HIGH-results.json 

                        trivy convert \
                            --format template --template "@/usr/local/share/trivy/html.tpl" \
                            --output trivy-image-CRITICAL-results.html trivy-image-CRITICAL-results.json

                        trivy convert \
                            --format template --template "@/usr/local/share/trivy/html.tpl" --output trivy-fs-scan.html nodejs-trivy-fs-scan.json     
                       '''
                }
            }
        }

        

        stage('Pushing to Registry') {
            steps {
              script{
                withDockerRegistry(credentialsId: 'Ahmed-docker-cred') {
                    sh 'docker push ahmedelenany703/solutionapp:$GIT_COMMIT'        
                }
            }
                
            }
        }
        

        stage('Deploy to Staging') {
           steps {
                 withKubeConfig(clusterName: 'kubernetes', credentialsId: 'staging-cluster-cred', namespace: 'staging', restrictKubeConfigAccess: false, serverUrl: 'https://165.22.84.60:6443') {
                        sh '''
                            sed -i  "s|ahmedelenany703/solutionapp:.*|ahmedelenany703/solutionapp:$GIT_COMMIT|g" deployment.yaml
                            kubectl apply -f deployment.yaml
                            kubectl apply -f service.yaml
                            '''
                    }        
            }
                
            }


        stage('Acceptance Test')
        {
            steps {

                script {
                    
                    sh "k6 run -e SERVICE=${SERVICE} acceptance-test.js"
                }
            }
        }

        stage('Deploy to prod') {
           
           steps {

                timeout(time: 10, unit: 'MINUTES') {
                script {
                input message: "Do you want to proceed with the deployment?",
                      ok: "Yes"
                       }
                                                    }
                 withKubeConfig(clusterName: 'kubernetes', credentialsId: 'prod-cluster-cred', namespace: 'prod', restrictKubeConfigAccess: false, serverUrl: 'https://165.22.84.60:6443') {
                        sh '''
                            sed -i  "s|nodePort: 30100|nodePort: 30200|g" service.yaml
                            kubectl apply -f deployment.yaml
                            kubectl apply -f service.yaml
                            '''
                    }        
            }
                
            }    

        stage('Update image tag to main repository') {
           steps {
                    sh '''
                       cat deployment.yaml
                       git clone -b deployment https://Ahmedmelenany:${GIT_TOKEN}@github.com/Ahmedmelenany/End-To-End-React-NodeJS-Project.git
                       git checkout deployment
                       git config --global user.email "jenkins@jenkins.com"
                       git config --global user.name "Jenkins"
                       git add deployment.yaml
                       git remote set-url origin https://Ahmedmelenany:${GIT_TOKEN}@github.com/Ahmedmelenany/End-To-End-React-NodeJS-Project.git
                       git commit -m "Update Kubernetes deployment image with tag $GIT_COMMIT"
                       git push -u origin deployment
                       '''        
            }
                
            }    
    
    }
        post {
            always{

                slackNotifications("${currentBuild.result}")

                publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, icon: '', keepAll: true, reportDir: './', reportFiles: 'trivy-image-LOW-MEDIUM-HIGH-results.html', reportName: 'Trivy Image LMH Report', reportTitles: '', useWrapperFileDirectly: true])

                publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, icon: '', keepAll: true, reportDir: './', reportFiles: 'trivy-image-CRITICAL-results.html', reportName: 'Trivy Image CRITICAL Report', reportTitles: '', useWrapperFileDirectly: true])

                publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, icon: '', keepAll: true, reportDir: './', reportFiles: 'trivy-fs-scan.html', reportName: 'Trivy FS Scan Report', reportTitles: '', useWrapperFileDirectly: true])
            }
        }
}
