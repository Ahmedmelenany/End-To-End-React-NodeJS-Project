# Application Guide

This guide explains how to test the application overall and demonstrate its setup and everything about it.

---
## The project content

- Installing two-node Kubernetes cluster using the kubeadm way and configured containerd as a container runtime.
- Automating infrastruce configuration with Ansible Roles.
- Writing a Docker file and k8s manifests files needed for the project.
- Complete CI/CD pipeline for building, testing and deploying the application in two environment.
- Using Nginx as a Reverse proxy and configured it to forward the traffic to the application.
- Using Prometheus and Grafana for monitoring and logging the application.


## 📦 Prerequisites

Make sure you have the following installed on your machine:

- [Docker](https://docs.docker.com/get-docker/)
- [Git](https://git-scm.com/)
- [Node.js-16](https://nodejs.org/) 

---

## 🧪 Running the Application Locally

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Ahmedmelenany/End-To-End-React-NodeJS-Project.git
   ```

2. **Install Dependencies**

   ```bash
   npm install --no-audit
   ```


3. **Build the Application**

   ```bash
   Add you database credentials at path: src/server/db/protected/dbcon-dev.ts
   npm run build-all
   ```


3. **test the simple test case**
   
   ```bash
   npm test
   ```

4. **run and Test it**
   Open your browser after start:
   ```
   npm start
   http://localhost:3000
   ```
---

## 🐳 Building the Docker Image

1. **Build the Docker Image**
   ```bash
   docker build -t your-app-name .
   ```

2. **Run the Docker Container**
   ```bash
   note pass environments of your db
   docker run -p 3000:3000 your-app-name -e ..
   ```

3. **Test the App in Docker**
   Go to:
   ```
   http://localhost:3000
   ```

---

## 🚰 Notes

- create a `.env` file and add them there for the test case.
- Make sure your `Dockerfile` is in the root directory of the project.
- You can use `docker-compose` if your app depends on other services like databases.

---

# 🪖 Ansible

You can use Ansible to automate your infrastructure configuration. 

1. **Go to the right directory**

   ```bash
   cd Ansible-roles
   ```
2. **Add the IPs of your machines and Execute the playbook**

   ```bash
   ansible-playbook -i inventory playbook.yaml
   ```


# 📅 Jenkins CI/CD Pipeline

To set up a Jenkins pipeline for this project:

1. **Install Jenkins** on your machine or server.

2. **Install the recommended and following plugins**:
   - Blue Ocean
   - Job Cacher
   - NodeJS
   - HTML Publisher
   - Docker
   - Kubernetes

3. **Configure system and tools in manage jenkins section and configure the pipeline and use the Jenkinsfile provided**

4. **Make sure that the integration with the tools is ready (docker, kubernetes, ...) and run the pipeline**

5. **Screenshots of the pipeline, Artifacts and slack message**

   ***Pipeline view***
![Blue Ocean ](./Images/Screenshot-01.png)

   ***Artifacts***
![Html Reports ](./Images/Screenshot-02.png)

   ***Slack message***

![Slack message ](./Images/Screenshot-03.png)

# Kubernetes 

1. **Go to kubernetes folder**

- Every Environment has its persistance volume.
- For staging Env you should configured service of the app as nodeport.
- For prod Env has an ingress and network policy.

```bash
   cd kubernetes
   ./install.sh < staging or prod >
   ```
![Resources ](./Images/Screenshot-05.png)

2. **Ingress and Nginx**

- Ingress is used to expose the app to the outside world.
- Using Nginx container as a reverse proxy to route traffic to the app.
- Network policy is used to restrict traffic between pods.

![Ingress ](./Images/Screenshot-08.png)

![Ingresss ](./Images/Screenshot-06.png)

- Running Nginx container 

```bash
   docker run --name nginx-reverse-proxy -p 80:80 --add-host=host.docker.internal:host-gateway \
   -v $(pwd)/default.conf:/etc/nginx/conf.d/default.conf nginx 
   ```
- You can forwarding to http://ip:port directly or using add-host option as above.
- Nginx as reverse proxy conf file 

```bash
   server {
    listen 80;
    server_name ahmed.app.local;

    location / {
        proxy_pass http://host.docker.internal:30674;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
               }
          }
   ```

![nginx ](./Images/Screenshot-07.png)
