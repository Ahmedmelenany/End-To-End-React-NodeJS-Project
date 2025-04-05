#!/bin/bash

NAMESPACE=$1
kubectl delete all --all -n $NAMESPACE
kubectl delete pv pv-$NAMESPACE-node
kubectl delete ns $NAMESPACE
