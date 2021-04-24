pipeline {

    agent none

    options {
        buildDiscarder(logRotator(numToKeepStr: '5'))
        skipDefaultCheckout true
    }

    environment {
        DOCKER_REGISTRY = "reg.iclass.cn" //镜像上传选地址
        IMAGE_NAME = "umedia/umx-web"
        SERVICE_NAME = "umx-web"
        PORT = "8085"
        NODE = "node-hw5"
        PROD_NODE = "node-hw6"
    }


    stages {


        stage('check out') {

            agent { label 'master' }

            steps {

                checkout scm

                echo "current branch: $BRANCH_NAME"


                echo "$BRANCH_NAME"
            }

        }
        stage('npm install') {
            agent { label 'master' }
            steps {
                echo 'start to npm install'
                sh "docker run -i --rm -v ${env.WORKSPACE}:/usr/src/workspace -w /usr/src/workspace reg.iclass.cn/iclass.cn/node:latest yarn install"
            }
        }

        stage('npm build test') {
            agent { label 'master' }
            when {
                branch 'develop'
            }
            steps {
                echo 'start to npm build'
                sh "docker run -i --rm -v ${env.WORKSPACE}:/usr/src/workspace -w /usr/src/workspace reg.iclass.cn/iclass.cn/node:latest npm run build:test"
            }
        }

        stage('npm build prod') {
            agent { label 'master' }
            when {
                branch 'main'
            }
            steps {
                echo 'start to npm build'
                sh "docker run -i --rm -v ${env.WORKSPACE}:/usr/src/workspace -w /usr/src/workspace reg.iclass.cn/iclass.cn/node:latest npm run build:prod"
            }
        }

        stage('build & push') {
            agent { label 'master' }
            steps {
                script {

                    docker.withRegistry('http://${DOCKER_REGISTRY}', "reg.iclass.cn") {
                        def customImage = docker.build('${IMAGE_NAME}:${BRANCH_NAME}')
                        customImage.push()
                    }
                }
            }
        }

        stage('develop release ') {

            agent { label "$NODE" }

            environment {
                NODEIP = sh(
                        returnStdout: true,
                        script: 'ip a|grep eth0|grep -w \'inet\'|sed \'s/^.*inet //g\'|sed \'s/\\/[0-9][0-9].*$//g\''
                ).trim()
            }

            when {
                branch 'develop'
            }

            steps {
                echo 'stop old container'

                sh '''CID=$(docker ps | grep ${SERVICE_NAME} | awk \'{print $1}\')
                    if [ "$CID" != "" ];then
                        docker rm -f $CID
                    fi'''

                echo 'renew images'

                sh 'docker pull ${DOCKER_REGISTRY}/${IMAGE_NAME}:${BRANCH_NAME}'

                echo 'restart'
                sh 'docker run -d --name ${SERVICE_NAME} -p ${PORT}:80 ${DOCKER_REGISTRY}/${IMAGE_NAME}:${BRANCH_NAME}'
            }
        }

        stage('master release ') {

            agent { label "$PROD_NODE" }

            environment {
                NODEIP = sh(
                        returnStdout: true,
                        script: 'ip a|grep eth0|grep -w \'inet\'|sed \'s/^.*inet //g\'|sed \'s/\\/[0-9][0-9].*$//g\''
                ).trim()
            }

            when {
                branch 'main'
            }

            steps {
                echo 'stop old container'

                sh '''CID=$(docker ps | grep ${SERVICE_NAME} | awk \'{print $1}\')
                    if [ "$CID" != "" ];then
                        docker rm -f $CID
                    fi'''

                echo 'renew images'

                sh 'docker pull ${DOCKER_REGISTRY}/${IMAGE_NAME}:${BRANCH_NAME}'

                echo 'restart'
                sh 'docker run -d --name ${SERVICE_NAME} -p ${PORT}:80 ${DOCKER_REGISTRY}/${IMAGE_NAME}:${BRANCH_NAME}'
            }
        }
    }
}
