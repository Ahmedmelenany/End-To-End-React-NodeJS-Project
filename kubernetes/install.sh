#!/bin/bash
# Author: Ahmed El-Enany
# Date: 2025-3-28
# Purpose: This script will create a new namespace with the resourses needed for the project.
# Usage: ./install.sh <namespace>
# Example: ./install.sh prod

NAMESPACE=$1
kubectl create ns $NAMESPACE
kubectl create serviceaccount jenkins -n $NAMESPACE
kubectl apply -f jenkins-secret.yaml -n $NAMESPACE
kubectl apply -f role-role-binding.yaml -n $NAMESPACE
kubectl apply -f $NAMESPACE-pv.yaml
kubectl create configmap -n $NAMESPACE app-config --from-literal=DB_HOST="mysql-service" \
        --from-literal=USER="ahmed" --from-literal=DB_NAME="masterdb"
kubectl create secret generic -n $NAMESPACE mysql-secret --from-literal=root-pass='1234' --from-literal=user-pass='5678'
kubectl apply -f mysql-statefulset.yaml -n $NAMESPACE
kubectl apply -f headless.yaml -n $NAMESPACE
kubectl apply -f job.yaml -n $NAMESPACE
